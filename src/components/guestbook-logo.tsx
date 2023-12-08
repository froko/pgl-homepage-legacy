import { useStore } from '@nanostores/preact';
import { isHidden } from '@pgl/store';
import { Guestbook } from './icons';

const GuestbookLogo = () => {
  const $isHidden = useStore(isHidden);

  return $isHidden ? null : (
    <a aria-label="Guestbook" href="/guestbook" className="mr-4 duration-200 md:hover:scale-125 lg:mr-8">
      <Guestbook />
    </a>
  );
};

export default GuestbookLogo;
