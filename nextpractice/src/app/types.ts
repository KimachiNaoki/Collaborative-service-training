//型を定義する
export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PrefecturesApiResponse = {
  message: null;
  result: Prefecture[];
};

export type Population = {
  year: number;
  value: number;
};

export type PopulationData = {
  label: string;
  data: Population[];
};

export type PopulationApiResponse = {
  message: null;
  result: {
    boundaryYear: number;
    data: PopulationData[];
  };
};

export type City = {
  prefName: string;
  prefCode: number;
  cityCode: number;
  cityName: string;
  bigCityFlag: number;
};

export type CityApiResponse = {
  message: null;
  result: City[];
};
