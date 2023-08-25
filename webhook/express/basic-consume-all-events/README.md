## Sphere Labs

<div align="center">
    <a>
        <img alt="Sphere" src="https://avatars.githubusercontent.com/u/109333730?s=200&v=4" width="95"/>
    </a>
  <h1 style="margin-top:20px;">basic-consume-all-events</h1>
</div>

# Overview

This repository contains an example express server demonstrating how you can consume and propagate all events from Sphere to your servers.

# Installation

Run once:

```bash
yarn
```

# Setup

1. Create a webhook using the Sphere API or through the dashboard.
2. Reveal and export your webhook's signingSecret (found in the webhook view of the developer dashboard.)

```bash
export SPHERE_WEBHOOK_SIGNING_SECRET="<SPHERE_WEBHOOK_SIGNING_SECRET>"
```

# Development

To start the server on port :8080 run:

```bash
yarn run dev
```

Now you can

1. Download [ngrok](https://ngrok.com/download) (a reverse proxy that enables you to expose your local server to the internet.),
2. Run: `ngrok http 8080`
3. Edit your webhook's url with the `Forwarding` url ngrok displayed in the ngrok cli.
4. Test out the functionality by generating some of the events that your webhook is listening to.
