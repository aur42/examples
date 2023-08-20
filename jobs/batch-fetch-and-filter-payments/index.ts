import axios from "axios";

const API_KEY = process.env.API_KEY;

const batchFetchPayments = async () => {
  let payments = [];
  let done = false;
  let endDate = null; // cursor

  while (!done) {
    // Fetch the next 150 payments
    const response = await axios.get(
      `https://api.spherepay.co/v1/payment?limit=150${
        endDate ? `&endDate=${endDate}` : ""
      }`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      },
    );
    const newPayments = response.data.data.payments;

    // Stop fetching
    if (newPayments.length === 0) done = true;
    else endDate = newPayments[newPayments.length - 1].created;

    // Append new payments
    payments = payments.concat(newPayments);
  }
  return payments;
};

const filterPaymentsByProductIds = (payments, productIds) => {
  return payments.filter((payment) =>
    payment.paymentLink.lineItems.some((lineItem) =>
      productIds.includes(lineItem.price.product.id),
    ),
  );
};

const runJob = async () => {
  const payments = await batchFetchPayments();
  const productIds = [process.env.PRODUCT_ID];
  const filteredPayments = filterPaymentsByProductIds(payments, productIds);
  console.log(`Total Payments: ${payments.length}`);
  console.log(`Filtered Payments: ${filteredPayments.length}`);
};

runJob();
