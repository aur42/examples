import axios from "axios";

const API_URL = "http://localhost:8080/v1";
const API_KEY = process.env.API_KEY;
const config = { headers: { Authorization: `Bearer ${API_KEY}` } };

const createProduct = async () => {
  const response = await axios.post(
    `${API_URL}/product`,
    {
      name: "Basic Subscription Product w/ Coupon",
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
        interval: "min",
        intervalCount: 5,
        usageAggregation: "sum",
        defaultLength: 12,
      },
      currency: "bonk",
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

const createCoupon = async() => {
    const response = await axios.post(
        `${API_URL}/coupon`,
        {
            name: "10% off",
            percentOff: 10,
            term: "oneTime",        },
        config,
    );
    const coupon = response.data.data.coupon;
    return coupon;
}

const createPromotionCode = async(
    couponId: string,
    code: string,
) => {
    const response = await axios.post(
        `${API_URL}/promotionCode`,
        {
            coupon: couponId,
            code,
        },
        config,
    )
    const promotionCode = response.data.data.promotionCode;
    return promotionCode;
}

const createPaymentLink = async (priceId: string, couponId: string) => {
  const response = await axios.post(
    `${API_URL}/paymentLink`,
    {
      coupon: couponId,
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

  const code = "42"

  const product = await createProduct();
  const price = await createPrice(product.id);

  const coupon = await createCoupon();
  const promotionCode = await createPromotionCode(coupon.id, code);
  console.log("coupon", coupon)
  console.log("promotionCode", promotionCode)

  const paymentLink = await createPaymentLink(price.id, coupon.id);
  console.log("paymentLink", paymentLink.url);
})();
