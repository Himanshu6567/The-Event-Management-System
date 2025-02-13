# Event Management System

## Overview
The **Event Management System** is a full-stack web application designed to help users discover and register for events seamlessly. It allows users to browse events, register for events, and track attendee counts in real-time using **Socket.IO**.

## Features
- **User Authentication**: Secure login/signup using JWT authentication.
- **Guest User Login**: Guests can log in with limited access to browse events.
- **Event Creation**: Users can create events with details like name, date, and location.
- **Event Discovery**: Browse and filter events based on categories.
- **Attend Events**: Users can mark attendance for events.
- **Real-time Updates**: Attendee count updates instantly using **Socket.IO**.
- **Cloudinary Integration**: Host event images securely on **Cloudinary**.
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
- Cloudinary (For image hosting)

### **Database**
- MongoDB Atlas

---
## Installation and Setup

### **1. Clone the Repository**
```sh
git clone https://github.com/Himanshu6567/The-Event-Management-System
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
open a `.env` file in the `server` directory and add the following:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

open a `cloudinary-config.js` file in the `server` directory and add the following:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### **4. Start the Application**
#### **Start Backend**
```sh
cd server
nodemon index.js
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
- `POST /user/createNewUser` - Register a new user
- `POST /user/loginUser` - Login user & receive token

### **Events Management**
- `GET /allEvents` - Fetch all events
- `POST /event/createNewEvent` - Create a new event with Cloudinary image hosting
- `GET /event/MyCreatedEvents` - Get event which created by user
- `GET /event/getDetails/:id` - Get event details
- `GET /event/myAttendedEvents/` - Get events attended by user

### **Attending Events (Real-Time Updates)**
- `POST /event/join/:id` - Mark user as attending an event
- **Socket.IO Event**: `updateAttendees` - Broadcast attendee updates to all clients

---
## Usage Guide
1. **Sign Up/Login**: Create an account or log in.
2. **Browse Events**: View upcoming events on the home page.
3. **Create an Event**: Click "Create Event" and fill in the details along with an image.
4. **Attend an Event**: Click "Attend" to join an event (attendee count updates in real-time).

---
## Future Enhancements
- Improve UI/UX with animations and dark mode support.

---
## Contributors
- **Himanshu Chandola** - [GitHub](https://github.com/Himanshu6567)

---
## License
This project is open-source.

