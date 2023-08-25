import axios from "axios";
import bodyParser from "body-parser";
import crypto from "crypto";
import express from "express";

const API_URL = "http://localhost:8080/v1";
const API_KEY = process.env.API_KEY;
const config = { headers: { Authorization: `Bearer ${API_KEY}` } };

const app = express();
app.use(bodyParser.json());

const randomInteger = () => Math.floor(Math.random() * 15);

class SphereApi {
  static createUsageRecord = async (
    subscriptionItemId: string,
    quantity: number,
  ) => {
    const usageRecord = (
      await axios.post(
        `${API_URL}/usageRecord`,
        {
          subscriptionItem: subscriptionItemId,
          quantity,
        },
        config,
      )
    )?.data?.data?.usageRecord;
    return usageRecord;
  };

  static createUsageRecordsForSubscription = async (subscription: any) => {
    const subscriptionItems = subscription?.subscriptionItems;
    if (subscriptionItems.length < 1)
      throw Error("No subscription items found.");
    return Promise.all(
      subscriptionItems.map((subscriptionItem: any) =>
        SphereApi.createUsageRecord(subscriptionItem.id, randomInteger()),
      ),
    );
  };
}

class Handler {
  static subscriptionCreate = async (body: any): Promise<any> => {
    const subscription = body?.data?.subscription;
    console.log(
      `A customer has created a ${subscription.id}. Waiting on the ${subscription.network} network for confirmation.`,
    );
    return [];
  };

  static subscriptionApprove = async (body: any) => {
    const subscription = body?.data?.subscription;
    console.log(
      `Approval for ${subscription.id} has been confirmed from the ${subscription.network} network.`,
    );
    return SphereApi.createUsageRecordsForSubscription(subscription);
  };

  static subscriptionBill = async (body: any) => {
    const subscription = body?.data?.subscription;
    console.log(`${subscription.id} has been billed!`);
    return SphereApi.createUsageRecordsForSubscription(subscription);
  };

  static subscriptionPastDue = async (body: any): Promise<any[]> => {
    const subscription = body?.data?.subscription;
    console.log(
      `Ugh oh, ${subscription.id} was unable to meet their payment this billing cycle. Putting them in pastDue.`,
    );
    return [];
  };
}

app.post("/", async (req: express.Request, res: express.Response) => {
  const { id: eventId, name: eventName } = req.body;
  console.log(`Handling ${eventId} with topic: ${eventName}`);

  let usageRecords = [];
  switch (eventName) {
    case "subscription.create":
      usageRecords = await Handler.subscriptionCreate(req.body);
      break;
    case "subscription.approve":
      usageRecords = await Handler.subscriptionApprove(req.body);
      break;
    case "subscription.bill":
      usageRecords = await Handler.subscriptionBill(req.body);
      break;
    case "subscription.pastDue":
      usageRecords = await Handler.subscriptionPastDue(req.body);
      break;
    default:
      throw Error(`Unhandled event: ${eventName}`);
  }
  console.log(
    `In response to ${eventId} usage records created: `,
    usageRecords,
  );

  res.status(200).json({
    message: "Message Received",
  });
});

app.listen(8081, () => {
  console.log(`⚪ Sphere advanced-per-minute server :${8080}`);
});
