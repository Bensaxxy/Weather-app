# WeatherCast: Real-time Weather Application ☀️

## Overview
WeatherCast is a modern and responsive weather application built with Next.js, React, and TypeScript. It offers real-time weather forecasts, hourly and daily predictions, and advanced features like location comparison and voice search, all styled with Tailwind CSS for a seamless user experience.

## Features
*   🌍 **Global Weather Search**: Effortlessly find current weather conditions and forecasts for any location worldwide.
*   🌡️ **Customizable Units**: Toggle between Celsius/Fahrenheit, Km/h/Mph for wind, and Millimeters/Inches for precipitation.
*   📅 **Daily & Hourly Forecasts**: Get detailed weather predictions for the coming days and hours.
*   🎤 **Voice Search**: Utilize speech-to-text functionality for quick and convenient location lookups.
*   💖 **Favorite Locations**: Save frequently visited locations for instant access to their weather data.
*   🔄 **Recent Searches**: Automatically keeps a history of your latest weather queries.
*   📊 **Location Comparison**: Compare weather conditions across multiple selected cities side-by-side.
*   🌓 **Automatic Theme Switching**: Dynamic theme (light/dark) based on the time of day, enhancing visual comfort.
*   ⚙️ **Next.js API Routes**: Backend proxy built with Node.js and TypeScript for efficient data fetching from external weather services.

## Getting Started

To get WeatherCast up and running on your local machine, follow these steps.

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Bensaxxy/Weather-app.git
    cd Weather-app/my-project
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Run the Development Server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    ✨ The application will be accessible at `http://localhost:3000`.

### Environment Variables
No specific environment variables are strictly required to run the application or its API routes, as it directly consumes public external APIs (Open-Meteo, Nominatim).

## Usage

Once the application is running, you can interact with it in several ways:

*   **Search for a Location**: Type a city name into the search bar at the top of the page and click "Search" or press Enter. The main display will update with the weather for that location.
*   **Voice Search**: Click the microphone icon in the search bar to activate voice input. Speak the desired location, and the app will process your command.
*   **Unit Preferences**: Click the "Units" button in the navigation bar to open a modal where you can customize temperature, wind speed, and precipitation units.
*   **Favorite Locations**:
    *   When searching, use the "★" icon next to a suggestion to add it to your favorites.
    *   Click the "Favorites" dropdown to quickly select a saved location.
    *   Remove a favorite by clicking the "✕" button next to it in the Favorites dropdown.
*   **Compare Locations**:
    *   When searching, use the "+ Add" button next to a suggestion to add it to your comparison list.
    *   Click the "Comparing Locations" button to view a grid of all added locations and their key weather metrics.
    *   Remove a location from the comparison grid using the "✕" button.
*   **View Forecasts**: The main weather grid will show current conditions, detailed metrics, and a 7-day daily forecast. The right sidebar provides an hourly forecast, which can be filtered by day.

## Technologies Used
| Technology | Description |
| :--------- | :---------- |
| Next.js    | React framework for building server-side rendered and static web applications. |
| React      | JavaScript library for building user interfaces. |
| TypeScript | Superset of JavaScript that adds static typing. |
| Tailwind CSS | Utility-first CSS framework for rapid UI development. |
| Framer Motion | Production-ready motion library for React. |
| Axios      | Promise-based HTTP client for making API requests. |
| Lucide React | A beautiful, open-source icon library. |
| Next-Themes | Theme provider for Next.js applications. |
| Open-Meteo API | Free weather API for open-source and non-commercial use. |
| Nominatim (OpenStreetMap) | Geocoding service for converting addresses/names into coordinates and vice-versa. |

## Weather App API

### Overview
The Weather App API is a Next.js API Route, implemented in Node.js with TypeScript, designed to serve as a robust proxy for external weather and geocoding services. It aggregates data from the Open-Meteo API for comprehensive weather forecasts and Nominatim (OpenStreetMap) for reverse geocoding, providing a unified and processed weather data payload to the frontend.

### Features
- `Next.js API Routes`: Leverages Next.js's serverless function capabilities for efficient backend logic execution.
- `Axios`: Utilized for making synchronous and asynchronous HTTP requests to external weather and geocoding APIs.
- `TypeScript`: Ensures type-safe and maintainable code for API request handling and data processing.
- `Open-Meteo API Integration`: Fetches detailed current weather, hourly forecasts, and daily summaries.
- `Nominatim (OpenStreetMap) Integration`: Performs reverse geocoding to resolve geographic coordinates into human-readable city and country names.
- `Unit Conversion`: Dynamically adjusts weather data units (temperature, wind, precipitation) based on client preferences.

