/**
 * @fileoverview Email service for sending emails using Zoho SMTP
 */

import nodemailer from "nodemailer";

// Email configuration - you'll need to set these environment variables
const EMAIL_CONFIG = {
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: "info@radiantresearch.in", // Replace with your GoDaddy email
    pass: "info@radiant1231", // Replace with your GoDaddy password
  },
};

// Create transporter
const transporter = nodemailer.createTransport(EMAIL_CONFIG);

// Email templates with Radiant Research theme
export const getContactEmailTemplate = (data: {
  fullName: string;
  email: string;
  companyName: string;
  phone: string;
  service: string;
  message: string;
}) => {
  const userTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting Radiant Research</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
          min-height: 100vh;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
          padding: 30px;
          text-align: center;
          color: white;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .tagline {
          font-size: 14px;
          opacity: 0.9;
          margin: 0;
        }
        .content {
          padding: 40px 30px;
          line-height: 1.6;
          color: #333;
        }
        .greeting {
          font-size: 18px;
          font-weight: 600;
          color: #1976d2;
          margin-bottom: 20px;
        }
        .message-box {
          background: rgba(25, 118, 210, 0.05);
          border-left: 4px solid #1976d2;
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }
        .details-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .details-table td {
          padding: 12px;
          border-bottom: 1px solid #eee;
        }
        .details-table .label {
          font-weight: 600;
          color: #1976d2;
          width: 140px;
        }
        .footer {
          background: #f8f9fa;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #eee;
        }
        .contact-info {
          color: #666;
          font-size: 14px;
          margin: 10px 0;
        }
        .social-links {
          margin-top: 20px;
        }
        .btn {
          display: inline-block;
          padding: 12px 24px;
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          font-weight: 600;
          margin: 15px 0;
          box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Radiant Research Services</div>
          <p class="tagline">Excellence in Research & Innovation</p>
        </div>
        
        <div class="content">
          <div class="greeting">Dear ${data.fullName},</div>
          
          <p>Thank you for reaching out to Radiant Research! We have successfully received your inquiry and our team will review your message promptly.</p>
          
          <div class="message-box">
            <h3 style="color: #1976d2; margin-top: 0;">Your Message Summary:</h3>
            <table class="details-table">
              <tr>
                <td class="label">Service Interest:</td>
                <td>${data.service}</td>
              </tr>
              <tr>
                <td class="label">Company:</td>
                <td>${data.companyName}</td>
              </tr>
              <tr>
                <td class="label">Phone:</td>
                <td>${data.phone}</td>
              </tr>
            </table>
            <p><strong>Your Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 5px; margin: 10px 0;">${data.message}</p>
          </div>
          
          <p>We typically respond to all inquiries within 24-48 hours during business days. Our team will contact you soon to discuss how we can assist with your research needs.</p>
          
          <div style="text-align: center;">
            <a href="#" class="btn" style="color: #fff;">Visit Our Website</a>
          </div>
        </div>
        
        <div class="footer">
          <div class="contact-info">
            <strong>Radiant Research</strong><br>
            Email: info@radiantresearch.in<br>
            Website: www.radiantresearch.in
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            This is an automated confirmation email. Please do not reply directly to this message.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const adminTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission - Radiant Research</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Arial', sans-serif;
          background: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
          padding: 20px;
          text-align: center;
          color: white;
        }
        .content {
          padding: 30px;
        }
        .alert {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          color: #856404;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .details-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .details-table th,
        .details-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        .details-table th {
          background: #f8f9fa;
          font-weight: 600;
          color: #1976d2;
        }
        .message-content {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          border-left: 4px solid #1976d2;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">New Contact Form Submission</h2>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Radiant Research Website</p>
        </div>
        
        <div class="content">
          <div class="alert">
            <strong>New Contact!</strong> You have received a new contact form submission from your website.
          </div>
          
          <h3 style="color: #1976d2;">Contact Details:</h3>
          <table class="details-table">
            <tr>
              <th>Field</th>
              <th>Information</th>
            </tr>
            <tr>
              <td>Full Name</td>
              <td>${data.fullName}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td>Company</td>
              <td>${data.companyName}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td><a href="tel:${data.phone}">${data.phone}</a></td>
            </tr>
            <tr>
              <td>Service Interest</td>
              <td>${data.service}</td>
            </tr>
            <tr>
              <td>Submission Time</td>
              <td>${new Date().toLocaleString()}</td>
            </tr>
          </table>
          
          <h3 style="color: #1976d2;">Message:</h3>
          <div class="message-content">
            ${data.message}
          </div>
          
          <p style="margin-top: 30px; color: #666; font-size: 14px;">
            Please respond to this inquiry promptly to maintain our excellent customer service standards.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return { userTemplate, adminTemplate };
};

export const getCareersEmailTemplate = (data: {
  fullName: string;
  email: string;
  fileName?: string;
  fileAttachment?: {
    filename: string;
    content: Buffer;
    contentType: string;
  };
}) => {
  const userTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Received - Radiant Research Careers</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
          min-height: 100vh;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
          padding: 30px;
          text-align: center;
          color: white;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .content {
          padding: 40px 30px;
          line-height: 1.6;
          color: #333;
        }
        .greeting {
          font-size: 18px;
          font-weight: 600;
          color: #1976d2;
          margin-bottom: 20px;
        }
        .highlight-box {
          background: rgba(25, 118, 210, 0.05);
          border-left: 4px solid #1976d2;
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }
        .next-steps {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .footer {
          background: #f8f9fa;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #eee;
        }
        .btn {
          display: inline-block;
          padding: 12px 24px;
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          font-weight: 600;
          margin: 15px 0;
          box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Radiant Research</div>
          <p style="margin: 0; opacity: 0.9;">Careers & Opportunities</p>
        </div>
        
        <div class="content">
          <div class="greeting">Dear ${data.fullName},</div>
          
          <p>Thank you for your interest in joining the Radiant Research team! We have successfully received your application and are excited to review your qualifications.</p>
          
          <div class="highlight-box">
            <h3 style="color: #1976d2; margin-top: 0;">Application Summary:</h3>
            <p><strong>Contact Email:</strong> ${data.email}</p>
            ${data.fileName ? `<p><strong>Resume:</strong> ${data.fileName}</p>` : ""}
          </div>
          
          <div class="next-steps">
            <h3 style="color: #1976d2; margin-top: 0;">What's Next?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Our HR team will review your application within 5-7 business days</li>
              <li>If your qualifications match our requirements, we'll contact you for an initial interview</li>
              <li>We'll keep your application on file for future opportunities</li>
            </ul>
          </div>
          
          <p>At Radiant Research, we're always looking for passionate individuals who share our commitment to excellence in research and innovation. We appreciate your interest in being part of our growing team.</p>
          
          <div style="text-align: center;">
            <a href="#" class="btn" style="color: white;">Learn More About Our Culture</a>
          </div>
        </div>
        
        <div class="footer">
          <div style="color: #666; font-size: 14px;">
            <strong>Radiant Research HR Department</strong><br>
            Email: info@radiantresearch.in<br>
            Website: www.radiantresearch.in/careers
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            This is an automated confirmation email. Please do not reply directly to this message.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const adminTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Job Application - Radiant Research</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Arial', sans-serif;
          background: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
          padding: 20px;
          text-align: center;
          color: white;
        }
        .content {
          padding: 30px;
        }
        .alert {
          background: #d4edda;
          border: 1px solid #c3e6cb;
          color: #155724;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .details-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .details-table th,
        .details-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        .details-table th {
          background: #f8f9fa;
          font-weight: 600;
          color: #1976d2;
        }
        .cover-letter {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          border-left: 4px solid #1976d2;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">New Job Application</h2>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Radiant Research Careers</p>
        </div>
        
        <div class="content">
          <div class="alert">
            <strong>New Application!</strong> You have received a new job application through your careers page.
          </div>
          
          <h3 style="color: #1976d2;">Applicant Details:</h3>
          <table class="details-table">
            <tr>
              <th>Field</th>
              <th>Information</th>
            </tr>
            <tr>
              <td>Full Name</td>
              <td>${data.fullName}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <td>Resume File</td>
              <td>${data.fileName || "Not provided"}</td>
            </tr>
            <tr>
              <td>Application Time</td>
              <td>${new Date().toLocaleString()}</td>
            </tr>
          </table>
          
          <p style="margin-top: 30px; color: #666; font-size: 14px;">
            Please review this application and follow up within 5-7 business days as per our hiring process guidelines.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return { userTemplate, adminTemplate };
};

// Send contact form email
export const sendContactEmail = async (data: {
  fullName: string;
  email: string;
  companyName: string;
  phone: string;
  service: string;
  message: string;
}) => {
  try {
    const { userTemplate, adminTemplate } = getContactEmailTemplate(data);

    // Send confirmation email to user
    const userMailOptions = {
      from: `"Radiant Research" <${EMAIL_CONFIG.auth.user}>`,
      to: data.email,
      subject: "Thank you for contacting Radiant Research",
      html: userTemplate,
    };

    // Send notification email to admin
    const adminMailOptions = {
      from: `"Radiant Research Website" <${EMAIL_CONFIG.auth.user}>`,
      to: "info@radiantresearch.in",
      subject: `New Contact Form Submission from ${data.fullName}`,
      html: adminTemplate,
    };

    // Send both emails
    const [userResult, adminResult] = await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    return {
      success: true,
      userMessageId: userResult.messageId,
      adminMessageId: adminResult.messageId,
    };
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw new Error("Failed to send email");
  }
};

// Send careers application email
export const sendCareersEmail = async (data: {
  fullName: string;
  email: string;
  fileName?: string;
  fileAttachment?: {
    filename: string;
    content: Buffer;
    contentType: string;
  };
}) => {
  try {
    const { userTemplate, adminTemplate } = getCareersEmailTemplate(data);

    // Send confirmation email to applicant
    const userMailOptions = {
      from: `"Radiant Research Careers" <${EMAIL_CONFIG.auth.user}>`,
      to: data.email,
      subject: "Application Received - Radiant Research Careers",
      html: userTemplate,
    };

    // Send notification email to admin with CV attachment
    const adminMailOptions: any = {
      from: `"Radiant Research Careers" <${EMAIL_CONFIG.auth.user}>`,
      to: "info@radiantresearch.in",
      subject: `New Job Application from ${data.fullName}`,
      html: adminTemplate,
    };

    // Add CV attachment to admin email if provided
    if (data.fileAttachment) {
      adminMailOptions.attachments = [
        {
          filename: data.fileAttachment.filename,
          content: data.fileAttachment.content,
          contentType: data.fileAttachment.contentType,
        },
      ];
    }

    // Send both emails
    const [userResult, adminResult] = await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);

    return {
      success: true,
      userMessageId: userResult.messageId,
      adminMessageId: adminResult.messageId,
    };
  } catch (error) {
    console.error("Error sending careers email:", error);
    throw new Error("Failed to send email");
  }
};

// Quotation Email Template
export const getQuotationEmailTemplate = (data: {
  quotationNumber: string;
  customerName: string;
  customerEmail: string;
  quotationData: any;
}) => {
  const userTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for your quotation request - Radiant Research</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
          min-height: 100vh;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
          padding: 30px;
          text-align: center;
          color: white;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .tagline {
          font-size: 14px;
          opacity: 0.9;
          margin: 0;
        }
        .content {
          padding: 40px 30px;
          line-height: 1.6;
          color: #333;
        }
        .greeting {
          font-size: 18px;
          font-weight: 600;
          color: #1976d2;
          margin-bottom: 20px;
        }
        .thank-you-box {
          background: rgba(25, 118, 210, 0.05);
          border-left: 4px solid #1976d2;
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
          text-align: center;
        }
        .quotation-number {
          font-size: 20px;
          font-weight: bold;
          color: #1976d2;
          margin: 10px 0;
        }
        .btn {
          display: inline-block;
          padding: 12px 24px;
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          font-weight: 600;
          margin: 15px 0;
          box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);
        }
        .footer {
          background: #f8f9fa;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #eee;
        }
        .contact-info {
          color: #666;
          font-size: 14px;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Radiant Research Services</div>
          <p class="tagline">Excellence in Research & Innovation</p>
        </div>
        
        <div class="content">
          <div class="greeting">Dear ${data.customerName},</div>
          
          <p>Thank you for generating a quotation with Radiant Research Services! We appreciate your interest in our comprehensive research services.</p>
          
          <div class="thank-you-box">
            <h3 style="color: #1976d2; margin-top: 0;">✓ Quotation Generated Successfully</h3>
            <div class="quotation-number">Quotation #${data.quotationNumber}</div>
            <p style="margin: 10px 0; color: #666;">Created on ${data.quotationData.quotation.createdDate}</p>
            <p style="margin: 0; font-size: 14px; color: #888;">Please find the complete quotation details in the attached PDF</p>
          </div>
          
          <p>We have attached your detailed quotation as a PDF document. Our team will get back to you soon to discuss your requirements and answer any questions you may have.</p>
          
          <p><strong>What's Next?</strong></p>
          <ul style="margin-left: 20px;">
            <li>Review the attached quotation PDF for complete details</li>
            <li>Our team will contact you within 24-48 hours</li>
            <li>Feel free to reach out if you have any immediate questions</li>
          </ul>
          
          <p>We look forward to partnering with you and delivering exceptional research services that meet your specific needs.</p>
          
          <div style="text-align: center;">
            <a href="mailto:info@radiantresearch.in?subject=Quotation ${data.quotationNumber} - Query" class="btn" style="color: white;">Contact Us</a>
          </div>
        </div>
        
        <div class="footer">
          <div class="contact-info">
            <strong>Radiant Research Services Pvt Ltd</strong><br>
            Plot No:99/A, 8th Main Road, IIIrd Phase,<br>
            Peenya Industrial Area, Bengaluru, Karnataka, India 560058<br>
            Email: info@radiantresearch.in | Phone: +91 80505 16699<br>
            Website: www.radiantresearch.in
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            This quotation is valid for 30 days from the date of issue. We look forward to working with you!
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return userTemplate;
};

// Send Quotation Email with PDF attachment
export const sendQuotationEmail = async (data: {
  quotationNumber: string;
  customerName: string;
  customerEmail: string;
  quotationData: any;
  pdfAttachment?: Buffer;
}) => {
  try {
    const template = getQuotationEmailTemplate(data);

    const mailOptions: any = {
      from: `"Radiant Research" <${EMAIL_CONFIG.auth.user}>`,
      to: data.customerEmail,
      subject: `Your Quotation ${data.quotationNumber} - Radiant Research Services`,
      html: template,
    };

    // Add PDF attachment if provided
    if (data.pdfAttachment) {
      mailOptions.attachments = [
        {
          filename: `Quotation-${data.quotationNumber}.pdf`,
          content: data.pdfAttachment,
          contentType: "application/pdf",
        },
      ];
    }

    const result = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error("Error sending quotation email:", error);
    throw new Error("Failed to send quotation email");
  }
};

// OTP Email Template
export const getOTPEmailTemplate = (data: {
  email: string;
  otpCode: string;
  customerName?: string;
}) => {
  const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification - Radiant Research Services</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
          min-height: 100vh;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
          padding: 30px;
          text-align: center;
          color: white;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .tagline {
          font-size: 14px;
          opacity: 0.9;
          margin: 0;
        }
        .content {
          padding: 40px 30px;
          line-height: 1.6;
          color: #333;
        }
        .greeting {
          font-size: 18px;
          font-weight: 600;
          color: #1976d2;
          margin-bottom: 20px;
        }
        .otp-box {
          background: rgba(25, 118, 210, 0.05);
          border: 2px solid #1976d2;
          border-radius: 12px;
          padding: 30px;
          margin: 30px 0;
          text-align: center;
        }
        .otp-code {
          font-size: 36px;
          font-weight: bold;
          color: #1976d2;
          letter-spacing: 8px;
          margin: 20px 0;
          font-family: 'Courier New', monospace;
        }
        .otp-label {
          font-size: 16px;
          color: #666;
          margin-bottom: 10px;
        }
        .instructions {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #1976d2;
        }
        .footer {
          background: #f8f9fa;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #eee;
        }
        .contact-info {
          color: #666;
          font-size: 14px;
          margin: 10px 0;
        }
        .warning {
          color: #d32f2f;
          font-size: 14px;
          margin-top: 20px;
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Radiant Research Services</div>
          <p class="tagline">Excellence in Research & Innovation</p>
        </div>
        
        <div class="content">
          <div class="greeting">Dear ${data.customerName || "Valued Customer"},</div>
          
          <p>Thank you for your interest in our services! To proceed  please verify your email address using the OTP code below.</p>
          
          <div class="otp-box">
            <div class="otp-label">Your OTP Verification Code:</div>
            <div class="otp-code">${data.otpCode}</div>
            <div style="font-size: 14px; color: #666;">This code will expire in 5 minutes</div>
          </div>
          
          <div class="instructions">
            <h3 style="color: #1976d2; margin-top: 0;">Instructions:</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Enter the 6-digit code above in the verification form</li>
              <li>This code is valid for 5 minutes only</li>
              <li>Do not share this code with anyone</li>
              <li>If you didn't request this code, please ignore this email</li>
            </ul>
          </div>
          

          
          <div class="warning">
            <strong>Security Notice:</strong> Radiant Research Services will never ask for your OTP code via phone or email. Only enter it in the official verification form.
          </div>
        </div>
        
        <div class="footer">
          <div class="contact-info">
            <strong>Radiant Research Services Pvt Ltd</strong><br>
            Email: info@radiantresearch.in<br>
            Website: www.radiantresearch.in
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            This is an automated verification email. Please do not reply directly to this message.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return template;
};

// Send OTP Email
export const sendOTPEmail = async (data: {
  email: string;
  otpCode: string;
  customerName?: string;
}) => {
  try {
    const template = getOTPEmailTemplate(data);

    const mailOptions = {
      from: `"Radiant Research" <${EMAIL_CONFIG.auth.user}>`,
      to: data.email,
      subject: "OTP Verification - Radiant Research Services",
      html: template,
    };

    const result = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

// Test email configuration
export const testEmailConnection = async () => {
  try {
    await transporter.verify();
    return { success: true, message: "Email configuration is valid" };
  } catch (error) {
    console.error("Email configuration error:", error);
    return { success: false, message: "Email configuration failed", error };
  }
};
