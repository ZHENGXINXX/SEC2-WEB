import React, { useEffect, useState } from 'react';
import FileView from "react-file-viewer";

export default function FileViewModal({file={}}) {
  window.console.log(file);
  const [url, setUrl] = useState("");
  const [type, setType] = useState("");

  const getFile = (data) => {
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
    window.console.log(fileType.substring(index + 1, fileType.length));
    window.console.log(fileType.substring(index + 1, fileType.length));
    setType(fileType.substring(index + 1, fileType.length));
    setUrl(fileUrl);
  };

  useEffect(() => {
    getFile(file);
  }, [file]);

  return (
    <FileView
      style={{ width: '100%' }}
      fileType={type}
      filePath={url}
      errorComponent={Error} //发生错误时呈/格式不支持时展示的文件
    />
  );
}
