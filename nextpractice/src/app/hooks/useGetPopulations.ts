import { useState, useEffect } from "react";
import { GetPopulation } from "../api/placeholder/route";

//型を定義
type Population = {
  year: number;
  value: number;
};

type PopulationData = {
  label: string;
  data: Population[];
};

type PopulationApiResponse = {
  message: null;
  result: {
    boundaryYear: number;
    data: PopulationData[];
  };
};

//選択されたグラフの種類の人口データを取得する
export const useGetPopulations = (selectedOption: string) => {
  //stateを追加
  const [populations, setPopulations] = useState<
    { prefName: string; prefCode: number; data: Population[] }[]
  >([]);

  //実際にチェックされた都道府県の人口データを取得する
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

  //チェックが外された都道府県のデータを削除する
  const removePopulationData = (prefName: string) => {
    setPopulations((prevPopulations) =>
      prevPopulations.filter((item) => item.prefName !== prefName)
    );
  };

  //グラフの種類を変更したときに、stateのデータに変更する
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
