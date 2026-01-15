/**
 * @fileoverview Test script to verify Zoho SMTP configuration
 * Run this script to test your email setup before using the forms
 */

import { testEmailConnection } from "../src/services/emailService";

async function testEmailSetup() {
  console.log("🔧 Testing Zoho SMTP Configuration...\n");

  try {
    console.log("📧 Environment Variables:");
    console.log(`ZOHO_USER: ${process.env.ZOHO_USER || "Not set"}`);
    console.log(
      `ZOHO_PASSWORD: ${process.env.ZOHO_PASSWORD ? "***set***" : "Not set"}`
    );
    console.log(
      `ZOHO_SMTP_PORT: ${process.env.ZOHO_SMTP_PORT || "587 (default)"}\n`
    );

    console.log("⚡ Testing SMTP connection...");
    const result = await testEmailConnection();

    if (result.success) {
      console.log("✅ SUCCESS: Zoho SMTP configuration is working!");
      console.log("📨 You can now use the contact and careers forms.");
    } else {
      console.log("❌ FAILED: SMTP configuration error");
      console.log("Error:", result.message);
      console.log("\n🔍 Troubleshooting steps:");
      console.log("1. Check your ZOHO_USER and ZOHO_PASSWORD in .env.local");
      console.log("2. Ensure IMAP/SMTP is enabled in Zoho Mail settings");
      console.log("3. Try using an app password instead of regular password");
      console.log("4. Check if your firewall blocks port 587");
    }
  } catch (error) {
    console.log("❌ ERROR: Failed to test email configuration");
    console.error(error);
  }
}

// Run the test
testEmailSetup();
