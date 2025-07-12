import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
       <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary"
      >
        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 13.9757 21.5244 15.8213 20.6924 17.4423" />
        <path d="M12 6V12L16 16" />
      </svg>
      <h1 className="text-xl font-bold tracking-tight text-foreground">
        <span className="uppercase">NESTOR</span>
        <span className="font-light normal-case">coach</span>
      </h1>
    </div>
  );
}
