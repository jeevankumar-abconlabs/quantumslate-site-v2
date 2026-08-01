const CLIENT_EMAIL = "jeevankumar06m@gmail.com"; // swap in the client's real inbox

const MIN_SECONDS_BETWEEN_SUBMISSIONS = 30;
const MAX_SUBMISSIONS_PER_HOUR = 5;
const MAX_GLOBAL_SUBMISSIONS_PER_HOUR = 30;
const MAX_GLOBAL_SUBMISSIONS_PER_DAY = 50;

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

  // Daily cap, independent of the hourly one above. CacheService tops out at
  // 6h, too short for a full day, so this uses PropertiesService (keyed by
  // date, so it naturally resets at midnight) instead.
  const props = PropertiesService.getScriptProperties();
  const dayKey = "day_count_" + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  const dayCount = Number(props.getProperty(dayKey) || 0) + 1;
  if (dayCount > MAX_GLOBAL_SUBMISSIONS_PER_DAY) {
    return jsonResponse(false, "We're getting too many requests at the moment, please write to us directly");
  }
  props.setProperty(dayKey, String(dayCount));

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
  sheet.insertRowBefore(2); // newest submissions go right under the header

  sheet.getRange(2, 2, 1, 6).setValues([[
    new Date(),
    data.name,
    data.email,
    data.org,
    data.interest,
    data.message,
  ]]);

  const body = [
    `New enquiry: ${data.interest || "General enquiry"}`,
    "",
    `Name:  ${data.name}`,
    `Email: ${data.email}`,
    data.org ? `Org:   ${data.org}` : null,
    "",
    "Message:",
    data.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  MailApp.sendEmail({
    to: CLIENT_EMAIL,
    replyTo: data.email,
    name: "QuantumSlate Contact Form",
    subject: `${data.interest} enquiry from ${data.name}`,
    body: body,
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

function jsonResponse(ok, message) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok !== false, message: message || "" }))
    .setMimeType(ContentService.MimeType.JSON);
}
