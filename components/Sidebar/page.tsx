'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useSidebar, MenuCategory } from '@/components/Sidebar/context'
import { usePathname } from 'next/navigation'
import Icon from '@/components/Icon'

export default function Sidebar({ categories }: { categories: MenuCategory[] }) {
  const pathname = usePathname()
  const { openMenus, toggleOpen } = useSidebar()

  useEffect(() => {
    let matching: string | null = null

    for (const category of categories) {
      for (const group of category.groups) {
        const hasMatching = group.items.some(item => item.href === pathname)

        if (hasMatching) {
          matching = group.id
          break
        }
      }

      if (matching) { 
        break
      }
    }

    // 일치하는 group이 있고 아직 열려있지 않으면 toggleOpen 실행
    if (matching && !openMenus.has(matching)) {
      toggleOpen(matching)
    }
  }, [pathname, categories])

  return (
    <aside className="bg-basic-white h-screen w-60 left-0 top-0 border-r-[1px] border-grey-300">
      <div className='w-full h-20 px-6 py-5 inline-flex justify-cetner items-center'>
        <img
          src='/logo_goodpharm.svg'
          className='h-7 flex-1'
        />
      </div>
      
      <nav>
        {
          categories.map((category) => (
            <div className='w-full py-2 inline-flex flex-col justify-start items-start' key={category.id}>
              <span className='self-stretch px-6 py-2 inline-flex justify-start items-center text-grey-600 text-sm font-medium leading-snug'>
                {category.label}
              </span>

              {
                category.groups.map((group) => (
                  <div key={group.id}>
                    <button 
                      key={group.id}
                      className='self-stretch w-full inline-flex justify-start items-center px-6 py-3.5 gap-3 cursor-pointer'
                      onClick={ group.onClick ? group.onClick : () => toggleOpen(group.id) }
                    >
                      <Icon
                        className='w-6 h-6'
                        tintColor='var(--color-basic-black)'
                        src={group.icon}
                      />
                      <span className='flex-1 inline-flex justify-start text-sm font-normal leading-snug'>
                        {group.label}
                      </span>
                      {
                        group.items.length > 0 && (
                          <Icon
                            className={
                              `w-4 h-4 transition-transform duration-300 ${ openMenus.has(group.id) ? 'rotate-180' : 'rotate-0' }`
                            }
                            tintColor='var(--color-grey-600)'
                            src='/down_chevron.svg'
                          />
                        )
                      }
                    </button>
                    <ul 
                      className='overflow-hidden transition-all duration-300 ease-in-out'
                      style={{
                        display: 'grid',
                        gridTemplateRows: openMenus.has(group.id) ? '1fr' : '0fr'
                      }}
                    >
                      <div className='overflow-hidden'>
                        {
                          group.items.map((item, row) => (
                            <Link 
                              className={
                                `inline-flex flex-row justify-start items-center gap-3 px-6 h-13 w-full cursor-pointer
                                ${ pathname === item.href ? 'bg-mint-100 border-r-[3px] border-mint-600' : 'bg-basic-white' }`
                              }
                              href={item.href}
                              key={item.id}
                            >
                              <div className='flex flex-col gap-0 justify-center items-center h-full w-6'>
                                { /* 위쪽 선 */ }
                                <div 
                                  className={
                                    `flex-1 w-px ${ row > 0 ? 'bg-grey-400' : 'bg-transparent' }`
                                  }
                                />
                                { /* 동그라미 점 */ }
                                <div 
                                  className={
                                    `w-[7px] h-[7px] rounded-full ${ pathname === item.href ? 'bg-mint-600' : 'bg-grey-400' }`
                                  }
                                />
                                { /* 아래쪽 선 */ }
                                <div 
                                  className={
                                    `flex-1 w-px ${ row < group.items.length - 1 ? 'bg-grey-400' : 'bg-transparent' }`
                                  }
                                />
                              </div>
                              <span 
                                className={
                                  `text-sm ${ pathname === item.href ? 'text-mint-600 font-medium leading-none' : 'text-basic-black font-normal leading-tight' }`
                                }
                              >
                                {item.label}
                              </span>
                            </Link>
                          ))
                        }
                      </div>
                    </ul>
                  </div>
                ))
              }
            </div>
          ))
        }
      </nav>
    </aside>
  )
}