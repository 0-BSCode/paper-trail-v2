import { useMutation } from 'convex/react';
import { api } from '@src/_convex/_generated/api';
import { type Id } from '@src/_convex/_generated/dataModel';

interface FileHandlerHookType {
  uploadFile: (file: File) => Promise<string>;
  redirectToFile: (fileUrl: string) => void;
  deleteFile: (documentFileId: Id<'documentFiles'>) => void;
  deleteAllFiles: (documentId: string) => void;
}

const useFileHandler = (): FileHandlerHookType => {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const deleteFileById = useMutation(api.files.deleteFileById);
  const deleteFilesOfDocument = useMutation(api.files.deleteFilesOfDocument);

  const uploadFile = async (file: File): Promise<string> => {
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': file.type },
      body: file,
    });
    const { storageId } = await result.json();

    return storageId;
  };

  const redirectToFile = (fileUrl: string): void => {
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.target = '_blank';
    // Append the link to the DOM
    document.body.appendChild(downloadLink);

    // Trigger a click on the link to start the download
    downloadLink.click();

    // Remove the link from the DOM
    document.body.removeChild(downloadLink);
  };

  const deleteFile = (documentFileId: Id<'documentFiles'>): void => {
    void deleteFileById({ documentFileId });
  };

  const deleteAllFiles = (documentId: string): void => {
    void deleteFilesOfDocument({ documentId });
  };

  return {
    uploadFile,
    redirectToFile,
    deleteFile,
    deleteAllFiles,
  };
};

export default useFileHandler;
