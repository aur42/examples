## Sphere Labs

<div align="center">
    <a>
        <img alt="Sphere" src="https://avatars.githubusercontent.com/u/109333730?s=200&v=4" width="95"/>
    </a>
  <h1 style="margin-top:20px;">active-paused</h1>
</div>

# Overview

This repository contains an example script demonstrating basic Payout orchestration.

It will show how you as a merchant can create a payout of any amount to a single registered bank account.

# Installation

Run once:

```bash
yarn
```

# Setup

1. Set your Sphere Api Key in your environment variables and an Ethereum wallet public key.

```bash
export API_KEY="<SPHERE_API_KEY>"
export WALLET_PUBLIC_KEY="<WALLET_PUBLIC_KEY>"
```

2. Retrieve the id of the bank account that you would like to payout to and set it as an environment variable.

```bash
export BANK_ACCOUNT_ID="bank_account_5f5b5b5b5b5b5b5b5b5b5b5b"
```

# Run

To run the script:

```bash
yarn run dev
```

Observe that money won't be actually transfered, but this payout will give back
an object which contains the instructions to transfer the money to the liquiditation address which subsequently transfers the money to the bank account.