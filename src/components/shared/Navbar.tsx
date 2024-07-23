import { Link, useLocation } from 'react-router-dom'
import Flex from './Flex'

import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import Button from './Button'

function Navbar() {
  const location = useLocation()
  const showSignButton =
    ['/signup', 'signin'].includes(location.pathname) === false
  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      <Link to="/signup">
        {showSignButton ? <Button>로그인/회원가입</Button> : null}
      </Link>
    </Flex>
  )
}

const navbarContainerStyles = css`
  height: 40px;
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`

export default Navbar
