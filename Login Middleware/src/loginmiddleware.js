// logMiddleware.js
import fetch from "node-fetch";

const accessToken = "PASTE_YOUR_ACCESS_TOKEN_HERE"; // 🔒 Replace this

export async function logToAfford(stack, level, pkg, message) {
  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      })
    });

    const data = await response.json();
    console.log("✅ Log sent:", data);
  } catch (error) {
    console.error("❌ Logging failed:", error.message);
  }
}
