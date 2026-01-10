import { NextRequest, NextResponse } from 'next/server';
import { generateWallpaper } from '@/lib/wallpaper-generator';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters with defaults
    const width = parseInt(searchParams.get('width') || '1170', 10);
    const height = parseInt(searchParams.get('height') || '2532', 10);
    const timezone = searchParams.get('timezone') || 'UTC';

    // Validate parameters
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      return NextResponse.json(
        { error: 'Invalid width or height parameters. Must be positive numbers.' },
        { status: 400 }
      );
    }

    if (width > 5000 || height > 5000) {
      return NextResponse.json(
        { error: 'Width and height must not exceed 5000 pixels.' },
        { status: 400 }
      );
    }

    // Validate timezone
    try {
      Intl.DateTimeFormat(undefined, { timeZone: timezone });
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid timezone. Please use IANA timezone format (e.g., America/New_York, Asia/Jakarta).' },
        { status: 400 }
      );
    }

    // Generate wallpaper
    const imageBuffer = await generateWallpaper({
      width,
      height,
      timezone,
    });

    // Return image with appropriate headers
    return new Response(new Uint8Array(imageBuffer), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'Content-Disposition': `inline; filename="wallpaper-${new Date().toISOString().split('T')[0]}.png"`,
      },
    });
  } catch (error) {
    console.error('Error generating wallpaper:', error);
    return NextResponse.json(
      { error: 'Failed to generate wallpaper. Please try again.' },
      { status: 500 }
    );
  }
}
