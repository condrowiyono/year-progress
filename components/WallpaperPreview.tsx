"use client";

import { useState } from "react";

export default function WallpaperPreview() {
  const [timezone, setTimezone] = useState(() => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  });
  const [width, setWidth] = useState(1170);
  const [height, setHeight] = useState(2532);

  const previewUrl = `/api/wallpaper?width=${width}&height=${height}&timezone=${encodeURIComponent(
    timezone
  )}`;

  const presets = [
    // iPhone 16 Series (2024)
    { name: "iPhone 16 Pro Max", width: 1320, height: 2868 },
    { name: "iPhone 16 Pro", width: 1206, height: 2622 },
    { name: "iPhone 16 Plus", width: 1290, height: 2796 },
    { name: "iPhone 16", width: 1179, height: 2556 },

    // iPhone 15 Series (2023)
    { name: "iPhone 15 Pro Max", width: 1290, height: 2796 },
    { name: "iPhone 15 Pro", width: 1179, height: 2556 },
    { name: "iPhone 15 Plus", width: 1290, height: 2796 },
    { name: "iPhone 15", width: 1179, height: 2556 },

    // iPhone 14 Series (2022)
    { name: "iPhone 14 Pro Max", width: 1290, height: 2796 },
    { name: "iPhone 14 Pro", width: 1179, height: 2556 },
    { name: "iPhone 14 Plus", width: 1284, height: 2778 },
    { name: "iPhone 14", width: 1170, height: 2532 },

    // iPhone 13 Series (2021)
    { name: "iPhone 13 Pro Max", width: 1284, height: 2778 },
    { name: "iPhone 13 Pro", width: 1170, height: 2532 },
    { name: "iPhone 13", width: 1170, height: 2532 },
    { name: "iPhone 13 mini", width: 1080, height: 2340 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Wallpaper Preview</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Device Preset
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              onChange={(e) => {
                const preset = presets[parseInt(e.target.value)];
                setWidth(preset.width);
                setHeight(preset.height);
              }}
            >
              {presets.map((preset, index) => (
                <option key={index} value={index}>
                  {preset.name} ({preset.width}x{preset.height})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Width (px)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value) || 1170)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              min="100"
              max="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Height (px)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value) || 2532)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              min="100"
              max="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Timezone</label>
            <input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., America/New_York"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use IANA timezone format (e.g., America/New_York, Asia/Jakarta)
            </p>
          </div>

          <div className="pt-4">
            <a
              href={previewUrl}
              download
              className="inline-block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Download Wallpaper
            </a>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium mb-2">Preview</p>
          <div
            className="border border-gray-300 rounded-lg overflow-hidden"
            style={{ maxWidth: "300px" }}
          >
            <img
              src={previewUrl}
              alt="Wallpaper Preview"
              className="w-full h-auto"
            />
          </div>
          <div className="mt-4 p-3 bg-gray-100 rounded text-xs font-mono break-all w-full">
            <p className="font-semibold mb-1">API URL:</p>
            <code>
              {typeof window !== "undefined" ? window.location.origin : ""}
              {previewUrl}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
