import Cookies from "js-cookie";
import axios from "axios";
import { IAuthResponse, IEmailPassword } from "@/store/user/user.interface";
import { getContentType } from "@/helpers/api.helper";
import { saveToStorage } from "./auth.helper";
import { instance } from "@/helpers/api.interceptor";

export const AUTH = "auth";

export const AuthService = {
  async main(type: "login" | "register", data: IEmailPassword) {
    const response = await instance<IAuthResponse>({
      url: `/${AUTH}/${type}`,
      method: "POST",
      data,
    });
    if (response.data.accessToken) {
      await saveToStorage(response.data);
    }
    return response;
  },
  async getNewTokens() {
    const refreshToken = Cookies.get("refreshToken");

    const response = await axios.post<string, { data: IAuthResponse }>(
      process.env.SERVER_URL + `/${AUTH}/login/access-token`,
      { refreshToken },
      { headers: getContentType() }
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },
};
