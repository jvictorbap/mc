import { useCallback, useState } from 'react'

const SCROLL_THRESHOLD = 6

function useScrollProgress() {
  const [hasReachedEnd, setHasReachedEnd] = useState(false)

  const handleScroll = useCallback((event) => {
    const target = event.currentTarget
    if (!target) return

    const { scrollHeight, scrollTop, clientHeight } = target
    const isAtEnd = scrollHeight - scrollTop <= clientHeight + SCROLL_THRESHOLD

    if (!isAtEnd) return
    setHasReachedEnd(true)
  }, [])

  return { hasReachedEnd, handleScroll }
}

export { useScrollProgress }
