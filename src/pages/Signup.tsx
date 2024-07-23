import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'

import Form from '@components/signup/Form'
import { COLLECTION } from '@constants'
import { FormValues } from '@models/signup'
import { auth, store } from '@remote/firebase'
import React from 'react'

function SignupPage() {
  // 회원가입 처리 로직
  const handleSubmit = async (formValues: FormValues) => {
    console.log('formValues', formValues)
    const { email, password, name } = formValues
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    // db에 데이터를 닮기 위해 사용
    await updateProfile(user, {
      displayName: name,
    })

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    }
    await setDoc(doc(collection(store, COLLECTION.USER), user.uid), newUser)

    // TOTO : 로그인
  }
  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}
export default SignupPage
