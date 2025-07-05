import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

const buttonVariants = cva(
  "flex items-center justify-center gap-2 py-3 px-4 rounded-md cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
  {
    variants: {
      variant: {
        normal: "text-white backdrop-blur-md bg-black/50 hover:bg-black/40 active:bg-black/30",
        red: "text-white bg-red-500 hover:bg-red-600 active:bg-red-400",
        green: "text-white bg-green-500 hover:bg-green-600 active:bg-green-400",
        blue: "text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-400",
        ghost: "text-current bg-transparent hover:bg-black/10 active:bg-black/20",
        outline: "border-2 border-current bg-transparent hover:bg-current/10 active:bg-current/20"
      },
      size: {
        sm: "py-2 px-3 text-sm",
        md: "py-3 px-4",
        lg: "py-4 px-6 text-lg",
        icon: "p-2.5 aspect-square",
        iconLg: "p-4 aspect-square text-2xl"
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        lg: "rounded-lg"
      }
    },
    defaultVariants: {
      variant: "normal",
      size: "md",
      rounded: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };