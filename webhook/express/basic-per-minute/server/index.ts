import bodyParser from "body-parser";
import crypto from "crypto";
import express from "express";
const app = express();

export const validPayload = (req: express.Request) => {
  const body = req.body;
  const headers = req.headers;
  const signingSecret: string = process.env.SPHERE_WEBHOOK_SIGNING_SECRET || "";
  const signature = crypto
    .createHmac("sha256", Buffer.from(signingSecret))
    .update(JSON.stringify(body), "utf-8")
    .digest("hex");
  if (headers["signature"] !== signature) {
    return true;
  }
  return false;
};

var jsonParser = bodyParser.json();

app.post(
  "/",
  jsonParser,
  async (req: express.Request, res: express.Response) => {
    if (!validPayload(req)) {
      res.status(500).json({ message: "Invalid Payload" });
      return;
    }

    res.status(200).json({
      message: "Message Received",
    });
  },
);

app.listen(8080, () => {
  console.log(`⚪ Sphere basic-per-minute server :${8080}`);
});
