import { useState } from "react";
import { Header } from "../components/Header";
import { InputBox } from "../components/InputBox";
import { SubHeader } from "../components/SubHeader";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="justify-center flex bg-slate-300 h-screen">
      <div className="justify-center flex flex-col">
        <div className="rounded-lg bg-white w-80 h-max p-2 px-4 text-center">
          <Header label={"Sign Up"}></Header>
          <SubHeader
            label={"Enter your information to create an account"}
          ></SubHeader>
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            label={"First Name"}
            placeholder={"John"}
          ></InputBox>
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            label={"Last Name"}
            placeholder={"Doe"}
          ></InputBox>
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
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              firstName,
              lastName,
              password
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
          }} label="Sign Up"></Button>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={'/signin'}></BottomWarning>
        </div>
      </div>
    </div>
  );
};
