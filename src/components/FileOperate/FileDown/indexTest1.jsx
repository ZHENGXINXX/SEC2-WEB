import React, { useEffect, useState } from "react";
// import { decode } from 'base-64';
import { message } from "antd";
import { test } from './api';
// import { Buffer } from 'buffer';

const ViewerComponent = () => {
  const [url, setUrl] = useState();

  const getData = async () => {
    const [error, resData] = await test();
    if (error) {
      message.error(error.message);
      return;
    }

    if (resData.code === 200) {
      const data = resData.data.jobAttachments;
      // setType(data.fileType);
      const byteCharacters = atob(data.fileContent);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const file = new Blob([byteArray], { type: data.fileType });
      const fileUrl = URL.createObjectURL(file);
      setUrl(fileUrl);
      var link = document.createElement('a');
      link.style.display = 'none';
      link.href = fileUrl;
      link.target = "_blank";
      link.click();
      // link.setAttribute(
      // 'download',
      // data.fileName
      // );
      // document.body.appendChild(link);
      // link.click();
    } else {
      message.error(resData.error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <img src={url}>
    </img>
  );
};

export default ViewerComponent;