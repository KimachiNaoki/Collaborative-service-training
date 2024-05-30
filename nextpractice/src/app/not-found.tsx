import { Box, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

//指定のPassが見つからない時に表示する画面
export default function notFound() {
  return (
    <Box textAlign="center" mt={20}>
      <Heading as="h1" size="xl" mb={8}>
        ページが見つかりません。
      </Heading>
      <Link as={NextLink} href="/" color="teal.500">
        人口構成画面へ
      </Link>
    </Box>
  );
}
