import { EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { DevTool } from "@hookform/devtools";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";


const ResetPassword = () => {

  const {resetPassword} = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log(data);
    resetPassword(data.email)
  };

  return (
    <Flex h="60vh" alignItems="center" justifyContent="center">
      <Box w="30%" p={4} borderWidth="1px" borderRadius="lg">
        <Center>
          <Heading mb={4}>Reset Password</Heading>
        </Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email} mt={4}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<EmailIcon color="gray.300" />}
              />
              <Input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: "Email Address is required",
                })}
              />
            </InputGroup>
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>

          <Center>
            <Button
              mt={5}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Reset Password
            </Button>
          </Center>
        </form>
        <DevTool control={control} />
      </Box>
    </Flex>
  );
};

export default ResetPassword;
