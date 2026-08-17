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

    const { name, phone, email, address, service, details } = req.body || {};

    if (!name || !phone || !email || !service) {
        return res.status(400).json({
            error: "Missing required fields."
        });
    }

    try {

        const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`
            },
            body: JSON.stringify({
                from: "onboarding@resend.dev",
                to: "infonachofence@gmail.com",
                subject: `New Quote Request from ${name}`,
                html: `
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Address:</strong> ${address || "Not provided"}</p>
                    <p><strong>Service:</strong> ${service}</p>
                    <p><strong>Details:</strong> ${details || "None"}</p>
                `
            })
        });

        if (!resendResponse.ok) {
            const errorText = await resendResponse.text();
            console.error("Resend error:", errorText);
            return res.status(502).json({
                error: "Failed to send email."
            });
        }

        return res.status(200).json({ success: true });

    } catch (error) {

        console.error("Quote function error:", error);

        return res.status(500).json({
            error: "Something went wrong."
        });

    }
};