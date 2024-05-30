import { Box, Flex, Heading } from "@chakra-ui/react";

//ヘッダーを表示するコンポーネント
export default function Header() {
  return (
    <Box bg="#38B2AC" py={4} position="sticky" top={0} zIndex={999}>
      <Flex align="center" justify="center">
        <Heading as="h1" size="xl" color="white">
          各都道府県の人口構成
        </Heading>
      </Flex>
    </Box>
  );
}
