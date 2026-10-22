import { NextRequest, NextResponse } from "next/server";

const TMDB_BASE = "https://api.themoviedb.org/3";

export async function GET(request: NextRequest, context: { params: Promise<{ action: string }> }) {
  const { action } = await context.params;
  if (action !== "trending" && action !== "search") {
    return NextResponse.json({ error: "Unknown movie action." }, { status: 404 });
  }

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "TMDB is not configured yet. Add TMDB_API_KEY to the hosting provider's server environment variables." },
      { status: 503 }
    );
  }

  const endpoint = action === "trending" ? "/trending/movie/week" : "/search/movie";
  const url = new URL(`${TMDB_BASE}${endpoint}`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "en-US");

  if (action === "search") {
    const query = (request.nextUrl.searchParams.get("q") || "").trim().slice(0, 100);
    if (!query) return NextResponse.json({ results: [] });
    url.searchParams.set("query", query);
    url.searchParams.set("include_adult", "false");
  }

  try {
    const response = await fetch(url, { next: { revalidate: action === "trending" ? 900 : 0 } });
    if (!response.ok) {
      return NextResponse.json({ error: "TMDB could not complete the request." }, { status: 502 });
    }
    const data = await response.json();
    return NextResponse.json({ results: data.results ?? [] }, {
      headers: { "Cache-Control": action === "trending" ? "public, s-maxage=900, stale-while-revalidate=3600" : "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Could not reach TMDB. Please try again." }, { status: 502 });
  }
}
