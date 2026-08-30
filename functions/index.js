const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { GoogleGenerativeAI } = require("@google/generative-ai");

admin.initializeApp();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "DEMO_KEY");

/**
 * Cloud Function HTTPS callable endpoint to process medicine scan OCR serverless
 */
exports.analyzeMedicineScan = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated to invoke Cloud Functions."
    );
  }

  const { ocrText, language } = data;
  if (!ocrText) {
    throw new functions.https.HttpsError("invalid-argument", "ocrText parameter is required.");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Analyze this medicine text and return JSON explanation in simple plain language: ${ocrText}`;
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return { success: true, explanation: JSON.parse(responseText) };
  } catch (error) {
    functions.logger.error("Cloud function Gemini execution error:", error);
    throw new functions.https.HttpsError("internal", error.message);
  }
});
