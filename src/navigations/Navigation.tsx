import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


//import screens
import PersonListScreen from "../screens/PersonList";
import PersonRegisterScreen from "../screens/PersonRegisterScreen";
import PersonUpdateScreen from "../screens/PersonUpdateScreen";

//import icon
import AntDesign from "@expo/vector-icons/AntDesign";

//import stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const PersonStackNavigator = createNativeStackNavigator();

function MyStack() {
  return (
    <PersonStackNavigator.Navigator initialRouteName="PersonList">
      <PersonStackNavigator.Screen name="PersonList" component={PersonListScreen} />
      <PersonStackNavigator.Screen name="PersonRegister" component={PersonRegisterScreen} />
      <PersonStackNavigator.Screen name="PersonUpdate" component={PersonUpdateScreen} />
    </PersonStackNavigator.Navigator>
  );
}

//instance for createBottomTabNavigator
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="PersonList"
      screenOptions={{ tabBarActiveTintColor: "purple" }}
    >
      <Tab.Screen
        name="PersonList"
        component={MyStack}
        options={{
          tabBarLabel: "List",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color="black" />
          ),
          tabBarBadge: 5,
        }}
      />
      <Tab.Screen
        name="PersonRegister"
        component={PersonListScreen}
        options={{
          tabBarLabel: "PersonRegister",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
