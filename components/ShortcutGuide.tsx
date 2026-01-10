"use client";

import { useState } from "react";

export default function ShortcutGuide() {
  const [baseUrl] = useState(() => {
    return typeof window !== "undefined" ? window.location.origin : "";
  });
  const [timezone] = useState(() => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  });

  const exampleUrl = `${baseUrl}/api/wallpaper?width=1179&height=2556&timezone=${encodeURIComponent(
    timezone
  )}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Apple Shortcuts Setup Guide</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">
            Automatic Daily Wallpaper Setup
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Follow these steps to automatically update your iPhone wallpaper
            every day with your progress:
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4">
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
            Step-by-Step Instructions:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-gray-800 dark:text-gray-200">
            <li>
              <strong>Open Shortcuts App</strong>
              <p className="ml-6 text-sm mt-1">
                Launch the Shortcuts app on your iPhone
              </p>
            </li>
            <li>
              <strong>Create New Shortcut</strong>
              <p className="ml-6 text-sm mt-1">
                Tap the + button to create a new shortcut
              </p>
            </li>
            <li>
              <strong>Add &quot;Get Contents of URL&quot; Action</strong>
              <p className="ml-6 text-sm mt-1">
                Search for and add the &quot;Get Contents of URL&quot; action
              </p>
              <div className="ml-6 mt-2 p-2 bg-white dark:bg-gray-700 rounded border dark:border-gray-600">
                <p className="text-xs font-semibold mb-1 dark:text-gray-200">URL to use:</p>
                <code className="text-xs break-all dark:text-gray-300">{exampleUrl}</code>
              </div>
            </li>
            <li>
              <strong>Add &quot;Set Wallpaper&quot; Action</strong>
              <p className="ml-6 text-sm mt-1">
                Search for and add the &quot;Set Wallpaper&quot; action
              </p>
              <p className="ml-6 text-sm mt-1">
                Choose &quot;Lock Screen&quot; or &quot;Both&quot; for the
                wallpaper location
              </p>
            </li>
            <li>
              <strong>Name Your Shortcut</strong>
              <p className="ml-6 text-sm mt-1">
                Give it a name like &quot;Daily Progress Wallpaper&quot;
              </p>
            </li>
            <li>
              <strong>Set Up Automation</strong>
              <p className="ml-6 text-sm mt-1">Go to the Automation tab</p>
              <p className="ml-6 text-sm mt-1">
                Create a new Personal Automation
              </p>
              <p className="ml-6 text-sm mt-1">
                Choose &quot;Time of Day&quot; trigger (e.g., 12:01 AM daily)
              </p>
              <p className="ml-6 text-sm mt-1">
                Add the shortcut you just created
              </p>
              <p className="ml-6 text-sm mt-1">
                Disable &quot;Ask Before Running&quot; for fully automatic
                updates
              </p>
            </li>
          </ol>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 dark:text-gray-200">Customization Options</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            You can customize the URL with these query parameters:
          </p>
          <ul className="space-y-2 text-sm dark:text-gray-300">
            <li>
              <code className="bg-gray-200 dark:bg-gray-600 dark:text-gray-200 px-2 py-1 rounded">width</code> -
              Width in pixels (e.g., 1179)
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-600 dark:text-gray-200 px-2 py-1 rounded">height</code> -
              Height in pixels (e.g., 2556)
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-600 dark:text-gray-200 px-2 py-1 rounded">timezone</code> -
              IANA timezone (e.g., America/New_York, Asia/Jakarta)
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-4">
          <h3 className="font-semibold mb-2 dark:text-yellow-200">Tips:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-800 dark:text-gray-200">
            <li>
              Use your device&apos;s native screen resolution for best quality
            </li>
            <li>Set the automation to run at midnight in your timezone</li>
            <li>
              The wallpaper updates automatically based on the current day
            </li>
            <li>
              White dots = completed days, Red dot = today, Gray dots = upcoming
              days
            </li>
            <li>The year progress resets on January 1st</li>
          </ul>
        </div>

        <div className="pt-4">
          <h3 className="font-semibold mb-2 dark:text-gray-200">Example Shortcuts URL:</h3>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded font-mono text-xs break-all">
            {exampleUrl}
          </div>
          <button
            onClick={() =>
              typeof navigator !== "undefined" &&
              navigator.clipboard.writeText(exampleUrl)
            }
            className="mt-2 px-4 py-2 bg-gray-800 dark:bg-gray-600 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-500 transition text-sm"
          >
            Copy URL to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}
