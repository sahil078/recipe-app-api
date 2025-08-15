#  Recipe App Backend API

A robust and scalable backend API for managing recipe favorites, built with Node.js, Express, and Drizzle ORM.

## ✨ Features

- **RESTful API** for recipe management
- **PostgreSQL Database** with Neon serverless
- **Type-safe Database** operations with Drizzle ORM
- **Modern ES6+** syntax with ES modules
- **CORS enabled** for cross-origin requests
- **Environment-based** configuration
- **Health check** endpoint for monitoring

## ️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js          # Database configuration
│   │   └── env.js         # Environment variables
│   ├── db/
│   │   └── schema.js      # Database schema definitions
│   └── server.js          # Main server file
├── drizzle/
│   └── meta/              # Drizzle migration metadata
├── drizzle.config.js      # Drizzle configuration
├── package.json           # Dependencies and scripts
└── .env                   # Environment variables (create this)
```

This README provides:
- Clear project structure
- Step-by-step setup instructions
- API documentation with examples
- Database schema information
- Available scripts and commands
- Testing examples with curl
- Deployment considerations
- Security and error handling details

You can save this as `README.md` in your backend directory.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Neon PostgreSQL database account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd FullStack-Recipe-App/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Configure your database**
   - Sign up for [Neon](https://neon.tech)
   - Create a new project
   - Copy your connection string

5. **Set up your .env file**
   ```env
   PORT=5001
   DATABASE_URL=postgresql://username:password@host/database
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key
   ```

6. **Run database migrations**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

7. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

##  API Endpoints

### Health Check
```http
GET /api/health
```
**Response:**
```json
{
  "message": "Server is running",
  "success": true
}
```

### Create Favorite Recipe
```http
POST /api/favorites
```

**Request Body:**
```json
{
  "userId": "user123",
  "recipeId": "recipe456",
  "title": "Spaghetti Carbonara",
  "image": "https://example.com/carbonara.jpg",
  "cookTime": "30 minutes",
  "servings": 4
}
```

**Response:**
```json
{
  "message": "Favorite created",
  "success": true,
  "data": {
    "id": 1,
    "user_id": "user123",
    "recipe_id": "recipe456",
    "title": "Spaghetti Carbonara",
    "image": "https://example.com/carbonara.jpg",
    "cook_time": "30 minutes",
    "servings": 4,
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

## ️ Database Schema

### Favorites Table
| Column      | Type      | Constraints           | Description           |
|-------------|-----------|----------------------|----------------------|
| id          | SERIAL    | PRIMARY KEY          | Unique identifier    |
| user_id     | TEXT      | NOT NULL             | User identifier      |
| recipe_id   | INTEGER   | NOT NULL             | Recipe identifier    |
| title       | TEXT      | NOT NULL             | Recipe title         |
| image       | TEXT      | NOT NULL             | Recipe image URL     |
| cook_time   | TEXT      | NULL                 | Cooking time         |
| servings    | INTEGER   | NULL                 | Number of servings   |
| created_at  | TIMESTAMP | NOT NULL, DEFAULT NOW| Creation timestamp   |

## ️ Available Scripts

```bash
# Development
npm run dev          # Start server with nodemon

# Production
npm start            # Start server

# Database
npm run db:generate  # Generate new migration
npm run db:migrate   # Run pending migrations
npm run db:studio    # Open Drizzle Studio
```

##  Configuration

### Drizzle Configuration
The database migrations are configured in `drizzle.config.js`:
```javascript
export default {
  schema: "./src/db/schema.js",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
}
```

### Environment Variables
| Variable      | Description                    | Default | Required |
|---------------|--------------------------------|---------|----------|
| PORT          | Server port                    | 5001    | No       |
| DATABASE_URL  | Neon PostgreSQL connection     | -       | Yes      |
| NODE_ENV      | Environment mode              | -       | No       |
| JWT_SECRET    | JWT signing secret            | -       | Yes      |

## 🧪 Testing the API

### Using curl
```bash
# Health check
curl http://localhost:5001/api/health

# Create favorite
curl -X POST http://localhost:5001/api/favorites \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "recipeId": "recipe456",
    "title": "Spaghetti Carbonara",
    "image": "https://example.com/carbonara.jpg",
    "cookTime": "30 minutes",
    "servings": 4
  }'
```

### Using Postman
1. Import the collection
2. Set base URL to `http://localhost:5001`
3. Test each endpoint

## 🚨 Error Handling

The API returns consistent error responses:
```json
{
  "message": "Error description",
  "success": false
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## 🔒 Security Considerations

- CORS is enabled for cross-origin requests
- Input validation on all endpoints
- Environment variables for sensitive data
- JWT secret for authentication (when implemented)

## 🚀 Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Configure production database URL
3. Set strong JWT secret
4. Configure proper CORS origins

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5001
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues:
1. Check the error logs
2. Verify environment variables
3. Ensure database is accessible
4. Check API endpoint documentation

---

**Happy Cooking! 🍽️**
