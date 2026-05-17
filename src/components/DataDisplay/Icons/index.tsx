import type { HTMLAttributes, SVGProps } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import {
  iconNames,
  legacyToLucide,
  type IconName,
  type LucideIconName,
  type LegacyIconName,
} from "./catalog";
import "./Icons.css";

type IconSize = "sm" | "md" | "lg";

export type IconsProps = HTMLAttributes<SVGSVGElement> & {
  name?: IconName;
  size?: number | IconSize;
  color?: string;
  strokeWidth?: number;
};

const sizeMap: Record<IconSize, number> = { sm: 20, md: 32, lg: 44 };
const iconNameSet = new Set(iconNames as readonly string[]);

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
    typeof size === "number" ? size : sizeMap[size] ?? sizeMap.md;

  const maybeLegacy = name as LegacyIconName;
  const resolvedName = (legacyToLucide[maybeLegacy] ?? name) as LucideIconName;
  const exists = iconNameSet.has(resolvedName);

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

  return (
      <DynamicIcon
        className={classes}
        name={resolvedName as never}
        size={resolvedSize}
        color={color}
        strokeWidth={strokeWidth}
        absoluteStrokeWidth
        aria-label={name}
      fallback={() => (
        <svg
          className={classes}
          width={resolvedSize}
          height={resolvedSize}
          viewBox="0 0 24 24"
          aria-label={name}
          {...(props as Omit<SVGProps<SVGSVGElement>, "name">)}
        >
          <circle cx="12" cy="12" r="1.5" fill={color} />
        </svg>
      )}
      {...(props as Omit<SVGProps<SVGSVGElement>, "name">)}
    />
  );
}
