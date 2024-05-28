type Props = {
  selectedOption: string;
  onChange: (value: string) => void;
};

//グラフ種類のラジオボタンを表示するコンポーネント
export default function RadioButton({ selectedOption, onChange }: Props) {
  return (
    <div>
      <label>
        <input
          type="radio"
          value="総人口"
          checked={selectedOption === "総人口"}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          name="Graph"
        />
        各県の総人口推移
      </label>

      <label>
        <input
          type="radio"
          value="年少人口"
          checked={selectedOption === "年少人口"}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          name="Graph"
        />
        各県の年少人口推移
      </label>

      <label>
        <input
          type="radio"
          value="生産年齢人口"
          checked={selectedOption === "生産年齢人口"}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          name="Graph"
        />
        各県の生産年齢人口推移
      </label>

      <label>
        <input
          type="radio"
          value="老年人口"
          checked={selectedOption === "老年人口"}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          name="Graph"
        />
        各県の老年人口推移
      </label>
    </div>
  );
}
