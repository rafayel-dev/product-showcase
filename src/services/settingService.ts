import { API_URL } from "./productService";

export interface Setting {
  key: string;
  value: any;
  type?: string;
}



export const getSetting = async (key: string): Promise<Setting | null> => {
  try {
    const res = await fetch(`${API_URL}/settings/${key}`);
    // If 404 or error, return null or empty default
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch setting:", error);
    return null;
  }
};
