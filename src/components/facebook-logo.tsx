import { useStore } from '@nanostores/preact';
import { isHidden } from '@pgl/store';

const FacebookLogo = () => {
  const $isHidden = useStore(isHidden);

  return $isHidden ? null : (
    <a href="https://www.facebook.com/pilatusgeister" className="mr-4 duration-200 md:hover:scale-125 lg:mr-8">
      <img src="/facebook-logo.jpg" alt="facebook" className="h-5 w-5 object-cover md:h-6 md:w-6" />
    </a>
  );
};

export default FacebookLogo;
