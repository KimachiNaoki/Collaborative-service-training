"use client";

import { useState, useEffect } from "react";
import { useGetPrefectureData } from "../hooks/useGetPrefectureData";
import { useGetPopulationData } from "../hooks/useGetPopulationData";
import { useRouter } from "next/navigation";
import Prefectures from "./Prefectures";
import PopulationsGraph from "./PopulationGraph";
import RadioButton from "./RadioButton";
import { Flex, Spinner, Box } from "@chakra-ui/react";

//Mainの処理
export default function Main() {
  //グラフの種類を取得するstate
  const [selectedOption, setSelectedOption] = useState<string>("総人口");
  //都道府県データを取得するカスタムフックから必要なデータを取得する
  const { prefectures, loading } = useGetPrefectureData();
  //人口データを取得するカスタムフックから必要なデータを取得する
  const { populations, fetchPopulationData, removePopulationData } =
    useGetPopulationData(selectedOption);
  //画面遷移のための定数
  const router = useRouter();

  // 都道府県データが0件の場合、データ取得失敗画面にリダイレクト
  useEffect(() => {
    if (!loading && prefectures.length === 0) {
      router.push("/notGet");
    }
  }, [loading, prefectures, router]);

  //グラフの種類が変更されたときに、selectedOptionの値を変更する
  const changeGraph = (select: string) => {
    setSelectedOption(select);
  };

  //都道府県チェックボックスが押されたときに関数を呼び出す
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
