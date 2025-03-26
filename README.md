# 🌟 Blog API 🌟

## 📖 Description
A powerful and flexible API for managing blog posts and user authentication. This API allows users to create, read, update, and delete posts while managing user accounts securely.

## 🚀 Features
- User registration and authentication 🔐
- Create, read, update, and delete blog posts 📝
- Secure password hashing and token management 🔑
- Error handling and validation for robust performance ⚙️

## 📦 Installation
To get started with this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/FarkhodovIslom/blog-website_e.git
   cd blog-api
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add your MongoDB URI and other environment variables:
   ```plaintext
   MONGODB_URI=your_mongodb_uri
   PORT=3000
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

## 🛠️ Usage
Here are some examples of how to use the API endpoints:

### User Registration
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "yourusername",
  "email": "youremail@example.com",
  "password": "yourpassword"
}
```

### Create a Post
```http
POST /api/posts
Authorization: Bearer your_access_token
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content of my first post."
}
```

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

Feel free to reach out if you have any questions or suggestions! 😊
