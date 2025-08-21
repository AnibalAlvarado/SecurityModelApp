import React, { useState } from "react";
import { View, Text, Button,StyleSheet } from "react-native";
import { create } from "../../api/apiService";
import { IRolUser } from "../../api/types/IRolUser";
import Toast from "react-native-toast-message";
import { RolUserStackParamsList } from "../../navigations/types";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import RolUserForm from "../../components/RolUserForm";

type DetailsRouteProp = RouteProp<RolUserStackParamsList, "RolUserSave">;

const RolUserSaveScreen = () => {
    const route = useRoute<DetailsRouteProp>();
    const navigation = useNavigation();

 const [RolUser, setRolUser] = useState<IRolUser>({
    id: 0,
    userId: 0,
    rolId: 0,
    asset: true
  });
  const handleChange = (name: string, value: string) => {
    setRolUser({ ...RolUser, [name]: value });
  };
  const saveRolUser = async () => {
    const register = await create("RolUser", RolUser);
        Toast.show({
    type: "success",
    text1: "Éxito",
    text2: "Rol asignado correctamente",
    });
    navigation.goBack();
  };

  return (
    <View>
      <RolUserForm rolUser={RolUser} handleChange={handleChange} />
      <Button title="Save" onPress={saveRolUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    textAlign: "center",
  },
});

export default RolUserSaveScreen;
