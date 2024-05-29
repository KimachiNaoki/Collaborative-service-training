import React from "react";
import { Radio, RadioGroup, Stack, Flex, Heading } from "@chakra-ui/react";

type Props = {
  selectedOption: string;
  onChange: (value: string) => void;
};

// グラフ種類のラジオボタンを表示するコンポーネント
export default function RadioButton({ selectedOption, onChange }: Props) {
  return (
    <>
      <Flex justify="center" align="center" height="100%" mb={3}>
        <RadioGroup value={selectedOption} onChange={onChange}>
          <Stack spacing={4} direction={{ base: "column", md: "row" }}>
            <Radio value="総人口">総人口推移</Radio>
            <Radio value="年少人口">年少人口推移</Radio>
            <Radio value="生産年齢人口">生産年齢人口推移</Radio>
            <Radio value="老年人口">老年人口推移</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
    </>
  );
}
