import { useStore } from '@nanostores/preact';
import { isHidden } from 'src/navigationStore';

const FacebookLogo = () => {
  const $isHidden = useStore(isHidden);

  return $isHidden ? null : (
    <a href="https://www.facebook.com/pilatusgeister" className="mr-4 duration-200 md:hover:scale-125 lg:mr-8">
      <img src="/facebook-logo.jpg" alt="facebook" className="h-6 w-6 object-cover" />
    </a>
  );
};

export default FacebookLogo;
