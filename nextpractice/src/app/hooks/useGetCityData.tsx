import { useEffect, useState } from "react";
import { CityApiResponse, City } from "../types";
import { GetCity } from "../api/placeholder/route";

export const useGetCityData = () => {
  const [cities, setCities] = useState<City[][]>([]);
  const fetchCityData = async (prefCode: number, prefName: string) => {
    try {
      const resultCity: CityApiResponse = await GetCity(prefCode.toString());

      const citiesWithPrefName = resultCity.result.map((city) => ({
        ...city,
        prefName: prefName,
      }));

      setCities((prevCities) => [...prevCities, citiesWithPrefName]);
    } catch (error) {
      console.error("都市データの取得中にエラーが発生しました:", error);
    }
  };

  const removeCityData = (prefCode: number) => {
    setCities((prevCities) => {
      const updatedCities = prevCities.filter(
        (cityArray) => cityArray[0].prefCode !== prefCode
      );
      return updatedCities;
    });
  };

  useEffect(() => {
    console.log(cities);
  }, [cities]);

  return { cities, fetchCityData, removeCityData };
};
