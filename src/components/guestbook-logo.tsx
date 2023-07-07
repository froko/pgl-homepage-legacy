import { useStore } from '@nanostores/preact';
import { isHidden } from 'src/navigationStore';
import { Guestbook } from './icons';

const GuestbookLogo = () => {
  const $isHidden = useStore(isHidden);

  return $isHidden ? null : (
    <a aria-label="Guestbook" href="/guestbook" className="mr-4 lg:mr-8 duration-200 md:hover:scale-125">
      <Guestbook />
    </a>
  );
};

export default GuestbookLogo;
