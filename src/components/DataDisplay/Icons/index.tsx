import type { ComponentType, HTMLAttributes, SVGProps } from "react";
import * as LucideIcons from "lucide-react";
import { type LucideProps } from "lucide-react";
import { type IconName } from "./catalog";
import "./Icons.css";

type IconSize = "sm" | "md" | "lg";

export type IconsProps = HTMLAttributes<SVGSVGElement> & {
  name?: IconName;
  size?: number | IconSize;
  color?: string;
  strokeWidth?: number;
};

const sizeMap: Record<IconSize, number> = { sm: 24, md: 32, lg: 44 };
const iconAliases: Record<string, string> = {
  add: "plus",
  billing: "receipt",
  chat: "message-circle",
  clock: "clock3",
  "clock-3": "clock3",
  create: "circle-plus",
  cube: "box",
  dashboard: "layout-dashboard",
  delete: "trash",
  details: "file-text",
  edit: "square-pen",
  github: "globe",
  inventory: "package",
  linkedin: "globe",
  "new": "circle-plus",
  orders: "shopping-cart",
  paw: "paw-print",
  payments: "credit-card",
  remove: "trash",
  reports: "chart-column-big",
  spark: "sparkles",
  stack: "layers",
  tree: "tree-pine",
  twitter: "globe",
  update: "square-pen",
  "user-add": "user-plus",
  view: "eye",
  wave: "waves",
};

const toKebabCase = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();

const iconEntries = Object.entries(LucideIcons).filter(
  ([key, value]) =>
    /^[A-Z]/.test(key) &&
    !key.endsWith("Icon") &&
    Boolean(value) &&
    typeof value === "object" &&
    "$$typeof" in value,
) as Array<[string, ComponentType<LucideProps>]>;

const iconMap = Object.fromEntries(
  iconEntries.map(([key, value]) => [toKebabCase(key), value]),
) as Record<string, ComponentType<LucideProps>>;

export default function Icons({
  name = "spark",
  size = "md",
  color = "currentColor",
  strokeWidth = 1.6,
  className,
  ...props
}: IconsProps) {
  const classes = ["vx-icon", className ?? ""].filter(Boolean).join(" ");
  const resolvedSize =
    typeof size === "number" ? Math.max(24, size) : sizeMap[size] ?? sizeMap.md;
  const resolvedName = iconAliases[name] ?? name;
  const exists = resolvedName in iconMap;

  if (!exists) {
    return (
      <svg
        className={classes}
        width={resolvedSize}
        height={resolvedSize}
        viewBox="0 0 24 24"
        aria-label={name}
        {...(props as Omit<SVGProps<SVGSVGElement>, "name">)}
      >
        <text x="12" y="16" textAnchor="middle" fontSize="12" fill={color}>
          ?
        </text>
      </svg>
    );
  }

  const IconComponent = iconMap[resolvedName];

  return (
    <IconComponent
      className={classes}
      size={resolvedSize}
      color={color}
      strokeWidth={strokeWidth}
      absoluteStrokeWidth
      aria-label={name}
      {...(props as Omit<SVGProps<SVGSVGElement>, "name">)}
    />
  );
}
