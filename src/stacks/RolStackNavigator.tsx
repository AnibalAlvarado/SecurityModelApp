import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormList from "../screens/Form/FormList";
import FormSave from "../screens/Form/FormSaveScreen";
import { FormStackParamsList, RolStackParamsList } from "../navigations/types";
import RolList from "../screens/Rol/RolList";
import RolSaveScreen from "../screens/Rol/RolSaveScreen";
import RolUpdateScreen from "../screens/Rol/RolUpdateScreen";
// import FormUpdate from "../screens/Form/FormUpdateScreen";

const Stack = createNativeStackNavigator<RolStackParamsList>();

const RolStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="RolList" component={RolList} />
    <Stack.Screen name="RolSave" component={RolSaveScreen} />
    <Stack.Screen name="RolUpdate" component={RolUpdateScreen} /> 

  </Stack.Navigator>
);

export default RolStackNavigator;