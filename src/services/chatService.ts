import axios from "axios";
import { API_URL } from "./productService";

export interface IMessage {
  sender: "user" | "admin";
  text: string;
  createdAt: string;
}

export interface IChat {
  _id: string;
  messages: IMessage[];
  guestId?: string;
  user?: string;
}

export const getActiveChat = async (
  userId?: string,
  guestId?: string,
): Promise<IChat | null> => {
  const response = await axios.post(`${API_URL}/chat/active`, {
    userId,
    guestId,
  });
  return response.data;
};

export const sendMessage = async (
  text: string,
  userId?: string,
  guestId?: string,
): Promise<IChat> => {
  const response = await axios.post(`${API_URL}/chat/send`, {
    text,
    userId,
    guestId,
  });
  return response.data;
};
