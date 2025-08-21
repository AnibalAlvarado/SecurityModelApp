import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ScrollView,
  Switch,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { UserStackParamsList } from "../../navigations/types";
import { getAllEntity, getById, update } from "../../api/apiService";
import { IUser } from "../../api/types/IUser";
import RNPickerSelect from "react-native-picker-select";
import Toast from "react-native-toast-message";
import { IPerson } from "../../api/types/IPerson";

type DetailsRouteProp = RouteProp<UserStackParamsList, "UserUpdate">;

const UserUpdateScreen: React.FC = () => {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation();
  const { id } = route.params;

  const [form, setForm] = useState<IUser>({
      id,
      userName: "",
      email: "",
      password: "",
      personId: 0,
      asset: true
  });
  const [loading, setLoading] = useState(true);
  const [persons, setPersons] = useState<IPerson[]>([]);
  const fetchUser = async () => {
    try {
      const data = await getById<IUser>("User", id);
      console.log("User cargado:", data);
      if (data) {
        setForm(data);
      }
      Toast.show({
        type: "success",
        text1: "Éxito",
        text2: "User cargado correctamente",
    });
    } catch (error) {
        Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo cargar el User.",
        });
    } finally {
      setLoading(false);
    }
  };

    // 🔹 Cargar lista de personas
  const fetchPersons = async () => {
    try {
      const data = await getAllEntity("Person");
      setPersons(data);
    } catch (error) {
      console.error("Error al cargar personas:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPersons();
  }, []);

  const handleChange = (field: keyof IUser, value: string | boolean) => {
    setForm({ ...form, [field]: value });
  };

const handleSubmit = async () => {
  try {
    const result = await update("User", form);
    Toast.show({
    type: "success",
    text1: "Éxito",
    text2: "User actualizado correctamente",
    });
    navigation.goBack();
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudo actualizar el User.",
    });
  }
};


  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;

  return (
  <ScrollView contentContainerStyle={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="userName"
      value={form.userName}
      onChangeText={(text) => handleChange("userName", text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Email"
      value={form.email}
      onChangeText={(text) => handleChange("email", text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      value={form.password}
      secureTextEntry
      onChangeText={(text) => handleChange("password", text)}
    />

    {/* Aquí puedes meter el Picker de personas que hicimos antes 👇 */}

    <RNPickerSelect
      onValueChange={(value) => handleChange("personId", value)}
      value={form.personId}
      placeholder={
        form.personId
          ? { label: form.personName, value: form.personId } // 👈 Muestra la persona actual
          : { label: "-- Selecciona una persona --", value: null }
      }
      items={persons.map((p) => ({
        label: `${p.firstName} ${p.lastName}`,
        value: p.id,
      }))}
      style={pickerSelectStyles}
    />
    

    <View style={styles.switchContainer}>
      <Text style={styles.label}>Activo:</Text>
      <Switch
        value={form.asset}
        onValueChange={(value) => handleChange("asset", value)}
      />
    </View>

    <Button title="Guardar Cambios" onPress={handleSubmit} color="#1e90ff" />
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
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    color: "black",
    marginBottom: 16,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    color: "black",
    marginBottom: 16,
  },
  placeholder: {
    color: "#888",
  },
});


export default UserUpdateScreen;