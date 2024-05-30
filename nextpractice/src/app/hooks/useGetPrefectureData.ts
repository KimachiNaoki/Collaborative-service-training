import { useState, useEffect } from "react";
import { GetPrefectures } from "../api/placeholder/route";
import { Prefecture, PrefecturesApiResponse } from "../types";

//都道府県のデータを取得するフック
export const useGetPrefectureData = () => {
  //都道府県のデータを取得するstateを追加
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //都道府県一覧のデータを取得し、prefecturesにセットする
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

  //必要なものを返す
  return { prefectures, loading };
};
