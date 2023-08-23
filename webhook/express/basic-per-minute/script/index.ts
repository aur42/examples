import axios from "axios";

const API_URL = "https://api.staging.spherepay.coß/v1";
const API_KEY = process.env.API_KEY;
const config = { headers: { Authorization: `Bearer ${API_KEY}` } };

const createProduct = async () => {
  const response = await axios.post(
    `${API_URL}/product`,
    {
      name: "Per Minute Subscription",
    },
    config,
  );
  const product = response.data.data.product;
  return product;
};

const createPrice = async (productId: string) => {
  // Create a recurring price with a billingPeriod of 1 minute.
  const response = await axios.post(
    `${API_URL}/price`,
    {
      product: productId,
      type: "recurring",
      recurring: {
        type: "escrowed",
        interval: "min",
        intervalCount: 1,
        usageType: "licensed",
        defaultLength: 12,
      },
      currency: "bonk",
      billingScheme: "perUnit",
      unitAmountDecimal: 1,
    },
    config,
  );
  const price = response.data.data.price;
  return price;
};

const createPaymentLink = async (priceId: string) => {
  const response = await axios.post(
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
  );
  const paymentLink = response.data.data.paymentLink;
  return paymentLink;
};

(async () => {
  const code = "42";

  const product = await createProduct();
  const price = await createPrice(product.id);

  const paymentLink = await createPaymentLink(price.id);
  console.log("paymentLink", paymentLink.url);
})();
