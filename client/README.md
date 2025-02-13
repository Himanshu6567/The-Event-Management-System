# Event Management System

## Overview
The **Event Management System** is a full-stack web application designed to help users discover, create, and manage events seamlessly. It allows users to browse events, register for events, and track attendee counts in real-time using **Socket.IO**.

## Features
- **User Authentication**: Secure login/signup using JWT authentication.
- **Event Creation**: Users can create events.
- **Event Discovery**: Browse and filter events based on categories.
- **Attend Events**: Users can mark attendance for events.
- **Real-time Updates**: Attendee count updates instantly using **Socket.IO**.
- **Responsive UI**: Designed for desktop and mobile users.

## Technologies Used
### **Frontend**
- React.js
- Tailwind CSS
- Axios
- Socket.IO (Client)

### **Backend**
- Node.js
- Express.js
- MongoDB (Mongoose for schema modeling)
- Socket.IO (Server)

### **Database**
- MongoDB Atlas

---
## Installation and Setup

### **1. Clone the Repository**
```sh
git clone https://github.com/your-repo/event-management-system.git
cd event-management-system
```

### **2. Install Dependencies**
#### **Frontend**
```sh
cd client
npm install
```

#### **Backend**
```sh
cd server
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the `server` directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

### **4. Start the Application**
#### **Start Backend**
```sh
cd server
npm run dev
```

#### **Start Frontend**
```sh
cd client
npm run dev
```

The application will be available at `http://localhost:5173`.

---
## API Endpoints
### **User Authentication**
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user & receive token
- `GET /api/auth/user` - Get user details (requires authentication)

### **Events Management**
- `GET /api/events` - Fetch all events
- `POST /api/events` - Create a new event
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event details
- `DELETE /api/events/:id` - Delete an event

### **Attending Events (Real-Time Updates)**
- `POST /api/events/:id/attend` - Mark user as attending an event
- **Socket.IO Event**: `updateAttendees` - Broadcast attendee updates to all clients

---
## Usage Guide
1. **Sign Up/Login**: Create an account or log in.
2. **Browse Events**: View upcoming events on the home page.
3. **Create an Event**: Click "Create Event" and fill in the details.
4. **Attend an Event**: Click "Attend" to join an event (attendee count updates in real-time).
5. **Manage Events**: Users can edit or delete their created events.

---
## Future Enhancements
- Implement **Google OAuth** for authentication.
- Add **payment integration** for ticketed events.
- Introduce **admin panel** for better event moderation.
- Improve UI/UX with animations and dark mode support.

---
## Contributors
- **Himanshu Chandola** - [GitHub](https://github.com/your-profile)

---
## License
This project is open-source and available under the **MIT License**.

