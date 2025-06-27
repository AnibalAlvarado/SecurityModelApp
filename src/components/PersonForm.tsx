import { Switch } from "react-native-gesture-handler";
import { IPerson } from "../api/types/IPerson";
import { ScrollView, TextInput, View, StyleSheet } from "react-native";

interface Props {
  form: IPerson;
  handleChange: (field: keyof IPerson, value: string) => void;
}

const PersonForm: React.FC<Props> = ({ form, handleChange }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="FirstName"
        value={form.firstName}
        onChangeText={(text) => handleChange("firstName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="LastName"
        value={form.lastName}
        onChangeText={(text) => handleChange("lastName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="PhoneNumber"
        value={form.phoneNumber}
        onChangeText={(text) => handleChange("phoneNumber", text)}
        keyboardType="phone-pad"
      />
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
   booleanContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
  },
  booleanLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PersonForm;
