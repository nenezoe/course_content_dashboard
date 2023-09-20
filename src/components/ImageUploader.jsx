import React, { useCallback, useContext, useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import uploadSvg from "./../assets/images/uploader.svg";
import { encode, decode } from "base64-arraybuffer";

import { ImgContext } from "../screens/CourseUpload/SingleUpload";

let binaryStr;
let filess;

function ImageUploader({ open }) {
  const { files, setFiles } = useContext(ImgContext);
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // setFiles(
    //   acceptedFiles.map((file) =>
    //     Object.assign(file, {
    //       preview: URL.createObjectURL(file)
    //     })
    //   )
    // );
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      // setFiles([...files, file]);
      filess = acceptedFiles.map((file) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        // setFiles((prev) => [...prev, reader.result]);
        setFiles([...files, reader.result]);
        // console.log(files)
        URL.revokeObjectURL(file.preview);
        binaryStr = reader.result;
        // console.log(acceptedFiles);
      };
      reader.readAsDataURL(file);
    });
  }, []);
  useEffect(() => {
    console.log("file uploaded");
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // console.log(files);

  return (
    <div className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Image src={uploadSvg} />
      </div>
      <aside>
        <ul className="mt-5">{filess}</ul>
      </aside>
    </div>
  );
}

export default ImageUploader;
