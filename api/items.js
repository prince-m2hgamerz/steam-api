import items from "../data/items.json";

export default function handler(req, res) {
  const { name, id } = req.query;

  const list = Object.values(items);

  let results = list.filter(it => {
    let ok = true;

    const itemName = (it.name || "").toLowerCase();
    const itemDesc = (it.description || "").toLowerCase();

    if (name)
      ok = ok && (itemName.includes(name.toLowerCase()) || itemDesc.includes(name.toLowerCase()));

    if (id)
      ok = ok && String(it.id) === String(id);

    return ok;
  });

  res.status(200).json({
    success: true,
    total: results.length,
    items: results
  });
}
