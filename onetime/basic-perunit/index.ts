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

(async () => {
  const product = await createProduct({
    name: "Basic Per Unit",
  });

  const usdcPrice = await createPrice({
    product: product.id,
    billingScheme: "perUnit",
    currency: "usdc",
    unitAmountDecimal: 10,
  });

  const usdtPrice = await createPrice({
    product: product.id,
    billingScheme: "perUnit",
    currency: "usdc",
    unitAmountDecimal: 10,
  });

  const usdcPaymentLink = await createPaymentLink({
    lineItems: [
      {
        price: usdcPrice.id,
        quantity: 1,
        quantityMutable: true,
      },
    ],
  });
  console.log("usdcPaymentLink", usdcPaymentLink.url);

  const usdtPaymentLink = await createPaymentLink({
    lineItems: [
      {
        price: usdtPrice.id,
        quantity: 1,
        quantityMutable: true,
      },
    ],
  });
  console.log("usdtPaymentLink", usdtPaymentLink.url);
})();
