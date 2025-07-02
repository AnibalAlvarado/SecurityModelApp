import React, { useState } from "react";
import { View, Text, Button,StyleSheet } from "react-native";
import { create } from "../../api/apiService";
import FormsForm from "../../components/FormsForm";
import { IModule } from "../../api/types/IModule";
import { ModuleStackParamsList } from "../../navigations/types";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";

type DetailsRouteProp = RouteProp<ModuleStackParamsList, "ModuleSave">;
const ModuleSaveScreen = () => {
    const route = useRoute<DetailsRouteProp>();
    const navigation = useNavigation();
 const [module, setModule] = useState<IModule>({
    id: 0,
    name: "",
    description: "",
    asset: true,
  });
  const handleChange = (name: string, value: string) => {
    setModule({ ...module, [name]: value });
  };
    const saveModule = async () => {
        const register = await create("module", module);
        Toast.show({
            type: "success",
            text1: "Éxito",
            text2: "Módulo creado correctamente",
        });
        navigation.goBack();
    };

  return (
    <View>
      <FormsForm form={module} handleChange={handleChange} />
      <Button title="Save" onPress={saveModule} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    textAlign: "center",
  },
});

export default ModuleSaveScreen;
