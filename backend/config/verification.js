require('dotenv').config();
const nodemailer = require('nodemailer');

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendEmailCode = async (email, code, nom) => {
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    throw new Error(`Email invalide: "${email}"`);
  }
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('EMAIL_USER ou EMAIL_PASS manquant dans .env');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;">
      <div style="background:#1A1A2E;padding:32px;text-align:center;border-radius:12px 12px 0 0;">
        <h1 style="color:#fff;font-size:24px;margin:0;">Freelance<span style="color:#E85D04;">Hub</span></h1>
      </div>
      <div style="background:#FAF9F6;padding:32px;border-radius:0 0 12px 12px;border:1px solid #E8E8E4;">
        <p style="color:#1A1A2E;font-size:16px;">Bonjour <strong>${nom}</strong>,</p>
        <p style="color:#6B6B6B;">Voici votre code de vérification :</p>
        <div style="background:#fff;border:2px dashed #E85D04;border-radius:12px;padding:24px;text-align:center;margin:24px 0;">
          <span style="font-size:40px;font-weight:700;color:#E85D04;letter-spacing:12px;">${code}</span>
        </div>
        <p style="color:#6B6B6B;font-size:13px;">Ce code expire dans <strong>10 minutes</strong>.</p>
        <p style="color:#6B6B6B;font-size:13px;">Si vous n'avez pas créé de compte, ignorez cet email.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"FreelanceHub" <${process.env.EMAIL_USER}>`,
    to: email.trim(),
    subject: `${code} — Votre code de vérification FreelanceHub`,
    html,
  });

  console.log(`✅ Email envoyé à ${email}`);
};

const sendSmsCode = async (phone, code) => {
  if (!process.env.TWILIO_ACCOUNT_SID || process.env.TWILIO_ACCOUNT_SID.startsWith('ACx')) {
    throw new Error('Twilio non configuré.');
  }
  const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  await twilio.messages.create({
    body: `FreelanceHub - Code : ${code}. Valable 10 minutes.`,
    from: process.env.TWILIO_PHONE,
    to: phone,
  });
};

module.exports = { generateCode, sendEmailCode, sendSmsCode };
