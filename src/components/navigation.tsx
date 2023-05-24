import { NavigationItems } from 'data/navigation';
import { isOpen } from 'src/navigationStore';
import Overlay from './overlay';

const Navigation = () => {
  return (
    <Overlay>
      <div className="mx-auto flex flex-col justify-center">
        <ul className="text-center">
          {NavigationItems.map((link, key) => (
            <li className="my-10" key={`menu_mobile_link${key}`}>
              <a
                className="text-2xl font-bold text-pgl-blue duration-300 lg:text-3xl lg:text-black md:hover:text-4xl md:hover:text-pgl-blue"
                href={link.to}
                onClick={() => isOpen.set(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className="my-10" key="menu_mobile_link_intern">
            <a
              href="/intern"
              className="text-2xl font-bold text-pgl-blue duration-300 lg:text-3xl lg:text-black md:hover:text-4xl md:hover:text-pgl-blue"
            >
              Interner Bereich
            </a>
          </li>
        </ul>
      </div>
    </Overlay>
  );
};

export default Navigation;
