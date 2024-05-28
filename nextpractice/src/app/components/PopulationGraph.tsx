import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

//Propsの型を定義
type Props = {
  populations: {
    prefName: string;
    data: { year: number; value: number }[];
  }[];
  selectedGraph: string;
};

//グラフを作成するコンポーネント
export default function PopulationsGraph({
  populations,
  selectedGraph,
}: Props) {
  const categoriesSet = new Set<string>();
  const series: Highcharts.SeriesOptionsType[] = populations.map((p) => {
    const data = p.data.map((pd) => {
      categoriesSet.add(String(pd.year));
      return pd.value;
    });

    return {
      type: "line",
      name: p.prefName,
      data,
    };
  });

  const categories = Array.from(categoriesSet).sort();

  const options: Highcharts.Options = {
    title: {
      text: "各県の" + selectedGraph + "推移",
    },
    xAxis: {
      title: {
        text: "年度",
      },
      categories,
    },
    yAxis: {
      title: {
        text: "人口数",
      },
    },
    series:
      series.length === 0
        ? [{ type: "line", name: "都道府県名", data: [] }]
        : series,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
