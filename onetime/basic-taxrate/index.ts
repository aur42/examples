import axios from "axios";

const API_URL = "http://localhost:8080/v1";
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

const getRandomTaxCategory = async () => {
  const response = await axios.get(`${API_URL}/taxCategory`, config);
  const taxCategories = response.data.data.taxCategories;
  return taxCategories[42];
};

const createTaxRate = async (data: any) => {
  const response = await axios.post(`${API_URL}/taxRate`, data, config);
  const taxRate = response.data.data.taxRate;
  return taxRate;
};

const createPaymentLink = async (data: any) => {
  const response = await axios.post(`${API_URL}/paymentLink`, data, config);
  const paymentLink = response.data.data.paymentLink;
  return paymentLink;
};

(async () => {
  const product = await createProduct({
    name: "Basic Per Unit",
  });

  const price = await createPrice({
    product: product.id,
    billingScheme: "perUnit",
    currency: "bonk",
    unitAmountDecimal: 10,
  });

  const taxCategory = await getRandomTaxCategory();

  const taxRate = await createTaxRate({
    taxCategory: taxCategory.id,
    name: "Basic Tax Rate",
    description: "A basic tax rate that applies a 10% tax to all products",
    country: "USA",
    type: "salesTax",
    percentageDecimals: 10,
    jurisdiction: "San Francisco County",
    state: "CA",
  });

  const paymentLink = await createPaymentLink({
    lineItems: [
      {
        price: price.id,
        quantity: 1,
        quantityMutable: true,
      },
    ],
    taxRate: taxRate.id,
  });
  console.log("paymentLink", paymentLink.url);
})();
