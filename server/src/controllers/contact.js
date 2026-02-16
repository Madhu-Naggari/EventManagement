const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.contact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "madhunaggari@gmail.com",
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Email failed" });
  }
};
