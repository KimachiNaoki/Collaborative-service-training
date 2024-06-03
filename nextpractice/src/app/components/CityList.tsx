import React from "react";
import { City } from "../types";
import { Box, Flex, Text } from "@chakra-ui/react";

type Props = {
  cities: City[][];
};

export default function CityList({ cities }: Props) {
  return (
    <Box>
      {cities.map((cityArray, index) => (
        <Box key={index} mt={6}>
          <Text
            as="h3"
            fontSize="lg"
            mb={2}
            align={"center"}
            justifyContent={"center"}
          >
            {cityArray[0].prefName}
          </Text>
          <Flex flexWrap="wrap">
            {cityArray.map((city, cityIndex) => (
              <Box key={cityIndex} mr={4} mb={2}>
                <Text>{city.cityName}</Text>
              </Box>
            ))}
          </Flex>
        </Box>
      ))}
    </Box>
  );
}
