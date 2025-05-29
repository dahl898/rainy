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
    const angle = Math.min(30, Math.max(-30, (offset / maxOffset) * -30))

    return angle
  })
  return angleList
}

function getCardToScrollTo(cardRefs, containerRef) {
  const containerDimensions = containerRef.getBoundingClientRect()
  const [topLastVisibleCard, bottomLastVisibleCard] = cardRefs.map((card) => {
    // return first and last partly visible cards if there are any. Destructuring is based on the fact that top partly visible card will always go first because cardRefs should go in the same order as on screen.
    const cardDimensions = card.getBoundingClientRect()
    if (
      cardDimensions.top < containerDimensions.top &&
      cardDimensions.bottom > cardDimensions.top
    )
      return { ref: card, dimensions: cardDimensions }
    if (
      cardDimensions.top < containerDimensions.bottom &&
      cardDimensions.bottom > cardDimensions.bottom
    )
      return { ref: card, dimensions: cardDimensions }
  })

  const topCardOffset = containerDimensions.top - topLastVisibleCard.top
  const bottomCardOffset =
    bottomLastVisibleCard.bottom - containerDimensions.top

  if (topCardOffset > bottomCardOffset) return bottomLastVisibleCard.ref // bigger offset equals bigger chunk of card is outside of the visible area. We need to scroll to the partly visible card that has smaller chunk outside the visible area, i.e. bigger visible chunk
  if (topCardOffset < bottomCardOffset) return topLastVisibleCard.ref
}

export { generatePoints, normalizeData, denormalizeValue, calculateAngles }
