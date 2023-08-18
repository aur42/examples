## Sphere Labs

<div align="center">
    <a>
        <img alt="Sphere" src="https://avatars.githubusercontent.com/u/109333730?s=200&v=4" width="95"/>
    </a>
  <h1 style="margin-top:20px;">webhook-signing</h1>
</div>

# Overview

This repository contains an example express server demonstrating `hmac` signature verification of Sphere webhook event payloads.

# Installation

Run once:

```bash
yarn
```

# Setup

1. Create a webhook using the Sphere API or through the dashboard.
2. Export your webhook's signingSecret or `secret` to:

```bash
export SPHERE_WEBHOOK_SIGNING_SECRET="secret_8b45ae882301488bba6d351863a0555c"
```

# Development

To start the server on port :8080 run:

```bash
yarn run dev
```
