import { useState, useRef, useEffect, useCallback } from "react";

export const Display = ({ value }) => {
  const textRef = useRef(null);
  const screenRef = useRef(null);
  const [fontSize, setFontSize] = useState(5);

  const handleKeydown = useCallback((e) => {
    if (textRef.current.offsetWidth > screenRef.current.offsetWidth) {
      setFontSize((fontSize) => fontSize - 0.7);
    }

    if (value === 0) {
      setFontSize(5);
    }
  });
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown());
  }, [handleKeydown]);

  return (
    <>
      <div className="screen" ref={screenRef}>
        <label
          style={{ fontSize: `${fontSize}rem`, paddingLeft: "1rem" }}
          ref={textRef}
        >
          {value}
        </label>
      </div>
    </>
  );
};
