import { Box } from "@chakra-ui/react";
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
    chart: {
      type: "line",
      backgroundColor: "white",
    },
    title: {
      text: selectedGraph + "推移",
    },
    subtitle: {
      text: "Source: https://opendata.resas-portal.go.jp/",
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

    tooltip: {
      valueSuffix: "人",
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      borderWidth: 0,
    },

    series:
      series.length === 0
        ? [{ type: "line", name: "都道府県名", data: [] }]
        : series,
  };

  return (
    <Box width={{ base: "100%", md: "80%", lg: "70%" }} margin="0 auto">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
}
