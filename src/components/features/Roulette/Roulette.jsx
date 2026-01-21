import { useMemo, useState } from 'react'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import { Gift, Sparkles } from 'lucide-react'
import styled from 'styled-components'

import Card from '../../ui/Card'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import { prizes } from '../../../data/prizes'

const MIN_SPIN = 1440
const WHATSAPP_LINK = 'https://wa.me/SEUNUMERO?text=Ganhei+na+roleta+e+quero+meu+premio'

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

const WheelCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

const WheelWrapper = styled.div`
  position: relative;
`

const Pointer = styled.div`
  position: absolute;
  left: 50%;
  top: -12px;
  z-index: 10;
  width: 24px;
  height: 24px;
  transform: translateX(-50%) rotate(45deg);
  border-radius: 6px;
  background: #ec4899;
  box-shadow: 0 8px 18px rgba(236, 72, 153, 0.35);
`

const Wheel = styled(motion.div)`
  display: flex;
  height: 256px;
  width: 256px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 8px solid #ffffff;
  box-shadow: 0 20px 35px rgba(15, 23, 42, 0.2);
`

const WheelCenter = styled.div`
  position: relative;
  height: 224px;
  width: 224px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.75);
`

const WheelLabel = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  transform: ${({ $angle }) =>
    `rotate(${$angle}deg) translate(0, -92px) rotate(-${$angle}deg)`};
  transform-origin: center;
  text-align: center;
  width: 72px;
  margin-left: -36px;
`

const Guarantee = styled.div`
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.75);
  padding: 16px;
  text-align: center;
  font-size: 14px;
  color: #4b5563;
`

const GuaranteeHighlight = styled.p`
  margin: 4px 0 0;
  font-weight: 600;
  color: #db2777;
`

const WhatsAppLink = styled.a`
  text-decoration: none;
`

function Roulette() {
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [isWinnerOpen, setIsWinnerOpen] = useState(false)
  const sliceAngle = 360 / prizes.length

  const wheelStyle = useMemo(() => {
    const gradient = prizes
      .map((prize, index) => {
        const angle = (index / prizes.length) * 360
        return `${prize.color} ${angle}deg`
      })
      .join(', ')

    return {
      background: `conic-gradient(${gradient})`
    }
  }, [])

  function getRiggedSpin(prevRotation) {
    const targetIndex = prizes.findIndex((prize) => prize.label === 'Namoro')
    const targetAngle = targetIndex * sliceAngle + sliceAngle / 2
    const normalized = ((prevRotation % 360) + 360) % 360
    const alignmentOffset = (360 - targetAngle - normalized + 360) % 360

    const baseSpin = MIN_SPIN

    return baseSpin + alignmentOffset
  }

  function handleSpin() {
    if (isSpinning) return

    setIsSpinning(true)
    setIsWinnerOpen(false)
    setRotation((prev) => prev + getRiggedSpin(prev))
  }

  function handleSpinComplete() {
    if (!isSpinning) return

    setIsSpinning(false)
    setIsWinnerOpen(true)
    confetti({
      particleCount: 180,
      spread: 90,
      origin: { y: 0.6 }
    })
  }

  function handleCloseWinner() {
    setIsWinnerOpen(false)
  }

  return (
    <Wrapper>
      <Header>
        <Eyebrow>A Roleta</Eyebrow>
        <Title>Gire e descubra seu destino</Title>
        <Subtitle>Spoiler: o prêmio é inevitavelmente romântico.</Subtitle>
      </Header>

      <WheelCard>
        <WheelWrapper>
          <Pointer />
          <Wheel
            style={wheelStyle}
            animate={{ rotate: rotation }}
            transition={{ duration: 2.4, ease: 'easeOut' }}
            onAnimationComplete={handleSpinComplete}
          >
            <WheelCenter>
              {prizes.map((prize, index) => (
                <WheelLabel key={prize.label} $angle={index * sliceAngle + sliceAngle / 2}>
                  {prize.label}
                </WheelLabel>
              ))}
            </WheelCenter>
          </Wheel>
        </WheelWrapper>

        <Button onClick={handleSpin} isDisabled={isSpinning}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} />
            {isSpinning ? 'Girando...' : 'Girar'}
          </span>
        </Button>
      </WheelCard>

      <Guarantee>
        <p>Não importa onde a seta parar…</p>
        <GuaranteeHighlight>Você ganhou: UM NAMORADO</GuaranteeHighlight>
      </Guarantee>

      <Modal
        isOpen={isWinnerOpen}
        title="Parabéns!"
        description="Você ganhou: UM NAMORADO. Prepare-se para muitos dates."
        onClose={handleCloseWinner}
        actionLabel="Amei!"
      />
    </Wrapper>
  )
}

export default Roulette
