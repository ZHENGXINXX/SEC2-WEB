import React, { useEffect, useState } from 'react';
import { detail } from './api';
import { message } from 'antd';
import FileView from "react-file-viewer";

export default function Test() {
  const [url, setUrl] = useState("");
  const [type, setType] = useState("");

  const getFile = async () => {
    const [error, resData] = await detail();
    if (error) {
      message.error(error.message);
      return;
    }

    if (resData.code === 200) {
      const data = resData.data.jobAttachments;
      const byteCharacters = atob(data.fileContent);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const file = new Blob([byteArray], { type: data.fileType });
      const fileUrl = URL.createObjectURL(file);
      const fileType = data.fileName;
      const index = fileType.lastIndexOf(".");
      setType(fileType.substring(index + 1,fileType.length));
      setUrl(fileUrl);
    }
  };

  useEffect(() => {
    getFile();
  }, []);

  return (
    <FileView
      style={{ width: 1000, height: 1000 }}
      fileType={type}
      filePath={url}
      errorComponent={Error} //发生错误时呈/格式不支持时展示的文件
    />
  );
}
