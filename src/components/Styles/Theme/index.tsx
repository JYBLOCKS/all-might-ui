import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Select } from "../../Form";
import { Flex } from "../../Layout";
import "./Theme.css";

export type ThemePalette = {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  surface: string;
  text: string;
  muted: string;
  mode?: "light" | "dark";
};

const defaultThemes: ThemePalette[] = [
  {
    name: "azure",
    primary: "#2563eb",
    secondary: "#0ea5e9",
    accent: "#7c3aed",
    surface: "#ffffff",
    text: "#0f172a",
    muted: "#475569",
    mode: "light",
  },
  {
    name: "emerald",
    primary: "#059669",
    secondary: "#10b981",
    accent: "#0ea5e9",
    surface: "#ffffff",
    text: "#052e16",
    muted: "#064e3b",
    mode: "light",
  },
  {
    name: "sunset",
    primary: "#f97316",
    secondary: "#f59e0b",
    accent: "#ef4444",
    surface: "#ffffff",
    text: "#3f1d0b",
    muted: "#92400e",
    mode: "light",
  },
  {
    name: "midnight",
    primary: "#2563eb",
    secondary: "#10b981",
    accent: "#f59e0b",
    surface: "#0b1224",
    text: "#e2e8f0",
    muted: "#94a3b8",
    mode: "dark",
  },
];

const STORAGE_KEY = "vx-theme-state";
const paletteFields = [
  "primary",
  "secondary",
  "accent",
  "surface",
  "text",
  "muted",
] as const;

const paletteToCssVar: Record<(typeof paletteFields)[number], string> = {
  primary: "--vx-primary",
  secondary: "--vx-secondary",
  accent: "--vx-accent",
  surface: "--vx-surface",
  text: "--vx-text",
  muted: "--vx-muted",
};

type EditablePalette = Pick<ThemePalette, (typeof paletteFields)[number]>;
type ThemeOverrides = Partial<Omit<ThemePalette, "name">>;

type ThemeContextValue = {
  theme: ThemePalette;
  setThemeByName: (name: string) => void;
  setThemeOverrides: (overrides: ThemeOverrides) => void;
  themes: ThemePalette[];
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export type ThemeProviderProps = {
  children: ReactNode;
  themes?: ThemePalette[];
  defaultName?: string;
};

function pickEditablePalette(theme: ThemePalette): EditablePalette {
  return {
    primary: theme.primary,
    secondary: theme.secondary,
    accent: theme.accent,
    surface: theme.surface,
    text: theme.text,
    muted: theme.muted,
  };
}

function applyThemeToDocument(theme: ThemePalette) {
  const root = document.documentElement;
  const isDark = theme.mode === "dark";
  const border = isDark ? "#1f2937" : "#e2e8f0";
  const surfaceMuted = isDark ? "#0f172a" : "#f6f8fb";
  const surfaceElevated = isDark ? "#111827" : "#ffffff";
  const codeBg = isDark ? "#0b1224" : "#0f172a";
  const shadow = isDark
    ? "0 10px 30px rgba(0, 0, 0, 0.45)"
    : "0 8px 20px rgba(15, 23, 42, 0.05)";

  root.style.setProperty("--vx-primary", theme.primary);
  root.style.setProperty("--vx-secondary", theme.secondary);
  root.style.setProperty("--vx-accent", theme.accent);
  root.style.setProperty("--vx-surface", theme.surface);
  root.style.setProperty("--vx-text", theme.text);
  root.style.setProperty("--vx-muted", theme.muted);
  root.style.setProperty("--vx-border", border);
  root.style.setProperty("--vx-surface-muted", surfaceMuted);
  root.style.setProperty("--vx-surface-elevated", surfaceElevated);
  root.style.setProperty("--vx-code-bg", codeBg);
  root.style.setProperty("--vx-code-text", "#e2e8f0");
  root.style.setProperty("--vx-shadow", shadow);
  root.dataset.themeMode = theme.mode ?? "light";
  document.body.dataset.themeMode = theme.mode ?? "light";
  root.style.setProperty("color-scheme", theme.mode === "dark" ? "dark" : "light");
}

function readStoredOverrides(): ThemeOverrides {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};

    const mode =
      "mode" in parsed && (parsed.mode === "light" || parsed.mode === "dark")
        ? parsed.mode
        : undefined;

    const palette =
      "palette" in parsed && parsed.palette && typeof parsed.palette === "object"
        ? parsed.palette
        : {};

    const safePalette: Partial<EditablePalette> = {};
    paletteFields.forEach((field) => {
      const value = (palette as Record<string, unknown>)[field];
      if (typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value)) {
        safePalette[field] = value;
      }
    });

    return { ...safePalette, ...(mode ? { mode } : {}) };
  } catch {
    return {};
  }
}

