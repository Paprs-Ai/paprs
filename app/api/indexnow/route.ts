import { NextResponse } from "next/server";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "paprs-indexnow-key-2026";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://paprs.app";

export async function GET() {
  // Returns IndexNow configuration status
  return NextResponse.json({
    enabled: true,
    host: new URL(SITE_URL).host,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlsCount: 1,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const host = new URL(SITE_URL).host;
    const urlList = body.urls || [
      SITE_URL,
      `${SITE_URL}/#faq`,
      `${SITE_URL}/#how-it-works`,
      `${SITE_URL}/#autonomo-engine`,
    ];

    const payload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    };

    // Ping Bing IndexNow endpoint
    const bingResponse = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    }).catch(() => null);

    return NextResponse.json({
      success: true,
      message: "IndexNow submission submitted to search engines.",
      submittedUrls: urlList,
      status: bingResponse ? bingResponse.status : "queued",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to submit to IndexNow", error: String(error) },
      { status: 500 }
    );
  }
}
