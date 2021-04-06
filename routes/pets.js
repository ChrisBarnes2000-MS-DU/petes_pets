// MODELS
const Pet = require("../models/pet");

const purchaser = require("../utils/purchaser");

// PET ROUTES
module.exports = (app) => {
  // INDEX PET => index.js

  // SEARCH PET
  app.get("/search", (req, res) => {
    const term = new RegExp(req.query.term, "i");

    const page = req.query.page || 1;
    Pet.paginate(
      {
        $or: [{ name: term }, { species: term }],
      },
      { page: page }
    ).then((results) => {
      res.render("pets-index", {
        pets: results.docs,
        pagesCount: results.pages,
        currentPage: page,
        term: req.query.term,
      });
    });
  });

  // NEW PET
  app.get("/pets/new", (req, res) => {
    res.render("pets-new");
  });

  // CREATE PET
  app.post("/pets", (req, res) => {
    var pet = new Pet(req.body);

    pet
      .save()
      .then((pet) => {
        res.send({ pet: pet });
      })
      .catch((err) => {
        // STATUS OF 400 FOR VALIDATIONS
        res.status(400).send(err.errors);
      });
  });

  // SHOW PET
  app.get("/pets/:id", (req, res) => {
    Pet.findById(req.params.id).exec((err, pet) => {
      res.render("pets-show", { pet: pet });
    });
  });

  // EDIT PET
  app.get("/pets/:id/edit", (req, res) => {
    Pet.findById(req.params.id).exec((err, pet) => {
      res.render("pets-edit", { pet: pet });
    });
  });

  // UPDATE PET
  app.put("/pets/:id", (req, res) => {
    Pet.findByIdAndUpdate(req.params.id, req.body)
      .then((pet) => {
        res.redirect(`/pets/${pet._id}`);
      })
      .catch((err) => {
        // Handle Errors
        console.log("Error: " + err);
      });
  });

  // DELETE PET
  app.delete("/pets/:id", (req, res) => {
    Pet.findByIdAndRemove(req.params.id).exec((err, pet) => {
      if (err) {
        console.log("Error: " + err);
      }
      const context = {
        user: {
          name: "Chris Barnes",
          email: "Chris.Barnes.2000@me.com",
        },
        pet: pet,
      };

      // Call our mail handler to manage sending emails
      mailer.sendDelete_Pet_Mail(context, res);
    });
  });

  // PURCHASE PET
  app.put("/pets/:id/purchase", (req, res) => {
    console.log(req.body);
    // req.body.petId can become null through seeding,
    // this way we'll insure we use a non-null value
    let petId = req.body.petId || req.params.id;

    Pet.findById(petId).exec((err, pet) => {
      if (err) {
        console.log("Error Finding Pet For Purchase: " + err);
        res.redirect(`/`);
      } else {
        purchaser.purchasePet(pet, req, res);
      }
    });
  });
};
