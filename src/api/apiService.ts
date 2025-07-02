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

/**
 * GET - Obtener por ID
 */
export const getById = async <T>(entityName: string, id: number | string): Promise<T | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${entityName}/${id}`);
    if (!response.ok) throw new Error(`Error al obtener ${entityName} con ID ${id}`);

    const json = await response.json();
    return json.data as T; // 👈 Devuelve solo el `data`, igual que en getAllEntity
  } catch (error) {
    console.error("Error en getById:", error);
    return null;
  }
};

/**
 * PUT - Actualizar
 */
export const update = async <T>(
  entityName: string,
  data: T
): Promise<T | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${entityName}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al actualizar ${entityName} : ${errorText}`);
    }

    // ✅ Revisar si hay contenido
    const text = await response.text();
    if (text) {
      const json = JSON.parse(text);
      return json.data as T;
    } else {
      console.warn("⚠️ La respuesta del update no contiene cuerpo");
      return null;
    }
  } catch (error) {
    console.error("Error en update:", error);
    return null;
  }
};

/**
 * DELETE - Eliminar
 */
export const remove = async (
  entityName: string,
  id: number | string
): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${entityName}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al eliminar ${entityName} con ID ${id}: ${errorText}`);
    }

    const json = await response.json();
    return json.success === true; // ✅ usa 'success' del backend
  } catch (error) {
    console.error("Error en delete:", error);
    return false;
  }
};
