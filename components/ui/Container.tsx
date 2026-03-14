import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("w-[90vw] max-w-[1600px] mx-auto px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
