import React, { useRef, useEffect } from "react";

const useOutsideClickListener = (ref, clickHandle) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        clickHandle()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
}

export const OutsideClickListener = (props) => {
  const { clickHandle } = props
  const wrapperRef = useRef(null);
  useOutsideClickListener(wrapperRef, clickHandle);

  return <div ref={wrapperRef}>{props.children}</div>;
}
