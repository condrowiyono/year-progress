"use client";

import { useState } from "react";
import WallpaperPreview from "./WallpaperPreview";
import ShortcutGuide from "./ShortcutGuide";

export default function WallpaperSection() {
  const [timezone, setTimezone] = useState(() => {
    if (typeof window !== "undefined") {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    return "UTC";
  });
  const [width, setWidth] = useState(1170);
  const [height, setHeight] = useState(2532);
  const [mode, setMode] = useState<"dot" | "horizontal">("dot");

  return (
    <>
      {/* Preview Section */}
      <WallpaperPreview
        timezone={timezone}
        setTimezone={setTimezone}
        width={width}
        setWidth={setWidth}
        height={height}
        setHeight={setHeight}
        mode={mode}
        setMode={setMode}
      />

      {/* Shortcuts Guide Section */}
      <ShortcutGuide
        width={width}
        height={height}
        timezone={timezone}
        mode={mode}
      />
    </>
  );
}
