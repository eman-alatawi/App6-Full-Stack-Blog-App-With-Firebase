import { CheckIcon } from "@chakra-ui/icons";
import { CircularProgress, CircularProgressLabel, HStack } from "@chakra-ui/react";
import React from "react";
import PhotoModal from "../modal/PhotoModal";

const UploadStatus = ({ isUploading, progress, isUploadSuccess, file }) => {
  return (
    <>
      {isUploading ? (
        <CircularProgress value={progress} color="green.400">
          <CircularProgressLabel>{progress}%</CircularProgressLabel>
        </CircularProgress>
      ) : isUploadSuccess && file && (
        <HStack spacing={3}>
          <CheckIcon color="teal"/>
          <PhotoModal photo={file}/>
        </HStack>
      )}
    </>
  );
};

export default UploadStatus;
