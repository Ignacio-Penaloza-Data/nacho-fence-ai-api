const OpenAI = require("openai");

console.log(
    "OPENAI_API_KEY loaded:",
    Boolean(process.env.OPENAI_API_KEY)
);

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

module.exports = async function handler(req, res) {

    // Allow your website to call this API
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const { message } = req.body;

        if (!message || typeof message !== "string") {
            return res.status(400).json({
                error: "A message is required."
            });
        }

        const response = await client.responses.create({

            model: "gpt-5.6-luna",

            instructions: `
You are Nacho Fence AI, the customer assistant for Nacho Fence.

Nacho Fence provides:
- Fence installation
- Fence repair
- Wood fencing
- Vinyl fencing
- Aluminum fencing
- Chain-link fencing
- Privacy fencing
- Custom gates
- Fence staining
- Pool and safety fencing
- Residential fencing
- Commercial fencing

Your job is to answer customer questions about fences,
repairs, materials, maintenance, installation, gates,
staining, and related services.

Rules:
1. Be clear, helpful, and professional.
2. Keep most answers concise.
3. Explain likely causes when a fence problem could have multiple causes.
4. Never pretend you inspected the customer's property.
5. Never guarantee that a repair will solve a problem without an inspection.
6. Never invent Nacho Fence prices.
7. If someone asks for an exact project price, explain that pricing depends
   on the project and recommend requesting a free estimate.
8. When appropriate, recommend a professional inspection.
9. Stay focused on fencing and Nacho Fence services.
            `,

            input: message,

            max_output_tokens: 300
        });

        return res.status(200).json({
            reply: response.output_text
        });

    } catch (error) {

        console.error("OpenAI error:", error);

        return res.status(500).json({
            error: "The AI assistant is temporarily unavailable."
        });

    }
};