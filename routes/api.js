module.exports = (app) => {
  app.get("/api/pets/:id/", (req, res) => {
    return res.json({ pets: pets });
  });

  app.post("/api/pets/", (req, res) => {
    return res.json({ pets: pets });
  });

  app.put("/api/pets/:id/", (req, res) => {
    return res.json({ pets: pets });
  });

  app.delete("/api/pets/:id/", (req, res) => {
    return res.json({ pets: pets });
  });
};
