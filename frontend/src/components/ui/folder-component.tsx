"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { play } from "cuelume";
import { cn } from "@/lib/utils";

const themes = {
  black: {
    backFill: "#12052b",
    backInsetColor: "0 0 0 0 0.65 0 0 0 0 0.35 0 0 0 0 0.97 0 0 0 0.45 0",
    backInsetShadow: "inset 0 0 16px 2px rgba(168,85,247,0.45)",
    flapFill: "#24094a",
    flapFillOpacity: 0.6,
    flapStroke: "#a855f7",
    flapInsetColor: "0 0 0 0 0.65 0 0 0 0 0.35 0 0 0 0 0.97 0 0 0 0.25 0",
    cardFill: "#160733",
    cardStroke: "#a855f7",
    cardLineFill: "#8b5cf6",
    cardInsetColor: "0 0 0 0 0.65 0 0 0 0 0.35 0 0 0 0 0.97 0 0 0 0.3 0",
  },
  white: {
    backFill: "#ffffff",
    backInsetColor: "0 0 0 0 0.7 0 0 0 0 0.7 0 0 0 0 0.7 0 0 0 0.25 0",
    backInsetShadow: "inset 0 0 6px 2px rgba(178,178,178,0.25)",
    flapFill: "#f5f5f5",
    flapFillOpacity: 0.85,
    flapStroke: "#d4d4d4",
    flapInsetColor: "0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.15 0",
    cardFill: "#262626",
    cardStroke: "#404040",
    cardLineFill: "#737373",
    cardInsetColor: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0",
  },
  blue: {
    backFill: "#50B1FD",
    backInsetColor: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0",
    backInsetShadow: "inset 0 0 6px 2px rgba(255,255,255,0.35)",
    flapFill: "#3a9ae8",
    flapFillOpacity: 0.45,
    flapStroke: "#7ec8ff",
    flapInsetColor: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.12 0",
    cardFill: "#F1F1F1",
    cardStroke: "#E0E0E0",
    cardLineFill: "#D4D4D4",
    cardInsetColor: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0",
  },
} as const;

const sizeScales = {
  sm: 0.65,
  md: 1,
  lg: 1.35,
} as const;

type FolderComponentProps = Omit<React.ComponentProps<"div">, "color"> & {
  color?: "black" | "white" | "blue";
  size?: "sm" | "md" | "lg";
};

const BASE_WIDTH = 321;
const BASE_HEIGHT = 270;

const FLAP_PATH =
  "M0 25C0 11.1929 11.1929 0 25 0H136.084C143.044 0 149.689 2.90139 154.42 8.00608L178.08 33.5343C182.811 38.639 189.456 41.5404 196.416 41.5404H296C309.807 41.5404 321 52.7333 321 66.5404V216C321 229.807 309.807 241 296 241H25C11.1929 241 0 229.807 0 216V25Z";

