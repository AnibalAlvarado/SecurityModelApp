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
import { ModuleStackParamsList} from "../../navigations/types";
import { getById, update } from "../../api/apiService";
import { IModule } from "../../api/types/IModule";
import Toast from "react-native-toast-message";

type DetailsRouteProp = RouteProp<ModuleStackParamsList, "ModuleUpdate">;

const ModuleUpdateScreen: React.FC = () => {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation();
  const { id } = route.params;

  const [form, setForm] = useState<IModule>({
    id,
    name: "",
    description: "",
    asset: true,
  });
  const [loading, setLoading] = useState(true);

  const fetchModule = async () => {
    try {
      const data = await getById<IModule>("Module", id);
      console.log("Module cargado:", data);
      if (data) {
        setForm(data);
      }
      Toast.show({
        type: "success",
        text1: "Éxito",
        text2: "Módulo cargado correctamente",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo cargar el módulo.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModule();
  }, []);

  const handleChange = (field: keyof IModule, value: string | boolean) => {
    setForm({ ...form, [field]: value });
  };

const handleSubmit = async () => {
  try {
    const result = await update("Module", form);
    console.log("Resultado del update:", result);
    Toast.show({
      type: "success",
      text1: "Éxito",
      text2: "Módulo actualizado correctamente",
    });
    navigation.goBack();
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudo actualizar el módulo.",
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

export default ModuleUpdateScreen;