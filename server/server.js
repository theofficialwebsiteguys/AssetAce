
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');


const app = express();

app.use(bodyParser.json());


app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
      user: 'theofficialwebsiteguys@gmail.com',
      pass: 'oice dnzw nptu ctwe'
    }
  });


app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;
    
    const mailOptions = {
      from: email,
      to: 'theofficialwebsiteguys@gmail.com',
      subject: `Contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send('Email sent: ' + info.response);
    });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