const FolderComponent = ({
  color = "black",
  size = "md",
  className,
  ...props
}: FolderComponentProps) => {
  const theme = themes[color] ?? themes.black;
  const scale = sizeScales[size];
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      data-slot="folder"
      className={cn(
        "relative w-full h-full flex items-center justify-center",
        className,
      )}
      {...props}
    >
      <div
        className="relative cursor-pointer select-none"
        style={{
          width: BASE_WIDTH * scale,
          height: BASE_HEIGHT * scale,
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          play("tick", { volume: 0.3 });
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsOpen(false);
        }}
        onClick={() => {
          setIsOpen((o) => {
            const next = !o;
            if (next) {
              play("page", { volume: 0.55 });
            } else {
              play("release", { volume: 0.35 });
            }
            return next;
          });
        }}
      >
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            width: BASE_WIDTH,
            height: BASE_HEIGHT,
            transform: `translate(-50%, -50%) scale(${scale})`,
            perspective: 800 * scale,
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              style={{
                width: BASE_WIDTH,
                height: BASE_HEIGHT,
                borderRadius: 25,
                backgroundColor: theme.backFill,
                boxShadow: theme.backInsetShadow,
              }}
            />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <motion.div
              className="absolute"
              animate={{
                y: isOpen ? -95 : isHovered ? -30 : -10,
                x: isOpen ? 60 : 40,
                rotate: isOpen ? 14 : isHovered ? 14 : 10,
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 13,
                delay: isOpen ? 0.08 : isHovered ? 0.12 : 0,
              }}
            >
              <VaultCard />
            </motion.div>
            <motion.div
              className="absolute"
              animate={{
                y: isOpen ? -105 : isHovered ? -35 : -20,
                x: isOpen ? 0 : 3,
                rotate: isOpen ? -2 : isHovered ? -1 : 2,
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 13,
                delay: isOpen ? 0.04 : isHovered ? 0.06 : 0,
              }}
            >
              <BMCCard />
            </motion.div>
            <motion.div
              className="absolute"
              animate={{
                y: isOpen ? -100 : isHovered ? -44 : -22,
                x: isOpen ? -60 : -40,
                rotate: isOpen ? -12 : isHovered ? -9 : -5,
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 13,
                delay: isOpen ? 0 : 0,
              }}
            >
              <RoadmapCard />
            </motion.div>
          </div>

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4"
            style={{
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
              width: 321,
              height: 241,
            }}
            animate={{ rotateX: isOpen ? -55 : isHovered ? -45 : -15 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <div
              className="absolute inset-0"
              style={{
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                clipPath: `path('${FLAP_PATH}')`,
                WebkitClipPath: `path('${FLAP_PATH}')`,
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                willChange: "transform",
              }}
            />
            <svg
              className="absolute inset-0"
              width="321"
              height="241"
              viewBox="0 0 321 241"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_i_171_13)">
                <path
                  d={FLAP_PATH}
                  fill={theme.flapFill}
                  fillOpacity={theme.flapFillOpacity}
                />
                <path
                  d="M25 0.5H136.084C142.905 0.5 149.417 3.3431 154.054 8.3457L177.713 33.874C182.539 39.0808 189.317 42.04 196.416 42.04H296C309.531 42.04 320.5 53.0092 320.5 66.54V216C320.5 229.531 309.531 240.5 296 240.5H25C11.469 240.5 0.5 229.531 0.5 216V25C0.5 11.469 11.469 0.5 25 0.5Z"
                  stroke={theme.flapStroke}
                />
              </g>
              <defs>
                <filter
                  id="filter0_i_171_13"
                  x="-25.4"
                  y="-25.4"
                  width="371.8"
                  height="291.8"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="2.65" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix type="matrix" values={theme.flapInsetColor} />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_171_13"
                  />
                </filter>
              </defs>
            </svg>

            {/* Glowing E-Cell Startup Kit Brand Emblem on Front Flap */}
            <div
              style={{
                position: "absolute",
                bottom: 34,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(18, 6, 38, 0.8)",
                border: "1px solid rgba(192, 132, 252, 0.45)",
                borderRadius: 20,
                padding: "5px 14px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
                pointerEvents: "none",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ color: "#e879f9", fontSize: 10 }}>✦</span>
              <span
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#f3e8ff",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                STARTUP KIT '26
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FolderComponent;

export { FolderComponent as Folder };
export type { FolderComponentProps };

/* ── Card 1: Curated Resource Vault ── */
const VaultCard = () => (
  <div
    style={{
      width: 164,
      height: 214,
      borderRadius: 18,
      background: "linear-gradient(145deg, #180836 0%, #0d021f 100%)",
      border: "1px solid rgba(167, 139, 250, 0.45)",
      boxShadow: "0 10px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.15)",
      padding: "12px",
      display: "flex",
      flexDirection: "column",
      color: "#f5f3ff",
      fontFamily: "Inter, sans-serif",
      boxSizing: "border-box",
      overflow: "hidden",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -20,
        right: -20,
        width: 70,
        height: 70,
        borderRadius: "50%",
        background: "rgba(168,85,247,0.25)",
        filter: "blur(16px)",
        pointerEvents: "none",
      }}
    />

    {/* Header */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
      <span
        style={{
          fontSize: 8,
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "#c084fc",
          textTransform: "uppercase",
          background: "rgba(168,85,247,0.2)",
          padding: "2px 6px",
          borderRadius: 4,
          border: "1px solid rgba(168,85,247,0.3)",
        }}
      >
        VAULT
      </span>
      <span style={{ fontSize: 7.5, color: "rgba(216,180,254,0.7)", fontWeight: 600 }}>SPARK X E-CELL</span>
    </div>

    <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", lineHeight: 1.25, marginBottom: 2 }}>
      Resource Vault
    </div>
    <div style={{ fontSize: 7.5, color: "rgba(196,181,253,0.65)", marginBottom: 8 }}>
      Curated Founder Assets
    </div>

    {/* Asset Items */}
    <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
      {[
        { label: "Legal & IP Kit", icon: "⚖️" },
        { label: "Cap Table Model", icon: "📊" },
        { label: "Financial Models", icon: "📈" },
        { label: "Investor CRM", icon: "💼" },
      ].map((item) => (
        <div
          key={item.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(167,139,250,0.15)",
            borderRadius: 6,
            padding: "4px 6px",
          }}
        >
          <span style={{ fontSize: 9 }}>{item.icon}</span>
          <span style={{ fontSize: 8, fontWeight: 500, color: "#e9d5ff", whiteSpace: "nowrap" }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>

    {/* Footer badge */}
    <div
      style={{
        marginTop: "auto",
        paddingTop: 6,
        borderTop: "1px solid rgba(167,139,250,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontSize: 7, color: "rgba(196,181,253,0.6)" }}>VERIFIED BUNDLE</span>
      <span style={{ fontSize: 7.5, color: "#4ade80", fontWeight: 700 }}>✓ READY</span>
    </div>
  </div>
);

/* ── Card 2: Business Model Canvas (BMC) ── */
const BMCCard = () => (
  <div
    style={{
      width: 164,
      height: 214,
      borderRadius: 18,
      background: "linear-gradient(145deg, #1d0940 0%, #0e0224 100%)",
      border: "1px solid rgba(192, 132, 252, 0.55)",
      boxShadow: "0 12px 28px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.2)",
      padding: "12px",
      display: "flex",
      flexDirection: "column",
      color: "#f5f3ff",
      fontFamily: "Inter, sans-serif",
      boxSizing: "border-box",
      overflow: "hidden",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -15,
        left: -15,
        width: 80,
        height: 80,
        borderRadius: "50%",
        background: "rgba(192,132,252,0.3)",
        filter: "blur(20px)",
        pointerEvents: "none",
      }}
    />

    {/* Header */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
      <span
        style={{
          fontSize: 8,
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "#f0abfc",
          textTransform: "uppercase",
          background: "rgba(232,121,249,0.25)",
          padding: "2px 6px",
          borderRadius: 4,
          border: "1px solid rgba(232,121,249,0.35)",
        }}
      >
        CORE ASSET
      </span>
      <span style={{ fontSize: 7.5, color: "#c084fc", fontWeight: 600 }}>IIT BOMBAY</span>
    </div>

    <div style={{ fontSize: 11, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>
      Business Model Canvas
    </div>
    <div style={{ fontSize: 7.5, color: "rgba(196,181,253,0.7)", marginBottom: 8 }}>
      9-Block Startup Architecture
    </div>

    {/* Miniature BMC Grid */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        gap: 3,
        flex: 1,
        background: "rgba(0,0,0,0.35)",
        padding: 4,
        borderRadius: 8,
        border: "1px solid rgba(167,139,250,0.25)",
      }}
    >
      {/* Key Partners */}
      <div
        style={{
          gridColumn: "1 / 2",
          gridRow: "1 / 3",
          background: "rgba(124,58,237,0.18)",
          borderRadius: 4,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(139,92,246,0.2)",
        }}
      >
        <span style={{ fontSize: 5.5, fontWeight: 700, color: "#c4b5fd" }}>PARTNERS</span>
        <div style={{ width: 12, height: 2, background: "#a78bfa", marginTop: 3, borderRadius: 1 }} />
      </div>

      {/* Key Activities */}
      <div
        style={{
          gridColumn: "2 / 3",
          gridRow: "1 / 2",
          background: "rgba(124,58,237,0.12)",
          borderRadius: 4,
          padding: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ fontSize: 5.5, fontWeight: 700, color: "#c4b5fd" }}>ACTIVITIES</span>
      </div>

      {/* Key Resources */}
      <div
        style={{
          gridColumn: "2 / 3",
          gridRow: "2 / 3",
          background: "rgba(124,58,237,0.12)",
          borderRadius: 4,
          padding: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ fontSize: 5.5, fontWeight: 700, color: "#c4b5fd" }}>RESOURCES</span>
      </div>

      {/* Value Proposition (Center Highlight) */}
      <div
        style={{
          gridColumn: "3 / 4",
          gridRow: "1 / 3",
          background: "linear-gradient(135deg, rgba(168,85,247,0.35), rgba(124,58,237,0.2))",
          borderRadius: 4,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(192,132,252,0.4)",
        }}
      >
        <span style={{ fontSize: 5.5, fontWeight: 800, color: "#f5d0fe" }}>VALUE PROP</span>
        <div style={{ width: 14, height: 3, background: "#f0abfc", marginTop: 3, borderRadius: 2 }} />
        <div style={{ width: 9, height: 2, background: "#c084fc", marginTop: 2, borderRadius: 1 }} />
      </div>

      {/* Customer Relationships */}
      <div
        style={{
          gridColumn: "4 / 5",
          gridRow: "1 / 2",
          background: "rgba(124,58,237,0.12)",
          borderRadius: 4,
          padding: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ fontSize: 5.5, fontWeight: 700, color: "#c4b5fd" }}>RELATION</span>
      </div>

      {/* Channels */}
      <div
        style={{
          gridColumn: "4 / 5",
          gridRow: "2 / 3",
          background: "rgba(124,58,237,0.12)",
          borderRadius: 4,
          padding: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ fontSize: 5.5, fontWeight: 700, color: "#c4b5fd" }}>CHANNELS</span>
      </div>

      {/* Customer Segments */}
      <div
        style={{
          gridColumn: "5 / 6",
          gridRow: "1 / 3",
          background: "rgba(124,58,237,0.18)",
          borderRadius: 4,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(139,92,246,0.2)",
        }}
      >
        <span style={{ fontSize: 5.5, fontWeight: 700, color: "#c4b5fd" }}>CUSTOMERS</span>
        <div style={{ width: 12, height: 2, background: "#a78bfa", marginTop: 3, borderRadius: 1 }} />
      </div>

      {/* Bottom: Cost Structure */}
      <div
        style={{
          gridColumn: "1 / 3",
          gridRow: "3 / 4",
          background: "rgba(239,68,68,0.1)",
          borderRadius: 4,
          padding: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid rgba(239,68,68,0.2)",
        }}
      >
        <span style={{ fontSize: 5.5, fontWeight: 700, color: "#fca5a5" }}>COST STRUCTURE</span>
      </div>

      {/* Bottom: Revenue Streams */}
      <div
        style={{
          gridColumn: "3 / 6",
          gridRow: "3 / 4",
          background: "rgba(34,197,94,0.12)",
          borderRadius: 4,
          padding: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid rgba(34,197,94,0.25)",
        }}
      >
        <span style={{ fontSize: 5.5, fontWeight: 700, color: "#86efac" }}>REVENUE STREAMS</span>
        <span style={{ fontSize: 6.5, fontWeight: 800, color: "#4ade80" }}>₹ $</span>
      </div>
    </div>

    {/* Footer */}
    <div
      style={{
        marginTop: "auto",
        paddingTop: 6,
        borderTop: "1px solid rgba(192,132,252,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontSize: 7, color: "#c084fc", fontWeight: 600 }}>✦ BMC TEMPLATE</span>
      <span style={{ fontSize: 7, color: "#e9d5ff" }}>EDITABLE</span>
    </div>
  </div>
);

/* ── Card 3: Startup Roadmap & Execution Blueprint ── */
const RoadmapCard = () => (
  <div
    style={{
      width: 164,
      height: 214,
      borderRadius: 18,
      background: "linear-gradient(145deg, #150630 0%, #0b021a 100%)",
      border: "1px solid rgba(167, 139, 250, 0.45)",
      boxShadow: "0 10px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.15)",
      padding: "12px",
      display: "flex",
      flexDirection: "column",
      color: "#f5f3ff",
      fontFamily: "Inter, sans-serif",
      boxSizing: "border-box",
      overflow: "hidden",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        bottom: -15,
        right: -15,
        width: 70,
        height: 70,
        borderRadius: "50%",
        background: "rgba(124,58,237,0.25)",
        filter: "blur(16px)",
        pointerEvents: "none",
      }}
    />

    {/* Header */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
      <span
        style={{
          fontSize: 8,
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "#67e8f9",
          textTransform: "uppercase",
          background: "rgba(6,182,212,0.2)",
          padding: "2px 6px",
          borderRadius: 4,
          border: "1px solid rgba(6,182,212,0.3)",
        }}
      >
        ROADMAP
      </span>
      <span style={{ fontSize: 7.5, color: "rgba(196,181,253,0.7)", fontWeight: 600 }}>4 PHASES</span>
    </div>

    <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", lineHeight: 1.25, marginBottom: 2 }}>
      Venture Roadmap
    </div>
    <div style={{ fontSize: 7.5, color: "rgba(196,181,253,0.65)", marginBottom: 8 }}>
      0 to 1 Execution Blueprint
    </div>

    {/* Milestone Roadmap Graphic */}
    <div
      style={{
        flex: 1,
        background: "rgba(0,0,0,0.35)",
        borderRadius: 8,
        border: "1px solid rgba(167,139,250,0.2)",
        padding: "8px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {/* Vertical connection track */}
      <div
        style={{
          position: "absolute",
          left: 17,
          top: 14,
          bottom: 14,
          width: 2,
          background: "linear-gradient(to bottom, #67e8f9, #a855f7, #ec4899)",
          opacity: 0.6,
        }}
      />

      {[
        { step: "01", name: "Problem Validation", color: "#67e8f9" },
        { step: "02", name: "MVP Architecture", color: "#a855f7" },
        { step: "03", name: "Product-Market Fit", color: "#c084fc" },
        { step: "04", name: "Scale & Economics", color: "#ec4899" },
      ].map((p) => (
        <div key={p.step} style={{ display: "flex", alignItems: "center", gap: 8, position: "relative", zIndex: 1 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#0e0324",
              border: `1.5px solid ${p.color}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 7,
              fontWeight: 800,
              color: p.color,
              flexShrink: 0,
            }}
          >
            {p.step}
          </div>
          <span style={{ fontSize: 8, fontWeight: 600, color: "#e9d5ff", whiteSpace: "nowrap" }}>
            {p.name}
          </span>
        </div>
      ))}
    </div>

    {/* Footer */}
    <div
      style={{
        marginTop: "auto",
        paddingTop: 6,
        borderTop: "1px solid rgba(167,139,250,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontSize: 7, color: "rgba(196,181,253,0.6)" }}>BLUEPRINT</span>
      <span style={{ fontSize: 7.5, color: "#a78bfa", fontWeight: 600 }}>IIT BOMBAY</span>
    </div>
  </div>
);

