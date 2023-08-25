import axios from "axios";

const API_URL = "http://localhost:8080/v1";
const API_KEY = process.env.API_KEY;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const config = { headers: { Authorization: `Bearer ${API_KEY}` } };

const createWebhook = async () => {
  const webhooks = (await axios.get(`${API_URL}/webhook`, config))?.data?.data
    ?.webhooks;
  const existingWebhook = webhooks.find(
    (webhook: any) => webhook.name == "basic-consume-all-events",
  );
  if (existingWebhook) {
    await axios.delete(`${API_URL}/webhook/${existingWebhook.id}`, config);
  }
  return (
    await axios.post(
      `${API_URL}/webhook`,
      {
        name: "basic-consume-all-events",
        url: WEBHOOK_URL,
        events: [ "*"],
      },
      config,
    )
  )?.data?.data?.webhook;
};

(async () => {
  const webhook = await createWebhook();
  console.log(webhook);
})();
