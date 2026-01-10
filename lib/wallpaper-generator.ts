import sharp from "sharp";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { getDayOfYear, isLeapYear } from "date-fns";

export type WallpaperMode = "dot" | "horizontal";

export interface WallpaperOptions {
  width: number;
  height: number;
  timezone: string;
  mode?: WallpaperMode;
}

export async function generateWallpaper(
  options: WallpaperOptions
): Promise<Buffer> {
  const { width, height, timezone, mode = "dot" } = options;

  // Route to appropriate generator based on mode
  if (mode === "horizontal") {
    return generateHorizontalProgressWallpaper({ width, height, timezone });
  }

  return generateDotWallpaper({ width, height, timezone });
}

async function generateDotWallpaper(options: {
  width: number;
  height: number;
  timezone: string;
}): Promise<Buffer> {
  const { width, height, timezone } = options;

  // Get current date in the specified timezone
  const now = new Date();
  const zonedDate = toZonedTime(now, timezone);
  const currentDayOfYear = getDayOfYear(zonedDate);
  const totalDays = isLeapYear(zonedDate) ? 366 : 365;

  // Calculate safe areas for iOS lock screen
  // Top safe area: ~25% for time/date display and widgets
  // Bottom safe area: ~12% for camera/flashlight buttons
  // Left/Right safe areas: ~6% for general margins
  const topSafeArea = height * 0.25;
  const bottomSafeArea = height * 0.12;
  const leftSafeArea = width * 0.06;
  const rightSafeArea = width * 0.06;

  // Calculate available space within safe areas
  const availableWidth = width - leftSafeArea - rightSafeArea;
  const availableHeight = height - topSafeArea - bottomSafeArea;

  // Calculate optimal dot size and spacing
  const aspectRatio = availableWidth / availableHeight;
  const dotsPerRow = Math.ceil(Math.sqrt(totalDays * aspectRatio));
  const totalRows = Math.ceil(totalDays / dotsPerRow);

  // Calculate dot size to fit within available space
  const dotSpacing = 1.5; // Spacing multiplier
  const maxDotWidth = availableWidth / (dotsPerRow * dotSpacing);
  const maxDotHeight = availableHeight / (totalRows * dotSpacing);
  const dotRadius = Math.floor(Math.min(maxDotWidth, maxDotHeight) / 2);

  // Adjust spacing
  const horizontalSpacing = dotRadius * dotSpacing * 2;
  const verticalSpacing = dotRadius * dotSpacing * 2;

  // Calculate starting positions to center the grid within safe areas
  // Grid width is from center of first dot to center of last dot, plus radius on each side
  const gridWidth = (dotsPerRow - 1) * horizontalSpacing + 2 * dotRadius;
  const gridHeight = (totalRows - 1) * verticalSpacing + 2 * dotRadius;

  // Center horizontally within left/right safe areas
  const startX = leftSafeArea + (availableWidth - gridWidth) / 2 + dotRadius;

  // Center vertically within top/bottom safe areas
  const startY = topSafeArea + (availableHeight - gridHeight) / 2 + dotRadius;

  // Generate SVG for dots
  let svgCircles = "";

  for (let day = 1; day <= totalDays; day++) {
    const row = Math.floor((day - 1) / dotsPerRow);
    const col = (day - 1) % dotsPerRow;

    const x = startX + col * horizontalSpacing;
    const y = startY + row * verticalSpacing;

    let color: string;
    if (day < currentDayOfYear) {
      color = "#FFFFFF"; // White for past days
    } else if (day === currentDayOfYear) {
      color = "#FF0000"; // Red for today
    } else {
      color = "#808080"; // Gray for future days
    }

    svgCircles += `<circle cx="${x}" cy="${y}" r="${dotRadius}" fill="${color}" />`;
  }

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#000000"/>
      ${svgCircles}
    </svg>
  `;

  // Convert SVG to PNG using sharp
  const buffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return buffer;
}

async function generateHorizontalProgressWallpaper(options: {
  width: number;
  height: number;
  timezone: string;
}): Promise<Buffer> {
  const { width, height, timezone } = options;

  // Get current date in the specified timezone
  const now = new Date();
  const zonedDate = toZonedTime(now, timezone);
  const currentDayOfYear = getDayOfYear(zonedDate);
  const totalDays = isLeapYear(zonedDate) ? 366 : 365;

  // Calculate safe areas for iOS lock screen
  const topSafeArea = height * 0.25;
  const bottomSafeArea = height * 0.12;
  const leftSafeArea = width * 0.06;
  const rightSafeArea = width * 0.06;

  // Calculate available space within safe areas
  const availableWidth = width - leftSafeArea - rightSafeArea;
  const availableHeight = height - topSafeArea - bottomSafeArea;

  // Progress bar configuration
  const barHeight = Math.min(availableHeight * 0.15, 80); // Max 80px height
  const barY = topSafeArea + (availableHeight - barHeight) / 2;
  const barX = leftSafeArea;

  // Calculate progress
  const progressPercent = (currentDayOfYear / totalDays) * 100;
  const progressWidth = (availableWidth * currentDayOfYear) / totalDays;

  // Border configuration
  const borderWidth = 3;

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="#000000"/>

      <!-- Progress bar background (black with white border) -->
      <rect
        x="${barX}"
        y="${barY}"
        width="${availableWidth}"
        height="${barHeight}"
        fill="#000000"
        stroke="#FFFFFF"
        stroke-width="${borderWidth}"
      />

      <!-- Progress fill (white) -->
      <rect
        x="${barX + borderWidth}"
        y="${barY + borderWidth}"
        width="${Math.max(0, progressWidth - borderWidth * 2)}"
        height="${barHeight - borderWidth * 2}"
        fill="#FFFFFF"
      />

      <!-- Percentage text with white outline for visibility on all backgrounds -->
      <!-- Outline (stroke) -->
      <text
        x="${width / 2}"
        y="${barY + barHeight / 2 + Math.min(barHeight * 0.5, 36) / 3}"
        font-family="Arial, sans-serif"
        font-size="${Math.min(barHeight * 0.5, 36)}"
        font-weight="bold"
        fill="none"
        stroke="#FFFFFF"
        stroke-width="3"
        stroke-linejoin="round"
        text-anchor="middle"
      >
        ${progressPercent.toFixed(1)}%
      </text>
      <!-- Fill (black text on top) -->
      <text
        x="${width / 2}"
        y="${barY + barHeight / 2 + Math.min(barHeight * 0.5, 36) / 3}"
        font-family="Arial, sans-serif"
        font-size="${Math.min(barHeight * 0.5, 36)}"
        font-weight="bold"
        fill="#000000"
        text-anchor="middle"
      >
        ${progressPercent.toFixed(1)}%
      </text>
    </svg>
  `;

  // Convert SVG to PNG using sharp
  const buffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return buffer;
}

export function getWallpaperInfo(timezone: string) {
  const now = new Date();
  const zonedDate = toZonedTime(now, timezone);
  const currentDayOfYear = getDayOfYear(zonedDate);
  const totalDays = isLeapYear(zonedDate) ? 366 : 365;
  const currentDate = formatInTimeZone(zonedDate, timezone, "yyyy-MM-dd");

  return {
    currentDate,
    currentDayOfYear,
    totalDays,
    timezone,
    progress: ((currentDayOfYear / totalDays) * 100).toFixed(2) + "%",
  };
}
