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

import { FormStackParamsList, PersonStackParamsList } from "../../navigations/types";
import { getAllEntity, remove } from "../../api/apiService";
import { IForm } from "../../api/types/IForm";
import CardGeneric from "../../components/CardGeneric";
import Toast from "react-native-toast-message";

type FormScreenNavigationProp = NativeStackNavigationProp<
  FormStackParamsList,
  "FormList"
>;

const FormList = () => {
  const navigation = useNavigation<FormScreenNavigationProp>();
  const [forms, setForms] = useState<IForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // ⬅️ para botón

  const fetchForms = useCallback(async () => {
    if (!loading) setRefreshing(true);
    setLoading(true);
    const result = await getAllEntity("Form");
    setForms(result);
    setLoading(false);
    setRefreshing(false); // ⬅️ apaga loading del botón
  }, []);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

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
                    const success = await remove("Form", id);
                    if (success) {
                      Toast.show({
                        type: "success",
                        text1: "Operación exitosa",
                        text2: "El registro se eliminó correctamente"
                      });
                      fetchForms();
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
          onPress={() => navigation.navigate("FormSave")}
        >
          <Text style={styles.buttonText}>➕ Add Form</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonGreen}
          onPress={fetchForms}
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
          data={forms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardGeneric
            item={item}
            onEdit={(id) => navigation.navigate("FormUpdate", { id: Number(id) })}
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

export default FormList;
