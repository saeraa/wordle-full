import { PropsWithChildren } from "react";

type ButtonProps = {
  buttonType: string
  onClick: () => void;
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { children, buttonType, ...otherProps } = props;
  return (
      <button
          className={buttonType}
          {...otherProps}
      >
          {children}
      </button>
  )
}
export default Button;