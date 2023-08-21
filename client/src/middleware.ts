import { NextRequest, NextResponse } from "next/server";
import { isTokenValid, parseJwt } from "@/utils/jwt";
import { AUTH } from "./services/auth/auth.service";

export const config = {
  matcher: "/",
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/auth";
  const { cookies } = req;

  const nowUnix = (+new Date() / 1e3) | 0;
  const token = req.cookies?.get("accessToken")?.value;
  const refresh_token = req.cookies?.get("refreshToken")?.value;

  const newResponse = NextResponse.next();

  let tokenIsValid = isTokenValid(token);

  if (!tokenIsValid && !!refresh_token) {
    const response = await fetch(
      `${process.env.API_URL}/${AUTH}/login/access-token`,
      {
        body: JSON.stringify({
          refreshToken: refresh_token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    const { accessToken } = await response.json();

    const access_token_decoded: { exp: number } = parseJwt(accessToken);
    // console.log(access_token_decoded);

    newResponse.cookies.set("accessToken", accessToken, {
      path: "/",
      maxAge: access_token_decoded.exp - nowUnix,
    });

    tokenIsValid = true;
  }

  return tokenIsValid ? newResponse : NextResponse.redirect(url);
}
