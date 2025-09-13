import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    // if (!lat || !lon) {
    //   return NextResponse.json(
    //     { error: "Missing lat/lon params" },
    //     { status: 400 }
    //   );
    // }

    // Weather API
    const weatherRes = await axios.get(
      "https://api.open-meteo.com/v1/forecast",
      {
        params: {
          latitude: lat,
          longitude: lon,
          current_weather: true,
          hourly: "apparent_temperature,relativehumidity_2m,precipitation",
          daily: "temperature_2m_max,temperature_2m_min,weathercode",
          timezone: "auto",
        },
      }
    );

    const weatherData = weatherRes.data.current_weather;

    // Reverse geocoding (must send User-Agent!)
    const geoRes = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          lat,
          lon,
          format: "json",
        },
        headers: {
          "User-Agent": "my-weather-app/1.0 (contact@example.com)", // required
        },
      }
    );

    const geo = geoRes.data;
    const city =
      geo.address.city ||
      geo.address.town ||
      geo.address.village ||
      geo.address.county ||
      geo.address.state ||
      "Unknown";
    const country = geo.address.country || "Unknown";

    // Get the current hour in the same format as Open-Meteo
    const now = new Date();
    const currentHour = now.toISOString().slice(0, 13) + ":00"; // e.g. 2025-09-12T17:00

    // Find the index in the array
    const currentHourIndex = weatherRes.data.hourly.time.indexOf(currentHour);

    // Safely extract values if found
    const feelsLike =
      currentHourIndex !== -1
        ? weatherRes.data.hourly.apparent_temperature[currentHourIndex]
        : null;

    const humidity =
      currentHourIndex !== -1
        ? weatherRes.data.hourly.relativehumidity_2m[currentHourIndex]
        : null;

    const precipitation =
      currentHourIndex !== -1
        ? weatherRes.data.hourly.precipitation[currentHourIndex]
        : null;

    // Daily forecast
    const daily = weatherRes.data.daily;

    return NextResponse.json(
      {
        temperature: weatherData.temperature,
        weathercode: weatherData.weathercode,
        windspeed: weatherData.windspeed,
        winddirection: weatherData.winddirection,

        feelsLike,
        humidity,
        precipitation,
        city,
        country,

        // daily
        dailyForecast: daily.time.map((date: string, i: number) => ({
          date,
          max: daily.temperature_2m_max[i],
          min: daily.temperature_2m_min[i],
          code: daily.weathercode[i],
        })),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Weather API error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
