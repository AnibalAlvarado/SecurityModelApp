import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface GenericCardProps<T> {
  item: T & { id: number; asset?: boolean };
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

function CardGeneric<T extends object>({
  item,
  onEdit,
  onDelete,
}: GenericCardProps<T>) {
  const { id, asset, ...rest } = item;

  return (
    <View style={styles.card}>
      {/* Render dinámico de las propiedades (excepto id y asset) */}
      {Object.entries(rest).map(([key, value]) => (
        <Text style={styles.text} key={key}>
          {key.charAt(0).toUpperCase() + key.slice(1)}: {String(value)}
        </Text>
      ))}

      {/* Mostrar ID */}
      <Text style={styles.text}>ID: {id}</Text>

      {/* Estado "activo/inactivo" si existe */}
      {"asset" in item && (
        <Text style={[styles.status, { color: asset ? "green" : "red" }]}>
          {asset ? "✔️ Activo" : "❌ Inactivo"}
        </Text>
      )}

      {/* Botones */}
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
}

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
  text: {
    fontSize: 14,
    marginBottom: 4,
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

export default CardGeneric;
