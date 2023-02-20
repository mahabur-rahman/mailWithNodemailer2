const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/email", async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.description,
    html: `
   <div style="padding:10px;border:1px solid red">
      <p>You have a new contact request.</p>
      <h3>Contact Details</h3>
      <ul>
         <li>Email: ${req.body.to}</li>
         <li>Subject: ${req.body.subject}</li>
         <li>Message: ${req.body.description}</li>
         </ul>
   </div>   

   `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.json({
        status: false,
        resMsg: "Something wrong, please try again",
      });
    } else {
      return res.json({
        status: true,
        resMsg: "Email sent successfully!",
      });
    }
  });
});

module.exports = router;
