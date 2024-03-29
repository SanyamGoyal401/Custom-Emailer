const express = require("express");
const nodemailer = require("nodemailer");
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Email service is working" });
});

app.post("/mail", (req, res) => {
  const { to, subject, text, delay } = req.body;
  let mailOptions = {
    from: "course084@gmail.com",
    to: to,
    subject: subject,
    html: text,
  };

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try{

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    }, delay * 1000);
    
    res.status(200).json({ message: 'mail queued for delivery' });
  }
  catch(e){
    res.status(400).json({message: 'some error occured'});
  }

});



app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log('port is running at ', PORT);
  }
});
