import axios from "axios";

const API_URL = "https://api.spherepay.co/v1";
const API_KEY = process.env.API_KEY;
const config = { headers: { Authorization: `Bearer ${API_KEY}` } };

const retrieveSubscription = async (subscriptionId: string) => {
  const response = await axios.get(
    `${API_URL}/subscription/${subscriptionId}`,
    config,
  );
  const subscription = response.data.data.subscription;
  return subscription;
};

const updateSubscription = async (subscriptionId: string, status: string) => {
  const response = await axios.post(
    `${API_URL}/subscription/${subscriptionId}`,
    {
      status,
    },
    config,
  );
  const subscription = response.data.data.subscription;
  return subscription;
};

(async () => {
  const subscriptionId = process.env.SUBSCRIPTION_ID;

  const subscription = await retrieveSubscription(subscriptionId);
  const status = subscription.status

  if (status == "active") {
    console.log(
      "pausedSubscription",
      await updateSubscription(subscriptionId, "paused"),
    );

  } else if (status == "paused") {
    console.log(
      "activeSubscription",
      await updateSubscription(subscriptionId, "active"),
    );

  } else {
    console.log(
      `You cannot pause or active a subscription with status: ${status}`,
    );
  }
})();
