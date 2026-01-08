import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/consultar", async (req, res) => {
  const termos = req.query.q?.split(",") || [];
  const resultados = [];

  for (const termo of termos) {
    const url =
      "https://api.mercadolibre.com/sites/MLB/search?q=" +
      encodeURIComponent(termo.trim()) +
      "&limit=5";

    const r = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "application/json"
      }
    });

    const text = await r.text();

    resultados.push({
      referencia: termo,
      status: r.status,
      raw: text.substring(0, 500) // primeiros 500 chars
    });
  }

  res.json(resultados);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API rodando"));
