import WallpaperSection from '@/components/WallpaperSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Progress Wallpaper Engine
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Track your daily progress throughout the year with a beautiful, auto-updating wallpaper.
            Choose between dot grid or horizontal progress bar visualization modes.
            Designed with iOS lock screen safe areas to avoid clock and control buttons.
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {/* Preview and Shortcuts Guide Sections */}
          <WallpaperSection />

          {/* API Documentation */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">API Documentation</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">Endpoint</h3>
                <code className="block p-3 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded text-sm">
                  GET /api/wallpaper
                </code>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">Query Parameters</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left dark:text-gray-200">Parameter</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left dark:text-gray-200">Type</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left dark:text-gray-200">Default</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left dark:text-gray-200">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm dark:text-gray-300">width</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 dark:text-gray-300">number</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 dark:text-gray-300">1170</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 dark:text-gray-300">Width of the image in pixels (max 5000)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm dark:text-gray-300">height</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 dark:text-gray-300">number</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 dark:text-gray-300">2532</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 dark:text-gray-300">Height of the image in pixels (max 5000)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm dark:text-gray-300">timezone</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 dark:text-gray-300">string</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 dark:text-gray-300">UTC</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 dark:text-gray-300">IANA timezone identifier (e.g., America/New_York, Asia/Jakarta)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-sm dark:text-gray-300">mode</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 dark:text-gray-300">string</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 dark:text-gray-300">dot</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 dark:text-gray-300">Visualization mode: &quot;dot&quot; (grid) or &quot;horizontal&quot; (progress bar)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">Example Requests</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Default (iPhone 14 Pro, UTC):</p>
                    <code className="block p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded text-xs break-all">
                      /api/wallpaper
                    </code>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Custom dimensions with timezone:</p>
                    <code className="block p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded text-xs break-all">
                      /api/wallpaper?width=1290&height=2796&timezone=America/New_York
                    </code>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Asia timezone:</p>
                    <code className="block p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded text-xs break-all">
                      /api/wallpaper?width=1179&height=2556&timezone=Asia/Jakarta
                    </code>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">Response</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Returns a PNG image with Content-Type: image/png
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                  <p className="text-sm font-semibold mb-1 dark:text-gray-200">Visual Legend:</p>
                  <ul className="text-sm space-y-1 dark:text-gray-300">
                    <li><span className="inline-block w-3 h-3 bg-white border border-gray-400 rounded-full mr-2"></span>White dots = Past days (completed)</li>
                    <li><span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-2"></span>Red dot = Today (current day)</li>
                    <li><span className="inline-block w-3 h-3 bg-gray-500 rounded-full mr-2"></span>Gray dots = Future days (upcoming)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center text-gray-600 dark:text-gray-400 text-sm py-6">
            <p>Built with Next.js, Sharp, and date-fns-tz</p>
            <p className="mt-2">
              The wallpaper displays 365 dots (366 for leap years) representing each day of the year.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
