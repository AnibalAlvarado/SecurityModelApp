import React from "react";
import { Switch, Text, ScrollView, TextInput, View, StyleSheet } from "react-native";
import { IForm } from "../api/types/IForm";

interface Props {
  form: IForm;
  handleChange: (field: keyof IForm, value: any) => void; // Cambiado `string` → `any` para admitir boolean
}

const FormsForm: React.FC<Props> = ({ form, handleChange }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={form.description}
        onChangeText={(text) => handleChange("description", text)}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Activo:</Text>
        <Switch
          value={form.asset}
          onValueChange={(value) => handleChange("asset", value)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default FormsForm;
