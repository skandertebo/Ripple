import { useEffect } from "react";

export default function useScrollToBottom(
  callback: () => void,
  deps: Array<unknown> = [],
) {
  const onScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }

    callback();
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, deps);
}
