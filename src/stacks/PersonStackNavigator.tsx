// src/navigations/PersonStackNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PersonList from "../screens/Person/PersonList";
import PersonRegister from "../screens/Person/PersonRegisterScreen";
import PersonUpdate from "../screens/Person/PersonUpdateScreen";
import { PersonStackParamsList } from "../navigations/types";

const Stack = createNativeStackNavigator<PersonStackParamsList>();

const PersonStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PersonList" component={PersonList} />
    <Stack.Screen name="PersonRegister" component={PersonRegister} />
    <Stack.Screen name="PersonUpdate" component={PersonUpdate} />
  </Stack.Navigator>
);

export default PersonStackNavigator;
