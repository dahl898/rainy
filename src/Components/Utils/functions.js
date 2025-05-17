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

export { generatePoints, normalizeData, denormalizeValue }
