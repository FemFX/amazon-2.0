"use client";

import { FC, useState } from "react";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import { useForm, SubmitHandler } from "react-hook-form";
import { IEmailPassword } from "@/store/user/user.interface";
import InputField from "../../ui/Input";
import { validEmail } from "@/utils/valid-email";
import { useRouter } from "next/navigation";

export interface IAuthProps {}

const Auth: FC<IAuthProps> = ({}) => {
  const { isLoading } = useAuth();
  const { login, register } = useActions();
  const [type, setType] = useState<"login" | "register">("login");

  const router = useRouter();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IEmailPassword>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IEmailPassword> = (data) => {
    if (type === "login") {
      login(data);
    } else {
      register(data);
    }
    reset();
    return router.replace("/");
  };

  return (
    <section className="flex h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-ls bg-white shadow-sm p-8 m-auto"
      >
        <Heading className="capitalize text-center mb-4">{type}</Heading>
        <InputField
          {...formRegister("email", {
            required: "Email is required",
            pattern: {
              value: validEmail,
              message: "Please enter a valid email",
            },
          })}
          placeholder="Email"
          error={errors.email?.message}
        />
        <InputField
          {...formRegister("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Min length should be more 6 symbols",
            },
          })}
          type="password"
          placeholder="Password"
          error={errors.password?.message}
        />
        <Button variant="orange">Submit</Button>

        <button
          type="button"
          className="inline-block opacity-50 mt-3"
          onClick={() => setType(type === "login" ? "register" : "login")}
        >
          {type === "login" ? "register" : "login"}
        </button>
      </form>
    </section>
  );
};
export default Auth;
