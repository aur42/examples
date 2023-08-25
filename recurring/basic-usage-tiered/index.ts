import axios from "axios";

const API_URL = "http://localhost:8080/v1";
const API_KEY = process.env.API_KEY;
const config = { headers: { Authorization: `Bearer ${API_KEY}` } };

const createProduct = async (data: any) => {
  const response = await axios.post(`${API_URL}/product`, data, config);
  const product = response.data.data.product;
  return product;
};

const createPrice = async (data: any) => {
  const response = await axios.post(`${API_URL}/price`, data, config);
  const price = response.data.data.price;
  return price;
};

const createPaymentLink = async (data: any) => {
  const response = await axios.post(`${API_URL}/paymentLink`, data, config);
  const paymentLink = response.data.data.paymentLink;
  return paymentLink;
};

(async () => {
  const product = await createProduct({
    name: "Basic Usage-Based Licensed",
    description: "A basic subscription demonstrating usage based billing",
    images: ["https://spherepay.co/favicon.ico"]
  });

  const price = await createPrice({
    product: product.id,
    currency: "bonk",
    billingScheme: "tiered",
    tierType: "graduated",
    tiers: [
      {
        upTo: 1,
        flatAmountDecimal: 0,
        unitAmountDecimal: 10,
      },
      {
        upTo: 2,
        flatAmountDecimal: 0,
        unitAmountDecimal: 5,
      },
      {
        upTo: 3,
        flatAmountDecimal: 0,
        unitAmountDecimal: 2.5,
      },
      {
        upTo: "inf",
        flatAmountDecimal: 0,
        unitAmountDecimal: 1,
      }
    ],
    type: "recurring",
    recurring: {
      usageType: "licensed",
      type: "escrowed",
      interval: "min",
      intervalCount: 1,
      defaultLength: 120,
    },
  });

  const paymentLink = await createPaymentLink({
    lineItems: [
      {
        price: price.id,
        quantity: 1,
        quantityMutable: true,
      },
    ],
  });
  console.log("paymentLink", paymentLink.url);
})();
