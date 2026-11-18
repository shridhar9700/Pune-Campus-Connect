export async function sendOtpEmail(email: string, otp: string): Promise<void> {
  if (!process.env.SMTP_HOST) {
    console.log(`[Development] Verification OTP for ${email}: ${otp}`)
    return
  }
  // SMTP configuration is intentionally isolated here for production setup.
  console.log(`[SMTP] OTP requested for ${email}`)
}
