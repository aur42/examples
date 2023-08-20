import axios from "axios";

const API_URL = "http://localhost:8080/v1";
const API_KEY = process.env.API_KEY;
const config = { headers: { Authorization: `Bearer ${API_KEY}` } };
console.log("API_KEY", config);

const resumeSubscription = async (subscriptionId: string) => {
  const response = await axios.post(
    `${API_URL}/subscription/${subscriptionId}`,
    {
      status: "paused",
    },
    config,
  );
  const subscription = response.data.data.subscription;
  return subscription;
};

const pauseSubscription = async (subscriptionId: string) => {
  const response = await axios.post(
    `${API_URL}/subscription/${subscriptionId}`,
    {
      status: "active",
    },
    config,
  );
  const subscription = response.data.data.subscription;
  return subscription;
};

(async () => {
  const subscriptionId = process.env.SUBSCRIPTION_ID;
  console.log("pausedSubscription", await pauseSubscription(subscriptionId));
  console.log("resumedSubscription", await resumeSubscription(subscriptionId));
})();
