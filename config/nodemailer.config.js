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
                <a href="${process.env.APP}/users/${user._id}/activate">Click here</a>
              `,
    })
    .then(() => {
      console.log(`email sent to ${user._id}`);
    })
    .catch((err) => {
      console.error('error sending mail', err);
    });
};
const parseProducts = (products) => {
  console.log(products);
  return products.map((product) => {
    return `
      <li>
        <h3>${product.product.name}</h3>
        <p>Precio: ${product.product.price} €</p>
        <p>Cantidad: ${product.quantity}</p>
      </li>
    `;
  });
};
module.exports.sendTicketEmail = (ticket) => {
  console.log(ticket)
  console.log('ticket ID is: ' + ticket._id)
  transporter
    .sendMail({
      from: `"PadelHack" <${email}>`, // sender address
      to: ticket.buyer.email, // list of receivers
      subject: 'Your purchase', // Subject line
      html: `
                <h1>Confirmación de Compra</h1>
                <h3>Gracias por confiar en Padelhack.</h3>
                <h3>Aquí tienes los detalles de tu pedido.</h3>
                <p>Productos: </p>
                ${parseProducts(ticket.products)}
                <p>Total: ${ticket.total}</p>
              `,
    })
    .then(() => {
      console.log(`email sent to ${ticket.buyer.email}`);
    })
    .catch((err) => {
      console.error('error sending mail', err);
    });
};