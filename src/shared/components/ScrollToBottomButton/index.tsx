import { ArrowDown } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

const ScrollToBottomButton: React.FC<{
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}> = ({ scrollContainerRef }) => {
  const [showButton, setShowButton] = useState(false);
  const lastScrollTop = useRef(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      if (scrollTop < lastScrollTop.current) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }

      lastScrollTop.current = scrollTop;
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollContainerRef]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
      setShowButton(false);
    }
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-10 z-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-interface text-white p-2 rounded-full shadow-lg"
        >
          <ArrowDown />
        </button>
      )}
    </>
  );
};

export default ScrollToBottomButton;
