## Sphere Labs

<div align="center">
    <a>
        <img alt="Sphere" src="https://avatars.githubusercontent.com/u/109333730?s=200&v=4" width="95"/>
    </a>
  <h1 style="margin-top:20px;">nextjs-react-custom</h1>
</div>

# Overview

This repository contains an example Nextjs app, demonstrating how to natively embed a Sphere payment button into your web app.

This repository will be useful to you if you:

1. Want to build your own custom payment pages or embed a pay button into your application
1. Don't want to use Sphere's prebuilt checkouts.
1. Want to minimize dependencies by foregoing use of the `@spherelabs/react` library.

# Setup

First create a paymentLink via the Sphere API or dashboard. Export the paymentLink id as an environment variable as shown below:

```bash
export NEXT_PUBLIC_PAYMENT_LINK_ID="paymentLink_51ae9e9aa1684340ae969bc1b23f540d"
```

# Installation

Run once:

```bash
yarn
```

# Development

To start the server on port :3000 run:

```bash
yarn run dev
```

Navigating to `http://localhost:3000` will give:

<div align="center">
<img src="../../assets/nestjs-react.png" width="800" height="550"/>
</div>

## Notes:

Generally recommend using our react SDK, `@spherelabs/react` if it fits your use-case. Refer to `nextjs-react-sdk` for an example usage.
