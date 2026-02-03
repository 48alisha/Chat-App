export const welcomeEmailTemplate = (fullName, openMessageUrl) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome Email</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#4f46e5; padding:25px; text-align:center; color:#ffffff;">
              <h1 style="margin:0; font-size:26px;">Welcome 🎉</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:30px; color:#333333;">
              <h2 style="margin-top:0;">Hi ${fullName},</h2>

              <p style="font-size:16px; line-height:1.6;">
                We’re excited to have you on board! 👋  
                You’ve received a new message specially for you.
              </p>

              <p style="font-size:16px; line-height:1.6;">
                Click the button below to open your message and continue your journey with us.
              </p>

              <!-- Button -->
              <div style="text-align:center; margin:35px 0;">
                <a href="${openMessageUrl}"
                   style="
                     background:#4f46e5;
                     color:#ffffff;
                     text-decoration:none;
                     padding:14px 28px;
                     border-radius:6px;
                     font-size:16px;
                     font-weight:bold;
                     display:inline-block;
                   ">
                  Open Message
                </a>
              </div>

              <p style="font-size:14px; color:#666;">
                If you didn’t expect this email, you can safely ignore it.
              </p>

              <p style="font-size:14px; margin-top:30px;">
                Cheers,<br/>
                <strong>Your Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f1f3f6; padding:15px; text-align:center; font-size:12px; color:#777;">
              © 2026 Your Company. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
};
