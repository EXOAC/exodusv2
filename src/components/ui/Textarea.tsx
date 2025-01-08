import { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-2 bg-black/40 border rounded-xl 
            text-white/90 placeholder:text-white/40
            focus:outline-none focus:ring-2 focus:ring-orange-500/50
            ${error ? 'border-red-500' : 'border-white/10'}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);