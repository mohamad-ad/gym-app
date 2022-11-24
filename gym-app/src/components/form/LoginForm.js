import React, { useContext, forwardRef, useState } from "react";
import Form from "./Form";
import HaveAccountContext from "../../context/HaveAccountContext";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { Input, InputAdornment, Stack, Typography } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";

const LoginForm = forwardRef(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setHaveAccount } = useContext(HaveAccountContext);
  console.log();
  return (
    <Form
      title="Login"
      button1={"login"}
      button2="cancel"
      userInformation={{ email, password }}
    >
      <Stack width="100%" gap="20px" component={"form"}>
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
          onChange={(e)=>setPassword(e.target.value)}
          type="password"
          placeholder="password"
          startAdornment={
            <InputAdornment sx={{ mr: "5px" }} position="start">
              <KeyIcon />
            </InputAdornment>
          }
        />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={"space-between"}
        >
          <Typography
            sx={{
              color: "info.main",
              cursor: "pointer",
              fontSize: "11px",
              fontWeight: "600",
            }}
          >
            forget password?
          </Typography>
          <Typography
            onClick={() => setHaveAccount(false)}
            sx={{
              color: "info.main",
              cursor: "pointer",
              fontSize: "11px",
              fontWeight: "600",
            }}
          >
            Don't have an account?
          </Typography>
        </Stack>
      </Stack>
    </Form>
  );
});

export default LoginForm;
