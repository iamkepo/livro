import { Package, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const neighborhoods = [
  "Pahou",
  "Godomey",
  "Togba",
  "Calavi Centre",
  "Akassato",
  "Ouèdo",
  "Akpakpa",
];

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.51 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31s-.86.85-.86 2.06.89 2.39 1.01 2.56c.13.16 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

function ContactLink({
  href,
  label,
  detail,
  icon,
  iconClassName,
  variant = "contact",
  external = false,
}: {
  href: string;
  label: string;
  detail: string;
  icon: React.ReactNode;
  iconClassName: string;
  variant?: "contact" | "outline";
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(buttonVariants({ variant }), "w-full justify-start")}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", iconClassName)}>
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-[15px] font-semibold">{label}</span>
        <span className="text-xs text-inksoft">{detail}</span>
      </span>
    </a>
  );
}

function App() {
  return (
    <main className="page-shell">
      <div className="w-full max-w-sm">
        <header className="mb-8 flex flex-col items-center text-center">
          <div
            aria-hidden="true"
            className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue shadow-sm"
          >
            <span className="font-display text-2xl font-black text-white">L</span>
          </div>
          <h1 className="mb-1.5 font-display text-2xl font-extrabold leading-tight">
            Coursier Livro — Cotonu, Abomey-Calavi et environ
          </h1>
          <p className="mb-3 max-w-[30ch] text-sm leading-relaxed text-inksoft">
            Colis et courses livrés en main propre, à moto, rapide et sans détour.
          </p>
          <Badge className="gap-1.5 border-0 bg-white/70 text-greensoft hover:bg-white/70">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-clay" />
            Disponible maintenant
          </Badge>
        </header>

        <section aria-label="Nous contacter" className="mb-8 flex flex-col gap-3">
          <ContactLink
            href="https://wa.me/2290141969857"
            label="WhatsApp"
            detail="Réponse la plus rapide"
            icon={<WhatsAppIcon />}
            iconClassName="bg-blue/10 text-blue"
            variant="outline"
            external
          />
          <ContactLink
            href="tel:+2290141969857"
            label="Appeler directement"
            detail="+229 01 41 96 98 57"
            icon={<Phone className="h-5 w-5" />}
            iconClassName="bg-paper text-greensoft"
          />
        </section>

        <section aria-label="Nos services" className="mb-8 grid grid-cols-1 gap-3">
          <Card>
            <CardContent>
              <Package aria-hidden="true" className="mb-2 h-8 w-8 text-clay" strokeWidth={2} />
              <h2 className="mb-1 font-display text-[15px] font-bold">Colis</h2>
              <p className="text-xs leading-snug text-inksoft">
                Enveloppes, paquets, documents remis en main propre.
              </p>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="neighborhoods-title" className="mb-8">
          <h2 id="neighborhoods-title" className="mb-3 text-center text-xs font-medium text-inksoft">
            Quartiers desservis
          </h2>
          <ul className="flex list-none flex-wrap justify-center gap-2 p-0">
            {neighborhoods.map((neighborhood) => (
              <li key={neighborhood}>
                <Badge variant="secondary" className="font-normal">
                  {neighborhood}
                </Badge>
              </li>
            ))}
          </ul>
        </section>

        <footer className="text-center">
          <p className="mb-1 font-display text-sm font-bold text-primary">
            Un message, un colis, une course en route.
          </p>
          <p className="text-xs text-inksoft">Lun – Dim · 07h00 – 21h00</p>
        </footer>
      </div>
    </main>
  );
}

export default App;
