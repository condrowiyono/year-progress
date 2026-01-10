# Progress Wallpaper Engine

A Next.js application that generates progress dot wallpapers showing your yearly progress. Each dot represents a day of the year, with different colors indicating past days (white), today (red), and future days (gray).

## Features

- **Dynamic Wallpaper Generation**: Creates wallpapers on-the-fly based on the current date
- **Timezone Support**: Accurate date calculations based on IANA timezone identifiers
- **Customizable Dimensions**: Set any width and height via query parameters
- **Auto-updating**: Perfect for Apple Shortcuts automation to update daily
- **Admin Panel**: Web interface with preview, documentation, and setup guide

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Image Generation**: Sharp (high-performance Node.js image processing)
- **Timezone Handling**: date-fns-tz
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wallpaper-engine
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## API Usage

### Endpoint

```
GET /api/wallpaper
```

### Query Parameters

| Parameter | Type   | Default | Description                                      |
|-----------|--------|---------|--------------------------------------------------|
| width     | number | 1170    | Width of the image in pixels (max 5000)         |
| height    | number | 2532    | Height of the image in pixels (max 5000)        |
| timezone  | string | UTC     | IANA timezone identifier (e.g., America/New_York)|

### Example Requests

```bash
# Default (iPhone 14 Pro, UTC)
curl http://localhost:3000/api/wallpaper > wallpaper.png

# Custom dimensions with timezone
curl "http://localhost:3000/api/wallpaper?width=1290&height=2796&timezone=America/New_York" > wallpaper.png

# Asia timezone
curl "http://localhost:3000/api/wallpaper?width=1179&height=2556&timezone=Asia/Jakarta" > wallpaper.png
```

## Apple Shortcuts Setup

1. Open the **Shortcuts** app on your iPhone
2. Create a new shortcut
3. Add **"Get Contents of URL"** action with your API endpoint:
   ```
   https://your-domain.com/api/wallpaper?width=1179&height=2556&timezone=YOUR_TIMEZONE
   ```
4. Add **"Set Wallpaper"** action
5. Choose "Lock Screen" or "Both" for wallpaper location
6. Set up **Automation**:
   - Go to Automation tab
   - Create "Time of Day" trigger (e.g., 12:01 AM daily)
   - Add your shortcut
   - Disable "Ask Before Running" for automatic updates

## Project Structure

```
wallpaper-engine/
├── app/
│   ├── api/
│   │   └── wallpaper/
│   │       └── route.ts          # API endpoint for image generation
│   ├── page.tsx                   # Admin panel home page
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── WallpaperPreview.tsx       # Preview component with controls
│   └── ShortcutGuide.tsx          # Apple Shortcuts setup guide
├── lib/
│   └── wallpaper-generator.ts     # Core wallpaper generation logic
├── public/
├── package.json
└── README.md
```

## How It Works

1. **Date Calculation**: Uses the timezone parameter to determine the current date and day of year
2. **iOS Lock Screen Safe Areas**: Automatically applies appropriate margins to avoid UI elements:
   - Top safe area: 18% (for time/date display)
   - Bottom safe area: 10% (for camera/flashlight buttons)
   - Left/Right safe areas: 6% each (general margins)
3. **Dot Grid Layout**: Calculates a continuous grid layout within safe areas based on image dimensions
4. **Color Coding**:
   - White dots: Past days (completed)
   - Red dot: Today (current day)
   - Gray dots: Future days (upcoming)
5. **Image Generation**: Uses Sharp to render SVG to PNG with optimal performance

## Customization

### Device Presets

The admin panel includes presets for common devices:
- iPhone 14 Pro (1179x2556)
- iPhone 14 Pro Max (1290x2796)
- iPhone SE (750x1334)
- iPhone 13 (1170x2532)

### Adding More Query Parameters

You can extend the API to support additional customization options like:
- Background color
- Dot size
- Spacing
- Custom color schemes

Edit `/lib/wallpaper-generator.ts` to add new options.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with one click
4. Use the provided URL in your Apple Shortcuts

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

## License

MIT License - feel free to use and modify as needed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue on the GitHub repository.
