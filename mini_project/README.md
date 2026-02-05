# Mini Project (Products / Cart / Orders API)

A small Node.js + Express + MongoDB (Mongoose) API for managing products, a user cart, and placing orders with stock checks.

## Postman

A Postman collection is included at:

- `https://documenter.getpostman.com/view/50380967/2sBXc8niML`

## Tech

- Node.js, Express
- MongoDB Atlas + Mongoose
- Joi validation

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
DATABASE_URL=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
PORT=3000
```

3. Run the server:

```bash
npm run dev
```

Server starts at: `http://localhost:<PORT>`

## API Base Paths

- `/api/v1/products`
- `/api/v1/cart`
- `/api/v1/orders`

## Endpoints

### Products

- `POST /api/v1/products` — Create product
- `GET /api/v1/products` — List products (supports filtering)
  - Query params: `category`, `minPrice`, `maxPrice`
- `GET /api/v1/products/:id` — Get product by id
- `PUT /api/v1/products/:id` — Update product
- `DELETE /api/v1/products/:id` — Delete product

### Cart

- `POST /api/v1/cart` — Add item to cart
- `GET /api/v1/cart` — View cart
- `PUT /api/v1/cart` — Update item quantity
- `DELETE /api/v1/cart/:id` — Remove item from cart (where `:id` is the product id)

### Orders

- `POST /api/v1/orders` — Place order (creates an order from cart items, checks stock, decrements stock, then clears cart)
- `GET /api/v1/orders` — List orders
- `GET /api/v1/orders/:id` — Get order by id

## Validation

Request payloads and route params are validated using Joi in `src/middlewares/validation.js`.

- MongoDB ObjectId params must match: `^[0-9a-fA-F]{24}$`

## Error Handling

- Unknown endpoints return `404` JSON.
- Thrown errors (including from services) are returned as JSON by the global error handler in `app.js`.

## Notes

- Cart delete currently uses a hard-coded `userId` in the controller (`user123`) — b/c it didn't have authontication yet.
- Cart update currently searches by `items.productId` without scoping by user by the same reason by the above
