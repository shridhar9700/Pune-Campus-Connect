export async function sendOtpEmail(email: string, otp: string): Promise<void> {
  if (!process.env.SMTP_HOST) {
    console.log(`[Development] Verification OTP for ${email}: ${otp}`)
    return
  }

  // SMTP delivery is intentionally left as a placeholder until production mail credentials are configured.
  console.log(`[SMTP] Verification email requested for ${email}`)
}
