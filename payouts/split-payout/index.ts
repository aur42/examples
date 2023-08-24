import axios from "axios";

const API_URL = "https://api.spherepay.co/v1";
const API_KEY = process.env.API_KEY;
const config = { headers: { Authorization: `Bearer ${API_KEY}` } };

// 1) retrieve bank account from where you want to send the payout
const retrieveBankAccounts = async (bankAccountIds: string[]) => {
    const bankAccounts = [];
    for (let bankAccountId of bankAccountIds) {
      const response = await axios.get(
        `${API_URL}/bankAccount/${bankAccountId}`,
        config,
      );
      console.log("response ==> ", response.data.data);
      bankAccounts.push(response.data.data);
    }
    return bankAccounts;
  };

// 2) create split payout
const createSplitPayout = async (totalAmount: number, bankAccountIds: string[]) => {
    for (let bankAccountId of bankAccountIds) {
        const response = await axios.post(
        `${API_URL}/payout`,
        {
            type: "walletToBankAccount",
            amount: String(totalAmount / bankAccountIds.length),
            fromWallet: process.env.WALLET_PUBLIC_KEY,
            toBankAccount: bankAccountId,
            sourceCurrency: "usdt",
            sourceNetwork: "eth",
            destinationCurrency: "usd",
            destinationNetwork: "ach",
        },
        config,
        );

        console.log("response ==> ", response.data.data);
    }

};

(async() => {
    const bankAccounts = await retrieveBankAccounts(["bankAccount1", "bankAccount2"]);
    await createSplitPayout(10, bankAccounts);
})(); 