import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { storage } from "../../../firebase/firebase.config";
import { useAuth } from "../../../hooks/auth/useAuth";
import UploadStatus from "./UploadStatus";

const UploadFile = ({
  register,
  file,
  setFile,
  isUploadSuccess,
  setIsUploadSuccess,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentUser = useAuth();

  const { mutateAsync } = useMutation({
    mutationFn: (photoFile) => uploadPhoto(photoFile),
  });

  const uploadPhoto = async (photoFile) => {
    const photoName = photoFile.name;

    const storageRef = ref(
      storage,
      `posts/${currentUser.displayName}/${photoName + Date.now()}`
    );

    const uploadTask = uploadBytesResumable(storageRef, photoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);

        switch (snapshot.state) {
          case "paused":
            setIsUploading(false);
            break;
          case "running":
            setIsUploading(true);
            break;
        }
      },
      (error) => {
        setIsUploading(false);
        console.log("Upload task has an error", error);
        toast.error("Something went wrong while uploading the photo");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setFile(downloadURL);
          setIsUploading(false);
          setIsUploadSuccess(true);
          toast.success("Photo Uploaded successfully");
        });
      }
    );
  };

  return (
    <FormControl isRequired="true" mt={4}>
      <FormLabel>Photo:</FormLabel>
      <InputGroup>
        <Input
          type="file"
          accept="image/*"
          {...register("photo", { required: true, disabled: isUploading })}
          onChange={(e) => mutateAsync(e.target.files[0])}
        />
        <InputRightElement w="8rem" disabled={isUploading}>
          <UploadStatus
            isUploading={isUploading}
            progress={progress}
            isUploadSuccess={isUploadSuccess}
            file={file}
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default UploadFile;
