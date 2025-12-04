import crypto from "crypto";

export default function handler(req, res) {
  try {
    // Generate 32-byte (256-bit) secure random key
    const key = crypto.randomBytes(32).toString("hex");

    return res.status(200).json({
      success: true,
      key,
      message: "Add this key to your Vercel Environment Variables as API_KEY if you want to enable authentication."
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Key generation failed.",
      details: err.message
    });
  }
}
