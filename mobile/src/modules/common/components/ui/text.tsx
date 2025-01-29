import * as Slot from '@rn-primitives/slot';
import type { SlottableTextProps, TextRef } from '@rn-primitives/types';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Text as RNText } from 'react-native';

import { cn } from '~/lib/utils';

const TextClassContext = React.createContext<string | undefined>(undefined);

const textVariants = cva('text-foreground font-system', {
  variants: {
    variant: {
      h1: 'text-4xl font-system-bold',
      h2: 'text-3xl font-system-bold',
      h3: 'text-2xl font-system-bold',
      h4: 'text-xl font-system-bold ',
      h5: 'text-lg font-system-bold',
      h6: 'text-base font-system-bold',
      p: 'text-base',
      span: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

type TextProps = SlottableTextProps & VariantProps<typeof textVariants>;

const Text = React.forwardRef<TextRef, TextProps>(
  ({ className, asChild = false, variant, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn(textVariants({ variant }), textClass, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

export { Text, TextClassContext, textVariants };
