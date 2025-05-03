import { useEffect, useState } from "react";

export default function useViewportCssVars() {
  useEffect(() => {
    function setViewportVars() {
      const width = window.innerWidth
      const height = window.innerHeight
      document.documentElement.style.setProperty('--viewport-height', `${height}px`)
      document.documentElement.style.setProperty('--viewport-width', `${width}px`)
      
    }

    setViewportVars()

    window.addEventListener('resize', setViewportVars)

    return () => window.removeEventListener('resize', setViewportVars)
  })
}