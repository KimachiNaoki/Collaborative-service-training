"use client";

import Prefectures from "../components/Prefectures";
import CityList from "../components/CityList";
import { useGetPrefectureData } from "../hooks/useGetPrefectureData";
import { useGetCityData } from "../hooks/useGetCityData";
import { Spinner, Flex } from "@chakra-ui/react";
import Header from "../components/Header";

export default function CityListPage() {
  const { prefectures, loading } = useGetPrefectureData();
  const { fetchCityData, cities, removeCityData } = useGetCityData();

  const handleClickCheck = async (
    prefName: string,
    prefCode: number,
    check: boolean
  ) => {
    if (check) {
      fetchCityData(prefCode, prefName);
    } else {
      removeCityData(prefCode);
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
          <Header title={"各県の市町村一覧"} />
          <Prefectures prefectures={prefectures} onChange={handleClickCheck} />
          <br />
          <CityList cities={cities} />
        </>
      )}
    </>
  );
}
