import React, { useState } from "react";
import { View, Text, Button,StyleSheet } from "react-native";
import BookForm from "../../components/PersonForm";
import { create } from "../../api/apiService";
import { IPerson } from "../../api/types/IPerson";
import Toast from "react-native-toast-message";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { PersonStackParamsList } from "../../navigations/types";

type DetailsRouteProp = RouteProp<PersonStackParamsList, "PersonRegister">;

const PersonRegisterScreen = () => {
  const route = useRoute<DetailsRouteProp>();
      const navigation = useNavigation(); 
 const [form, setForm] = useState<IPerson>({
    id: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    asset: true,
  });
  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };
  const registerPerson = async () => {
    const register = await create("person", form);
    Toast.show({
      type: "success",
      text1: "Éxito",
      text2: "Persona creada correctamente",
    });
    navigation.goBack();
  };

  return (
    <View>
      <BookForm form={form} handleChange={handleChange} />
      <Button title="Save" onPress={registerPerson} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    textAlign: "center",
  },
});

export default PersonRegisterScreen;
