import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, InputRightElement } from "@chakra-ui/react";
import React from "react";

const TogglePassword = ({ show, setShow }) => {
  const handleClick = () => setShow(!show);

  return (
    <InputRightElement>
      <Button variant="unstyled" size="lg" onClick={handleClick}>
        {show ? <ViewOffIcon /> : <ViewIcon color="teal" />}
      </Button>
    </InputRightElement>
  );
};

export default TogglePassword;
