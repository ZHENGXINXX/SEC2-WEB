import React, { useEffect, useRef, useState } from 'react';
import CollapseBoard from './CollapseBoard';
import { Tabs } from 'antd';
import Pigeonhole from './Pigeonhole';
import { typeItems } from '@/components/Items';
import State from '@/tools/state';
import './index.less';

export default function PeriodCourses({ courses,getAll }) {
  const ref = useRef();
  const [items, setItems] = useState(typeItems);

  const openPigeonhole = () => {
    ref.current.setVis(true);
  };

  useEffect(() => {
    if (State.isStudent) {
      setItems(typeItems.slice(1,2));
    } else {
      setItems(typeItems.slice(0,1));
    }
  }, [State.userRole]);

  return (
    <div>
      <div className='center'>
        <div className='left'>
          <Tabs items={items}></Tabs>
        </div>
        <div className='right'>
          <div className='button' onClick={openPigeonhole}>归档管理</div>
        </div>
      </div>
      <div>
        <CollapseBoard courses={courses}/>
      </div>
      <Pigeonhole ref={ref} getAll={getAll}/>
    </div>
  );
}
