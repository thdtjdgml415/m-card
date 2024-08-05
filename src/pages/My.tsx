import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import useUser from '@/hooks/auth/useUser'
import MyImage from '@/my/MyImage'

import { auth } from '@/remote/firebase'
import { signOut } from 'firebase/auth'
import { useCallback } from 'react'

function MyPage() {
  const user = useUser()

  const handleLogOut = useCallback(() => {
    signOut(auth)
  }, [])

  return (
    <Flex direction="column" align="center">
      <Spacing size={90} />
      <MyImage size={60} mode="upload" />
      <Spacing size={10} />
      <Text bold={true}>{user?.displayName}</Text>
      <Spacing size={10} />
      <Button onClick={handleLogOut}>로그아웃</Button>
    </Flex>
  )
}

export default MyPage
