import nodemailer from "nodemailer";
import Message from "../models/messageModel.js";

const sendMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    console.log(req.body);
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save message to database

    // Email transport config
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Email to receiver (you)
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    // Confirmation email to sender
    // await transporter.sendMail({
    //   from: `"Dhanush Portfolio" <${process.env.EMAIL_USER}>`,
    //   to: email,
    //   subject: "Thanks for contacting me!",
    //   html: `
    //     <p>Hi ${name},</p>
    //     <p>Thank you for reaching out! I’ve received your message and will get back to you shortly.</p>
    //     <br>
    //     <p>Best regards,<br><strong>Dhanush M</strong></p>
    //   `,
    // });

    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default sendMessage;