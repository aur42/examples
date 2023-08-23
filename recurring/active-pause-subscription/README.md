## Sphere Labs

<div align="center">
    <a>
        <img alt="Sphere" src="https://avatars.githubusercontent.com/u/109333730?s=200&v=4" width="95"/>
    </a>
  <h1 style="margin-top:20px;">active-paused</h1>
</div>

# Overview

This repository contains an example script demonstrating basic Subscription orchestration.

It will demonstrate, how you as a merchant could "pause" and "unpause" the billing of a subscription using the subscription update endpoint.

# Installation

Run once:

```bash
yarn
```

# Setup

1. Set your Sphere ApiKey in your environment variables.

```bash
export API_KEY="<SPHERE_API_KEY>"
```

2. Retrieve the id of the subscription that you would like to pause/resume and set it as an environment variable.

```bash
export SUBSCRIPTION_ID="subscription_adg5186sad88bba6d35186dsg5c
```

# Run

To run the script:

```bash
yarn run dev
```

Observe that if your subscription is active, it will become paused.

Running the script again update the subscriptions status from "paused" to "active".
