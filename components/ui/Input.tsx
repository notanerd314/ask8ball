import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

const inputVariants = cva(
  "p-3 rounded-md backdrop-blur-md bg-white/30 dark:bg-black/30 dark:border-slate-800 border-2 border-transparent transition-colors focus:border-purple-500 focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-white/30 dark:bg-black/30",
        solid: "bg-white dark:bg-slate-800",
        ghost: "bg-transparent border-slate-300 dark:border-slate-600"
      },
      size: {
        sm: "p-2 text-sm",
        md: "p-3",
        lg: "p-4 text-lg",
        xl: "p-4 text-2xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };