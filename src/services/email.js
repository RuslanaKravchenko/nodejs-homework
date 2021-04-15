const sgMail = require("@sendgrid/mail");
const Mailgen = require("mailgen");
require("dotenv").config();

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;
  #url = process.env.SERVER_URL || "https://localhost:3000";

  #createTemplate(verifyToken, name) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: "default",
      product: {
        name: "Phonebook",
        link: this.#url,
      },
    });

    const template = {
      body: {
        name,
        intro: "Welcome to Phonebook! We're very excited to have you on board.",
        action: {
          instructions: "To get started with Phonebook, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `${this.#url}/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    const emailBody = mailGenerator.generate(template);
    return emailBody;
  }

  async sendEmail(verifyToken, email, name) {
    const emailBody = this.#createTemplate(verifyToken, name);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: process.env.MAIL_SENDER,
      subject: "Email verification",
      html: emailBody,
    };

    await this.#sender.send(msg);
  }
}

module.exports = EmailService;
