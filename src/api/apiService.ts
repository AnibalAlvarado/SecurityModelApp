//petición fetch

import { API_BASE_URL } from "../constants/endpoints";
import { IPerson } from "./types/IPerson";


export const create = async <T>(entityName: string, data: T) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${entityName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al crear ${entityName}: ${errorText}`);
    }

    const result = await response.json();
    console.log("Respuesta del servidor:", result);
    return result;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const getAllEntity = async (entityName: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${entityName}/select`);
    if (!response.ok) throw new Error("Error al obtener los datos");
    const json = await response.json();
    return json.data; // 👈 Devuelves directamente el array
  } catch (error) {
    console.error("getAllEntity error:", error);
    return [];
  }
};

export const getByIdBook = async (id: number) => {
  try {
    const response = await fetch(API_BASE_URL + id);

    if (!response.ok) throw new Error("Error al actualizar el libro");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateBook = async (id: number, register: IPerson) => {
  try {
    const response = await fetch(API_BASE_URL + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(register),
    });

    if (!response.ok) throw new Error("Error al actualizar el libro");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteBook = async (id: string) => {
  try {
    const response = await fetch(API_BASE_URL + id, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error al eliminar el libro");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
