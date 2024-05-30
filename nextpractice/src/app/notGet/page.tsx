import { Box, Link, Heading } from "@chakra-ui/react";
import NextLink from "next/link";

//APIのデータの取得が上手くいかなかったときに表示するコンポーネント
export default function GetData() {
  return (
    <Box textAlign="center" mt={20}>
      <Heading as="h1" size="xl" mb={8}>
        データの取得が上手くいきませんでした。
      </Heading>
      <Link as={NextLink} href="/" color="teal.500">
        再リロード
      </Link>
    </Box>
  );
}
