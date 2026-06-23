import axios from "axios";
import FormData from "form-data";
import fs from "fs";

/**
 * 🌿 IDENTIFICATION PL@NTNET
 */
export const identifyPlant = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imagePath = req.file.path;

    const form = new FormData();
    form.append("images", fs.createReadStream(imagePath));
    form.append("organs", "leaf");

    const response = await axios.post(
      `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.PLANTNET_API_KEY}`,
      form,
      { headers: form.getHeaders() }
    );

    const results = response.data.results.map((r) => ({
      species: r.species.scientificNameWithoutAuthor,
      confidence: r.score,
      image: r.images?.[0]?.url?.m || null
    }));

    res.json({
      success: true,
      results: results.slice(0, 5)
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "PlantNet error",
      details: error.message
    });
  }
};
