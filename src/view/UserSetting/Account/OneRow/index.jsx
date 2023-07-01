import React from 'react';
import Icon from '@ant-design/icons';
import css from './index.module.less';
import { Lament } from '@/assets/icon/Icon';

export default function OneRow({ name, value, operate, event }) {
  return (
    <div>
      <div className={css.row}>
        <div className={css.name}>{name}</div>
        <div className={css.value}>
          <div className={css.message}>{value
            ? value :
            <div>
              <Icon component={Lament} /><span>未完善</span>
            </div>}
          </div>
          <div className={css.operate}>
            <div onClick={event}>{operate}</div>
          </div>
        </div>
      </div>
    </div >
  );
}
