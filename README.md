# 🌟 Fake Review System

A local mock review generator with a user-friendly prototype dashboard. Quickly spin up realistic customer reviews for UI prototyping, testing, or demo purposes — all backed by a lightweight Node.js/Express API and a JSON flat-file database.

---

## ✨ Features

- **Bulk review generation** using [Faker.js](https://fakerjs.dev/) — realistic usernames, avatars, ratings, text, and product photos
- **Persistent JSON database** — reviews survive server restarts
- **REST API** with pagination support
- **Prototype Dashboard** (`dashboard.html`) with three tabs:
  - 🔧 **Generate** — bulk-generate reviews with configurable count and rating range
  - 📋 **View & Filter** — browse, search, and filter reviews with live stats
  - ✍️ **Add Custom Review** — manually submit a review via form
- **Simple review viewer** (`index.html`) — clean card-based display fetching from the local API

---

## 📁 Project Structure

```
├── server.js          # Express API server
├── generator.js       # Faker.js mock data generator
├── database.json      # Flat-file JSON database (auto-created on first run)
├── dashboard.html     # Admin/prototype dashboard UI
├── index.html         # Public-facing review viewer
├── package.json
└── package-lock.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/fake-review-system.git
cd fake-review-system

# Install dependencies
npm install
```

### Running the Server

```bash
npm start
```

The server starts on **Enhanced fake review system with user-friendly localhost dashboard. Created `dashboard.html` with 3 phases:

**Phase 1: Generate Reviews** - Set count and rating range for mock data generation

**Phase 2: View & Filter Reviews** - Browse, search, and filter reviews with stats

**Phase 3: Add Custom Reviews** - Submit manual reviews via form

To run:
```bash
npm install
npm start
```

Then open `http://localhost:3000/dashboard.html` in your browser.**.

| URL | Description |
|-----|-------------|
| `http://localhost:3000/` | Public review viewer (`index.html`) |
| `http://localhost:3000/dashboard.html` | Admin dashboard |

---

## 🔌 API Reference

### `GET /api/reviews`

Returns a paginated list of reviews.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | `1` | Page number |
| `limit` | number | `10` | Reviews per page |

**Response:**
```json
{
  "success": true,
  "metadata": {
    "currentPage": 1,
    "itemsPerPage": 10,
    "totalItems": 15,
    "hasMore": true
  },
  "reviews": [ ... ]
}
```

---

### `POST /api/reviews`

Adds a single custom review.

**Request Body:**
```json
{
  "username": "John Doe",
  "rating": 5,
  "reviewText": "Absolutely loved this product!"
}
```

**Response:**
```json
{
  "success": true,
  "review": { ... }
}
```

---

### `POST /api/generate`

Bulk-generates fake reviews using Faker.js.

**Request Body:**
```json
{
  "count": 10,
  "minRating": 3,
  "maxRating": 5
}
```

**Response:**
```json
{
  "success": true,
  "count": 10
}
```

---

### `POST /api/reset`

Wipes all reviews from the database.

**Response:**
```json
{
  "success": true,
  "message": "Database reset"
}
```

---

## 🗄️ Database

Reviews are stored in `database.json`. Each review has the following shape:

```json
{
  "id": "uuid",
  "username": "John_Doe",
  "avatarUrl": "https://...",
  "rating": 4,
  "reviewText": "Great product!",
  "photos": ["https://..."],
  "createdAt": "2026-05-30T12:00:00.000Z"
}
```

To reset the database from the command line:

```bash
npm run reset-db
```

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `express` | HTTP server and routing |
| `cors` | Cross-origin request support |
| `@faker-js/faker` | Mock data generation (dev dependency) |

---
