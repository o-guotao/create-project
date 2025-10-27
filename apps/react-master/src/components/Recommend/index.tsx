import React, { RefObject, useEffect, useRef, useState } from "react";
import { apiGet } from "../../apis/request";


const RecommendData = ({ item }: { item: typeof mockList[0] }) => {
  const [selected, setSelected] = useState(false)


  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    setSelected(!selected)
  }
  return (
    <div className="flex flex-col items-start p-4 border-t border-slate-300">
      <div className="h-auto flex justify-start">
        <a href={item} className="font-bold text-black text-lg leading-10">
          {item?.target?.question?.title || item?.target?.title}
        </a>
      </div>
      {
        selected ? (
          <div dangerouslySetInnerHTML={{ __html: item?.target?.question?.content || item?.target?.content }}></div>)
          : (<a onClick={handleClick} className="cursor-point text-slate-800 hover: text-slate-500">
            {item?.target?.excerpt}
            <span className="text-sm text-blue-500 hover:text-slate-500">
              阅读全文
            </span>
          </a>
          )}
      <div className={`flex bg-white w-full ${selected} ? 'bottom-0 border-t border-gary-200 sticky' : ''}`}>
        <div className="h-10 rounded-sm bg-blue-100 text-blue-500 p-2 m-2 inline-flex">
          <span className="inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            赞同
          </span>
        </div>
        <div className="h-10 rounded-sm bg-blue-100 text-blue-500 p-2 m-2 inline-flex">
          <span className="inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <div className="font-base text-gray-400 p-2 m-2 inline-flex">
          <svg
            width="1.2em"
            height="1.2em"
            viewBox="0 -2 24 24"
            data-new-api="ChatBubbleFill24"
            data-old-api="Comment"
            className="Zi Zi--Comment Button-zi"
            fill="currentColor"
          >
            <path
              d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          &nbsp; {item?.target?.comment_count} 条评论
        </div>
        <div className="font-base text-gray-400 p-2 m-2 inline-flex">
          <svg
            width="1.2em"
            height="1.2em"
            viewBox="0 -2 24 24"
            data-new-api="ChatBubbleFill24"
            data-old-api="Comment"
            className="Zi Zi--Comment Button-zi"
            fill="currentColor"
          >
            <path
              d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          收藏
        </div>
        <div className="font-base text-gray-400 p-2 m-2 inline-flex">
          <svg
            width="1.2em"
            height="1.2em"
            viewBox="0 -2 24 24"
            data-new-api="ChatBubbleFill24"
            data-old-api="Comment"
            className="Zi Zi--Comment Button-zi"
            fill="currentColor"
          >
            <path
              d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          喜欢
        </div>
        <div className="font-base text-gray-400 p-2 m-2 inline-flex">
          <svg
            width="1.2em"
            height="1.2em"
            viewBox="0 -2 24 24"
            data-new-api="ChatBubbleFill24"
            data-old-api="Comment"
            className="Zi Zi--Comment Button-zi"
            fill="currentColor"
          >
            <path
              d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          分享
        </div>
        {selected && (
          <a
            onClick={handleClick}
            className="text-base text-gray-400 p-2 m-2 inline-flex cursor-pointer"
          >
            <span className="inline-flex">收起</span>
          </a>
        )}
      </div>
    </div>
  )
}

const useRefInsObsState = (ref: RefObject<HTMLDivElement>) => {
  const [list, setList] = useState([]);
  const listLenRef = useRef([])
  const loadingRef = useRef(false)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        if (loadingRef.current) {
          return
        }
        loadingRef.current = true
        apiGet({
          url: 'recommend',
          startNum: listLenRef.current.length,
          pageSize: 10,
          params: {},
        }).then((res) => {
          listLenRef.current = [...listLenRef.current, ...(res?.list || [])]
          setList(listLenRef.current)

        }).finally(() => {
          loadingRef.current = false
        })
      }

    })
    if (ref?.current) {
      intersectionObserver.observe(ref.current)
    }
    return () => {
      intersectionObserver.disconnect()
    }
  }, [ref])

  return [list, list.length]
}


export default function Recommend() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [list, len] = useRefInsObsState(scrollRef)

  return (
    <div className="flex flex-col border-t">
      <h1>当前一共{len}条数据</h1>
      {
        (list || []).map((item: unknown) => (
          <RecommendData key={item.id} item={item}></RecommendData>
        ))
      }
      <div ref={scrollRef} className="flex h-14 justify-center items-center text-slate-500 border-t"> loading</div>
    </div>
  )
}