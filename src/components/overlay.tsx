import { useStore } from '@nanostores/preact';
import { useEffect } from 'preact/hooks';

import { isOpen } from 'src/navigationStore';

const Overlay = (props: { children: any }) => {
  const $isOpen = useStore(isOpen);

  const closeOnEscapeKey = (event: any) => {
    if (event.keyCode === 27) {
      isOpen.set(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      window.removeEventListener('keydown', closeOnEscapeKey);
    };
  });

  return (
    <div className={`${$isOpen ? '' : 'hidden'} fixed top-16 z-10 h-full w-full bg-white/80 backdrop-blur-sm `}>
      <div className="flex h-full max-h-full flex-col">
        <div className="flex flex-grow overflow-hidden">{props.children}</div>
      </div>
    </div>
  );
};

export default Overlay;
