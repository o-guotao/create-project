import React, { useEffect, useRef } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const tabs = [
  {
    name: '关注',
    to: '/follow',
  },
  {
    name: '推荐',
    to: '/',
  },
  {
    name: '热榜',
    to: '/hot',
  },
  {
    name: '专栏',
    to: '/column',
  },
]

export const PureTabs = () =>
  tabs.map((item) => (
    <NavLink
      key={item.name}
      to={item.to}
      className={({ isActive }) =>
        'whitespace-nowrap p-4 text-base transition-all ' +
        (isActive
          ? 'text-blue-600 font-bold'
          : 'text-black hover:text-blue-900')
      }
    >
      {item.name}
    </NavLink>
  ))

export default function Tabs({
  onChange,
}: {
  onChange: (isHide: boolean) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      onChange(entries[0].isIntersecting)
    })

    if (scrollRef.current) {
      intersectionObserver.observe(scrollRef.current)
    }

    return () => {
      intersectionObserver.disconnect()
    }
  })

  return (
    <div className="w-full">
      <div ref={scrollRef}></div>
      <div className="flex mx-6 box-border">
        <PureTabs />
      </div>
      <Outlet />
    </div>
  )
}