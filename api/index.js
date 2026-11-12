module.exports = async function handler(req, res) {
  const { type = "banner", id } = req.query;

  if (!id) {
    return res.status(200).json({
      status: "Banner & Icon API is Live",
      usage: {
        banner: "/banner?id=1001000102",
        icon: "/icon?id=101000027"
      }
    });
  }

  const cleanId = String(id).replace(/\.png$/i, "").trim();
  const fileName = `${cleanId}.png`;

  const MY_REPO = "https://raw.githubusercontent.com/viratassssahani-hue/banner-api/main";
  const BACKUP_REPO = "https://raw.githubusercontent.com/90xExe/FreeFireAllIconBy90x/main";

  const urls =
    type.toLowerCase() === "icon"
      ? [
          `${MY_REPO}/icons/${fileName}`,
          `${MY_REPO}/ICONS/${fileName}`,
          `${MY_REPO}/${fileName}`,
          `${BACKUP_REPO}/icons/${fileName}`
        ]
      : [
          `${MY_REPO}/BANNERS/${fileName}`,
          `${MY_REPO}/banners/${fileName}`,
          `${MY_REPO}/Banner/${fileName}`,
          `${MY_REPO}/${fileName}`,
          `${BACKUP_REPO}/BANNERS/${fileName}`
        ];

  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const buffer = Buffer.from(await response.arrayBuffer());
        res.setHeader("Content-Type", "image/png");
        res.setHeader("Cache-Control", "public, max-age=3600");
        return res.status(200).send(buffer);
      }
    } catch (err) {
      continue;
    }
  }

  return res.status(404).json({ error: "Image not found", searched: fileName, folder: type });
};
