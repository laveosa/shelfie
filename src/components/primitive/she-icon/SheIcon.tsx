import React from "react";
import { cn } from "@/lib/utils.ts";
import cs from "./SheIcon.module.scss";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { isObject } from "lodash";
import { LucideProps } from "lucide-react";

// Type guard: check if value is a React component
function isReactComponent(
  value: unknown,
): value is React.ComponentType<{ className?: string }> {
  return typeof value === "function";
}

export default function SheIcon({
  icon,
  className,
}: ISheIcon): React.ReactNode {
  const combinedClassName = cn(cs.sheIcon, className);

  console.log(typeof icon);

  if (typeof icon === "string") {
    const isImage = /\.(png|jpe?g|gif|webp)$/i.test(icon);
    const isSvgPath = /\.svg$/i.test(icon);

    if (isImage || isSvgPath) {
      return <img src={icon} alt="icon" className={combinedClassName} />;
    }

    return null; // invalid string input
  }

  if (isObject(icon)) {
    return <Icon icon={icon as React.FC<LucideProps>} />;
  }

  function Icon({ icon: Icon }: { icon: React.FC<LucideProps> }) {
    return <Icon />;
  }

  return null; // fallback for unexpected types
}
