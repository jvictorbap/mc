import styled from 'styled-components'

const Background = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fce7f3 0%, #ffe4e6 45%, #e9d5ff 100%);
`

const Content = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100vh;
  width: 100%;
  max-width: 28rem;
  flex-direction: column;
  padding: 32px 20px 40px;
`

function MobileContainer({ children }) {
  return (
    <Background>
      <Content>{children}</Content>
    </Background>
  )
}

export default MobileContainer
