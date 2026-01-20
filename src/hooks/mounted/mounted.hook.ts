import { useState, useEffectEvent, useLayoutEffect } from "react";

export function useIsMounted() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const afterMount = useEffectEvent(() => {
    setIsMounted(true);
  });

  useLayoutEffect(() => {
    afterMount();
  }, []);

  return isMounted;
}
