'use client'

import { useState, type ChangeEvent } from 'react'
import Icon from './Icon'

interface TextFieldProps {
  icon?: string
  type?: string
  placeholder?: string
  defaultValue?: string
  onChange?: (v: string) => void
  borderColor?: string
}

function TextField({
  icon,
  type = 'text',
  placeholder = '아이디(면허번호)',
  defaultValue = '',
  onChange,
  borderColor = 'border-grey-300'
}: TextFieldProps) {
  const focusBorderColor = 'border-mint-600'
  const [value, setValue] = useState(defaultValue)
  const [focused, setFocused] = useState(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    onChange?.(newValue)
  }
  const onClearGesture = (e: React.MouseEvent) => {
    e.preventDefault()
    setValue('')
    onChange?.('')
  }


  return (
    <div
      className={`
        self-strech h-13 w-full px-3 py-2
        inline-flex flex-row justify-start items-center gap-2
        border ${focused ? focusBorderColor : borderColor} rounded-lg
      `}
    >
      {
        icon && (
          <Icon
            src={icon}
            tintColor='var(--color-grey-600)'
            className='w-6 h-6'
          />
        )
      }

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className='
          text-sm font-normal text-basic-balck leading-tight
          placeholder:text-grey-600 placeholder:text-sm placeholder:font-semibold placeholder:leading-tight
          outline-none flex-1
        '
      />

      {
        value && (
          <button
            type='button'
            onMouseDown={onClearGesture}
          >
            <Icon
              src='/circle_clear.svg'
              tintColor='var(--color-grey-500)'
              className='w-5 h-5'
            />
          </button>
        )
      }
    </div>
  )
}

export default TextField