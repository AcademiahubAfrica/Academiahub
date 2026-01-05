import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, code: string) {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
    to: email,
    subject: 'Verify your email - AcademiaHub',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 40px 0;">
                <table role="presentation" style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <tr>
                    <td style="padding: 40px 40px 20px;">
                      <h1 style="margin: 0 0 10px; font-size: 24px; font-weight: 600; color: #18181b; text-align: center;">
                        AcademiaHub
                      </h1>
                      <p style="margin: 0; font-size: 16px; color: #71717a; text-align: center;">
                        Verify your email address
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 40px;">
                      <p style="margin: 0 0 20px; font-size: 15px; color: #3f3f46; line-height: 1.6;">
                        Thank you for signing up! Please use the verification code below to complete your registration:
                      </p>
                      <div style="background-color: #f4f4f5; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                        <span style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #18181b;">
                          ${code}
                        </span>
                      </div>
                      <p style="margin: 20px 0 0; font-size: 14px; color: #71717a; line-height: 1.6;">
                        This code will expire in <strong>5 minutes</strong>.
                      </p>
                      <p style="margin: 10px 0 0; font-size: 14px; color: #71717a; line-height: 1.6;">
                        If you didn't create an account with AcademiaHub, you can safely ignore this email.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 40px 40px;">
                      <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 0 0 20px;">
                      <p style="margin: 0; font-size: 12px; color: #a1a1aa; text-align: center;">
                        This is an automated message from AcademiaHub. Please do not reply.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });

  if (error) {
    throw new Error(`Failed to send verification email: ${error.message}`);
  }

  return data;
}

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getCodeExpiry(): Date {
  return new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
}
