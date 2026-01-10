import sharp from "sharp";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { getDayOfYear, isLeapYear } from "date-fns";

export interface WallpaperOptions {
  width: number;
  height: number;
  timezone: string;
}

export async function generateWallpaper(
  options: WallpaperOptions
): Promise<Buffer> {
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
  const gridWidth = dotsPerRow * horizontalSpacing;
  const gridHeight = totalRows * verticalSpacing;

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
