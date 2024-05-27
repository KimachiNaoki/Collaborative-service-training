type Props = {
  prefectures: {
    prefCode: number;
    prefName: string;
  }[];

  onChange: (name: string, prefName: number, check: boolean) => void;
};

export default function Prefectures({ prefectures, onChange }: Props) {
  return (
    <div>
      <h2>都道府県</h2>
      {prefectures.map((prefecture) => (
        <div key={prefecture.prefCode}>
          <input
            type="checkbox"
            id={prefecture.prefCode.toString()}
            value={prefecture.prefName}
            onChange={(event) => {
              onChange(
                prefecture.prefName,
                prefecture.prefCode,
                event.target.checked
              );
            }}
          />
          <label htmlFor={prefecture.prefCode.toString()}>
            {prefecture.prefName}
          </label>
        </div>
      ))}
    </div>
  );
}
