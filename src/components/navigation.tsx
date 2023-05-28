import { NavigationItems } from 'data/navigation';
import { isOpen } from 'src/navigationStore';
import Overlay from './overlay';

const Navigation = () => {
  return (
    <Overlay>
      <ul className="max-h-[calc(100vh-4rem)] mx-auto flex flex-col text-center place-content-evenly">
        {NavigationItems.map((link, key) => (
          <li key={`menu_mobile_link${key}`}>
            <a
              className="text-2xl font-bold text-pgl-blue duration-300 lg:text-3xl lg:text-black md:hover:text-4xl md:hover:text-pgl-blue"
              href={link.to}
              onClick={() => isOpen.set(false)}
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
