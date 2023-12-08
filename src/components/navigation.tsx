import { NavigationItems } from '@pgl/data';
import { isOpen } from '@pgl/store';
import Overlay from './overlay';

const Navigation = () => {
  return (
    <Overlay>
      <ul className="mx-auto flex max-h-[calc(100vh-4rem)] flex-col place-content-evenly text-center">
        {NavigationItems.map((link, key) => (
          <li key={`menu_mobile_link${key}`}>
            <a
              className="text-2xl font-bold text-pgl-blue duration-300 md:hover:text-4xl md:hover:text-pgl-blue lg:text-3xl lg:text-black"
              href={link.to}
              onClick={() => setTimeout(() => isOpen.set(false))}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </Overlay>
  );
};

export default Navigation;
