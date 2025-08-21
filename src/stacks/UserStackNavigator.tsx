import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormList from "../screens/Form/FormList";
import FormSave from "../screens/Form/FormSaveScreen";
import { FormStackParamsList, RolStackParamsList, UserStackParamsList } from "../navigations/types";
import RolList from "../screens/Rol/RolList";
import RolSaveScreen from "../screens/Rol/RolSaveScreen";
import RolUpdateScreen from "../screens/Rol/RolUpdateScreen";
import UserList from "../screens/User/UserList";
import UserSaveScreen from "../screens/User/UserSaveScreen";
import UserUpdateScreen from "../screens/User/UserUpdateScreen";

// import FormUpdate from "../screens/Form/FormUpdateScreen";

const Stack = createNativeStackNavigator<UserStackParamsList>();

const UserStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="UserList" component={UserList} />
    <Stack.Screen name="UserSave" component={UserSaveScreen} />
    <Stack.Screen name="UserUpdate" component={UserUpdateScreen} /> 

  </Stack.Navigator>
);

export default UserStackNavigator;