// lib/email-templates.ts
const getBaseUrl = () => {
  // If NEXT_PUBLIC_SITE_URL is defined, use it. Otherwise, fallback to the production domain.
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  // Fallback for deployed vercel environments without explicit URL configured
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Default fallback
  return 'https://eqpd-studio.vercel.app';
};

interface ContactConfirmationProps {
  name: string;
  service: string;
}

export function getContactConfirmationEmail({ name, service }: ContactConfirmationProps): string {
  const baseUrl = getBaseUrl();
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thanks for contacting EQPD Studio</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f4f4f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; background-color: #09090b; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header Banner -->
          <tr>
            <td>
              <img src="${baseUrl}/images/email-header.png" alt="EQPD Studio" width="600" style="width: 100%; max-width: 600px; height: auto; display: block;" />
            </td>
          </tr>
          
          <!-- Body Content -->
          <tr>
            <td style="padding: 40px; color: #e4e4e7; font-size: 16px; line-height: 1.6;">
              <h1 style="color: #ffffff; font-size: 24px; margin-top: 0; margin-bottom: 24px; font-weight: 600;">Thanks for contacting EQPD Studio</h1>
              <p style="margin-bottom: 24px;">Hi ${name},</p>
              <p style="margin-bottom: 24px;">Thanks for reaching out to EQPD Studio.<br>We received your project request and our team will review it shortly.</p>
              
              <div style="background-color: #18181b; padding: 20px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #27272a;">
                <p style="margin: 0; color: #a1a1aa; font-size: 14px;">Requested Service</p>
                <p style="margin: 4px 0 0 0; color: #ffffff; font-weight: 600;">${service}</p>
              </div>
              
              <p style="margin-bottom: 32px;">Our team will respond within 24 hours.</p>
              
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center">
                    <a href="https://eqpd-studio.vercel.app" style="display: inline-block; background-color: #7c3aed; color: #ffffff; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 8px;">Visit EQPD Studio &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Banner -->
          <tr>
            <td>
              <img src="${baseUrl}/images/email-footer.png" alt="" width="600" style="width: 100%; max-width: 600px; height: auto; display: block;" />
            </td>
          </tr>
          
          <!-- Footer Text -->
          <tr>
            <td style="padding: 24px 40px 40px 40px; text-align: center; color: #71717a; font-size: 14px; line-height: 1.5;">
              <p style="margin: 0;">&copy; 2026 EQPD Studio<br>Built to Equip Your Brand Online.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

interface AdminReplyProps {
  body: string;
}

export function getAdminReplyEmail({ body }: AdminReplyProps): string {
  const baseUrl = getBaseUrl();
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reply from EQPD Studio</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f4f4f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; background-color: #09090b; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- No Header Banner for Admin Replies -->
          
          <!-- Body Content -->
          <tr>
            <td style="padding: 40px; color: #e4e4e7; font-size: 16px; line-height: 1.7;">
              <div style="white-space: pre-wrap;">${body}</div>
            </td>
          </tr>

          <!-- Footer Banner -->
          <tr>
            <td>
              <img src="${baseUrl}/images/email-footer.png" alt="" width="600" style="width: 100%; max-width: 600px; height: auto; display: block;" />
            </td>
          </tr>
          
          <!-- Footer Text -->
          <tr>
            <td style="padding: 24px 40px 40px 40px; text-align: center; color: #71717a; font-size: 14px; line-height: 1.5;">
              <p style="margin: 0;">&copy; 2026 EQPD Studio<br>Built to Equip Your Brand Online.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
