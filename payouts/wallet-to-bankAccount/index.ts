import axios from "axios";

const API_URL = "https://api.staging.spherepay.co/v1"
const config = {headers: {'Authorization': 'Bearer secret_043de2ea0dd7406b8a11b67f283a27d4'}}

interface CreateBankAccount {
  bankName: string;
  accountName: string;
  accountHolderName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: "checking" | "savings";
}

interface CreatePayout {
  type: "walletToBankAccount"
  fromWallet: string;
  sourceNetwork: "eth" | "tron";
  sourceCurrency: "usdt" | "usdc";
  destinationCurrency: "usd";
  destinationNetwork: "ach" | "wire"
  toBankAccount: string;
  amount: string;
}

const createBankAccount = async(args: CreateBankAccount) => {
  const response = axios.post(
    `${API_URL}/bankAccount`,
    args,
    config,
  ).then((response) => console.log(response.data)).catch((error) => console.log(error.response.data));
  // if (response.status !== 200) {
  //   throw new Error(response.data);
  // }
  // return response.data.data.bankAccount;
  return null;
}


const listBankAccount = async() => {
  const response = await axios.get(
    `${API_URL}/bankAccount`,
    config,
  )
  if (response.status !== 200){
    throw new Error(response.data);
  }
  return response.data.data.bankAccounts;
}

const createPayout = async(args: CreatePayout) => {
  const response = await axios.post(
    `${API_URL}/payout`,
    args,
    config,
  )
  if (response.status !== 200) {
    throw new Error(response.data);
  }
  return response.data;
}

(async() => {

    // const bankAccount = await createBankAccount({
    //     accountType: "checking",
    // });
    // console.log(bankAccount)

    const bankAccounts = await listBankAccount();
    console.log(bankAccounts)


})()
