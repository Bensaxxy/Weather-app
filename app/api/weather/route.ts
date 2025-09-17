import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    // Map frontend-friendly values to Open-Meteo API units
    const tempUnitParam = searchParams.get("tempUnit") || "celsius"; // celsius | fahrenheit
    const windUnitParam = searchParams.get("windUnit") || "kmh"; // kmh | mph
    const precipUnitParam = searchParams.get("precipUnit") || "mm"; // mm | inch

    // Map to Open-Meteo API valid values
    const tempUnitMap: Record<string, string> = {
      celsius: "celsius",
      fahrenheit: "fahrenheit",
    };
    const windUnitMap: Record<string, string> = {
      kmh: "kmh",
      mph: "mph",
    };
    const precipUnitMap: Record<string, string> = {
      mm: "mm",
      inch: "inch",
    };

    // Ensure only valid units are passed to API
    const temperature_unit = tempUnitMap[tempUnitParam] || "celsius";
    const windspeed_unit = windUnitMap[windUnitParam] || "kmh";
    const precipitation_unit = precipUnitMap[precipUnitParam] || "mm";

    // Weather API
    const weatherRes = await axios.get(
      "https://api.open-meteo.com/v1/forecast",
      {
        params: {
          latitude: lat,
          longitude: lon,
          current_weather: true,
          hourly:
            "apparent_temperature,relativehumidity_2m,precipitation,weathercode",
          daily: "temperature_2m_max,temperature_2m_min,weathercode",
          timezone: "auto",
          temperature_unit,
          windspeed_unit,
          precipitation_unit,
        },
      }
    );

    const weatherData = weatherRes.data.current_weather;

    // Reverse geocoding
    const geoRes = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          lat,
          lon,
          format: "json",
        },
        headers: {
          "User-Agent": "my-weather-app/1.0 (contact@example.com)",
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

    // Current hour for indexing
    const now = new Date();
    const currentHour = now.toISOString().slice(0, 13) + ":00";
    const currentHourIndex = weatherRes.data.hourly.time.indexOf(currentHour);

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

    // Group hourly forecast by day
    const hourly = weatherRes.data.hourly;
    const groupedHourly: Record<string, any[]> = {};
    hourly.time.forEach((t: string, i: number) => {
      const date = t.split("T")[0];
      if (!groupedHourly[date]) groupedHourly[date] = [];
      groupedHourly[date].push({
        time: t,
        temp: hourly.apparent_temperature[i],
        code: hourly.weathercode?.[i] ?? 0,
      });
    });

    const daily = weatherRes.data.daily;

    return NextResponse.json(
      {
        ...weatherRes.data,
        temperature: weatherData.temperature,
        weathercode: weatherData.weathercode,
        windspeed: weatherData.windspeed,
        winddirection: weatherData.winddirection,
        feelsLike,
        humidity,
        precipitation,
        city,
        country,

        dailyForecast: daily.time.map((date: string, i: number) => ({
          date,
          max: daily.temperature_2m_max[i],
          min: daily.temperature_2m_min[i],
          code: daily.weathercode[i],
        })),

        hourlyByDay: groupedHourly,

        // Return selected units so frontend can render accordingly
        units: {
          temperature: temperature_unit,
          wind: windspeed_unit,
          precipitation: precipitation_unit,
        },
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
