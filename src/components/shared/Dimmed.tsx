import styled from '@emotion/styled'

function Dimmed({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>
}

export default Dimmed

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: var(--dimmed-zindex);
  width: 100%;
  height: 100%;
`
