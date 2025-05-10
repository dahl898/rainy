import { useEffect } from "react";

export function useResizeObserver(setDimensions, ref) {
  
  useEffect(() => {
    function handleResize() {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }
    
    handleResize() //initial call

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)

  }, []) 
}