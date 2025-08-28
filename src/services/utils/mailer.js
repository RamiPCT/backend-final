import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export const sendRecoveryEmail = async (to, token) => {
  const link = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  return transporter.sendMail({
    from: '"Ecommerce" <no-reply@ecommerce.com>',
    to,
    subject: "Password Recovery",
    html: `<p>Click the button below to reset your password. It will expire in 1 hour.</p>
           <a href="${link}" style="padding: 10px 20px; background-color: blue; color: white; text-decoration: none;">Reset Password</a>`
  });
};
