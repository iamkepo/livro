import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type ContactLinkProps = {
  href: string;
  label: string;
  detail: string;
  icon: ReactNode;
  iconClassName: string;
  variant?: "contact" | "outline";
  external?: boolean;
};

export default function ContactLink({
  href,
  label,
  detail,
  icon,
  iconClassName,
  variant = "contact",
  external = false,
}: ContactLinkProps) {
  return (
    <a
      href={href}
      className={cn(buttonVariants({ variant }), "w-full justify-between")}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="flex items-center gap-3">
        <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", iconClassName)}>
          {icon}
        </span>
        <span className="flex flex-col">
          <span className="text-[15px] font-semibold">{label}</span>
          <span className="text-xs text-inksoft">{detail}</span>
        </span>
      </span>
      <ChevronRight aria-hidden="true" className="h-5 w-5" />
    </a>
  );
}
