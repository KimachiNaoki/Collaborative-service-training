import React from "react";
import { Checkbox, Heading, SimpleGrid, Flex, Box } from "@chakra-ui/react";

// Propsの型を定義
type Props = {
  prefectures: {
    prefCode: number;
    prefName: string;
  }[];

  onChange: (prefName: string, prefCode: number, check: boolean) => void;
};

// 都道府県のチェックボックスを表示するコンポーネント
export default function Prefectures({ prefectures, onChange }: Props) {
  return (
    <Flex justify="center" py={5}>
      <Box width={{ base: "100%", md: "80%", lg: "60%" }}>
        <Heading as="h2" size="md" mb={4} color="teal">
          都道府県
        </Heading>
        <SimpleGrid columns={{ base: 4, md: 5, lg: 6 }} spacing={5}>
          {prefectures.map((prefecture) => (
            <Checkbox
              size="lg"
              key={prefecture.prefCode}
              id={prefecture.prefCode.toString()}
              value={prefecture.prefName}
              colorScheme="green"
              onChange={(event) => {
                onChange(
                  prefecture.prefName,
                  prefecture.prefCode,
                  event.target.checked
                );
              }}
            >
              {prefecture.prefName}
            </Checkbox>
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
