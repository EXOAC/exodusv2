import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { useTouchInteraction } from '../../hooks/useTouchInteraction';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading, variant = 'default', className = '', ...props }, ref) => {
    const { handleTouchFeedback } = useTouchInteraction();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      handleTouchFeedback();
      props.onClick?.(e);
    };

    return (
      <button
        ref={ref}
        className={`
          touch-target touch-feedback tap-highlight
          px-4 py-2 rounded-xl font-medium
          transition-all duration-200 disabled:opacity-50
          ${variants[variant]}
          ${className}
        `}
        onClick={handleClick}
        disabled={loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : children}
      </button>
    );
  }
);