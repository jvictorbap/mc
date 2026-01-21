import styled from 'styled-components'

const StyledCard = styled.div`
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.8);
  padding: 24px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(6px);
`

function Card({ children, ...rest }) {
  return <StyledCard {...rest}>{children}</StyledCard>
}

export default Card
