export default function handler(req, res) {
  const providedKey = req.query.key || req.headers["x-api-key"];

  // Optional mode (C)
  // If user provides key → verify
  // If no key → allow, but mark as un-authenticated

  const VALID_KEY = process.env.API_KEY || null;

  if (!VALID_KEY) {
    return res.status(200).json({
      success: true,
      authenticated: false,
      message: "No API key configured in environment. API is running in open mode."
    });
  }

  if (!providedKey) {
    return res.status(200).json({
      success: true,
      authenticated: false,
      message: "No API key provided. Access allowed (Mode C)."
    });
  }

  if (providedKey !== VALID_KEY) {
    return res.status(200).json({
      success: true,
      authenticated: false,
      message: "Invalid API key. Access allowed in Mode C but unauthorized."
    });
  }

  return res.status(200).json({
    success: true,
    authenticated: true,
    message: "Valid API key."
  });
}
