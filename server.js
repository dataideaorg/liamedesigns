require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.post("/contact", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "datasideaofficial@gmail.com",
      pass: "ensqbpeydtwpitxd",
    },
  });

  const mailOptions = {
    to: "jumashafara0@gmail.com",
    subject: `New contact from ${req.body.name} via Liame Designs website`,
    text: `${req.body.text} \n Sender email: ${req.body.from}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(502).send("Action failed");
    } else {
      res.json({ status: 200, message: "ok" });
      console.log(mailOptions);
    }
  });
});

app.listen(port);
