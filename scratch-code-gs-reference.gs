const CLIENT_EMAIL = "jeevankumar06m@gmail.com"; // swap in the client's real inbox

const NAVY = "#002166";
const CREAM = "#F1E8DA";
const TAN = "#C7B7A3";

const MIN_SECONDS_BETWEEN_SUBMISSIONS = 30;
const MAX_SUBMISSIONS_PER_HOUR = 5;
const MAX_GLOBAL_SUBMISSIONS_PER_HOUR = 30;

function doPost(e) {
  // Never let an uncaught exception escape doPost — Apps Script serves
  // unhandled errors from a different endpoint with no CORS headers,
  // which shows up in the browser as an opaque "CORS blocked" failure
  // instead of the real error. Always return a real JSON response.
  try {
    return handleContactSubmission(e);
  } catch (err) {
    console.error(err.stack || err);
    return jsonResponse(false, "Server error, please try again later");
  }
}

function handleContactSubmission(e) {
  const raw = JSON.parse(e.postData.contents);

  // Honeypot — real visitors never see or fill this
  if (raw.website) return jsonResponse();

  const cache = CacheService.getScriptCache();

  // Global cap — independent of any field the caller controls
  const globalKey = "global_count";
  const globalCount = Number(cache.get(globalKey) || 0) + 1;
  if (globalCount > MAX_GLOBAL_SUBMISSIONS_PER_HOUR) {
    return jsonResponse(false, "Too many submissions right now, please try later");
  }
  cache.put(globalKey, String(globalCount), 3600);

  // Never trust input: strip CRLF (blocks email header injection), cap length, coerce to string
  const data = {
    name: sanitize(raw.name, 200),
    email: sanitize(raw.email, 200),
    org: sanitize(raw.org, 200),
    interest: sanitize(raw.interest, 100),
    message: sanitize(raw.message, 5000),
  };

  if (!data.name || !data.message || !isValidEmail(data.email)) {
    return jsonResponse(false, "Invalid input");
  }

  // Rate limit keyed by email (Apps Script gives no caller IP to key on instead)
  const emailKey = data.email.toLowerCase();
  const lastSubmitKey = "last_" + emailKey;
  const countKey = "count_" + emailKey;

  const lastSubmit = cache.get(lastSubmitKey);
  const now = Date.now();
  if (lastSubmit && now - Number(lastSubmit) < MIN_SECONDS_BETWEEN_SUBMISSIONS * 1000) {
    return jsonResponse(false, "Please wait before submitting again");
  }

  const count = Number(cache.get(countKey) || 0) + 1;
  if (count > MAX_SUBMISSIONS_PER_HOUR) {
    return jsonResponse(false, "Rate limit exceeded");
  }

  cache.put(lastSubmitKey, String(now), 3600);
  cache.put(countKey, String(count), 3600);

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow() + 1;

  sheet.getRange(lastRow, 2, 1, 6).setValues([[
    new Date(),
    data.name,
    data.email,
    data.org,
    data.interest,
    data.message,
  ]]);

  const htmlBody = `
    <div style="background:${CREAM};padding:32px;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid ${TAN};border-radius:12px;overflow:hidden;">
        <div style="background:${NAVY};padding:20px 28px;">
          <h1 style="margin:0;color:${CREAM};font-size:18px;letter-spacing:1px;text-transform:uppercase;">
            QuantumSlate — New Enquiry
          </h1>
        </div>
        <div style="padding:28px;color:#222;line-height:1.6;">
          <p style="margin:0 0 16px;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:${NAVY};font-weight:bold;">
            ${escapeHtml(data.interest || "General enquiry")}
          </p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr>
              <td style="padding:6px 0;color:${NAVY};font-weight:bold;width:120px;">Name</td>
              <td style="padding:6px 0;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:${NAVY};font-weight:bold;">Email</td>
              <td style="padding:6px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color:${NAVY};">${escapeHtml(data.email)}</a></td>
            </tr>
            ${data.org ? `
            <tr>
              <td style="padding:6px 0;color:${NAVY};font-weight:bold;">Organization</td>
              <td style="padding:6px 0;">${escapeHtml(data.org)}</td>
            </tr>` : ""}
          </table>
          <div style="background:${CREAM};border-left:4px solid ${TAN};padding:16px 20px;border-radius:4px;">
            <p style="margin:0;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
          </div>
        </div>
        <div style="background:${CREAM};padding:14px 28px;text-align:center;">
          <p style="margin:0;font-size:12px;color:${NAVY};opacity:0.6;">Sent from the QuantumSlate contact form</p>
        </div>
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: CLIENT_EMAIL,
    replyTo: data.email,
    name: "QuantumSlate Contact Form",
    subject: `${data.interest} enquiry from ${data.name}`,
    body: `${data.message}\n\n— ${data.name}${data.org ? `, ${data.org}` : ""} (${data.email})`,
    htmlBody: htmlBody,
  });

  return jsonResponse();
}

function sanitize(value, maxLen) {
  return String(value || "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, maxLen);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonResponse(ok, message) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok !== false, message: message || "" }))
    .setMimeType(ContentService.MimeType.JSON);
}
