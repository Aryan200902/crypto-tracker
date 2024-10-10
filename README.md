# Crypto Tracker

A Node.js application that tracks cryptocurrency prices and stores them in a MongoDB database. The app fetches data from the CoinGecko API and provides endpoints to retrieve stats and calculate the price deviation for selected cryptocurrencies.

## Features

- Fetch cryptocurrency prices, market cap, and 24-hour change from the CoinGecko API.
- Store cryptocurrency data in MongoDB.
- REST API to retrieve cryptocurrency stats and price deviations.
- Cron job for automatic data fetching every 2 hours.
- Instant run for fetching crypto prices during development.

## Technologies Used

- **Node.js** for server-side JavaScript.
- **Express.js** to create the REST API.
- **MongoDB** and **Mongoose** for database and ORM.
- **CoinGecko API** to fetch cryptocurrency data.
- **Cron** for scheduled data fetching.

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Aryan200902/crypto-tracker.git
   ```
2. Navigate into the project directory:

   ```bash
   cd crypto-tracker
   ```
3. Install the required dependencies:

   ```bash
   npm install
   ```
4. Set up environment variables by creating a `.env` file in the root directory:

   ```
   MONGO_URI=your_mongo_db_uri
   ```
5. Start the development server:

   ```bash
   npm run dev
   ```
6. Fetch cryptocurrency prices instantly by running:

   ```bash
   node jobs/fetchCryptoPricesJob.js
   ```

## API Endpoints

### 1. Get Cryptocurrency Stats

**URL:** `/api/stats`

**Method:** `GET`

**Query Parameters:**

- `coin`: The name of the cryptocurrency (e.g., `bitcoin`, `ethereum`).

**Response:**

```json
{
  "price": 54000,
  "marketCap": 1000000000,
  "24hChange": -1.25
}
```

### 2. Get Price Deviation

**URL:** `/api/deviation`

**Method:** `GET`

**Query Parameters:**

- `coin`: The name of the cryptocurrency (e.g., `bitcoin`, `ethereum`).

**Response:**

```json
{
  "deviation": 1500.23
}
```
