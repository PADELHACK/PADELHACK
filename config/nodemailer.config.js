const nodemailer = require("nodemailer");
const email = process.env.EMAIL_ACCOUNT;
const password = process.env.EMAIL_PASSWORD;
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: email,
    pass: password,
  },
});

module.exports.sendValidationEmail = (user) => {
  console.log(user);
  console.log("user ID is: " + user._id);
  transporter
    .sendMail({
      from: `"PadelHack" <${email}>`,
      to: user.email,
      subject: "Welcome to PadelHack",
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
      console.error("error sending mail", err);
    });
};

module.exports.sendTicketEmail = (ticket) => {
  console.log(ticket);
  console.log("ticket ID is: " + ticket._id);

  const productsTable = parseProducts(ticket.products).join("");
  const totalSubtotal = ticket.products.reduce(
    (total, product) => total + product.subtotal,
    0
  );

  transporter
    .sendMail({
      from: `"PadelHack" <${email}>`,
      to: ticket.buyer.email,
      subject: "Confirmación de Compra",
      html: `
        <h2>Confirmación de Compra</h2>
        <p>Gracias por confiar en Padelhack.</p>
        <p>Aquí tienes los detalles de tu pedido.</p>
        <h3>Productos:</h3>
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th style="border: 1px solid black; padding: 8px; text-align: center;">Producto</th>
              <th style="border: 1px solid black; padding: 8px; text-align: center;">Imagen</th>
              <th style="border: 1px solid black; padding: 8px; text-align: center;">Precio</th>
              <th style="border: 1px solid black; padding: 8px; text-align: center;">Cantidad</th>
              <th style="border: 1px solid black; padding: 8px; text-align: center;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${productsTable}
            <tr>
              <td colspan="4" style="border: 1px solid black; padding: 8px; text-align: right;"><strong>Total:</strong></td>
              <td style="border: 1px solid black; padding: 8px; text-align: center;"><strong>${totalSubtotal} €</strong></td>
            </tr>
          </tbody>
        </table>
        <br />
        <h3 style="text-align: center;">El equipo de Padelhack</h3>
      `,
    })
    .then(() => {
      console.log(`email sent to ${ticket.buyer.email}`);
    })
    .catch((err) => {
      console.error("error sending mail", err);
    });
};

const parseProducts = (products) => {
  console.log(products);
  return products.map((product) => {
    const subtotal = product.product.price * product.quantity;
    product.subtotal = subtotal;
    return `
      <tr>
        <td style="border: 1px solid black; padding: 8px; text-align: center;">${product.product.name}</td>
        <td style="border: 1px solid black; padding: 8px; text-align: center;"><img src="${product.product.image}" alt="${product.product.name}" style="max-width: 100px;"></td>
        <td style="border: 1px solid black; padding: 8px; text-align: center;">${product.product.price} €</td>
        <td style="border: 1px solid black; padding: 8px; text-align: center;">${product.quantity}</td>
        <td style="border: 1px solid black; padding: 8px; text-align: center;">${subtotal} €</td>
      </tr>
    `;
  });
};
