import React, { forwardRef, useState } from "react";
import Form from "./Form";
import { Input, InputAdornment, Stack } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import { AccountCircle } from "@mui/icons-material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const SignupForm = forwardRef(() => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verification, setVerification] = useState("");
  return (
    <Form signup title={"Sign Up"} button1="sign up" button2={"cancel"} userInformation={{username,email, password }}>
      <Stack width="100%" gap="20px" component={"form"}>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          type="email"
          startAdornment={
            <InputAdornment sx={{ mr: "5px" }} position="start">
              <AlternateEmailIcon />
            </InputAdornment>
          }
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
          startAdornment={
            <InputAdornment position="start" sx={{ mr: "5px" }}>
              <KeyIcon />
            </InputAdornment>
          }
        />
        <Input
          value={verification}
          onChange={(e) => setVerification(e.target.value)}
          placeholder="password verification"
          type="password"
          startAdornment={
            <InputAdornment sx={{ mr: "5px" }} position="start">
              <DoneAllIcon />
            </InputAdornment>
          }
        />
      </Stack>
    </Form>
  );
});

export default SignupForm;
