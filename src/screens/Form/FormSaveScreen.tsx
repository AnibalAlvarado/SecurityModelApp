import React, { useState } from "react";
import { View, Text, Button,StyleSheet } from "react-native";
import BookForm from "../../components/PersonForm";
import { create } from "../../api/apiService";
import { IForm } from "../../api/types/IForm";
import FormsForm from "../../components/FormsForm";

const FormSaveScreen = () => {
 const [form, setForm] = useState<IForm>({
    id: 0,
    name: "",
    description: "",
    asset: true,
  });
  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };
  const saveForm = async () => {
    const register = await create("form",form);
    alert("Register OK");
  };

  return (
    <View>
      <FormsForm form={form} handleChange={handleChange} />
      <Button title="Save" onPress={saveForm} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    textAlign: "center",
  },
});

export default FormSaveScreen;
