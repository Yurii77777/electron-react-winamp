export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
}

export type ButtonProps = {
  variant: ButtonVariant;
  title?: string;
  isActive?: boolean;
  onClick?: () => void;
  imgSrc?: string;
  customClasses?: string;
};
