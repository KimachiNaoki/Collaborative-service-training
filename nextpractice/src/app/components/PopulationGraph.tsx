import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type Props = {
  populations: {
    prefName: string;
    data: { year: number; value: number }[];
  }[];
};

export default function PopulationsGraph({ populations }: Props) {
  if (populations.length === 0) {
    return <div>チェックされていません</div>;
  }

  return (
    <>
      <ul>
        {populations.map((pop) => (
          <li key={pop.prefName}>
            <span className="prefName">{pop.prefName}</span>
            <ul>
              {pop.data.map((datum) => (
                <li key={datum.year}>
                  {datum.year}: {datum.value}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
