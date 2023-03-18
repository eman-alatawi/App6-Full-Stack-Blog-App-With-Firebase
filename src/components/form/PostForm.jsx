import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { DevTool } from "@hookform/devtools";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PhotoModal from "./modal/PhotoModal";
import UploadFile from "./upload/UploadFile";

const PostForm = ({ post, handleOnSubmit, isLoading }) => {
  const [file, setFile] = useState(null);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isInvalid },
  } = useForm({
    mode: "onBlur",
    defaultValues: post,
  });

  const onSubmit = (data) => {
    console.log(data);

    if(!post){
      //create post
      const postData = {...data, photo: file}
      handleOnSubmit(postData)
    }else{
      //upadate post
      handleOnSubmit(data); 
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired="true" isInvalid={errors.title} mt={4}>
          <FormLabel>Title:</FormLabel>
          <Input
            type="text"
            placeholder="App 6: Blog app ..."
            {...register("title", {
              required: "Post Title is required",
              maxLength: {
                value: 30,
                message: "maximum of 30 characters",
              },
            })}
          />
          <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired="true" isInvalid={errors.content} mt={4}>
          <FormLabel>Content:</FormLabel>
          <Textarea
            resize="none"
            rows={6}
            placeholder="Content..."
            {...register("content", {
              required: "Post Content is required",
            })}
          ></Textarea>
          <FormErrorMessage>{errors?.content?.message}</FormErrorMessage>
        </FormControl>

        {post?.photo ? (
          <HStack>
            <FormLabel mt={3}>Photo:</FormLabel>
            <PhotoModal photo={post.photo}/>
          </HStack>
        ) : (
          <UploadFile
            register={register}
            file={file}
            setFile={setFile}
            isUploadSuccess={isUploadSuccess}
            setIsUploadSuccess={setIsUploadSuccess}
          />
        )}

        <ButtonGroup spacing="3" mt={10} float="right">
          <Button
            colorScheme="teal"
            isLoading={isLoading}
            loadingText="Saving"
            type="submit"
            isDisabled={!post ? isInvalid || !isUploadSuccess : isInvalid}
          >
            Publish Post
          </Button>

          <Button onClick={() => navigate("/")}>Cancel</Button>
        </ButtonGroup>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default PostForm;
