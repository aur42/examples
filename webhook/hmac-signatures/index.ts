import bodyParser from "body-parser";
import crypto from "crypto";
import express from "express";
const app = express();

const signingSecret: string = process.env.SPHERE_WEBHOOK_SIGNING_SECRET;

var jsonParser = bodyParser.json();

app.post("/", jsonParser, (req: express.Request, res: express.Response) => {
  const body = req.body;
  const headers = req.headers;

  const signature = crypto
    .createHmac("sha256", Buffer.from(signingSecret))
    .update(JSON.stringify(body), "utf-8")
    .digest("hex");

  if (headers["signature"] === signature) {
    console.log("Signature Verified. ", body);
    res.status(200).json({
      message: "Genuine Message Received",
    });
    return;
  }

  console.log(
    "Signature Verification Failed. The incoming payload is fraudulent.",
  );
  res.status(500).json({
    message: "Fraudulent Message Received",
  });
});

app.listen(8080, () => {
  console.log(`⚪ Sphere example webhook signing server :${8080}`);
});
