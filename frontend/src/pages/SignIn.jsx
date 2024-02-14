import { useState } from "react";
import { Header } from "../components/Header";
import { InputBox } from "../components/InputBox";
import { SubHeader } from "../components/SubHeader";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="justify-center flex bg-slate-300 h-screen">
      <div className="justify-center flex flex-col">
        <div className="rounded-lg bg-white w-80 h-max p-2 px-4 text-center">
          <Header label={"Sign In"}></Header>
          <SubHeader
            label={"Enter your credentials to access your account"}
          ></SubHeader>
          
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Email"}
            placeholder={"abc@gmail.com"}
          ></InputBox>
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"John@Doe"}
          ></InputBox>
          <Button onClick={async () => {
              const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
              });
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
          }} label="Sign In"></Button>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={'/signup'}></BottomWarning>
        </div>
      </div>
    </div>
  );
};
