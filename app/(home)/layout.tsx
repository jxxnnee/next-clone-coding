'use client'

import Sidebar from '@/components/Sidebar/page'
import { SidebarProvider, MenuGroup, MenuCategory } from '@/components/Sidebar/context'
import { useState, useEffect, useRef } from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const menuGroups: MenuGroup[] = [
    {
      id: 'dashboard',
      label: '대시보드',
      icon: '/dashboard_icon.svg',
      items: []
    },
    {
      id: 'mobile',
      label: '모바일약국',
      icon: '/chat_icon.svg',
      items: [
          { id: 'a', href: '/strawberry/milk', label: '1:1 채팅' },
          { id: 'b', href: '/strawberry/latte', label: '다중 메시지 전송' }
      ]
    },
    {
      id: 'operation',
      label: '운영관리',
      icon: '/operation_icon.svg',
      items: [
          { id: 'c', href: '/', label: '약국 기본 정보' },
          { id: 'd', href: '/', label: '굿팜 앱 관리' },
          { id: 'e', href: '/', label: '그룹관리' },
          { id: 'f', href: '/', label: '자주쓰는 문구' },
          { id: 'g', href: '/', label: '자동 메시지 관리' }
      ]
    },
    {
      id: 'member',
      label: '회원관리',
      icon: '/member_icon.svg',
      items: [
          { id: 'h', href: '/choco/milk', label: '회원목록' },
          { id: 'i', href: '/choco/latte', label: '차단회원 관리' }
      ]
    },
    {
      id: 'payment',
      label: '결제관리',
      icon: '/payment_icon.svg',
      items: [
          { id: 'j', href: '/', label: '결제내역 관리' },
          { id: 'k', href: '/', label: '페이앱' }
      ]
    }
  ]

  const categories: MenuCategory[] = [
    {
      id: '',
      label: '모바일 약국',
      groups: menuGroups
    }
  ]

  const [isOpened, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const onClickProfile = () => {
    setOpen(prev => !prev)
  }


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // 클릭한 요소가 dropdown 내부가 아니면
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    // 드롭다운이 열려있을 때만 리스너 추가
    if (isOpened) {
      document.addEventListener('click', handleClickOutside)
    }

    // 컴포넌트 언마운트 또는 isOpened 변경 시 리스너 제거
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpened])
  
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar categories={categories}/>
        <div className='flex-1 inline-flex flex-col justify-start items-start gap-0'>
          <header className='self-stretch h-18 px-5 py-4 border-b-1 border-grey-300 inline-flex justify-between items-center'>
            <span className='text-basic-black text-2xl font-bold leading-9'>
              마이페이지
            </span>
            <div className='relative flex tems-center gap-1' ref={dropdownRef}>
              <button 
                className='inline-flex flex-row items-center gap-5 cursor-pointer'
                onClick={onClickProfile}
              >
                <div className='inline-flex flex-row items-center gap-3'>
                  <div className='w-8 h-8 rounded-full bg-grey-500'>

                  </div>
                  <div className='inline-flex flex-col justify-start items-start gap-0.5'>
                    <span className='text-basic-black text-base font-bold leading-none'>
                      홍길동동
                    </span>
                    <span className='text-basic-black text-xs font-normal leading-none'>
                      대표약사
                    </span>
                  </div>
                </div>
                <img
                  src='/down_chevron.svg'
                  className='w-5 h-5'
                />
              </button>
              {
                isOpened && (
                  <div 
                    className='
                      inline-flex flex-col justify-center px-5 pt-8 pb-3 gap-4
                      w-60 absolute top-full right-0 mt-2 z-10
                      rounded-lg outline-1 outline-grey-300 bg-basic-white
                    '
                  >
                    <div className='inline-flex flex-col items-center gap-3'>
                      <div className='w-12 h-12 rounded-full bg-grey-500'>
                      </div>
                      <div className='inline-flex flex-col items-center gap-0'>
                        <span className='text-basic-black text-lg font-bold leading-7'>
                          홍길동동
                        </span>
                        <span className='text-mint-600 text-xs font-medium leading-none'>
                          대표약사
                        </span>
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <button className='self-stretch py-4 text-basic-black text-sm text-left font-medium leading-none cursor-pointer'>
                        내 계정 정보
                      </button>
                      <div className='h-[1px] w-full bg-grey-200'/>
                      <button className='self-stretch py-4 text-basic-black text-sm text-left font-medium leading-none cursor-pointer'>
                        로그아웃
                      </button>
                    </div>
                  </div>
                )
              }
            </div>
          </header>
          <main>

            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}