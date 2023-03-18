import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { DevTool } from "@hookform/devtools";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import TogglePassword from "../components/form/TogglePassword";
import { BsFillPersonFill } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";


const SignUp = () => {

  const {signUp} = useContext(AuthContext);

  const [show, setShow] = useState(false);

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
    signUp(data);
  };

  return (
    <Flex h="80vh" alignItems="center" justifyContent="center">
      <Box w="30%" p={4} borderWidth="1px" borderRadius="lg">
        <Center>
          <Heading mb={4}>Sign Up</Heading>
        </Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired="true" isInvalid={errors.username} mt={4}>
            <FormLabel>UserName:</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BsFillPersonFill color="#CBD5E0" />}
              />
              <Input
                type="text"
                placeholder="max"
                {...register("username", {
                  required: "UserName is required",
                })}
              />
            </InputGroup>
            <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired="true" isInvalid={errors.email} mt={4}>
            <FormLabel>Email Address:</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<EmailIcon color="gray.300" />}
              />
              <Input
                type="email"
                placeholder="user@example.com"
                {...register("email", {
                  required: "Email Address is required",
                })}
              />
            </InputGroup>
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired="true" isInvalid={errors.password} mt={4}>
            <FormLabel>Password:</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<LockIcon color="gray.300" />}
              />
              <Input
                type={show ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "password should be at least 6 characters",
                  },
                })}
              />
              <TogglePassword show={show} setShow={setShow} />
            </InputGroup>
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Photo:</FormLabel>
            <Input type="file" accept="image/*" {...register("photo")} />
          </FormControl>

          <Center>
            <Stack>
              <Button
                mt={5}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Create An Account
              </Button>

              <Text>
                Already have an account?
                <Link
                  to="/login"
                  style={{
                    fontSize: "large",
                    color: "teal",
                    marginLeft: "5px",
                  }}
                >
                  Login
                </Link>
              </Text>
            </Stack>
          </Center>
        </form>
        <DevTool control={control} />
      </Box>
    </Flex>
  );
};

export default SignUp;
