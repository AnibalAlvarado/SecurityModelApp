import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormList from "../screens/Form/FormList";
import FormSave from "../screens/Form/FormSaveScreen";
import { FormStackParamsList, RolUserStackParamsList } from "../navigations/types";
import RolUserList from "../screens/RolUser/RolUserList";
import RolUserSaveScreen from "../screens/RolUser/RolUserSaveScreen";
import RolUserUpdateScreen from "../screens/RolUser/RolUserUpdateScreen";
// import FormUpdate from "../screens/Form/FormUpdateScreen";

const Stack = createNativeStackNavigator<RolUserStackParamsList>();

const RolUserStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="RolUserList" component={RolUserList} />
    <Stack.Screen name="RolUserSave" component={RolUserSaveScreen} />
    <Stack.Screen name="RolUserUpdate" component={RolUserUpdateScreen} /> 

  </Stack.Navigator>
);

export default RolUserStackNavigator;