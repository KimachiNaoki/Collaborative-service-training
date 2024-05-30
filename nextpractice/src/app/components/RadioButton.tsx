import React from "react";
import { Button, RadioGroup, Stack, Flex } from "@chakra-ui/react";

//Propsの型定義
type Props = {
  selectedOption: string;
  onChange: (value: string) => void;
};

// 選択肢の配列
const options = [
  { label: "総人口", value: "総人口" },
  { label: "年少人口", value: "年少人口" },
  { label: "生産年齢人口", value: "生産年齢人口" },
  { label: "老年人口", value: "老年人口" },
];

//グラフの種類を選択するボタンを表示するコンポーネント
export default function RadioButton({ selectedOption, onChange }: Props) {
  return (
    <Flex justify="center" align="center" height="100%" mb={3}>
      <RadioGroup value={selectedOption} onChange={onChange}>
        <Stack spacing={4} direction={{ base: "column", md: "row" }}>
          {options.map((option) => (
            <Button
              key={option.value}
              onClick={() => onChange(option.value)}
              colorScheme="teal"
              variant={selectedOption === option.value ? "solid" : "outline"}
              width="full"
            >
              {option.label}
            </Button>
          ))}
        </Stack>
      </RadioGroup>
    </Flex>
  );
}
