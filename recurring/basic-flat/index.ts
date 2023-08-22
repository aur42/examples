import axios from "axios";

const API_URL = "https://api.spherepay.co/v1";
const API_KEY = process.env.API_KEY;
const config = { headers: { Authorization: `Bearer ${API_KEY}` } };

const createProduct = async () => {
  const response = await axios.post(
    `${API_URL}/product`,
    {
      name: "Basic Flat Subscription Product",
    },
    config,
  );
  const product = response.data.data.product;
  return product;
};

const createPrice = async (productId: string) => {
  // A 29.99 USDC monthly subscription w/ token approvals for 1 year.
  const response = await axios.post(
    `${API_URL}/price`,
    {
      product: productId,
      type: "recurring",
      recurring: {
        type: "delegated",
        interval: "month",
        intervalCount: 1,
        usageAggregation: "sum",
        defaultLength: 12,
      },
      currency: "usdc",
      billingScheme: "perUnit",
      unitAmountDecimal: 29.99,
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
  const product = await createProduct();
  const price = await createPrice(product.id);
  const paymentLink = await createPaymentLink(price.id);
  console.log("paymentLink", paymentLink.url);
})();
