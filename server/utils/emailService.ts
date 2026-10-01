import nodemailer from 'nodemailer';

interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendReplyEmail({ to, subject, text, html }: SendEmailParams): Promise<{ success: boolean; message: string; simulated?: boolean }> {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const from = process.env.SMTP_FROM || `"Marium Tabassum" <${user || 'mariumtabbasum@gmail.com'}>`;

  // If SMTP environment variables are not configured, simulate email sending gracefully
  if (!user || !pass) {
    console.log('\n=================== EMAIL SERVICE (SIMULATION MODE) ===================');
    console.log(`To: ${to}`);
    console.log(`From: ${from}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:\n${text}`);
    console.log('=======================================================================\n');
    
    return {
      success: true,
      simulated: true,
      message: 'Reply saved successfully! (Note: Live email transport is in simulation mode until SMTP_USER and SMTP_PASS are set in .env)'
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html: html || text.replace(/\n/g, '<br/>'),
    });

    console.log('Email sent successfully:', info.messageId);
    return {
      success: true,
      simulated: false,
      message: `Email reply successfully sent to ${to}`
    };
  } catch (err: any) {
    console.error('Nodemailer error:', err);
    return {
      success: false,
      message: `Failed to send email: ${err.message || 'Unknown SMTP error'}`
    };
  }
}
