import axios from "axios";

const API_URL = "https://api.spherepay.co/v1";
const API_KEY = process.env.API_KEY;
const config = { headers: { Authorization: `Bearer ${API_KEY}` } };

// API Routes
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

// Basic Product
const createBasicProduct = async () => {
  const product = await createProduct({ name: "Basic" });
  // $10 usdc per month
  await createPrice({
    product: product.id,
    billingScheme: "perUnit",
    currency: "usdc",
    unitAmountDecimal: 10,
    type: "recurring",
    recurring: {
      type: "delegated",
      interval: "month",
      intervalCount: 1,
      defaultLength: 12,
    },
  });
  // $100 usd per year
  await createPrice({
    product: product.id,
    billingScheme: "perUnit",
    currency: "usdc",
    unitAmountDecimal: 100,
    type: "recurring",
    recurring: {
      type: "delegated",
      interval: "year",
      intervalCount: 1,
      defaultLength: 1,
    },
  });
  return product;
};

// Starter Product
const createStarterProduct = async () => {
  const product = await createProduct({ name: "Starter" });
  // $20 usdc per month
  await createPrice({
    product: product.id,
    billingScheme: "perUnit",
    currency: "usdc",
    unitAmountDecimal: 20,
    type: "recurring",
    recurring: {
      type: "delegated",
      interval: "month",
      intervalCount: 1,
      defaultLength: 12,
    },
  });
  // $200 usdc per year
  await createPrice({
    product: product.id,
    billingScheme: "perUnit",
    currency: "usdc",
    unitAmountDecimal: 200,
    type: "recurring",
    recurring: {
      type: "delegated",
      interval: "year",
      intervalCount: 1,
      defaultLength: 1,
    },
  });
  return product;
};

// Enterprise Product
const createEnterpriseProduct = async () => {
  const product = await createProduct({ name: "Enterprise" });
  // $30 usdc per year
  await createPrice({
    product: product.id,
    billingScheme: "perUnit",
    currency: "usdc",
    unitAmountDecimal: 75,
    type: "recurring",
    recurring: {
      type: "delegated",
      interval: "month",
      intervalCount: 1,
      defaultLength: 12,
    },
  });
  // $300 usdc per year
  await createPrice({
    product: product.id,
    billingScheme: "perUnit",
    currency: "usdc",
    unitAmountDecimal: 850,
    type: "recurring",
    recurring: {
      type: "delegated",
      interval: "year",
      intervalCount: 1,
      defaultLength: 1,
    },
  });
  return product;
};

(async () => {
  const basicProduct = await createBasicProduct();
  console.log(`Created ${basicProduct.id} with name: ${basicProduct.name}`);

  const starterProduct = await createStarterProduct();
  console.log(`Created ${starterProduct.id} with name: ${starterProduct.name}`);

  const enterpriseProduct = await createEnterpriseProduct();
  console.log(
    `Created ${enterpriseProduct.id} with name: ${enterpriseProduct.name}`,
  );
})();
