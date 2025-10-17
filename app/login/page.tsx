'use client'

import { useState } from 'react'
import TextField from '@/components/TextField'
import Icon from '@/components/Icon'


function Login() {
  const [autoSave, setAutoSave] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const checkColor = autoSave ? 'var(--color-mint-600)' : 'var(--color-grey-400)'
  const onChangeStoreId = (storeId: string) => {
    console.log('storeId:', storeId);
  }
  const onChangePassword = (password: string) => {
    console.log('password:', password);
  }
  const onClickAutoSave = (e: React.MouseEvent) => {
    setAutoSave(prev => !prev)
  }

  return (
    <div
      className='
          w-screen h-screen
          bg-gradient-to-l from-[#13BEB7] to-[#0299A0]
          inline-flex flex-col justify-center items-center
        '
    >
      <div className='inline-flex flex-col justify-start items-start gap-7'>
        <div
          className='
            relative w-[440px] z-10 px-8 py-16 rounded-xl          
            bg-basic-white shadow-[0px_10px_24px_0px_rgba(69,72,76,0.10)]
            inline-flex flex-col justify-start items-center gap-10
          '
        >
          <img src='/logo_goodpharm.svg' alt='logo'/>

          <div className='self-stretch inline-flex flex-col justify-start items-start gap-9'>
            <div className='self-stretch inline-flex flex-col justify-start items-start gap-4'>
              <div className='self-stretch inline-flex flex-col justify-start items-start gap-3'>
                <TextField
                  icon='/filled_user.svg'
                  type='text'
                  placeholder='아이디(면허번호)'
                  onChange={onChangeStoreId}
                />
                <TextField
                  icon='/filled_lock.svg'
                  type='password'
                  placeholder='비밀번호'
                  onChange={onChangePassword}
                />
              </div>
              <button 
                type='button'
                className='inline-flex justify-start items-center gap-1 cursor-pointer'
                onClick={onClickAutoSave}
              >
                <Icon
                  src='/circle_check.svg'
                  tintColor={checkColor}
                  className='w-5 h-5'
                />
                <span className='text-sm text-basic-balck font-normal leading-5'>
                  아이디 저장
                </span>
              </button>
              <div 
                className='
                  self-stretch pl-3 pr-4 py-3 rounded-lg bg-red-200
                  inline-flex flex-row justify-start items-start gap-1.5
                '
              >
                <div className='py-0.5 inline-flex justify-start items-start'>
                  <Icon
                    src='/circle_alert.svg'
                    tintColor='var(--color-red-600)'
                    className='w-4 h-4'
                  />
                </div>
                <span className='text-red-600 text-[13px] font-medium leading-4.5'>
                  아이디(면허번호) 또는 비밀번호가 일치하지 않습니다. 입력하신 내용을 다시 확인해주세요.
                </span>
              </div>
            </div>
            <button 
              className='
                self-stretch bg-mint-600 h-13 rounded-lg 
                inline-flex justify-center items-center cursor-pointer
                hover:opacity-80'
            >
              <span className='text-basic-white text-lg font-bold leading-7'>
                로그인
              </span>
            </button>
          </div>
        </div>


        <div className='self-stretch inline-flex flex-col justify-start items-center gap-4'>
          <span className='text-basic-white text-xl font-bold leading-loose'>
            고객지원 1600-3122
          </span>
          <span className='text-grey-300 text-xs font-normal leading-none tracking-tight'>
            COPYRIGHT ⓒ 2023 GOODPHARM. ALL RIGHTS RESERVED.
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login

