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
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

  const {signIn, signInWithGoogle} = useContext(AuthContext);

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
    signIn(data);
  };

  return (
    <Flex h="80vh" alignItems="center" justifyContent="center">
      <Box w="30%" p={4} borderWidth="1px" borderRadius="lg">
        <Center>
          <Heading mb={4}>Sign In</Heading>
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

          <FormControl isInvalid={errors.password} mt={4}>
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
                })}
              />
              <TogglePassword show={show} setShow={setShow} />
            </InputGroup>
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>

            <FormHelperText color="teal" mt={2}>
              <Link to="/reset-password" style={{ fontSize: "small" }}>
                Forgot Password?
              </Link>
            </FormHelperText>
          </FormControl>

          <Center>
            <Stack>
              <Button
                mt={5}
                mb={3}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Login
              </Button>

              <HStack>
                <Divider orientation="horizontal" />
                <Center>
                  <Text mx={3}>OR</Text>
                </Center>
                <Divider orientation="horizontal" />
              </HStack>

              <Button leftIcon={<FcGoogle />} size="lg" borderWidth="2px" onClick={signInWithGoogle}>
                Continue with Google
              </Button>

              <Text>
                Don't have an account?
                <Link
                  to="/signup"
                  style={{
                    fontSize: "large",
                    color: "teal",
                    marginLeft: "5px",
                  }}
                >
                  Create an account
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

export default Login;
