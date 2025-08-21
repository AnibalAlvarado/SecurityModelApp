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
import { RolUserStackParamsList } from "../../navigations/types";
import { getById, update } from "../../api/apiService";
import { IRolUser } from "../../api/types/IRolUser";
import Toast from "react-native-toast-message";

type DetailsRouteProp = RouteProp<RolUserStackParamsList, "RolUserUpdate">;

const RolUserUpdateScreen: React.FC = () => {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation();
  const { id } = route.params;

  const [rolUser, setRolUser] = useState<IRolUser>({
    id,
    rolId: 0,
    userId: 0,
    asset: true,
  });
  const [loading, setLoading] = useState(true);

  const fetchRolUser = async () => {
    try {
      const data = await getById<IRolUser>("RolUser", id);
      console.log("Rol User cargado:", data);
      if (data) {
        setRolUser(data);
      }
      Toast.show({
        type: "success",
        text1: "Éxito",
        text2: "RolUser cargado correctamente",
    });
    } catch (error) {
        Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo cargar el RolUser.",
        });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRolUser();
  }, []);

  const handleChange = (field: keyof IRolUser, value: string | boolean) => {
    setRolUser({ ...rolUser, [field]: value });
  };

const handleSubmit = async () => {
  try {
    const result = await update("RolUser", rolUser);
    Toast.show({
    type: "success",
    text1: "Éxito",
    text2: "RolUser actualizado correctamente",
    });
    navigation.goBack();
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "No se pudo actualizar el RolUser.",
    });
  }
};


  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Activo:</Text>
        <Switch
          value={rolUser.asset}
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

export default RolUserUpdateScreen;