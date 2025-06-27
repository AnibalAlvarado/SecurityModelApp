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
import { PersonStackParamsList } from "../../navigations/types";
import { getById, update } from "../../api/apiService";
import { IPerson } from "../../api/types/IPerson";

type DetailsRouteProp = RouteProp<PersonStackParamsList, "PersonUpdate">;

const PersonUpdateScreen: React.FC = () => {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation();
  const { id } = route.params;

  const [form, setForm] = useState<IPerson>({
    id,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    asset: true,
  });
  const [loading, setLoading] = useState(true);

  const fetchPerson = async () => {
    try {
      const data = await getById<IPerson>("Person", id);
      console.log("Persona cargada:", data);
      if (data) {
        setForm(data);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar la persona.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  const handleChange = (field: keyof IPerson, value: string | boolean) => {
    setForm({ ...form, [field]: value });
  };

const handleSubmit = async () => {
  try {
    const result = await update("person", id, form);
    console.log("Resultado del update:", result);
    Alert.alert("Éxito", "Persona actualizada correctamente");
    navigation.goBack();
  } catch (error) {
    Alert.alert("Error", "No se pudo actualizar la persona.");
  }
};


  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={form.firstName}
        onChangeText={(text) => handleChange("firstName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={form.lastName}
        onChangeText={(text) => handleChange("lastName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={form.phoneNumber}
        keyboardType="phone-pad"
        onChangeText={(text) => handleChange("phoneNumber", text)}
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

export default PersonUpdateScreen;