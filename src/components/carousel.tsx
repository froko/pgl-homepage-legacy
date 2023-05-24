import type { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';

type Props = {
  images: { src: string; alt: string }[];
};

const Carousel: FunctionComponent<Props> = ({ images }) => {
  useEffect(() => {
    const scrollContainer = document.getElementById('carousel');
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');
    if (scrollContainer) {
      scrollContainer.onscroll = () => {
        if (scrollContainer.scrollLeft + scrollContainer.offsetWidth + 60 >= scrollContainer.scrollWidth) {
          rightArrow?.classList.add('hidden');
        } else {
          rightArrow?.classList.remove('hidden');
        }

        if (scrollContainer.scrollLeft - 60 <= 0) {
          leftArrow?.classList.add('hidden');
        } else {
          leftArrow?.classList.remove('hidden');
        }
      };

      scrollContainer.scrollTo(0, 0);
      leftArrow?.classList.add('hidden');
    }
  });

  const navButtonStyle = (position: 'left-0' | 'right-0') => {
    return `${position} absolute top-1/2 -translate-y-1/2 cursor-pointer bg-black/30 p-4 text-white hover:bg-black/50 hover:text-pgl-blue`;
  };

  const scrollImage = (amount: number) => {
    const scrollContainer = document.getElementsByClassName('container-snap');
    scrollContainer[0]?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full">
      <ul
        id="carousel"
        className="container-snap scroll m-0 flex snap-x snap-mandatory list-none gap-2 overflow-x-auto p-0"
      >
        {images.map((image) => (
          <li className="shrink-0 snap-center scroll-smooth p-0">
            <img src={image.src} alt={image.alt} className="max-h-[300px] lg:max-h-[380px]" />
          </li>
        ))}
      </ul>
      <button id="left-arrow" className={navButtonStyle('left-0')} onClick={() => scrollImage(-300)}>
        ❮
      </button>
      <button id="right-arrow" className={navButtonStyle('right-0')} onClick={() => scrollImage(300)}>
        ❯
      </button>
    </div>
  );
};

export default Carousel;
