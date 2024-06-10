import nodemailer from "nodemailer"

export async function sendEmail({ email, subject, userId }) {
  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOptions = {
      from: 'testing@mailinator.com', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    }

    const mailResponse = await transporter.sendMail(mailOptions)

    return mailResponse;
  } catch (error) {
    throw new Error(error.message)
  }
}