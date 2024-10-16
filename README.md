# To-Do List and Weather API

## Overview
This project is designed to practice API handling by creating API for a To-Do list application infused with a real external weather API. It allows users to manage their tasks effectively while also providing current weather information based on user input.

## Features
- **To-Do List Functionality**:
  - Create, Read, Update, and Delete tasks.
  - Simple and intuitive interface for managing daily tasks.
  
- **Weather API Integration**:
  - Fetch real-time weather data from a third-party API.
  - Update weather information dynamically through user input.
  
## Technologies Used
- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Web framework for building APIs and handling routing.
- **Axios**: Promise-based HTTP client for making API requests.
- **EJS**: Template engine for rendering HTML pages.
- **Body-parser**: Middleware for parsing request bodies.
- **WeatherAPI**: External API used to fetch weather data.

## API Endpoints
### To-Do List API Endpoints
- **GET /api/tasks**: Retrieve all tasks.
- **POST /api/tasks**: Create a new task.
- **PATCH /api/tasks/:id**: Update an existing task by ID.
- **DELETE /api/tasks/:id**: Delete a task by ID.

### Weather API Integration
- Weather data is fetched based on user input through a dynamic input field.
