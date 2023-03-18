import { Box, Card, CardBody, CardHeader, Heading, Image, Stack, StackDivider, Text } from "@chakra-ui/react";
import React from "react";
import DefaultUserImg from "../../assets/default-user-image.png"
import { useAuth } from "../../hooks/auth/useAuth";

const ProfileCard = () => {
  const currentUser = useAuth();

  return (
    <Card boxShadow="lg">
      <CardHeader>
        <Image
        boxSize="20rem"
        borderRadius="full"
        fallbackSrc={DefaultUserImg}
        src={currentUser?.photoURL}
        boxShadow="md"
        border="5px solid white"
        alt="user photo"
        />
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="md" textTransform="uppercase">
              User Name
            </Heading>
            <Text pt="2" fontSize="md">
            {currentUser?.displayName}
            </Text>
          </Box>

          <Box>
            <Heading size="md" textTransform="uppercase">
              Email Address
            </Heading>
            <Text pt="2" fontSize="md">
            {currentUser?.email}
            </Text>
          </Box>
         
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
