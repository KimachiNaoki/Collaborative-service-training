import { Box, Flex, Heading } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box bg="skyblue" py={4}>
      <Flex align="center" justify="center">
        <Heading as="h1" size="xl" color="white">
          各都道府県の人口構成
        </Heading>
      </Flex>
    </Box>
  );
}
