import {
  iconNames as lucideDynamicIconNames,
  type IconName as DynamicLibIconName,
} from "lucide-react/dynamic";

export const legacyIconNames = [
  "spark",
  "stack",
  "bolt",
  "chat",
  "target",
  "shield-check",
  "wave",
  "cube",
  "arrow-left",
  "arrow-right",
  "arrow-up",
  "arrow-down",
  "calendar",
  "clock",
  "bell",
  "mail",
  "heart",
  "check",
  "x",
  "cloud",
  "sun",
  "moon",
  "plane",
  "dog",
  "cat",
  "paw",
  "tree",
  "github",
  "twitter",
  "linkedin",
] as const;

export type LegacyIconName = (typeof legacyIconNames)[number];
export type LucideIconName = DynamicLibIconName;
export type IconName = LegacyIconName | LucideIconName;
const lucideNames = [...lucideDynamicIconNames] as LucideIconName[];

export const iconNames = Array.from(
  new Set<IconName>([...legacyIconNames, ...lucideNames]),
) as readonly IconName[];

export const legacyToLucide: Record<LegacyIconName, LucideIconName> = {
  spark: "sparkles",
  stack: "layers",
  bolt: "bolt",
  chat: "message-circle",
  target: "target",
  "shield-check": "shield-check",
  wave: "waves",
  cube: "box",
  "arrow-left": "arrow-left",
  "arrow-right": "arrow-right",
  "arrow-up": "arrow-up",
  "arrow-down": "arrow-down",
  calendar: "calendar",
  clock: "clock-3",
  bell: "bell",
  mail: "mail",
  heart: "heart",
  check: "check",
  x: "x",
  cloud: "cloud",
  sun: "sun",
  moon: "moon",
  plane: "plane",
  dog: "dog",
  cat: "cat",
  paw: "paw-print",
  tree: "tree-pine",
  github: "globe",
  twitter: "globe",
  linkedin: "globe",
};
