import { useState, useEffect } from "react";
import { GetPopulation } from "../api/placeholder/route";
import { Population, PopulationApiResponse } from "../types";

//人口データを取得するフック
export const useGetPopulationData = (selectedOption: string) => {
  //人口のデータを取得するstateを追加
  const [populations, setPopulations] = useState<
    { prefName: string; prefCode: number; data: Population[] }[]
  >([]);

  //チェックされた都道府県の人口データをpopulationに追加する
  const fetchPopulationData = async (prefCode: number, prefName: string) => {
    try {
      const resultPopulations: PopulationApiResponse = await GetPopulation(
        prefCode.toString()
      );
      //人口種類のラベルが同じもののデータを取得する
      const populationData =
        resultPopulations.result.data.find(
          (item) => item.label === selectedOption
        )?.data || [];

      //取得したデータを追加
      setPopulations((prevPopulations) => [
        ...prevPopulations,
        {
          prefName,
          prefCode,
          data: populationData,
        },
      ]);
    } catch (error) {
      console.error("Error fetching population data:", error);
    }
  };

  //チェックが外された都道府県のデータをpopulationから削除する
  const removePopulationData = (prefName: string) => {
    setPopulations((prevPopulations) =>
      prevPopulations.filter((item) => item.prefName !== prefName)
    );
  };

  //グラフの種類を変更したときに、populationのデータを変更する
  useEffect(() => {
    const updatePopulationData = async () => {
      const updatedPopulations = await Promise.all(
        populations.map(async (population) => {
          try {
            const resultPopulations: PopulationApiResponse =
              await GetPopulation(population.prefCode.toString());
            const populationData =
              resultPopulations.result.data.find(
                (item) => item.label === selectedOption
              )?.data || [];
            return {
              prefName: population.prefName,
              prefCode: population.prefCode,
              data: populationData,
            };
          } catch (error) {
            console.error("Error fetching population data:", error);
            return { ...population, data: [] };
          }
        })
      );
      setPopulations(updatedPopulations);
    };

    if (populations.length > 0) {
      updatePopulationData();
    }
  }, [selectedOption]);

  //必要なものを返す
  return { populations, fetchPopulationData, removePopulationData };
};
