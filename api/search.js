import accounts from "../data/accounts.json";
import sdk from "../data/sdk.json";
import items from "../data/items.json";

export default function handler(req, res) {
  try {
    const {
      username,
      country,
      item,
      item_id,
      sdk_query,
      sdk_type,
      sdk_offset,
      sdk_size
    } = req.query;

    // -----------------------------
    // 1. ACCOUNT SEARCH
    // -----------------------------
    let accountMatches = [];

    if (username || country) {
      accountMatches = accounts.filter(acc => {
        let ok = true;

        if (username)
          ok = ok && acc.username.toLowerCase().includes(username.toLowerCase());

        if (country)
          ok = ok && acc.country.toLowerCase() === country.toLowerCase();

        return ok;
      });
    }

    // -----------------------------
    // 2. ITEM SEARCH (SAFE)
    // -----------------------------
    let itemMatches = [];

    try {
      const allItems = Object.values(items);

      itemMatches = allItems.filter(it => {
        let ok = true;

        const name = (it.name || "").toLowerCase();
        const desc = (it.description || "").toLowerCase();

        if (item)
          ok = ok && (name.includes(item.toLowerCase()) || desc.includes(item.toLowerCase()));

        if (item_id)
          ok = ok && String(it.id) === String(item_id);

        return ok;
      });
    } catch (err) {
      console.error("ITEM SEARCH ERROR →", err);
      itemMatches = [];
    }

    // -----------------------------
    // 3. SDK SEARCH (SAFE)
    // -----------------------------
    let sdkMatches = [];

    try {
      const properties = sdk?.Object?.properties || [];  // Safe access

      sdkMatches = properties.filter(prop => {
        let ok = true;

        const pName = (prop.name || "").toLowerCase();
        const pType = (prop.type || "").toLowerCase();

        if (sdk_query)
          ok = ok && pName.includes(sdk_query.toLowerCase());

        if (sdk_type)
          ok = ok && pType.includes(sdk_type.toLowerCase());

        if (sdk_offset)
          ok = ok && Number(prop.offset) === Number(sdk_offset);

        if (sdk_size)
          ok = ok && Number(prop.size) === Number(sdk_size);

        return ok;
      });
    } catch (err) {
      console.error("SDK SEARCH ERROR →", err);
      sdkMatches = [];
    }

    // -----------------------------
    // 4. RETURN RESPONSE
    // -----------------------------
    return res.status(200).json({
      success: true,
      total_results:
        accountMatches.length + itemMatches.length + sdkMatches.length,

      accounts: accountMatches,
      items: itemMatches,
      sdk: sdkMatches
    });

  } catch (mainErr) {
    console.error("FATAL SEARCH CRASH →", mainErr);
    return res.status(500).json({
      success: false,
      error: "Search engine crashed internally. Check logs."
    });
  }
}
