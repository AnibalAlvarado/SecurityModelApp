import React, { useEffect, useState } from "react";
import { Switch, Text, ScrollView, TextInput, View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { IRolUser } from "../api/types/IRolUser";
import { getAllEntity } from "../api/apiService";
import { IPerson } from "../api/types/IPerson";
import { IRol } from "../api/types/IRol";
import { IUser } from "../api/types/IUser";

interface Props {
    rolUser: IRolUser;
    handleChange: (field: keyof IRolUser, value: any) => void; // Cambiado `string` → `any` para admitir boolean
}

const RolUserForm: React.FC<Props> = ({ rolUser, handleChange }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [roles, setRoles] = useState<IRol[]>([]);
      // 🔹 Cargar personas al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllEntity("Users");
      setUsers(data);
    };
     const fetchRoles = async () => {
      const data = await getAllEntity("Users");
      setRoles(data);
    };
    fetchUsers();
    fetchRoles(); 
  }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/* 🔽 Select con react-native-picker-select */}
            <View style={styles.input}>
                <RNPickerSelect
                onValueChange={(value) => handleChange("userId", value)}
                value={rolUser.userId}
                placeholder={{
                    label: "-- Selecciona un usuario --",
                    value: null,
                }}
                items={users.map((u) => ({
                    label: `${u.userName}`, 
                    value: u.id,   
                }))}
                style={pickerSelectStyles}
                />
            </View>

           {/* 🔽 Select con react-native-picker-select */}
            <View style={styles.input}>
                <RNPickerSelect
                onValueChange={(value) => handleChange("rolId", value)}
                value={rolUser.rolId}
                placeholder={{
                    label: "-- Selecciona un rol --",
                    value: null,
                }}
                items={roles.map((r) => ({
                    label: `${r.name}`, 
                    value: r.id,   
                }))}
                style={pickerSelectStyles}
                />
            </View>

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Activo:</Text>
                <Switch
                    value={rolUser.asset}
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

export default RolUserForm;
