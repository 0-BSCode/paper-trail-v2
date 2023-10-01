import { useState, useEffect } from 'react';

interface Size {
  width: number | undefined;
  height: number | undefined;
}

interface WindowSizeHookType {
  windowSize: Size;
  widthStr: string;
  heightStr: string;
  isMobileWidth: boolean;
}

const useWindowSize = (): WindowSizeHookType => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });
  const [widthStr, setWidthStr] = useState('');
  const [heightStr, setHeightStr] = useState('');
  const [isMobileWidth, setIsMobileWidth] = useState(true);

  useEffect(() => {
    if (windowSize.height !== undefined && windowSize.width !== undefined) {
      setWidthStr(`${windowSize.width}px`);
      setHeightStr(`${windowSize.height}px`);
      setIsMobileWidth(windowSize.width < 1024);
    }
  }, [windowSize]);

  useEffect(() => {
    function handleResize(): void {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    windowSize,
    widthStr,
    heightStr,
    isMobileWidth,
  };
};

export default useWindowSize;
