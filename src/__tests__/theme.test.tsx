import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider, ThemeSwitcher } from "../components/Styles";

describe("Theme components", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => {
          store.set(key, value);
        },
        removeItem: (key: string) => {
          store.delete(key);
        },
        clear: () => {
          store.clear();
        },
      },
      configurable: true,
    });

    document.documentElement.removeAttribute("data-theme-mode");
    document.body.removeAttribute("data-theme-mode");
  });

  it("renders mode select and palette color pickers", () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    );

    expect(screen.getByLabelText(/Tema/i)).toBeInTheDocument();
    expect(screen.getByLabelText("primary")).toBeInTheDocument();
    expect(screen.getByLabelText("secondary")).toBeInTheDocument();
    expect(screen.getByLabelText("accent")).toBeInTheDocument();
    expect(screen.getByLabelText("surface")).toBeInTheDocument();
    expect(screen.getByLabelText("text")).toBeInTheDocument();
    expect(screen.getByLabelText("muted")).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /azure/i })).not.toBeInTheDocument();
  });

  it("changing mode updates data-theme-mode and color-scheme", async () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    );

    fireEvent.change(screen.getByLabelText(/Tema/i), { target: { value: "dark" } });

    await waitFor(() => {
      expect(document.documentElement.dataset.themeMode).toBe("dark");
      expect(document.body.dataset.themeMode).toBe("dark");
      expect(document.documentElement.style.getPropertyValue("color-scheme")).toBe("dark");
    });
  });

  it("changing palette color updates CSS variable", async () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    );

    fireEvent.change(screen.getByLabelText("primary"), {
      target: { value: "#112233" },
    });

    await waitFor(() => {
      expect(document.documentElement.style.getPropertyValue("--vx-primary")).toBe("#112233");
    });
  });

  it("loads saved localStorage state on mount", async () => {
    window.localStorage.setItem(
      "vx-theme-state",
      JSON.stringify({
        mode: "dark",
        palette: {
          primary: "#123456",
          secondary: "#abcdef",
          accent: "#010203",
          surface: "#121212",
          text: "#f5f5f5",
          muted: "#888888",
        },
      }),
    );

    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(document.documentElement.dataset.themeMode).toBe("dark");
      expect(document.documentElement.style.getPropertyValue("--vx-primary")).toBe("#123456");
    });
  });

  it("falls back safely when localStorage has invalid JSON", async () => {
    window.localStorage.setItem("vx-theme-state", "{not-json");
    const spy = vi.spyOn(window.localStorage, "setItem");

    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(document.documentElement.dataset.themeMode).toBe("light");
      expect(spy).toHaveBeenCalled();
    });

    spy.mockRestore();
  });
});
