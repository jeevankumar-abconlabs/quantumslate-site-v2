// Same-origin proxy for the contact form. Keeps the actual Google Apps
// Script Web App URL server-side only — a NEXT_PUBLIC_ var would ship it in
// the client bundle, visible in the Network tab, letting anyone script
// requests straight at it and burn through the shared rate limits.
const FORM_ENDPOINT = process.env.CONTACT_FORM_URL;

export async function POST(request: Request) {
  if (!FORM_ENDPOINT) {
    return Response.json({ ok: false, message: "Contact form isn't configured" }, { status: 500 });
  }

  const body = await request.text();
  const upstream = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body,
  });

  return new Response(await upstream.text(), {
    status: upstream.status,
    headers: { "Content-Type": "application/json" },
  });
}
