import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Missing lat/lon params" },
        { status: 400 }
      );
    }

    // Weather API
    const weatherRes = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true,  
      },
    });

    const weatherData = weatherRes.data.current_weather;

    // Reverse geocoding (must send User-Agent!)
    const geoRes = await axios.get("https://nominatim.openstreetmap.org/reverse", {
      params: {
        lat,
        lon,
        format: "json",
      },
      headers: {
        "User-Agent": "my-weather-app/1.0 (contact@example.com)", // required
      },
    });

    const geo = geoRes.data;
    const city =
      geo.address.city || geo.address.town || geo.address.village ||  geo.address.county || geo.address.state || "Unknown";
    const country = geo.address.country || "Unknown";

    return NextResponse.json(
      {
        temperature: weatherData.temperature,
        weathercode: weatherData.weathercode,
        windspeed: weatherData.windspeed,
        winddirection: weatherData.winddirection,
        city,
        country,
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
