import React, { useState } from 'react';
import css from './index.module.less';
import { down } from '@/components/FileOperate/FileDown';
import { Drawer } from 'antd';
import FileViewModal from '@/components/FileOperate/FileViewModal';

export default function File({ file = {} }) {
  const size = parseInt(file.fileSize) / 1000;
  const [open, setOpen] = useState(false);

  const fileView = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={css.file}>
      <div className={css.img} onClick={() => fileView(file)}>
        <img src='https://bpic.588ku.com/element_origin_min_pic/19/04/09/f6ee1317a9bb3ef11258a0297a4cabe7.jpg' />
      </div>
      <div className={css.detail}>
        <div className={css.fileView} onClick={() => fileView(file)}>
          <div className={css.name}>{file.fileName}</div>
          <div>{size}k</div>
        </div>
        <div className={css.download} onClick={() => down(file)}>
          下载
        </div>
      </div>
      <Drawer open={open} onClose={onClose}  placement="left" style={{width:1200}}>
        <FileViewModal file={file}/>
      </Drawer>
    </div>
  );
}
