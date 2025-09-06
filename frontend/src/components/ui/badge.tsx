import React from "react";

// utility function to merge classes
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  ...props
}) => {
  let variantClasses = "";

  switch (variant) {
    case "secondary":
      variantClasses =
        "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80";
      break;
    case "destructive":
      variantClasses =
        "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80";
      break;
    case "outline":
      variantClasses = "text-foreground";
      break;
    default:
      variantClasses =
        "border-transparent bg-primary text-primary-foreground hover:bg-primary/80";
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantClasses,
        className
      )}
      {...props}
    />
  );
};
