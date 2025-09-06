// const Button = ({ children }: { children: string }) => {
//   return <button className="button">{children}</button>;
// };

// export default Button;
import * as React from "react";

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Define props: extend normal button props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "md", children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
          variant === "default"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "border border-gray-300 text-gray-700 hover:bg-gray-100",
          size === "sm" ? "px-2 py-1 text-sm" : "",
          size === "md" ? "px-4 py-2 text-base" : "",
          size === "lg" ? "px-6 py-3 text-lg" : "",
          className
        )}
        {...props} // ✅ this allows onClick, disabled, etc.
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
