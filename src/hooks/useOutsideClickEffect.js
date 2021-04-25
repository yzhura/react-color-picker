import { useEffect, useState } from 'react';

const useOutSideClickEffect = (ref) => {

  const [isOutsideClicked, setOutsideClicked] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOutsideClicked(true);
      } else {
        setOutsideClicked(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return { isOutsideClicked }
}

export default useOutSideClickEffect;