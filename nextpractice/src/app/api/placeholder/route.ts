//環境変数を受け取る
const apiKey = process.env.NEXT_PUBLIC_APIKEY;
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//都道府県一覧のデータをサイトから取得する
export const GetPrefectures = async () => {
  if (!apiKey || !apiUrl) {
    throw new Error("エラーが発生しました。");
  }
  const response = await fetch(apiUrl + "prefectures", {
    headers: {
      "X-API-KEY": apiKey,
    },
  });
  const prefectures = await response.json();
  return prefectures;
};

//人口のデータをサイトから取得する
export const GetPopulation = async (prefCode: string) => {
  if (!apiKey || !apiUrl) {
    throw new Error("エラーが発生しました");
  }
  const response = await fetch(
    apiUrl + "population/composition/perYear?prefCode=" + prefCode,
    {
      headers: {
        "X-API-KEY": apiKey,
      },
    }
  );
  const population = await response.json();
  return population;
};
