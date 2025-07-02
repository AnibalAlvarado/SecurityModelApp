import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormList from "../screens/Form/FormList";
import FormSave from "../screens/Form/FormSaveScreen";
import {ModuleStackParamsList} from "../navigations/types";
import RolList from "../screens/Rol/RolList";
import RolSaveScreen from "../screens/Rol/RolSaveScreen";
import ModuleList from "../screens/Module/ModuleList";
import ModuleSaveScreen from "../screens/Module/ModuleSaveScreen";
import ModuleUpdateScreen from "../screens/Module/ModuleUpdateScreen";
// import FormUpdate from "../screens/Form/FormUpdateScreen";

const Stack = createNativeStackNavigator<ModuleStackParamsList>();

const ModuleStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ModuleList" component={ModuleList} />
    <Stack.Screen name="ModuleSave" component={ModuleSaveScreen} />
    <Stack.Screen name="ModuleUpdate" component={ModuleUpdateScreen} />
  </Stack.Navigator>
);

export default ModuleStackNavigator;