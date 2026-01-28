import { API_URL } from "./productService";

export interface Setting {
  key: string;
  value: any;
  type?: string;
}

// ... existing code ...
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

export interface AboutData {
  coverImage?: string;
  title?: string;
  description?: string;
  ourStory?: string;
  team?: { name: string; role: string; image: string }[];
}

export const getAbout = async (): Promise<AboutData | null> => {
  try {
    const res = await fetch(`${API_URL}/settings/about`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};
