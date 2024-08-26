import { ApiManager } from "../ApiManager";

export const findByIdUser = async ({ id }: { id: string }) => {
  try {
    const data = await ApiManager(`/user/find/find-by-id/${id}`);

    return data.data;
  } catch (error) {
    console.log("(CLIENT API) Error Find By Id User", error);
    throw new Error(error);
  }
};