export function ThemeProvider({
  children,
  themes = defaultThemes,
  defaultName,
}: ThemeProviderProps) {
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const initial = useMemo(() => {
    if (defaultName) return defaultName;
    const preferred = prefersDark
      ? themes.find((t) => t.mode === "dark")?.name
      : undefined;
    return preferred ?? themes[0]?.name;
  }, [defaultName, prefersDark, themes]);
  const [activeName, setActiveName] = useState(initial ?? themes[0]?.name);
  const [overrides, setOverrides] = useState<ThemeOverrides>(() =>
    readStoredOverrides(),
  );

  const baseTheme = useMemo(
    () => themes.find((t) => t.name === activeName) ?? themes[0],
    [activeName, themes],
  );
  const activeTheme = useMemo(
    () => ({
      ...baseTheme,
      ...overrides,
      name: baseTheme?.name ?? "custom",
    }),
    [baseTheme, overrides],
  );

  useEffect(() => {
    if (!activeTheme) return;
    applyThemeToDocument(activeTheme);

    const timeoutId = window.setTimeout(() => {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            mode: activeTheme.mode ?? "light",
            palette: pickEditablePalette(activeTheme),
          }),
        );
      } catch {
        // noop: keep runtime stable when storage is unavailable
      }
    }, 100);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeTheme]);

  const value: ThemeContextValue = useMemo(
    () => ({
      theme: activeTheme ?? themes[0],
      setThemeByName: setActiveName,
      setThemeOverrides: setOverrides,
      themes,
    }),
    [activeTheme, themes],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }
  return ctx;
}

export type ThemeSwitcherProps = {
  label?: string;
};

export function ThemeSwitcher({ label = "Tema" }: ThemeSwitcherProps) {
  const { theme, setThemeOverrides } = useTheme();

  const handleModeChange = (mode: "light" | "dark") => {
    setThemeOverrides({ ...pickEditablePalette(theme), mode });
  };

  const handlePalettePreview =
    (field: keyof EditablePalette) =>
    (e: React.FormEvent<HTMLInputElement>) => {
      document.documentElement.style.setProperty(
        paletteToCssVar[field],
        e.currentTarget.value,
      );
    };

  const handlePaletteChange =
    (field: keyof EditablePalette) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setThemeOverrides({
        ...pickEditablePalette(theme),
        mode: theme.mode ?? "light",
        [field]: e.target.value,
      });
    };

  return (
    <div className="vx-theme">
      <label>
        <span className="w-15">{label}</span>
        <Select
          value={theme.mode ?? "light"}
          onChange={(e) => handleModeChange(e.target.value as "light" | "dark")}
          aria-label={label}
        >
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
        </Select>
      </label>

      <div className="vx-theme__palette">
        <Flex direction="row" gap={1}>
          {paletteFields.map((key) => (
            <label key={key}>
              <span>{key}</span>
              <input
                type="color"
                value={theme[key]}
                onInput={handlePalettePreview(key)}
                onChange={handlePaletteChange(key)}
                aria-label={key}
              />
            </label>
          ))}
        </Flex>
      </div>
    </div>
  );
}
