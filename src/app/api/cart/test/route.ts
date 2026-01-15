import { NextRequest, NextResponse } from "next/server";
import { corsJsonResponse, handleOptions } from "../../../../utils/cors";
import { getPortalApiUrl, API_ENDPOINTS } from "../../../../utils/apiConfig";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET() {
  // Sample cart data based on your format
  const sampleCartData = [
    {
      id: "1759431579966-gk7gocki7",
      configNo: "RR1759431579966",
      studyType: "Invitro Study",
      category: "nutraceuticals",
      sampleForm: "Tablets",
      sampleSolvent: "Distilled Water",
      application: "Invitro Study",
      numSamples: 1,
      selectedGuidelines: [
        "Cytotoxicity assay by MTT",
        "Apoptisis assay",
        "DNA fragmentation",
      ],
      sampleFormGuidelines: [
        "Cytotoxicity assay by MTT",
        "Apoptisis assay",
        "DNA fragmentation",
      ],
      selectedTherapeuticAreas: ["Anti-Cancer"],
      sampleSolventGuidelines: [
        "Cytotoxicity assay by MTT",
        "Apoptisis assay",
        "DNA fragmentation",
      ],
      applicationGuidelines: [],
      price: 0,
      createdOn: "03/10/2025",
      validTill: "02/11/2025",
      description: "test sample",
    },
  ];

  return corsJsonResponse({
    success: true,
    message: "Sample cart data for testing",
    data: sampleCartData,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = "test-user-123" } = body;

    // Sample cart data
    const sampleCartData = [
      {
        id: `${Date.now()}-test-${Math.random().toString(36).substr(2, 9)}`,
        configNo: `RR${Date.now()}`,
        studyType: "Invitro Study",
        category: "nutraceuticals",
        sampleForm: "Tablets",
        sampleSolvent: "Distilled Water",
        application: "Invitro Study",
        numSamples: 1,
        selectedGuidelines: [
          "Cytotoxicity assay by MTT",
          "Apoptisis assay",
          "DNA fragmentation",
        ],
        sampleFormGuidelines: [
          "Cytotoxicity assay by MTT",
          "Apoptisis assay",
          "DNA fragmentation",
        ],
        selectedTherapeuticAreas: ["Anti-Cancer"],
        sampleSolventGuidelines: [
          "Cytotoxicity assay by MTT",
          "Apoptisis assay",
          "DNA fragmentation",
        ],
        applicationGuidelines: [],
        price: 0,
        createdOn: "03/10/2025",
        validTill: "02/11/2025",
        description: "test sample",
      },
    ];

    // Test the cart storage API using portal API
    const storeResponse = await fetch(
      getPortalApiUrl(API_ENDPOINTS.quotations.store),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: sampleCartData,
          userId: userId,
          sessionId: `test-session-${Date.now()}`,
        }),
      }
    );

    const storeResult = await storeResponse.json();

    return corsJsonResponse({
      success: true,
      message: "Cart storage test completed",
      testData: sampleCartData,
      storeResult: storeResult,
      storeStatus: storeResponse.status,
    });
  } catch (error: any) {
    console.error("Test error:", error);
    return corsJsonResponse(
      {
        error: "Test failed",
        details: error.message,
      },
      500
    );
  }
}
