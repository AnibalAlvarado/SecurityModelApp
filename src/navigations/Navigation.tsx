import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import SidebarNavigator from "./SidebarNavigator"; // 👈 Usa el Drawer

const Navigation = () => {
  return (
    <NavigationContainer>
      <SidebarNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
