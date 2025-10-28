import React from 'react'
import { Outlet, RouteObject } from 'react-router-dom'
import Home from '../pages/home'
import Recommend from '../components/Recommend'
import Chat from '../pages/chat'

export interface extraBizObject {
  title?: string
}

type ZHRouter = extraBizObject & RouteObject


export const router: ZHRouter[] = [
  {
    path: '/',
    element: <Home />,
    title: '首页',
    children: [
      {
        path: '',
        element: <Recommend />,
      },
      {
        path: 'follow',
        element: <div>关注</div>,
      },
      {
        path: 'hot',
        element: <div>热榜</div>,
      },
      {
        path: 'self',
        element: <div>专栏</div>,
      },
    ],
  },
  {
    path: '/chat',
    title: '直答',
    element: <Chat />,
  },
  {
    path: '/education',
    element: <div>知乎知学堂</div>,
    title: '知乎知学堂',
  },
  {
    path: '/question',
    element: <div>等你来答</div>,
    title: '等你来答',
    children: [
      {
        path: '',
        element: <div>推荐</div>,
      },
      {
        path: 'hot',
        element: <div>人气</div>,
      },
    ],
  },
]
