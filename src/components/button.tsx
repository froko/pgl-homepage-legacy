import type { ComponentChildren, FunctionComponent } from 'preact';

type Props = {
  type: 'button' | 'submit';
  loading: boolean;
  onClick?: () => void;
  children: ComponentChildren;
};

const Button: FunctionComponent<Props> = ({ type, loading, onClick, children }) => {
  const buttonStyles =
    'items-center rounded-md border bg-pgl-blue px-4 py-2 font-medium text-white hover:border-pgl-blue hover:bg-white hover:text-pgl-blue hover:shadow-lg';

  return loading ? (
    <div className="relative">
      <button type={type} disabled={true} className={buttonStyles}>
        Bitte warten...
        <img src="/loading-indicator.gif" alt="Loading Indicator" className="absolute -right-16 top-0 m-2 h-10" />
      </button>
    </div>
  ) : (
    <button type={type} className={buttonStyles} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
