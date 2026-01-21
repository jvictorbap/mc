import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import styled from 'styled-components'

import Card from '../../ui/Card'
import Button from '../../ui/Button'
import { slides } from '../../../data/slides'

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
  color: #7c3aed;
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

const SlideArea = styled.div`
  position: relative;
  flex: 1;
`

const CardStack = styled(Card)`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 16px;
`

const SlideImage = styled.img`
  height: 176px;
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
`

const SlideTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
`

const SlideDescription = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  color: #4b5563;
`

const StatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`

const StatLabel = styled.span`
  color: #6b7280;
`

const StatValue = styled.span`
  font-weight: 600;
  color: #db2777;
`

const StatHint = styled.span`
  margin-left: 8px;
  font-size: 12px;
  color: #9ca3af;
`

const Reviews = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ReviewCard = styled.div`
  border-radius: 16px;
  background: #f3e8ff;
  padding: 12px;
`

const ReviewAuthor = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  color: #7c3aed;
`

const ReviewText = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: #374151;
`

const ReviewStars = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #f59e0b;
`

const BulletList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  color: #4b5563;
`

const BulletItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
`

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.85);
  padding: 8px;
  color: #7c3aed;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.12);
  cursor: pointer;
`

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`

const IndicatorDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: ${({ $isActive }) => ($isActive ? '#ec4899' : '#fbcfe8')};
`

function Carousel({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentSlide = slides[currentIndex]

  const isLastSlide = currentIndex === slides.length - 1
  const actionLabel = isLastSlide ? 'Tentar a Sorte' : 'Próximo'

  const slideIndicator = useMemo(() => {
    return slides.map((slide, index) => ({ id: slide.id, isActive: index === currentIndex }))
  }, [currentIndex])

  function handleNext() {
    if (isLastSlide) {
      onNext()
      return
    }

    setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1))
  }

  function handlePrev() {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <Wrapper>
      <Header>
        <Eyebrow>Pitch Deck</Eyebrow>
        <Title>Motivos para dizer sim</Title>
        <Subtitle>Deslize o coração pelos highlights do pretendente.</Subtitle>
      </Header>

      <SlideArea>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            style={{ height: '100%' }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <CardStack>
              <SlideImage src={currentSlide.imageSrc} alt={currentSlide.imageAlt} />
              <div>
                <SlideTitle>{currentSlide.title}</SlideTitle>
                <SlideDescription>{currentSlide.description}</SlideDescription>
              </div>

              {currentSlide.stats ? (
                <StatList>
                  {currentSlide.stats.map((stat) => (
                    <StatRow key={stat.label}>
                      <StatLabel>{stat.label}</StatLabel>
                      <StatValue>
                        {stat.value}
                        {stat.valueHint ? <StatHint>{stat.valueHint}</StatHint> : null}
                      </StatValue>
                    </StatRow>
                  ))}
                </StatList>
              ) : null}

              {currentSlide.reviews ? (
                <Reviews>
                  {currentSlide.reviews.map((review) => (
                    <ReviewCard key={review.author}>
                      <ReviewAuthor>{review.author}</ReviewAuthor>
                      <ReviewText>“{review.text}”</ReviewText>
                      <ReviewStars>★★★★★</ReviewStars>
                    </ReviewCard>
                  ))}
                </Reviews>
              ) : null}

              {currentSlide.bullets ? (
                <BulletList>
                  {currentSlide.bullets.map((bullet) => (
                    <BulletItem key={bullet}>
                      <Sparkles size={14} color="#f472b6" />
                      {bullet}
                    </BulletItem>
                  ))}
                </BulletList>
              ) : null}
            </CardStack>
          </motion.div>
        </AnimatePresence>

        {currentIndex > 0 ? (
          <NavButton style={{ left: '12px' }} onClick={handlePrev} aria-label="Slide anterior">
            <ChevronLeft size={18} />
          </NavButton>
        ) : null}
        {!isLastSlide ? (
          <NavButton style={{ right: '12px' }} onClick={handleNext} aria-label="Próximo slide">
            <ChevronRight size={18} />
          </NavButton>
        ) : null}
      </SlideArea>

      <Indicators>
        {slideIndicator.map((indicator) => (
          <IndicatorDot key={indicator.id} $isActive={indicator.isActive} />
        ))}
      </Indicators>

      <Button onClick={handleNext}>{actionLabel}</Button>
    </Wrapper>
  )
}

export default Carousel
