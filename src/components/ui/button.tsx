import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'sci-fi';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'sci-fi', size = 'default', ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-widest";
    
    const variants = {
      default: "bg-sci-cyan text-slate-900 hover:bg-sci-cyan/90 glow-cyan",
      destructive: "bg-sci-pink text-white hover:bg-sci-pink/90 glow-pink",
      outline: "border border-sci-cyan bg-transparent text-sci-cyan hover:bg-sci-cyan hover:text-slate-900",
      ghost: "hover:bg-slate-800 hover:text-sci-cyan text-slate-300",
      'sci-fi': "border border-sci-purple/50 bg-sci-dark/80 text-sci-purple shadow-[0_0_15px_rgba(157,0,255,0.2)] hover:bg-sci-purple/20 hover:border-sci-purple hover:text-white transition-all duration-300 backdrop-blur-sm relative overflow-hidden group",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-12 rounded-md px-8 text-lg font-bold",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {variant === 'sci-fi' && (
          <span className="absolute inset-0 bg-gradient-to-r from-sci-purple/0 via-sci-purple/10 to-sci-purple/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-[-100%] group-hover:translate-x-[100%] ease-out" />
        )}
        <span className="relative z-10 flex items-center gap-2">{props.children}</span>
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
