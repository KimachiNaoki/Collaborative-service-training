"use client";

import { useState, useEffect } from "react";
import { GetPrefectures, GetPopulation } from "../api/placeholder/route";
import Prefectures from "./Prefectures";
import PopulationsGraph from "./PopulationGraph";

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

export default function Main() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [populations, setPopulations] = useState<
    { prefName: string; data: Population[] }[]
  >([]);

  // 都道府県一覧を取得
  useEffect(() => {
    const fetchPrefectures = async () => {
      const resultPrefectures: PrefecturesApiResponse = await GetPrefectures();
      setPrefectures(resultPrefectures.result);
    };
    fetchPrefectures();
  }, []);

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
        const populationData = resultPopulations.result.data[0].data;
        console.log(populationData);
        newPopulation.push({
          prefName: prefName,
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
    console.log(populations);
  };

  useEffect(() => {
    console.log("Updated populations", populations);
  }, [populations]);

  return (
    <>
      <Prefectures prefectures={prefectures} onChange={handleClickCheck} />
      <br />
      <h2>人口グラフ</h2>
      <PopulationsGraph populations={populations} />
    </>
  );
}
