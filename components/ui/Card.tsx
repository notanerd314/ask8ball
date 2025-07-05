import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

const cardVariants = cva(
  "rounded-xl transition-all border-2",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700",
        glass: "bg-white/10 backdrop-blur-md border-white/20",
        gradient: "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700",
        personality: "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:scale-105 hover:-translate-y-2 active:translate-0"
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8"
      },
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl"
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      shadow: "md"
    }
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, shadow, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, shadow, className }))}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card, cardVariants };