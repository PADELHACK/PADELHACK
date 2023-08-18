const nodemailer = require('nodemailer');

const email = process.env.EMAIL_ACCOUNT;
const password = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: email,
    pass: password,
  },
});

module.exports.sendValidationEmail = (user) => {
  console.log(user)
  console.log('user ID is: ' + user._id)
  transporter
    .sendMail({
  
      from: `"PadelHack" <${email}>`, // sender address
      to: user.email, // list of receivers
      subject: 'Welcome to PadelHack', // Subject line
      html: `
                <h1>Welcome to PadelHack</h1>

                <p>Activate your account</p>

                <a href="${process.env.APP_HOST}/users/${user._id}/activate">Click here</a>
              `,
    })
    .then(() => {
      console.log(`email sent to ${user._id}`);
    })
    .catch((err) => {
      console.error('error sending mail', err);
    });
};
