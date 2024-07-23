import { css } from '@emotion/react'
import { FormValues } from '@models/signup'
import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import TextField from '@shared/TextField'
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import validator from 'validator'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })
  // input에  error가 언제 떠야 하는가?
  const [dirty, setDirty] = useState<Partial<FormValues>>({})

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: 'true',
    }))
  }, [])

  // 에러처리 벨리데이션
  const errors = useMemo(() => validate(formValues), [formValues])

  // input value값 변경시 데이터 입력
  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const 제출가능한상태인가 = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainer}>
      <TextField
        label="이메일"
        name="email"
        placeholder="name@gamil.com"
        value={formValues.email}
        onChange={handleFormValues}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드 재확인"
        name="rePassword"
        type="password"
        value={formValues.rePassword}
        onChange={handleFormValues}
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        helpMessage={Boolean(dirty.rePassword) ? errors.rePassword : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        placeholder="이름을 써주세요!"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={Boolean(dirty.name) ? errors.name : ''}
        onBlur={handleBlur}
      />

      <FixedBottomButton
        label="회원가입"
        disabled={제출가능한상태인가 === false}
        onClick={() => onSubmit(formValues)}
      />
    </Flex>
  )
}

const formContainer = css`
  padding: 24px;
`

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}
  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 잘 지켜주세요!'
  }
  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8글자 이상 입력해주세요'
  }
  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호는 8글자 이상 입력해주세요'
  } else if (
    validator.equals(formValues.password, formValues.rePassword) === false
  ) {
    errors.rePassword = '비밀번호를 확인해 주세요'
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상 입력해주세요'
  }
  return errors
}

export default Form
