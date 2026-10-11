# SIBAQ KUTTIKKATTUR 2K26

## Deployment Requirements

**CRITICAL**: This project relies on the built-in `node:sqlite` module. 
You **must** use Node.js version **22.5.0** or higher to run the backend server.

### Running the server

1. Build the frontend:
   ```bash
   npm install
   npm run build
   ```

2. Start the server (serves both the API and the static frontend):
   ```bash
   node server/index.mjs
   ```

### Default Credentials

The admin system uses the following defaults if no `.env` file is present (an `.env` will be auto-generated):

- Username: `admin`
- Password: `sibaq-admin-2026`

**Make sure to change the password in the `.env` file before deploying to production.**

### Security Features

- Security headers (helmet-style) are enabled via Express middleware.
- Cookies use the `Secure` flag in production (`NODE_ENV=production`).
- The admin dashboard layout is hidden from the main site layout to prevent leakage.
