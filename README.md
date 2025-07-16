# 🧠 PiePay - Flipkart Offer Backend Service

A backend service that extracts and stores bank offers from Flipkart’s web app, then calculates the highest available discount based on payment details.

---

## 🔧 Tech Stack

- Node.js + Express
- MongoDB (Mongoose)
- Docker (optional)
- Jest + Supertest (for tests)
- Postman Collection (for manual testing)

---

## 🚀 Getting Started

### 📦 Install Dependencies

```bash
npm install
```

🔐 Configure Environment Variables
Create a .env file in the root with:

PORT=5000
MONGO_URI=mongodb://localhost:27017/piepay

▶️ Run the Server
```bash
npm start
```

## 🎨 Design Choices Explained
🛠️ Framework: Node.js + Express
- Why Node.js?
Chosen for its lightweight, fast I/O handling and suitability for REST API development. It’s widely adopted, especially in startup ecosystems.

- Why Express?
It’s minimal and flexible, with a large ecosystem of middleware, making it ideal for quickly building APIs.

## 🧱 Database: MongoDB + Mongoose
Why MongoDB?
- Since Flipkart’s offers come in flexible and potentially nested JSON structures, a document-oriented database is more appropriate than a rigid SQL schema.

Why Mongoose?
- It provides schema validation, relationship mapping, and built-in query methods — perfect for structuring offer documents with nested fields like validity, arrays like paymentInstruments, and enforcing types.

##  📄 Schema Design
```bash
{
  title: String,
  bankName: String,
  discountAmount: Number,
  minTransactionAmount: Number,
  paymentInstruments: [String],
  offerCode: String,
  validity: {
    start: Date,
    end: Date
  }
}
```
## Why this structure?

- bankName and paymentInstruments help filter relevant offers.

- minTransactionAmount is required for discount eligibility logic.

- validity helps future enhancement for time-based filtering.

- offerCode is stored for completeness, though not used yet.

- All fields reflect real-world data points found in Flipkart's UI/API.

 ## API Structure
- /api/offer: Clearly focused on inserting offers (modular route/controller)

- /api/highest-discount: Accepts query params for fast GET-based lookups

- Clean separation between routes, controllers, models for maintainability

  ## scale the GET /highest-discount 

  To scale the `GET /highest-discount` endpoint to handle 1,000+ requests per second, I would implement database indexing on frequently queried fields like `bankName`, `paymentInstruments`, and `minTransactionAmount` to speed up lookups. Additionally, I’d introduce a Redis caching layer to store and serve frequently accessed discount calculations, drastically reducing response times and database load. The backend would be containerized using Docker and horizontally scaled using a load balancer to distribute traffic across multiple instances. For advanced scalability, I’d offload non-critical operations like logging to asynchronous queues and set up monitoring with tools like Grafana or New Relic to enable auto-scaling based on traffic spikes.

## will improve if you had more time 
If I had more time to complete the assignment, I would enhance the system by implementing offer expiration checks based on the validity dates, adding comprehensive unit and integration test coverage, and incorporating proper error handling with detailed status codes and logs. I would also build a lightweight Flipkart offer scraper to automate offer ingestion, implement input validation using a schema validation library like Joi or Zod, and add Swagger/OpenAPI documentation for better developer experience. Additionally, I’d set up CI/CD pipelines for automated testing and deployment, and refine the database schema to support offer versioning or regional variations if needed.

