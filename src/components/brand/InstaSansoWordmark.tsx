"use client";
import { useId } from "react";

type Props = {
  width?: number;        
  fontSize?: number;    
  weight?: number;       
  className?: string;    
  mono?: boolean;       
};

export default function InstaSansoWordmark({
  width = 110,
  fontSize = 28,
  weight = 700,
  className = "",
  mono = false,
}: Props) {
  const gid = useId();
  const height = Math.round(fontSize * 1.6);

  return (
    <svg
      aria-label="InstaSansó"
      role="img"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      {!mono && (
        <defs>
          <linearGradient id={`ig-grad-${gid}`} x1="69.27%" x2="128.20%" y1="129.46%" y2="29.46%">
            <stop offset="0" stopColor="#FDD074" />
            <stop offset="25%" stopColor="#F77F34" />
            <stop offset="50%" stopColor="#DD326E" />
            <stop offset="75%" stopColor="#D82B7E" />
            <stop offset="100%" stopColor="#A432B1" />
          </linearGradient>
        </defs>
      )}

      <text
        x="0"
        y={Math.round(height - (height - fontSize) / 2 - 4)}
        fill={mono ? "currentColor" : `url(#ig-grad-${gid})`}
        fontSize={fontSize}
        fontWeight={weight}
        fontFamily="var(--font-geist-sans, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial)"
        letterSpacing="0.2px"
        textRendering="optimizeLegibility"
      >
        J. Sansó
      </text>
    </svg>
  );
}
