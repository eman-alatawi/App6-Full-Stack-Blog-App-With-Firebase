import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useDeletePost } from "../../../hooks/post/postMutations";

const DeleteDialog = ({ id, photo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const { mutateAsync, isLoading } = useDeletePost();

  const onDeleteHandler = () => {
    const postObj = {
      id,
      photoURL: photo,
    };

    //mutateAsync for Delete post
    mutateAsync(postObj);
  };
  return (
    <>
      <MenuItem icon={<DeleteIcon color="red" />} color="red" onClick={onOpen}>
        Delete
      </MenuItem>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete the <b>Post</b>?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                onClick={onDeleteHandler}
                ml={3}
                isDisabled={isLoading}
              >
                Delete Post
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteDialog;
