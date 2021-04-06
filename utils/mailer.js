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

// SEND EMAIL
const user = {
  email: "chris.barnes.2000@me.com",
  name: "Chris Barnes",
  age: "20",
};

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
    // Catch error and redirect to the purchased pet's page
    .catch((err) => {
      console.log("Error: " + err);
      res.redirect(`/pets/${req.params.id}`);
    });
};


// const mailgun = require("mailgun-js");
// const DOMAIN = process.env.EMAIL_DOMAIN || "mg.chrisbarnes.work";
// const APIKEY = process.env.MAILGUN_API_KEY;
// const mg = mailgun({ apiKey: APIKEY, domain: DOMAIN });
// const data = {
//   from: "Petes Pets <postmaster@mg.chrisbarnes.work>",
//   to: "chris.barnes.2000@me.com",
//   subject: "Hello",
//   template: "test",
//   "h:X-Mailgun-Variables": { test: "test" },
//   //   template: {
//   //   name: "test_name",
//   //   age: "test_age",
//   //     name: "email.handlebars",
//   //     engine: "handlebars",
//   //     context: user,
//   //   },
// };
// mg.messages().send(data, function (error, body) {
//   if (error) {
//     console.error;
//   }
//   console.log(body);
// });
