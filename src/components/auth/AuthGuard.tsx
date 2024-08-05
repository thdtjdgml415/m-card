import { useState } from 'react'

import { auth } from '@/remote/firebase'
import { onAuthStateChanged } from 'firebase/auth'

import { userAtom } from '@atoms/user'
import { useSetRecoilState } from 'recoil'

// 인증 처리
function AuthGuard({ children }: { children: React.ReactNode }) {
  const setUser = useSetRecoilState(userAtom)
  const [initialize, setInitialize] = useState(false)
  // 로그인 상태 변경
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      })
    } else {
      setUser(null)
    }
    setInitialize(true)
  })
  // 로그인 완료시 true로 변경 후 하위 컴포넌트 렌더링
  if (initialize === false) {
    return null
  }
  return <>{children}</>
}
export default AuthGuard
