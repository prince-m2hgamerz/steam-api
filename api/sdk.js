import sdk from "../data/sdk.json";

export default function handler(req, res) {
  const { name, type, offset, size } = req.query;

  const properties = sdk?.Object?.properties || [];

  let results = properties.filter(p => {
    let ok = true;

    const pName = (p.name || "").toLowerCase();
    const pType = (p.type || "").toLowerCase();

    if (name)
      ok = ok && pName.includes(name.toLowerCase());

    if (type)
      ok = ok && pType.includes(type.toLowerCase());

    if (offset)
      ok = ok && Number(p.offset) === Number(offset);

    if (size)
      ok = ok && Number(p.size) === Number(size);

    return ok;
  });

  res.status(200).json({
    success: true,
    total: results.length,
    sdk: results
  });
}
