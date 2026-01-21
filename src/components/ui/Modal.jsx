import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'

import Button from './Button'

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(15, 23, 42, 0.4);
`

const ModalCard = styled(motion.div)`
  width: 100%;
  max-width: 22rem;
  border-radius: 24px;
  background: #ffffff;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
`

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`

const Title = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`

const Description = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  color: #4b5563;
`

const CloseButton = styled.button`
  border: none;
  background: transparent;
  border-radius: 9999px;
  padding: 8px;
  cursor: pointer;
  color: #9ca3af;

  &:hover {
    color: #4b5563;
  }
`

const Footer = styled.div`
  margin-top: 24px;
`

function Modal({ isOpen, title, description, onClose, actionLabel = 'Entendi' }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ModalCard
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Header>
              <div>
                <Title>{title}</Title>
                {description ? <Description>{description}</Description> : null}
              </div>
              <CloseButton onClick={onClose} aria-label="Fechar modal">
                <X size={18} />
              </CloseButton>
            </Header>
            <Footer>
              <Button onClick={onClose}>{actionLabel}</Button>
            </Footer>
          </ModalCard>
        </Overlay>
      ) : null}
    </AnimatePresence>
  )
}

export default Modal
