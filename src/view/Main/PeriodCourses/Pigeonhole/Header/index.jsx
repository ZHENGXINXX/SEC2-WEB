import React, { useEffect, useState } from 'react';
import css from './index.module.less';
import { typeItems } from '@/components/Items';
import { Tabs } from 'antd';
import State from '@/tools/state';

export default function Header() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (State.isStudent) {
      setItems(typeItems.slice(1));
    } else {
      setItems(typeItems.slice(0,1));
    }
  }, [State.userRole]);

  return (
    <div className={css.header}>
      <div>
        <Tabs items={items} tabBarStyle={{height:55}}/>
      </div>
    </div>
  );
}
