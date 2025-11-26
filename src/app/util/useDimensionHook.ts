import {useState, useEffect} from 'react';

/**
 * Tracks the dimensions of a referenced element and exposes width and height.
 *
 * @param {{ current: HTMLElement | null }} myRef Mutable ref whose dimensions are observed.
 * @returns {{ width: number, height: number }} Current width and height of the referenced element.
 */
export const useDimensionHook = myRef => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
    useEffect(() => {
      const getDimensions = () => ({
        width: myRef.current.offsetWidth,
        height: myRef.current.offsetHeight
      })
  
      const handleResize = () => {
        // setDimensions(getDimensions())
      }
  
      if (myRef.current) {
        // setDimensions(getDimensions())
      }
  
      window.addEventListener("resize", handleResize)
  
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [myRef])
  
    return dimensions;
  };