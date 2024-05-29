"use client";

import { useState } from "react";
import { useGetPrefectures } from "../hooks/useGetPrefectures";
import { useGetPopulations } from "../hooks/useGetPopulations";
import Prefectures from "./Prefectures";
import PopulationsGraph from "./PopulationGraph";
import RadioButton from "./RadioButton";
import Header from "./Header";
import { Flex, Spinner, Box } from "@chakra-ui/react";

//Mainの処理
export default function Main() {
  //stateを定義
  const [selectedOption, setSelectedOption] = useState<string>("総人口");
  //カスタムフックから必要な関数・stateを取り出す
  const { prefectures, loading } = useGetPrefectures();
  const { populations, fetchPopulationData, removePopulationData } =
    useGetPopulations(selectedOption);

  //グラフの種類が変更されたときに、stateの値を変更する
  const changeGraph = (select: string) => {
    setSelectedOption(select);
  };

  //チェックボックスが押されたときに関数を呼び出す
  const handleClickCheck = async (
    prefName: string,
    prefCode: number,
    check: boolean
  ) => {
    if (check) {
      fetchPopulationData(prefCode, prefName);
    } else {
      removePopulationData(prefName);
    }
  };

  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" height="100vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <>
          <Header />
          <Prefectures prefectures={prefectures} onChange={handleClickCheck} />
          <br />
          <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg">
            <RadioButton
              selectedOption={selectedOption}
              onChange={changeGraph}
            />
            <PopulationsGraph
              populations={populations}
              selectedGraph={selectedOption}
            />
          </Box>
        </>
      )}
    </>
  );
}
