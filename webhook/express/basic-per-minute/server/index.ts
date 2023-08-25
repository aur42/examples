import bodyParser from "body-parser";
import crypto from "crypto";
import express from "express";

const app = express();
app.use(bodyParser.json());

const isValidPayload = (req: express.Request) => {
  const signingSecret: string | undefined =
    process.env.SPHERE_WEBHOOK_SIGNING_SECRET;
  if (!signingSecret)
    throw new Error(
      "SPHERE_WEBHOOK_SIGNING_SECRET is not set. Please set it in your env.",
    );
  const body = req.body;
  const headers = req.headers;
  const signature = crypto
    .createHmac("sha256", Buffer.from(signingSecret))
    .update(JSON.stringify(body), "utf-8")
    .digest("hex");
  if (headers["signature"] !== signature) {
    return true;
  }
  return false;
};

const handleSubscriptionBilling = async (subscription: any) => {
  console.log(subscription);
};

app.route("/").post(async (req: express.Request, res: express.Response) => {
  if (!isValidPayload(req)) {
    res.status(500).json({ message: "Invalid Payload" });
    return;
  }

  const body = req.body;
  handleSubscriptionBilling(body);

  console.log(body);
  res.status(200).json({
    message: "Message Received",
  });
});

app.listen(8080, () => {
  console.log(`⚪ Sphere basic-per-minute server :${8080}`);
});
