import { Box, Flex, Heading } from "@chakra-ui/react";

type Props = {
  title: string;
};
//ヘッダーを表示するコンポーネント
export default function Header({ title }: Props) {
  return (
    <Box bg="#38B2AC" py={4} position="sticky" top={0} zIndex={999}>
      <Flex align="center" justify="center">
        <Heading as="h1" size="xl" color="white">
          {title}
        </Heading>
      </Flex>
    </Box>
  );
}
