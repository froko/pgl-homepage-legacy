import { useStore } from '@nanostores/preact';
import { isHidden, isOpen } from 'src/navigationStore';

const Hamburger = () => {
  const $isHidden = useStore(isHidden);
  const $isOpen = useStore(isOpen);

  return $isHidden ? null : (
    <button
      className={'relative h-8 w-8 focus:outline-none duration-200 md:hover:scale-125'}
      onClick={() => isOpen.set(!$isOpen)}
    >
      <span
        aria-hidden="true"
        className={
          'absolute block h-[3px] w-6 transform bg-current transition duration-500 ease-in-out ' +
          ($isOpen ? 'rotate-45' : '-translate-y-1.5')
        }
      ></span>
      <span
        aria-hidden="true"
        className={
          'absolute block h-[3px] w-6 transform bg-current transition duration-500 ease-in-out ' +
          ($isOpen ? 'opacity-0' : 'opacity-100')
        }
      ></span>
      <span
        aria-hidden="true"
        className={
          'absolute block h-[3px] w-6 transform bg-current transition duration-500 ease-in-out ' +
          ($isOpen ? '-rotate-45' : 'translate-y-1.5')
        }
      ></span>
    </button>
  );
};

export default Hamburger;
