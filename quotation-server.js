const express = require("express");
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files (if needed)
app.use(express.static("public"));

// Example route to render quotation
app.get("/quotation", (req, res) => {
  res.render("quotation", {
    quotation: {
      number: "RR1940",
      createdDate: "17/09/2025",
      expiryDate: "17/10/2025",
    },
    customer: {
      name: "Vijaya Omkar",
      company: "dcfd",
      email: "vijayomkar.bolisetti+4@gmail.com",
      phone: "01234567890",
    },
    products: [
      {
        title: "Toxicity Study",
        details: [
          "Sample Description: rtt",
          "Product Type: Pharmaceuticals",
          "Sample Form: Suspensions",
          "Sample Solvent: Ethanol",
          "Application: Inhalation",
        ],
        guidelines: [
          { name: "OECD 423", qty: 1, unitPrice: 60000 },
        ],
      },
      {
        title: "Microbiology & Virology Study",
        details: [
          "Sample Description: rt",
          "Product Type: Nutraceuticals",
          "Sample Form: Gel",
          "Sample Solvent: Alcohol",
          "Type of Micro-organism: Bacteria",
          "Micro-organism: Staphylococcus aureus, Escherichia coli, Pseudomonas aeruginosa, Cutibacterium acnes",
        ],
        guidelines: [
          { name: "OECD 408", qty: 1, unitPrice: 1350000 },
          { name: "EN 1500", qty: 8, unitPrice: 7500 },
        ],
      },
    ],
    terms: [
      "This quotation is valid for 30 days from the date of issue unless otherwise stated.",
      "Prices are subject to change if the quotation has expired or if project scope is revised.",
    ],
    summary: {
      subTotal: 1470000,
      gstPercent: 18,
      gstAmount: 264600,
      grandTotal: 1734600,
    },
  });
});

// API endpoint to generate quotation with dynamic data
app.post("/api/generate-quotation", (req, res) => {
  // This would typically receive data from your frontend
  const quotationData = {
    quotation: {
      number: req.body.quotationNumber || "RR1940",
      createdDate: req.body.createdDate || new Date().toLocaleDateString('en-GB'),
      expiryDate: req.body.expiryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
    },
    customer: {
      name: req.body.customerName || "Customer Name",
      company: req.body.customerCompany || "Company Name",
      email: req.body.customerEmail || "customer@email.com",
      phone: req.body.customerPhone || "0000000000",
    },
    products: req.body.products || [],
    terms: req.body.terms || [
      "This quotation is valid for 30 days from the date of issue unless otherwise stated.",
      "Prices are subject to change if the quotation has expired or if project scope is revised.",
    ],
    summary: req.body.summary || {
      subTotal: 0,
      gstPercent: 18,
      gstAmount: 0,
      grandTotal: 0,
    },
  };

  res.render("quotation", quotationData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Quotation preview: http://localhost:${PORT}/quotation`);
});
