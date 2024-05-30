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
