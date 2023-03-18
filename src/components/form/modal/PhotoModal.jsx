import { AttachmentIcon } from "@chakra-ui/icons";
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const PhotoModal = ({ photo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        h="1.75rem"
        size="sm"
        variant="outline"
        colorScheme="teal"
        onClick={onOpen}
      >
        <AttachmentIcon/>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Uploaded Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
            <Image w="100%" objectFit="cover"  src={photo}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PhotoModal;
