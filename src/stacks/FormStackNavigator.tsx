// src/navigations/FormStackNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormList from "../screens/Form/FormList";
import FormSave from "../screens/Form/FormSaveScreen";
import { FormStackParamsList } from "../navigations/types";
import FormUpdateScreen from "../screens/Form/FormUpdateScreen";
// import FormUpdate from "../screens/Form/FormUpdateScreen";

const Stack = createNativeStackNavigator<FormStackParamsList>();

const FormStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FormList" component={FormList} />
    <Stack.Screen name="FormSave" component={FormSave} />
    <Stack.Screen name="FormUpdate" component={FormUpdateScreen} />
  </Stack.Navigator>
);

export default FormStackNavigator;
