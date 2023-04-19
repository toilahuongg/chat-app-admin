import { Button as MButton, ButtonProps as MButtonProps } from '@material-tailwind/react';
import { forwardRef } from 'react';

type ButtonProps = MButtonProps & {
  isLoading?: boolean;
};
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function func(
  { ref: _, isLoading, disabled, children, ...props },
  ref,
) {
  return (
    <MButton ref={ref} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-gray-100 border-solid rounded-full animate-spin mx-auto inline-block border-t-transparent"></div>
      ) : (
        children
      )}
    </MButton>
  );
});

export default Button;
