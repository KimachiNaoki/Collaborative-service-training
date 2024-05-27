export const GetPrefectures = async () => {
  const response = await fetch(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    {
      headers: {
        "X-API-KEY": "69YCMgeFyLadqBawSHSfiI39UVydSJYA7bw8fchk",
      },
    }
  );
  const prefectures = await response.json();
  return prefectures;
};

export const GetPopulation = async (prefCode: string) => {
  const response = await fetch(
    "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" +
      prefCode,
    {
      headers: {
        "X-API-KEY": "69YCMgeFyLadqBawSHSfiI39UVydSJYA7bw8fchk",
      },
    }
  );
  const population = await response.json();
  return population;
};
