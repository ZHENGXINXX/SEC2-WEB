import React from 'react';
import css from './index.module.less';
import { down } from '@/components/FileDown';

export default function File({ file={} }) {
  const size = parseInt(file.fileSize) / 1000;
  return (
    <div className={css.file} onClick={()=>down(file)}>
      <div className={css.img}>
        <img src='https://bpic.588ku.com/element_origin_min_pic/19/04/09/f6ee1317a9bb3ef11258a0297a4cabe7.jpg' />
      </div>
      <div className={css.detail}>
        <div className={css.name}>{file.fileName}</div>
        <div>{size}k</div>
      </div>
    </div>
  );
}
