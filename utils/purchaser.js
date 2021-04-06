// purchaser.js

// require our mailer and stripe dependancies
const mailer = require("../utils/mailer");
const stripe = require("stripe")(process.env.PRIVATE_STRIPE_TEST_API_KEY);
//   const stripe = require("stripe")(process.env.PRIVATE_STRIPE_API_KEY);

// export our send mail function
module.exports.purchasePet = (req, res) => {
  // Token is created using Checkout or Elements!
  // Get the payment token ID submitted by the form:
  const token = req.body.stripeToken; // Using Express

  // stripe.customers.create({
  //     email: "chris.barnes.2000@me.com",
  //   })
  //   .then((customer) => console.log(customer.id))
  //   .catch((error) => console.error(error));

  stripe.charges
    .create({
      amount: pet.price * 100,
      currency: "usd",
      description: `Purchased ${pet.name}, ${pet.species}`,
      source: token,
    })
    .then((chg) => {
      // Convert the amount back to dollars for ease in displaying in the template
      const user = {
        email: req.body.stripeEmail,
        amount: chg.amount / 100,
        petName: pet.name,
      };
      // Call our mail handler to manage sending emails
      mailer.sendMail(user, req, res);
      pet.purchasedAT = time.now();
      console.log("Created a New Purchase")
      
      res.redirect(`/pets/${req.params.id}`);
    })
    .catch((err) => {
      console.log("Error Creating a New Purchase: " + err);
    });
};
