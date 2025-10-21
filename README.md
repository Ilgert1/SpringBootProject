# Product Management System

A full-stack web application for managing products with user authentication and role-based access control.

## Tech Stack

**Backend:**
- Java 17
- Spring Boot 3.x
- Spring Security with JWT
- MySQL
- Maven

**Frontend:**
- Next.js 14
- React
- TypeScript
- Tailwind CSS

## Features

- 🔐 User authentication with JWT tokens
- 👤 Role-based access control (BASIC and SUPERUSER roles)
- 📦 Full CRUD operations for products
- 🔍 Product search functionality
- ✅ Strong password validation
- 🍪 Cookie-based token management
- 🎨 Modern, responsive UI

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd nobsv2
```

2. Configure database in `src/main/resources/application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/nobsv2
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

3. Run the application
```bash
./mvnw spring-boot:run
```

Backend runs on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory
```bash
cd products-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env.local` file
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

4. Run the development server
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/register` - Create new user account
- `POST /auth/login` - Login and receive JWT token
- `POST /auth/refresh` - Refresh access token

### Products (Requires Authentication)
- `GET /products` - Get all products
- `GET /product/{id}` - Get product by ID
- `POST /product` - Create product (SUPERUSER only)
- `PUT /product/{id}` - Update product (SUPERUSER only)
- `DELETE /product/{id}` - Delete product (SUPERUSER only)
- `GET /product/search?name={name}` - Search products by name


## Future Improvements

- Shopping cart functionality
- Order management
- Product categories
- Image upload
- Email verification
- API documentation with Swagger

## License

MIT

## Contact

[Ilgert Shehaj] - [ilgertshehaj6@gmail.com]
Project Link: [https://github.com/Ilgert1/SpringBootProject)