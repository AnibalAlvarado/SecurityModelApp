import React from "react";
import { View, Text } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { PersonStackParamsList } from "../navigations/types";

type DetailsRouteProp = RouteProp<PersonStackParamsList, "PersonUpdate">;

const PersonUpdateScreen = () => {
  const route = useRoute<DetailsRouteProp>();
  const { id } = route.params;
  return (
    <View>
      <Text>Details Screen</Text>
      <Text>User id: {id}</Text>
    </View>
  );
};

export default PersonUpdateScreen;
