import { useState, useEffect } from "react";
import { GetPrefectures } from "../api/placeholder/route";

//型を定義する
type Prefecture = {
  prefCode: number;
  prefName: string;
};

type PrefecturesApiResponse = {
  message: null;
  result: Prefecture[];
};

//都道府県のデータを取得する
export const useGetPrefectures = () => {
  //stateを追加
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //実際にroute.ts接続して、データを取得する
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
