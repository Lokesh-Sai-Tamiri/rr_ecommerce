/**
 * Test script for careers email functionality
 */
import { sendCareersEmail } from "./src/services/emailService.js";

const testData = {
  fullName: "John Doe",
  email: "sailokesh7875@gmail.com", // Test email
  phone: "+1234567890",
  position: "Software Developer",
  coverLetter:
    "I am very interested in this position and believe my skills in web development would be a great fit for your team. I have experience in React, Node.js, and TypeScript.",
  fileName: "john_doe_resume.pdf",
  fileAttachment: {
    filename: "test_resume.pdf",
    content: Buffer.from("This is a test PDF content"),
    contentType: "application/pdf",
  },
};

async function testCareersEmail() {
  try {
    console.log("Testing careers email...");
    const result = await sendCareersEmail(testData);
    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

testCareersEmail();
