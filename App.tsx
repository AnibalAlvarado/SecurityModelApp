
import 'react-native-gesture-handler';
import React from "react";
import Navigation from "./src/navigations/Navigation";
import Toast from "react-native-toast-message"; // ✅ importa el Toast

export default function App() {
  return (
    <>
      <Navigation />
      <Toast /> {/* ✅ añade el componente Toast visible en todas las pantallas */}
    </>
  );
}