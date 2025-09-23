# Weather App

A clean, modern, and responsive weather application built with Next.js, TypeScript, and Tailwind CSS. It provides real-time weather data, daily and hourly forecasts, and allows users to search for any location, save favorites, and compare weather conditions between multiple cities.

## Features

-   **Real-time Weather Data**: Get the current temperature, humidity, wind speed, and precipitation for any location worldwide.
-   **Dynamic Search**: Instantly search for cities and locations with live suggestions.
-   **Hourly & Daily Forecasts**: View detailed forecasts for the next 7 days and hourly breakdowns for the selected day.
-   **Unit Conversion**: Seamlessly switch between Metric (Celsius, km/h) and Imperial (Fahrenheit, mph) systems.
-   **Location Comparison**: Add multiple cities to a comparison grid to easily view their weather conditions side-by-side.
-   **Favorites System**: Save your most-viewed locations for quick access.
-   **Automatic Theme**: The UI automatically switches between light and dark modes based on the time of day.

## Technologies Used

| Technology                                                    | Description                              |
| ------------------------------------------------------------- | ---------------------------------------- |
| [Next.js](https://nextjs.org/)                                | React framework for server-side rendering and API routes. |
| [React](https://reactjs.org/)                                 | A JavaScript library for building user interfaces. |
| [TypeScript](https://www.typescriptlang.org/)                 | Typed superset of JavaScript for robust, scalable code. |
| [Tailwind CSS](https://tailwindcss.com/)                      | A utility-first CSS framework for rapid UI development. |
| [Framer Motion](https://www.framer.com/motion/)               | A production-ready animation library for React. |
| [Axios](https://axios-http.com/)                              | Promise-based HTTP client for making API requests. |
| [Open-Meteo API](https://open-meteo.com/)                     | Source for weather forecast data.        |
| [Nominatim API](https://nominatim.org/)                       | Service for reverse geocoding location names. |

## Getting Started

To get a local copy up and running, follow these simple steps.

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Bensaxxy/Weather-app.git
    ```
2.  **Navigate to the Project Directory**
    ```bash
    cd Weather-app
    ```
3.  **Install Dependencies**
    ```bash
    npm install
    ```
4.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Documentation

The application uses an internal API route to act as a proxy, fetching and consolidating data from external services.

### Weather App API

#### Overview
This is a serverless API endpoint built with Next.js API Routes and TypeScript. It fetches weather and geocoding data from the Open-Meteo and Nominatim APIs, respectively, and returns a unified JSON response.

#### Features
- **Next.js**: API route handler.
- **Axios**: HTTP client for fetching data from external APIs.
- **TypeScript**: Ensures type safety for requests and responses.

#### Getting Started
The API is part of the main application and requires no separate installation. It runs automatically when you start the development server (`npm run dev`).

##### Environment Variables
No environment variables are required to run this project.

#### API Documentation

##### Base URL
`/api`

##### Endpoints
###### GET /weather
Fetches comprehensive weather data for a specified geographical coordinate.

**Request**:
This endpoint uses query parameters to specify the location and unit preferences.

| Parameter    | Type   | Description                                              | Required | Default   |
|--------------|--------|----------------------------------------------------------|----------|-----------|
| `lat`        | number | The latitude of the location.                            | Yes      | N/A       |
| `lon`        | number | The longitude of the location.                           | Yes      | N/A       |
| `tempUnit`   | string | Temperature unit. Accepts `celsius` or `fahrenheit`.     | No       | `celsius` |
| `windUnit`   | string | Wind speed unit. Accepts `kmh` or `mph`.                 | No       | `kmh`     |
| `precipUnit` | string | Precipitation unit. Accepts `mm` or `inch`.              | No       | `mm`      |

*Example Request URL:*
`/api/weather?lat=52.52&lon=13.41&tempUnit=celsius&windUnit=kmh`

**Response**:
A successful request returns a `200 OK` status with a JSON object containing current weather, hourly forecasts grouped by day, and a 7-day daily forecast.

*Success Response Example (200 OK):*
```json
{
  "latitude": 52.52,
  "longitude": 13.41,
  "generationtime_ms": 0.5,
  "utc_offset_seconds": 0,
  "timezone": "GMT",
  "timezone_abbreviation": "GMT",
  "elevation": 38,
  "current_weather": {
    "time": "2024-05-20T12:00",
    "temperature": 15.3,
    "weathercode": 3,
    "windspeed": 10.8,
    "winddirection": 270
  },
  "temperature": 15.3,
  "weathercode": 3,
  "windspeed": 10.8,
  "winddirection": 270,
  "feelsLike": 14.5,
  "humidity": 65,
  "precipitation": 0.1,
  "city": "Berlin",
  "country": "Germany",
  "dailyForecast": [
    {
      "date": "2024-05-20",
      "max": 18.5,
      "min": 10.2,
      "code": 3,
      "sunrise": "2024-05-20T04:55",
      "sunset": "2024-05-20T21:05"
    }
  ],
  "hourlyByDay": {
    "2024-05-20": [
      {
        "time": "2024-05-20T12:00",
        "temp": 14.5,
        "code": 3
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
- **400 Bad Request**: Returned if the `lat` or `lon` query parameters are missing.
  ```json
  {
    "error": "Missing latitude or longitude"
  }
  ```
- **500 Internal Server Error**: Returned if the server fails to fetch data from the external weather APIs.
  ```json
  {
    "error": "Failed to fetch weather data"
  }
  ```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

-   🍴 Fork the Project
-   ⭐ Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
-   ✅ Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
-   📌 Push to the Branch (`git push origin feature/AmazingFeature`)
-   ⤴️ Open a Pull Request

## License

This project does not have a license. All rights are reserved.

## Author Info

-   **LinkedIn**: [Your LinkedIn Profile](https://www.linkedin.com/in/oluwasegun-benjamin-a80b76252/)
-   **Twitter**: [@YourTwitterHandle](https://x.com/Bensaxxy11)
