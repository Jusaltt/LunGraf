const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle form submissions
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail", // you can use Outlook, Yahoo, etc.
      auth: {
        user: "yourEmail@gmail.com",   // replace with your email
        pass: "yourAppPassword"        // use an App Password, not raw Gmail password
      }
    });

    await transporter.sendMail({
      from: email,
      to: "yourEmail@gmail.com", // your inbox
      subject: `New Contact Form Message from ${name}`,
      text: message,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`
    });

    res.json({ success: true, message: "Message sent!" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
