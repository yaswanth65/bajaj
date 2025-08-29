# BFHL API

A REST API built with Node.js and Express for the VIT Full Stack Question Paper.

## Features

- POST `/bfhl` endpoint that processes an array and returns:
  - Status of operation
  - User ID in specified format
  - Email ID
  - College Roll Number
  - Separated even and odd numbers
  - Alphabets converted to uppercase
  - Special characters
  - Sum of all numbers
  - Concatenated alphabets in reverse order with alternating caps

## Installation

1. Clone this repository
2. Navigate to the server directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The server will run on port 3000 by default (or the PORT environment variable).

## API Endpoints

### POST /bfhl

Main endpoint that processes the input array.

**Request Body:**

```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**

```json
{
  "is_success": true,
  "user_id": "yaswanth_kumar_29082003",
  "email": "yaswanth@example.com",
  "roll_number": "21BCE1234",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### GET /bfhl

Test endpoint that returns operation code.

## Deployment

This API can be deployed on:

- Vercel
- Railway
- Render
- Heroku
- Any other Node.js hosting provider

### Environment Variables

- `PORT`: Server port (default: 3000)

## Configuration

Before deploying, update the following in `index.js`:

- `user_id`: Your full name and date of birth in format "firstname_lastname_ddmmyyyy"
- `email`: Your email address
- `roll_number`: Your college roll number

## Examples

See the examples in the code comments for various input scenarios.
