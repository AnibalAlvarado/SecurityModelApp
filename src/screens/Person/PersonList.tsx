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

  import { PersonStackParamsList } from "../../navigations/types";
  import { getAllEntity } from "../../api/apiService";
  import { IPerson } from "../../api/types/IPerson";
  import CardGeneric from "../../components/CardGeneric";

  type PersonScreenNavigationProp = NativeStackNavigationProp<
    PersonStackParamsList,
    "PersonList"
  >;

  const PersonList = () => {
    const navigation = useNavigation<PersonScreenNavigationProp>();
    const [persons, setPersons] = useState<IPerson[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false); // ⬅️ para botón

    const fetchPersons = useCallback(async () => {
      if (!loading) setRefreshing(true);
      setLoading(true);
      const result = await getAllEntity("Person");
      setPersons(result);
      setLoading(false);
      setRefreshing(false); // ⬅️ apaga loading del botón
    }, []);

    useEffect(() => {
      fetchPersons();
    }, [fetchPersons]);

    return (
      <View style={{ flex: 1 }}>
        {/* Contenedor de botones */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.buttonBlue}
            onPress={() => navigation.navigate("PersonRegister")}
          >
            <Text style={styles.buttonText}>➕ Add person</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonGreen}
            onPress={fetchPersons}
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
            data={persons}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CardGeneric
                item={item}
                onEdit={(id) => navigation.navigate("PersonUpdate", { id: Number(id) })}
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

  export default PersonList;
