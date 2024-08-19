# RHAC front-end Web Application

## Guick Start Guide

### Note (This is really important. Please check `.env` file)

- Before **running the development or preview server**, make sure NOT to use `NUXT_PUBLIC_GTAG_ID`.
- In contrast, make sure to use `NUXT_PUBLIC_GTAG_ID` for **production** when deploy for production.
- The above two points may apply to other `Environment Variable` as well.

### 1. Clone the repository

```bash
git clone git@github.com:A2A-Digital/rhac-frontend.git #via ssh
```

or

```bash
git clone https://github.com/A2A-Digital/rhac-frontend.git #via http
```

### 2. Change directory

```bash
ch rhac-frontend/
```

### 3. Install dependencies

```bash
pnpm install
```

### 4. Spin up development server

```bash
pnpm dev
```

Start the development server on http://localhost:3000

### 5. Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

### 6. Deployment

- #### with pm2

  Make sure `pm2` is installed and pm2 config is present. `ecosystem.config.js`

  Build and serve the app

  ```bash
  pnpm build && pm2 start
  ```

**Checkout the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.**

---

References

[https://nuxtjs.org/deployments/pm2/](https://nuxtjs.org/deployments/pm2/)

[https://pm2.keymetrics.io/docs/usage/quick-start/](https://pm2.keymetrics.io/docs/usage/quick-start/)

[https://mark-amoah.medium.com/deploying-a-nuxtjs-ssr-app-to-vps-9020baeab7a0](https://mark-amoah.medium.com/deploying-a-nuxtjs-ssr-app-to-vps-9020baeab7a0)

[https://mark-amoah.medium.com/hosting-nuxt-js-app-on-cpanel-apache-server-f108498cde8b](https://mark-amoah.medium.com/hosting-nuxt-js-app-on-cpanel-apache-server-f108498cde8b)