### Getting Started
Installation for the API route is part of the overall project setup described in the main `Installation` section.

### Environment Variables
No specific environment variables are required for the API route itself as it directly consumes public external APIs without requiring API keys.

### API Documentation
#### Base URL
The API is served directly from the Next.js application at the following base path:
`/api/weather`

#### Endpoints
#### GET /api/weather
Retrieves current weather conditions, a detailed hourly forecast, and a 7-day daily forecast for a specified geographic location.

**Request**:
Query parameters:
- `lat` (string, required): Latitude of the desired location.
- `lon` (string, required): Longitude of the desired location.
- `tempUnit` (string, optional): Preferred temperature unit. Valid values: `celsius` (default), `fahrenheit`.
- `windUnit` (string, optional): Preferred wind speed unit. Valid values: `kmh` (default), `mph`.
- `precipUnit` (string, optional): Preferred precipitation unit. Valid values: `mm` (default), `inch`.

Example Request:
`GET /api/weather?lat=9.05785&lon=7.49508&tempUnit=celsius&windUnit=kmh&precipUnit=mm`

**Response**:
Success Response (Status: 200 OK):
```json
{
  "current_weather": {
    "temperature": 25.5,
    "weathercode": 2,
    "windspeed": 10.2,
    "winddirection": 180
  },
  "hourly": {
    "time": ["2023-10-27T00:00", ...],
    "apparent_temperature": [24.1, ...],
    "relativehumidity_2m": [70, ...],
    "precipitation": [0.1, ...],
    "weathercode": [1, ...],
    "uv_index": [3, ...],
    "visibility": [10000, ...],
    "surface_pressure": [1012, ...],
    "cloudcover": [50, ...]
  },
  "daily": {
    "time": ["2023-10-27", ...],
    "temperature_2m_max": [30.1, ...],
    "temperature_2m_min": [20.5, ...],
    "weathercode": [1, ...],
    "sunrise": ["2023-10-27T06:30", ...],
    "sunset": ["2023-10-27T18:00", ...]
  },
  "temperature": 25.5,
  "weathercode": 2,
  "windspeed": 10.2,
  "winddirection": 180,
  "feelsLike": 24.1,
  "humidity": 70,
  "precipitation": 0.1,
  "uvIndex": 3,
  "visibility": 10000,
  "pressure": 1012,
  "cloudcover": 50,
  "city": "Abuja",
  "country": "Nigeria",
  "dailyForecast": [
    {
      "date": "2023-10-27",
      "max": 30.1,
      "min": 20.5,
      "code": 1,
      "sunrise": "2023-10-27T06:30",
      "sunset": "2023-10-27T18:00"
    }
  ],
  "hourlyByDay": {
    "2023-10-27": [
      {"time": "2023-10-27T00:00", "temp": 24.1, "code": 1},
      ...
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
- `400 Bad Request`:
  ```json
  {
    "error": "Missing latitude or longitude"
  }
  ```
  Scenario: `lat` or `lon` query parameters are not provided.
- `500 Internal Server Error`:
  ```json
  {
    "error": "Failed to fetch weather data"
  }
  ```
  Scenario: An unexpected error occurred during the fetch operation from external APIs or during data processing.

## Contributing

We welcome contributions to enhance WeatherCast! If you're looking to contribute, please follow these guidelines:

*   **Fork the Repository**: Start by forking the project to your GitHub account.
*   **Create a New Branch**: For new features or bug fixes, create a dedicated branch (e.g., `feature/add-dark-mode` or `bugfix/fix-search-issue`).
*   **Make Your Changes**: Implement your feature or fix, ensuring that your code adheres to the project's coding standards.
*   **Test Your Changes**: Verify that your changes work as expected and do not introduce new issues.
*   **Commit Your Changes**: Write clear and concise commit messages.
*   **Open a Pull Request**: Submit a pull request to the `main` branch of this repository, describing your changes in detail.

## License

No explicit license file is provided, assuming standard open-source practices.

## Author

**[Your Name]** 🧑‍💻
*   LinkedIn: [Your LinkedIn Profile]
*   Twitter: [Your Twitter Handle]
*   Portfolio: [Your Portfolio Link]

---

[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Axios](https://img.shields.io/badge/axios-6710E6?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)