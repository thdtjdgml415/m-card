import styled from '@emotion/styled'
import { colors } from '@styles/colorPalette'

const Input = styled.input`
  padding: 0 16px;
  font-size: 15px;
  height: 48px;
  font-weight: 500;
  border: 1px solid ${colors.grey};
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.blue};
  }
  // 에러가 발생했을때 아리아 값
  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`
export default Input
