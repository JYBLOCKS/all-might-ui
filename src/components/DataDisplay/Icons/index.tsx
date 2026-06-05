import type { ComponentType, HTMLAttributes, SVGProps } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Bolt,
  Box,
  Calendar,
  Cat,
  Check,
  Copy,
  Cloud,
  Clock3,
  Dog,
  Globe,
  Heart,
  Layers,
  Mail,
  MessageCircle,
  Moon,
  PawPrint,
  Plane,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  TreePine,
  Waves,
  X,
  type LucideProps,
} from "lucide-react";
import { iconNames, type IconName } from "./catalog";
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

const iconMap: Record<string, ComponentType<LucideProps>> = {
  spark: Sparkles,
  stack: Layers,
  bolt: Bolt,
  chat: MessageCircle,
  target: Target,
  "shield-check": ShieldCheck,
  wave: Waves,
  cube: Box,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  "arrow-down": ArrowDown,
  calendar: Calendar,
  clock: Clock3,
  bell: Bell,
  mail: Mail,
  heart: Heart,
  check: Check,
  copy: Copy,
  x: X,
  cloud: Cloud,
  sun: Sun,
  moon: Moon,
  plane: Plane,
  dog: Dog,
  cat: Cat,
  paw: PawPrint,
  tree: TreePine,
  github: Globe,
  twitter: Globe,
  linkedin: Globe,
};

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

  const exists = iconNameSet.has(name);

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

  const IconComponent = iconMap[name];

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
