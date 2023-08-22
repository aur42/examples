import axios from "axios";

const API_URL = "https://api.spherepay.co/v1";
const API_KEY = process.env.API_KEY;
const config = { headers: { Authorization: `Bearer ${API_KEY}` } };

const updateSubscription = async (subscriptionId: string, status: string) => {
  // A paused subscription will not be billed. 
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

  // 1. Pausing a Subscription
  //     To pause a subscription, update it's status to "paused".
  //     A "paused" subscription will not be billed regardless of the subscription's "currentPeriodEnd". 
  //     Note that "paused" subscriptions can be "resumed" by the merchant at anytime. 

  console.log("pausedSubscription", await updateSubscription(subscriptionId, "paused"))

  // 2. Reactivating a Subscription
  //    To resume (or reactivate) a subscription, update it's status to "active". 
  //    An "active" subscription will be billed at the end of it's "currentPeriodEnd". 
  //    Note that "active" subscriptions can be "paused" by the merchant at anytime. 

  console.log("activeSubscription", await updateSubscription(subscriptionId, "active"))
})();
