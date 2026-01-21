import { useState } from 'react'
import { ArrowDownCircle, HeartHandshake } from 'lucide-react'
import styled from 'styled-components'

import Card from '../../ui/Card'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import { useScrollProgress } from '../../../hooks/use-scroll-progress'
import { contractClauses } from '../../../data/contract-terms'

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 24px;
`

const Header = styled.div`
  text-align: center;
`

const Eyebrow = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #ec4899;
`

const Title = styled.h1`
  margin: 8px 0 0;
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
`

const Subtitle = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  color: #4b5563;
`

const ScrollBox = styled.div`
  max-height: 288px;
  overflow-y: auto;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.7);
  padding: 16px;
  font-size: 14px;
  color: #374151;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ClauseNumber = styled.span`
  font-weight: 600;
  color: #ec4899;
`

const FinishText = styled.p`
  font-weight: 600;
  color: #db2777;
`

const ScrollHint = styled.div`
  pointer-events: none;
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.85);
  padding: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #ec4899;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.15);
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

function Contract({ onNext }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { hasReachedEnd, handleScroll } = useScrollProgress()

  function handleAccept() {
    if (!hasReachedEnd) return
    onNext()
  }

  function handleRefuse() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  return (
    <Wrapper>
      <Header>
        <Eyebrow>Termos de Uso</Eyebrow>
        <Title>Contrato Oficial de Ficante</Title>
        <Title>Maria Clara Araujo</Title>
        <Subtitle>Role até o final para liberar o botão do sim.</Subtitle>
      </Header>

      <Card style={{ position: 'relative' }}>
        <ScrollBox onScroll={handleScroll}>
          {contractClauses.map((clause, index) => (
            <p key={clause}>
              <ClauseNumber>Cláusula {index + 1}.</ClauseNumber> {clause}
            </p>
          ))}
          <FinishText>Fim do contrato. Obrigada por ler com carinho 💖</FinishText>
        </ScrollBox>
        {!hasReachedEnd ? (
          <ScrollHint>
            <ArrowDownCircle size={16} />
            Continue rolando
          </ScrollHint>
        ) : null}
      </Card>

      <Actions>
        <Button onClick={handleAccept} isDisabled={!hasReachedEnd}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <HeartHandshake size={16} />
            Aceitar
          </span>
        </Button>
        <Button variant="secondary" onClick={handleRefuse}>
          Recusar
        </Button>
      </Actions>

      <Modal
        isOpen={isModalOpen}
        title="Erro 404"
        description="Coração não encontrado. Tente novamente."
        onClose={handleCloseModal}
      />
    </Wrapper>
  )
}

export default Contract
