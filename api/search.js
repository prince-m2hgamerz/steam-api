export default function handler(req, res) {
  return res.status(400).json({
    success: false,
    message: "Use /api/accounts, /api/items or /api/sdk instead of /api/search"
  });
}
