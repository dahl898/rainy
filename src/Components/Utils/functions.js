function generatePoints(data, dataMin, dataMax, width, height, padding) {
  const widthStep = width / (data.length - 1)
  return data.map((_, index) => {
    const normalized = 1 - (data[index] - dataMin) / (dataMax - dataMin)
    return {
      x: padding.left + widthStep * index,
      y: padding.top + height * normalized,
    }
  })
}

function normalizeData(data) {
  const dataMin = Math.min(...data)
  const dataMax = Math.max(...data)

  const dataNormalized = data.map((param) => {
    const paramNormalized = (param - dataMin) / (dataMax - dataMin)
    const reverseParamNormalized = 1 - paramNormalized // this is needed to work properly with svg coordinate system where 0% height is uppest point and 100% height is lowest point
    return paramNormalized
  })

  return dataNormalized
}

function denormalizeValue(valueNormalized, data) {
  const dataMin = Math.min(...data)
  const dataMax = Math.max(...data)

  const valueDenormalized = valueNormalized * (dataMax - dataMin) + dataMin

  return valueDenormalized
}

function calculateAngles(containerRef, cardRefs) {
  const angleList = cardRefs.map((cardRef) => {
    const cardRect = cardRef.current.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()
    const containerCenter = containerRect.top + containerRect.height / 2
    const cardCenter = cardRect.top + cardRect.height / 2

    const maxOffset = containerRect.height / 2
    const offset = cardCenter - containerCenter

    //This should ensure that angle doesn't spill outside [-15, 15] range
    const angle = Math.min(25, Math.max(-25, (offset / maxOffset) * -25))

    return angle
  })
  return angleList
}

function getCardToScrollTo(cardRefs, containerRef) {
  const containerCenter = getCenter(containerRef.current)

  const reducedCard = cardRefs.reduce((acc, currentCard, idx) => {
    const cardCenter = getCenter(currentCard.current)
    const currentCardOffsetFromCenter = Math.abs(containerCenter - cardCenter)
    if (idx === 0) {
      acc.card = currentCard.current
      acc.offsetFromCenter = currentCardOffsetFromCenter
      return acc
    } else {
      if (acc.offsetFromCenter > currentCardOffsetFromCenter) {
        acc.card = currentCard.current
        acc.offsetFromCenter = currentCardOffsetFromCenter
        return acc
      } else {
        return acc
      }
    }
  }, {})
  const cardClosestToCenter = reducedCard.card

  return cardClosestToCenter
}

function getCenter(elementReference) {
  const elementReferenceDimensions = elementReference.getBoundingClientRect()
  const elementCenterPosition =
    elementReferenceDimensions.top +
    (elementReferenceDimensions.bottom - elementReferenceDimensions.top) / 2

  return elementCenterPosition
}

function rotateCards(containerRef, cardRefs, ticking) {
  const container = containerRef.current
  if (!ticking.current) {
    requestAnimationFrame(() => {
      if (refsAreReady(container, cardRefs)) {
        const angleList = calculateAngles(containerRef, cardRefs)

        cardRefs.forEach((ref, i) => {
          const card = ref.current
          const angle = angleList[i]
          if (Math.sign(angle) === -1) {
            card.style.transformOrigin = 'bottom center'
          } else {
            card.style.transformOrigin = 'top center'
          }
          let transform = `rotateX(${angle}deg)`
          if (angle >= -9 && angle <= 9) {
            transform += ' translateZ(40px)'
          }
          card.style.transform = transform
        })
      }

      ticking.current = false
    })

    ticking.current = true
  }
}

function scrollSnapping(
  containerRef,
  cardRefs,
  isProgrammaticScroll,
  programmaticScrollTimeout,
  scrollTimeout
) {
  const container = containerRef.current

  if (isProgrammaticScroll.current) {
    clearTimeout(programmaticScrollTimeout.current)
    programmaticScrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false
    }, 200)
  } else {
    clearTimeout(scrollTimeout.current)
    scrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = true

      if (refsAreReady(container, cardRefs)) {
        const cardToScrollTo = getCardToScrollTo(cardRefs, containerRef)
        if (cardToScrollTo) {
          const cardCenter = getCenter(cardToScrollTo)
          const containerCenter = getCenter(container)
          console.log('Container center ' + containerCenter)
          const offset = cardCenter - containerCenter
          const scrollPosition = container.scrollTop
          const scrollOffset = scrollPosition + offset
          container.scrollTo({ top: scrollOffset, behavior: 'smooth' })
        }
      }
    }, 50)
  }
}

function refsAreReady(container, cardRefs) {
  return container && cardRefs.every((ref) => ref.current)
}
export {
  generatePoints,
  normalizeData,
  denormalizeValue,
  calculateAngles,
  getCardToScrollTo,
  getCenter,
  rotateCards,
  scrollSnapping,
}
