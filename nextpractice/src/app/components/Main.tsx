"use client";

import { useState, useEffect } from "react";
import { GetPopulation, GetPrefectures } from "../api/placeholder/route";
import Prefectures from "./Prefectures";
import PopulationsGraph from "./PopulationGraph";
import RadioButton from "./RadioButton";
import Header from "./Header";

//型の定義
type Prefecture = {
  prefCode: number;
  prefName: string;
};

type PrefecturesApiResponse = {
  message: null;
  result: Prefecture[];
};

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

//メインの処理
export default function Main() {
  //useStateを定義
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [populations, setPopulations] = useState<
    { prefName: string; prefCode: number; data: Population[] }[]
  >([]);
  const [selectedOption, setSelectedOption] = useState<string>("総人口");
  const [loading, setLoading] = useState<boolean>(true);

  // 都道府県一覧を取得
  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const resultPrefectures: PrefecturesApiResponse =
          await GetPrefectures();
        setPrefectures(resultPrefectures.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prefectures:", error);
        setLoading(false);
      }
    };
    fetchPrefectures();
  }, []);

  // チェックされたグラフの種類に変更
  const changeGraph = (select: string) => {
    setSelectedOption(select);
  };

  // チェックされた都道府県の人口データを取得
  const handleClickCheck = async (
    prefName: string,
    prefCode: number,
    check: boolean
  ) => {
    let newPopulation = [...populations];

    if (check) {
      if (
        newPopulation.findIndex((value) => value.prefName === prefName) !== -1
      )
        return;

      try {
        const resultPopulations: PopulationApiResponse = await GetPopulation(
          prefCode.toString()
        );
        console.log(resultPopulations);
        const populationData =
          resultPopulations.result.data.find(
            (item) => item.label === selectedOption
          )?.data || [];

        console.log(populationData);

        newPopulation.push({
          prefName: prefName,
          prefCode: prefCode,
          data: populationData,
        });
        setPopulations(newPopulation);
      } catch (error) {
        console.error("Error fetching population data:", error);
      }
    } else {
      newPopulation = newPopulation.filter(
        (item) => item.prefName !== prefName
      );
      setPopulations(newPopulation);
    }
  };

  // populationsステートのログを確認するために追加
  useEffect(() => {
    console.log(populations);
  }, [populations]);

  // グラフの種類が変更されたときに人口データを再取得
  useEffect(() => {
    const fetchData = async () => {
      const newPopulations = await Promise.all(
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
            return {
              prefName: population.prefName,
              prefCode: population.prefCode,
              data: [],
            };
          }
        })
      );
      setPopulations(newPopulations);
    };

    if (populations.length > 0) {
      fetchData();
    }
  }, [selectedOption]);

  return (
    <>
      {loading ? (
        <div>ロード中...</div>
      ) : (
        <>
          <Header />
          <Prefectures prefectures={prefectures} onChange={handleClickCheck} />
          <br />
          <RadioButton selectedOption={selectedOption} onChange={changeGraph} />
          <br />
          <PopulationsGraph
            populations={populations}
            selectedGraph={selectedOption}
          />
        </>
      )}
    </>
  );
}
