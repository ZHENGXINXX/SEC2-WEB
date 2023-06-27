import React from "react";
export const courseItems = [
  {
    label: (<span>我的课堂</span>),
    key: 'main',
    path: '/main'
  },
  {
    label: (<span>备课区</span>),
    key: 'lessonPreparation',
    path: '/lessonPreparation',
  },
  {
    label: (<span>虚拟教研室</span>),
    key: 'teachingResearch',
    path: '/teachingResearch'
  },
];

export const typeItems = [
  {
    key: 'teach',
    label: '我教的',
  },
  {
    key: 'learn',
    label: '我学的'
  },
];

export const years = [
  {
    label: '2022-2023',
    value: '2022-2023'
  },
  {
    label: '2023-2024',
    value: '2023-2024'
  },
  {
    label: '2024-2025',
    value: '2024-2025'
  },
  {
    label: '2025-2026',
    value: '2025-2026'
  },
];

export const semester = [
  {
    label: '全年',
    value: '全年'
  },
  {
    label: '第一学期',
    value: '第一学期'
  },
  {
    label: '第二学期',
    value: '第二学期'
  },
];