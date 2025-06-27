import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { FormStackParamsList, PersonStackParamsList } from "../../navigations/types";
import { getAllEntity } from "../../api/apiService";
import { IForm } from "../../api/types/IForm";
import CardGeneric from "../../components/CardGeneric";

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
            onDelete={(id) => console.log("Eliminar", id)}
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
