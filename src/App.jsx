import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'

import MobileContainer from './components/layout/MobileContainer'
import Contract from './components/features/Contract/Contract'
import Carousel from './components/features/Carousel/Carousel'
import Roulette from './components/features/Roulette/Roulette'

const STEP_TRANSITION = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 }
}

const StepWrapper = styled(motion.div)`
  display: flex;
  flex: 1;
`

function App() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = useMemo(() => {
    return {
      1: Contract,
      2: Carousel,
      3: Roulette
    }
  }, [])

  function handleNext() {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const StepComponent = steps[currentStep]

  return (
    <MobileContainer>
      <AnimatePresence mode="wait">
        <StepWrapper
          key={currentStep}
          initial={STEP_TRANSITION.initial}
          animate={STEP_TRANSITION.animate}
          exit={STEP_TRANSITION.exit}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <StepComponent onNext={handleNext} />
        </StepWrapper>
      </AnimatePresence>
    </MobileContainer>
  )
}

export default App
