import React, { useState } from "react";
import { View, Text, Button,StyleSheet } from "react-native";
import BookForm from "../components/PersonForm";
import { create } from "../api/apiService";
import { IPerson } from "../api/types/IPerson";

const PersonRegisterScreen = () => {
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
    const register = await create("person",form);
    alert("Register OK");
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
