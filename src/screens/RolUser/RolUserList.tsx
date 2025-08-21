import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RolUserStackParamsList } from "../../navigations/types";
import { getAllEntity, remove } from "../../api/apiService";

import CardGeneric from "../../components/CardGeneric";
import { IRolUser } from "../../api/types/IRolUser";
import Toast from "react-native-toast-message";

type RolUserScreenNavigationProp = NativeStackNavigationProp<
  RolUserStackParamsList,
  "RolUserList"
>;

const RolUserList = () => {
  const navigation = useNavigation<RolUserScreenNavigationProp>();
  const [RolUseres, setRolUseres] = useState<IRolUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRolUseres = useCallback(async () => {
    if (!loading) setRefreshing(true);
    setLoading(true);
    const result = await getAllEntity("RolUser");
    setRolUseres(result);
    setLoading(false);
    setRefreshing(false); 
  }, []);

  useEffect(() => {
    fetchRolUseres();
  }, [fetchRolUseres]);

   // Lógica para eliminar
  const handleDelete = async (id: number) => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de eliminar este registro?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const success = await remove("RolUser", id);
            if (success) {
              Toast.show({
                type: "success",
                text1: "Operación exitosa",
                text2: "El registro se eliminó correctamente"
              });
              fetchRolUseres();
            } else {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "No se pudo eliminar el registro"
              });
            }
          },
        },
      ]
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {/* Contenedor de botones */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.buttonBlue}
          onPress={() => navigation.navigate("RolUserSave")}
        >
          <Text style={styles.buttonText}>➕ Add Rol to a user</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonGreen}
          onPress={fetchRolUseres}
          disabled={refreshing}
        >
          {refreshing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>🔄 Refresh</Text>
          )}
        </TouchableOpacity>
      </View>

      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#1e90ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={RolUseres}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardGeneric
            item={item}
            onEdit={(id) => navigation.navigate("RolUserUpdate", { id: Number(id) })}
            onDelete={(id) => handleDelete(Number(id))}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginVertical: 10,
  },
  buttonBlue: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 5,
  },
  buttonGreen: {
    backgroundColor: "#32CD32",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RolUserList;
