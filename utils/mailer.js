// mailer.js

// require our mailgun dependencies
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

// auth with our mailgun API key and domain
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.EMAIL_DOMAIN,
  },
};

// create a mailer
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

// export our send mail function
module.exports.sendMail = (user, req, res) => {
  // send an email to the user's email with a provided template
  nodemailerMailgun
    .sendMail({
      from: "no-reply@example.com",
      to: user.email, // An array if you have multiple recipients.
      subject: "Hey you, awesome!",
      template: {
        name: "email.hbs",
        engine: "handlebars",
        context: user,
      },
    })
    // One mail is sent, redirect to the purchased pet's page
    .then((info) => {
      console.log("Response: " + info);
      res.redirect(`/pets/${req.params.id}`);
    })
    // Catch error and redirect to the pet's page
    .catch((err) => {
      console.log("Error: " + err);
      res.redirect(`/pets/${req.params.id}`);
    });
};

module.exports.sendDeleted_Pet_Mail = (context, res) => {
  // send an email to the user's email with a provided template
  nodemailerMailgun
    .sendMail({
      from: "no-reply@example.com",
      to: context.user.email, // An array if you have multiple recipients.
      subject: "[WARNING]!! Someone Deleted a Pet From the website!",
      template: {
        name: "deleted_pet_email.hbs",
        engine: "handlebars",
        context: context,
      },
    })
    // One mail is sent, redirect to the purchased pet's page
    .then((info) => {
      console.log("Response: " + info);
      res.redirect("/");
    })
    // Catch error and redirect to the pet's page
    .catch((err) => {
      console.log("Error: " + err);
      res.redirect("/");
    });
};
