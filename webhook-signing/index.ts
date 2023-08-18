import bodyParser from "body-parser";
import crypto from "crypto";
import express from "express";
const app = express();

const signingSecret: string = process.env.SPHERE_WEBHOOK_SIGNING_SECRET;

var jsonParser = bodyParser.json();

app.post("/", jsonParser, (req: express.Request, res: express.Response) => {

  // The body of the request containing `Event` data
  const body = req.body;
  const headers = req.headers;

  // Compute signature from body and signing secret
  const signature = crypto
    .createHmac("sha256", Buffer.from(signingSecret))
    .update(JSON.stringify(body), "utf-8")
    .digest("hex");

  // Compare the signature with the one provided in the header of the request and response
  // with an 200 status message if the request is genuine. 
  if (headers["signature"] === signature) {
    console.log("Signature Verified. ", body);
    res.status(200).json({ 
      message: "Genuine Message Received" 
    });
    return;
  }

  // Response with a 500 status if the request if fraudulent.
  console.log("Signature Verification Failed. The incoming payload is fraudulent.");
  res.status(500).json({ 
    message: "Fraudulent Message Received" 
  });
});


// Start the server on port 8080
app.listen(8080, () => {
  console.log(`⚪ Sphere example webhook signing server :${8080}`);
});
