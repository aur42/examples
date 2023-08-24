import axios from "axios"

const API_URL = "http://localhost:8080/v1";
const API_KEY = process.env.API_KEY;
const config = { headers: { Authorization: `Bearer ${API_KEY}` } };


// 1) retrieve bank account
const retrieveBankAccount = async (bankAccountId: string) => {
    const response = await axios.get(
        `${API_URL}/bankAccount/${bankAccountId}`,
        config,
    );
    console.log("response ==> ", response.data.data)
    const bankAccount = response.data.data;
    return bankAccount; 
}


// 2) create payout
const createPayout = async (bankAccountId: string) => {
    const response = await axios.post(
        `${API_URL}/payout`,
        {
            "type": "walletToBankAccount",
            "amount": "100",
            "fromWallet": process.env.WALLET_PUBLIC_KEY, 
            "toBankAccount": bankAccountId,
            "sourceCurrency": "usdt",
            "sourceNetwork": "eth",
            "destinationCurrency": "usd",
            "destinationNetwork": "ach",
        },
        config,
    );

    console.log("response.data ==> ", response.data)

    const payout = response.data.data;
    return payout;
}


(async () => {

    // 1) retrieve bank account  
    // const bankAccountId = process.env.BANK_ACCOUNT_ID;
    const bankAccountId = process.env.BANK_ACCOUNT_ID;
    const bankAccount = await retrieveBankAccount(bankAccountId); 
    
    // 2) create payout to the retrieved bank account
    const payout = await createPayout(bankAccountId);

})(); 


