import React, { useState } from "react";
import { View, Text, Button,StyleSheet } from "react-native";
import BookForm from "../../components/PersonForm";
import { create } from "../../api/apiService";
import { IForm } from "../../api/types/IForm";
import FormsForm from "../../components/FormsForm";
import { IUser } from "../../api/types/IUser";
import Toast from "react-native-toast-message";
import { UserStackParamsList } from "../../navigations/types";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import UserForm from "../../components/UserForm";

type DetailsRouteProp = RouteProp<UserStackParamsList, "UserSave">;

const UserSaveScreen = () => {
    const route = useRoute<DetailsRouteProp>();
    const navigation = useNavigation();

  const [User, setUser] = useState<IUser>({
      id: 0,
      userName: "",
      email: "",
      password: "",
      personId: 0,
      asset: true
    });
  const handleChange = (name: string, value: string) => {
    setUser({ ...User, [name]: value });
  };
  const saveUser = async () => {
    const register = await create("User", User);
        Toast.show({
    type: "success",
    text1: "Éxito",
    text2: "User creado correctamente",
    });
    navigation.goBack();
  };

  return (
    <View>
      <UserForm user={User} handleChange={handleChange} />
      <Button title="Save" onPress={saveUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    textAlign: "center",
  },
});

export default UserSaveScreen;
