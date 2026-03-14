import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: any;
}

export default function Container({
  children,
  className,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn("w-[90%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
