import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IPerson } from "../api/types/IPerson"; // Ajusta ruta si es diferente

interface Props extends IPerson {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const CardPerson: React.FC<Props> = ({
  id,
  firstName,
  lastName,
  phoneNumber,
  asset,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{firstName} {lastName}</Text>
      <Text style={styles.text}>📞 {phoneNumber}</Text>
      <Text style={styles.text}>ID: {id}</Text>
      <Text style={[styles.status, { color: asset ? "green" : "red" }]}>
        {asset ? "✔️ Activo" : "❌ Inactivo"}
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(id)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(id)}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 2,
  },
  status: {
    marginTop: 8,
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CardPerson;
