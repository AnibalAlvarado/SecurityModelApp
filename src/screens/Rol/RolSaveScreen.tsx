import React, { useState } from "react";
import { View, Text, Button,StyleSheet } from "react-native";
import BookForm from "../../components/PersonForm";
import { create } from "../../api/apiService";
import { IForm } from "../../api/types/IForm";
import FormsForm from "../../components/FormsForm";
import { IRol } from "../../api/types/IRol";
import Toast from "react-native-toast-message";
import { RolStackParamsList } from "../../navigations/types";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";

type DetailsRouteProp = RouteProp<RolStackParamsList, "RolSave">;

const RolSaveScreen = () => {
    const route = useRoute<DetailsRouteProp>();
    const navigation = useNavigation();

 const [rol, setRol] = useState<IRol>({
    id: 0,
    name: "",
    description: "",
    asset: true,
  });
  const handleChange = (name: string, value: string) => {
    setRol({ ...rol, [name]: value });
  };
  const saveRol = async () => {
    const register = await create("rol", rol);
        Toast.show({
    type: "success",
    text1: "Éxito",
    text2: "Rol creado correctamente",
    });
    navigation.goBack();
  };

  return (
    <View>
      <FormsForm form={rol} handleChange={handleChange} />
      <Button title="Save" onPress={saveRol} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    textAlign: "center",
  },
});

export default RolSaveScreen;
