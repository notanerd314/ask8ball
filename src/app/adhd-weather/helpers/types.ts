export enum WeatherType {
  CLEAR = "clear",                  // WC 0-1
  CLOUDY = "cloudy",                // WC 2–3
  FOG = "fog",                      // WC 45–48
  LIGHT_RAIN = "light_rain",        // WC 61, 63, 51, 53, 80, 81
  HEAVY_RAIN = "heavy_rain",        // WC 55, 65, 81, 82
  FREEZING_RAIN = "freezing_rain",  // WC 66, 67, 56, 57
  LIGHT_SNOW = "light_snow",        // WC 71, 73, 77, 85
  HEAVY_SNOW = "heavy_snow",        // WC 75, 86
  STORM = "storm",                  // WC 95–99
}

export enum TempGroup {
  COLD = "cold",           // <= 14°C
  WARM = "warm",           // 15–29°C
  HOT = "hot",             // ≥ 30°C
  EXTREME = "extreme",     // ≥ 37°C
}

type Combination = {
  weatherType: WeatherType;
  tempGroup: TempGroup;
};

function getWeatherType(weatherCode: number): WeatherType | undefined {
  const lightRainCodes = new Set([51, 53, 61, 63, 80, 81]);
  const heavyRainCodes = new Set([55, 65, 82]);
  const freezingRainCodes = new Set([56, 57, 66, 67]);
  const lightSnowCodes = new Set([71, 73, 77, 85]);
  const heavySnowCodes = new Set([75, 86]);

  if (weatherCode === 0 || weatherCode === 1) {
    return WeatherType.CLEAR;
  } else if (weatherCode === 2 || weatherCode === 3) {
    return WeatherType.CLOUDY;
  } else if (weatherCode >= 45 && weatherCode <= 48) {
    return WeatherType.FOG;
  } else if (lightRainCodes.has(weatherCode)) {
    return WeatherType.LIGHT_RAIN;
  } else if (heavyRainCodes.has(weatherCode)) {
    return WeatherType.HEAVY_RAIN;
  } else if (freezingRainCodes.has(weatherCode)) {
    return WeatherType.FREEZING_RAIN;
  } else if (lightSnowCodes.has(weatherCode)) {
    return WeatherType.LIGHT_SNOW;
  } else if (heavySnowCodes.has(weatherCode)) {
    return WeatherType.HEAVY_SNOW;
  } else if (weatherCode >= 95 && weatherCode <= 99) {
    return WeatherType.STORM;
  }

  return undefined;
}


export function calculateCombination(
  weatherCode: number,
  temperature: number,
  windSpeed: number
): Combination {
  let tempGroup: TempGroup;

  // Temp logic
  if (temperature < 15) {
    tempGroup = TempGroup.COLD;
  } else if (temperature < 30) {
    tempGroup = TempGroup.WARM;
  } else if (temperature < 37) {
    tempGroup = TempGroup.HOT;
  } else {
    tempGroup = TempGroup.EXTREME;
  }

  const weatherType = getWeatherType(weatherCode);

  if (!weatherType) {
    throw new Error("Invalid weather code");
  }

  return { tempGroup, weatherType };
}

export function allCombinations(): Record<string, Record<string, string>> {
  const combinations: Record<string, Record<string, string>> = {};

  for (const weatherType of Object.values(WeatherType)) {
    combinations[weatherType] = { "title": weatherType };
    for (const tempGroup of Object.values(TempGroup)) {
      combinations[weatherType][tempGroup] = "";
    }
  }

  return combinations;
}
