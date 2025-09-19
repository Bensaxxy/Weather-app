# SkyWatch Weather Dashboard

A sleek, responsive weather application built with Next.js, providing real-time weather data, daily and hourly forecasts, and a location comparison feature.

## ✨ Features

-   **Real-time Weather Data**: Get current temperature, humidity, wind speed, and precipitation levels for any location.
-   **Dynamic Location Search**: Instantly find weather information for any city or region worldwide using the OpenStreetMap Nominatim API.
-   **Multi-Location Comparison**: Add multiple locations to a comparison grid to easily track weather conditions across different places.
-   **Customizable Units**: Seamlessly switch between Metric and Imperial systems (Celsius/Fahrenheit, km/h/mph).
-   **Detailed Forecasts**: View comprehensive 7-day daily forecasts and hourly predictions for the selected day.
-   **Automatic Day/Night Theme**: The UI intelligently switches between light and dark modes based on the user's local time.
-   **Responsive Design**: A clean, modern interface that provides a great user experience on both desktop and mobile devices.

## 🛠️ Technologies Used

| Technology                                                     | Description                                    |
| -------------------------------------------------------------- | ---------------------------------------------- |
| [Next.js](https://nextjs.org/)                                 | React framework for server-side rendering & API routes. |
| [TypeScript](https://www.typescriptlang.org/)                  | Statically typed language for robust code.     |
| [Tailwind CSS](https://tailwindcss.com/)                       | A utility-first CSS framework for rapid UI development. |
| [Framer Motion](https://www.framer.com/motion/)                | Animation library for creating fluid user interfaces. |
| [Axios](https://axios-http.com/)                               | Promise-based HTTP client for making API requests. |
| [Open-Meteo API](https://open-meteo.com/)                      | Source for detailed weather forecast data.     |
| [Nominatim API](https://nominatim.openstreetmap.org/)          | Service for reverse geocoding and location search. |

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v20.x or later recommended)
-   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Bensaxxy/Weather-app.git
    ```

2.  **Navigate to the project directory**:
    ```bash
    cd Weather-app
    ```

3.  **Install the dependencies**:
    ```bash
    npm install
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

## 🖥️ Usage

-   **Search for a location**: Type a city name into the search bar and click the "Search" button to fetch its weather data.
-   **Change units**: Click the "Units" button in the top-right corner to open a modal where you can switch between Metric and Imperial systems.
-   **Compare locations**: In the search suggestions dropdown, click the `+ Add` button next to a location to add it to the comparison dashboard.
-   **View hourly forecast**: Use the dropdown in the "Hourly forecast" panel to select a specific day and view its detailed hourly weather breakdown.

---

# SkyWatch API

## Overview

This project includes a Next.js API route that functions as a backend service. It fetches and combines data from the Open-Meteo (weather) and Nominatim (geocoding) APIs, providing a consolidated JSON response to the client.

## Getting Started

### Installation

The API is part of the main Next.js application. Follow the installation steps in the main "Getting Started" section to run the API server.

### Environment Variables

This project does not require any environment variables or API keys to run.

## API Documentation

### Base URL

`/api`

### Endpoints

#### [GET] /weather

Retrieves detailed weather information for a given latitude and longitude.

**Request**:
The request is made using query parameters.

| Parameter    | Type   | Description                                           | Required | Example      |
| ------------ | ------ | ----------------------------------------------------- | -------- | ------------ |
| `lat`        | number | The latitude of the location.                         | Yes      | `9.05785`    |
| `lon`        | number | The longitude of the location.                        | Yes      | `7.49508`    |
| `tempUnit`   | string | The temperature unit ('celsius' or 'fahrenheit').     | No       | `celsius`    |
| `windUnit`   | string | The wind speed unit ('kmh' or 'mph').                 | No       | `kmh`        |
| `precipUnit` | string | The precipitation unit ('mm' or 'in').                | No       | `mm`         |

*Example URL*: `/api/weather?lat=51.5074&lon=-0.1278&tempUnit=celsius`

**Response**:
A successful request returns a JSON object containing current weather, forecasts, and location details.

```json
{
  "latitude": 52.52,
  "longitude": 13.419998,
  "generationtime_ms": 0.23,
  "utc_offset_seconds": 7200,
  "timezone": "Europe/Berlin",
  "timezone_abbreviation": "CEST",
  "elevation": 38.0,
  "current_weather": {
    "time": "2024-07-28T12:00",
    "temperature": 22.5,
    "windspeed": 10.2,
    "winddirection": 280,
    "weathercode": 3
  },
  "temperature": 22.5,
  "weathercode": 3,
  "windspeed": 10.2,
  "winddirection": 280,
  "feelsLike": 21.8,
  "humidity": 65,
  "precipitation": 0.0,
  "city": "Berlin",
  "country": "Germany",
  "dailyForecast": [
    {
      "date": "2024-07-28",
      "max": 24.1,
      "min": 15.3,
      "code": 3,
      "sunrise": "2024-07-28T05:15",
      "sunset": "2024-07-28T21:05"
    }
  ],
  "hourlyByDay": {
    "2024-07-28": [
      {
        "time": "2024-07-28T00:00",
        "temp": 16.1,
        "code": 1
      }
    ]
  },
  "units": {
    "temperature": "celsius",
    "wind": "kmh",
    "precipitation": "mm"
  }
}
```

**Errors**:

-   **400 Bad Request**: `{"error": "Missing latitude or longitude"}`
    -   This error occurs if the `lat` or `lon` query parameters are not provided in the request URL.
-   **500 Internal Server Error**: `{"error": "Failed to fetch weather data"}`
    -   This error occurs if the backend fails to retrieve data from the external Open-Meteo or Nominatim APIs.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving the application, please feel free to create an issue or submit a pull request.

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

## 📄 License

This project is not licensed.

## 👤 Author

**Bensaxxy**

-   **LinkedIn**: `[Your LinkedIn Profile]`
-   **Twitter**: `[@YourTwitterHandle]`

<br/>

[![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
