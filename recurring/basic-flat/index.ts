import axios from "axios";

const API_URL = "https://api.spherepay.co/v1";
const API_KEY = process.env.API_KEY;
const config = { headers: { Authorization: `Bearer ${API_KEY}` } };

const createProduct = async () => {
  const response = await axios.post(
    `${API_URL}/product`,
    {
      name: "Basic Subscription Product",
    },
    config,
  );
  const product = response.data.data.product;
  return product;
};

const createPrice = async (productId: string) => {
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
        defaultLength: 1,
      },
      currency: "usdc",
      billingScheme: "perUnit",
      name: "Basic Subscription Price",
      description: "A simple description",
      unitAmount: "5000000",
    },
    config,
  );
  const price = response.data.data.price;
  return price;
};

const createPaymentLink = async(priceId: string) => {
  const response = await axios.post(
    `${API_URL}/paymentLink`,
    {
      lineItems: [
        {
          price: priceId,
          quantity: 1,
          quantityMutable: false,
        }
      ]
    },
    config,
  )
  const paymentLink = response.data.data.paymentLink;
  return paymentLink
}

(async () => {
  
  const product = await createProduct()
  const price = await createPrice(product.id)
  const paymentLink = await createPaymentLink(price.id)
  console.log("paymentLink", paymentLink.url)
})();
