import axios from "axios";

const API_URL = "http://localhost:8080/v1";
const API_KEY = process.env.API_KEY;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const config = { headers: { Authorization: `Bearer ${API_KEY}` } };

const pauseActiveSubscriptions = async () => {
  const subscriptions = (await axios.get(`${API_URL}/subscription`, config))
    ?.data?.data?.subscriptions;
  return Promise.all(
    subscriptions
      .filter((subscription: any) => subscription.status == "active")
      .map((subscription: any) =>
        axios.post(
          `${API_URL}/subscription/${subscription.id}`,
          {
            status: "paused",
          },
          config,
        ),
      ),
  );
};

const createProduct = async () =>
  (
    await axios.post(
      `${API_URL}/product`,
      {
        name: "Advanced Per Minute",
        description:
          "A per metered subscription that reacts to subscription billing events to update usage.",
      },
      config,
    )
  )?.data?.data?.product;

const createPrice = async (productId: string) =>
  (
    await axios.post(
      `${API_URL}/price`,
      {
        product: productId,
        unitAmountDecimal: 1,
        currency: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
        type: "recurring",
        recurring: {
          interval: "min",
          intervalCount: 1,
          usageType: "metered",
          aggregateUsage: "sum",
          defaultLength: 100,
        },
      },
      config,
    )
  )?.data?.data?.price;

const createPaymentLink = async (priceId: string) =>
  (
    await axios.post(
      `${API_URL}/paymentLink`,
      {
        lineItems: [
          {
            price: priceId,
            quantity: 1,
            quantityMutable: false,
          },
        ],
      },
      config,
    )
  )?.data?.data?.paymentLink;

const createWebhook = async () => {
  const webhooks = (await axios.get(`${API_URL}/webhook`, config))?.data?.data
    ?.webhooks;
  const existingWebhook = webhooks.find(
    (webhook: any) => webhook.name == "advanced-per-minute",
  );
  if (existingWebhook) {
    // Delete the webhook if it already exists
    await axios.delete(`${API_URL}/webhook/${existingWebhook.id}`, config);
  }
  return (
    await axios.post(
      `${API_URL}/webhook`,
      {
        name: "advanced-per-minute",
        url: WEBHOOK_URL,
        events: [
          "subscription.create",
          "subscription.approve",
          "subscription.bill",
          "subscription.pastDue",
        ],
      },
      config,
    )
  )?.data?.data?.webhook;
};

(async () => {
  await createWebhook();
  await pauseActiveSubscriptions();
  const product = await createProduct();
  const price = await createPrice(product.id);
  const paymentLink = await createPaymentLink(price.id);
  console.log(paymentLink.url);
})();
