import axios from "axios";

const API_URL = "https://api.spherepay.co/v1";
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
    name: "Metered Usage Recurring Product",
    description:
      "A simple example demonstrating a metered usage recurring product.",
    images: ["https://spherepay.co/favicon.ico"],
  });

  const price = await createPrice({
    product: product.id,
    billingScheme: "perUnit",
    currency: "usdc",
    unitAmountDecimal: 10,
    type: "recurring",
    recurring: {
      type: "delegated",
      interval: "min",
      intervalCount: 1,
      defaultLength: 120,
      usageType: "metered",
      usageAggregate: "sum",
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
  console.log("paymentLink", paymentLink);
})();
