import React, { useEffect, useState } from "react";
import { Switch, Text, ScrollView, TextInput, View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { IUser } from "../api/types/IUser";
import { getAllEntity } from "../api/apiService";
import { IPerson } from "../api/types/IPerson";

interface Props {
    user: IUser;
    handleChange: (field: keyof IUser, value: any) => void; // Cambiado `string` → `any` para admitir boolean
}

const UserForm: React.FC<Props> = ({ user, handleChange }) => {
  const [persons, setPersons] = useState<IPerson[]>([]);
      // 🔹 Cargar personas al montar el componente
  useEffect(() => {
    const fetchPersons = async () => {
      const data = await getAllEntity("Person");
      setPersons(data);
    };
    fetchPersons();
  }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="userName"
                value={user.userName}
                onChangeText={(text) => handleChange("userName", text)}
            />
            <TextInput
                style={styles.input}
                placeholder="email"
                value={user.email}
                onChangeText={(text) => handleChange("email", text)}
            />

            <TextInput
            style={styles.input}
            placeholder="password"
            value={user.password}
            secureTextEntry
            onChangeText={(text) => handleChange("password", text)}
            />

           {/* 🔽 Select con react-native-picker-select */}
            <View style={styles.input}>
                <RNPickerSelect
                onValueChange={(value) => handleChange("personId", value)}
                value={user.personId}
                placeholder={{
                    label: "-- Selecciona una persona --",
                    value: null,
                }}
                items={persons.map((p) => ({
                    label: `${p.firstName} ${p.lastName}`, 
                    value: p.id,   
                }))}
                style={pickerSelectStyles}
                />
            </View>

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Activo:</Text>
                <Switch
                    value={user.asset}
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

//  Estilos propios para el picker
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});

export default UserForm;
