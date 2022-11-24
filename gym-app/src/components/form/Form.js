import React, { useContext, useEffect } from "react";
import ModalContext from "../../context/ModalContext";
import HaveAccountContext from "../../context/HaveAccountContext";
import { useDispatch,useSelector } from "react-redux";
import { signUp,login, userSelector} from "../../redux/userSlice";
import { Box, Button, Stack, Typography } from "@mui/material";

const Form = ({ title, button1, button2, children, signup,userInformation }) => {
  const dispatch = useDispatch();
  console.log(userInformation);
  const user= useSelector(userSelector);
  const { setOpenModal } = useContext(ModalContext);
  const { setHaveAccount } = useContext(HaveAccountContext);

  const handleClick = ()=>{
    if(signup) return dispatch(signUp(userInformation))
    dispatch(login(userInformation));
  }
  useEffect(()=>{
    if(user.isLogedin) {setOpenModal(false)}
  },[user.isLogedin])
  
  return (
    <Box
      borderRadius={"15px"}
      overflow={"hidden"}
      width="50%"
      height="60%"
      display="flex"
      justifyContent={"center"}
      sx={{ bgcolor: "background.paper" }}
    >
      <Stack
        alignSelf={"center"}
        width="90%"
        height="90%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography mt={"0px"} variant="h5" textAlign={"center"}>
          {title}
        </Typography>

        {children}

        <Stack width="100%" direction="row" justifyContent={"space-between"}>
          <Stack direction="row" alignItems="center">
            <Button
              variant="outlined"
              onClick={handleClick}
              sx={{
                color: "action.active",
                borderColor: "action.active",
                "&:hover": {
                  borderColor: "action.hover",
                  bgcolor: "action.hover",
                },
              }}
            >
              {button1}
            </Button>
            {signup && (
              <Box display={"flex"} flexDirection="row">
                <Typography m="0 10px"> or </Typography>
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => setHaveAccount(true)}
                  color={"info.main"}
                >
                  {" "}
                  login{" "}
                </Typography>
              </Box>
            )}
          </Stack>
          <Button
            onClick={() => setOpenModal(false)}
            sx={{
              color: "action.active",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            {button2}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Form;
