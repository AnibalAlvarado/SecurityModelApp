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
import { RolStackParamsList } from "../../navigations/types";
import { getById, update } from "../../api/apiService";
import { IRol } from "../../api/types/IRol";
import Toast from "react-native-toast-message";

type DetailsRouteProp = RouteProp<RolStackParamsList, "RolUpdate">;

const RolUpdateScreen: React.FC = () => {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation();
  const { id } = route.params;

  const [form, setForm] = useState<IRol>({
    id,
    name: "",
    description: "",
    asset: true,
  });
  const [loading, setLoading] = useState(true);

  const fetchRol = async () => {
    try {
      const data = await getById<IRol>("Rol", id);
      console.log("Rol cargado:", data);
      if (data) {
        setForm(data);
      }
      Toast.show({
        type: "success",
        text1: "Éxito",
        text2: "Rol cargado correctamente",
    });
    } catch (error) {
        Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo cargar el rol.",
        });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRol();
  }, []);

  const handleChange = (field: keyof IRol, value: string | boolean) => {
    setForm({ ...form, [field]: value });
  };

const handleSubmit = async () => {
  try {
    const result = await update("Rol", form);
    Toast.show({
    type: "success",
    text1: "Éxito",
    text2: "Rol actualizado correctamente",
    });
    navigation.goBack();
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudo actualizar el rol.",
    });
  }
};


  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
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

export default RolUpdateScreen;