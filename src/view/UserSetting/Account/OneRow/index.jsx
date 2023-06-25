import React from 'react';
import Icon from '@ant-design/icons';
import css from './index.module.less';
import { Lament } from '@/assets/icon/Icon';

export default function OneRow({ name, value, operate, event, over }) {
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
          <div className={css.operate}>{
            name === '手机号' ?
              value ?
                <div style={{ display: 'flex' }}>
                  <div onClick={event}>更换手机号</div>
                  <span>|</span>
                  <div onClick={over}>解绑</div>
                </div> :
                <div>立即绑定</div> :
              <div onClick={event}>{operate}</div>
          }</div>
        </div>
      </div>
    </div >
  );
}
