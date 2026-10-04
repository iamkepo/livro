import { ArrowRight, Banknote, MapPin, Package, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import ContactLink from "@/components/common/ContactLink";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { baseUrl, cn } from "@/lib/utils";
import { neighborhoods } from "@/store/useAppStore";

function HomePage() {
  const message = "Bonjour Livro, je souhaite connaître le tarif pour une livraison. Pouvez-vous me faire un devis, s’il vous plaît ?";
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
            href={`https://wa.me/2290141969857?text=${encodeURIComponent(message)}`} 
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

        <a
          href={`${baseUrl}estimation/`}
          className={cn(buttonVariants({ variant: "default" }), "mb-8 w-full justify-between")}
        >
          <span>Estimer le coût d’une livraison</span>
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </a>

        <section aria-label="Nos services" className="mb-8 grid grid-cols-2 gap-3">
          <Card>
            <CardContent>
              <Package aria-hidden="true" className="mb-2 h-8 w-8 text-clay" strokeWidth={2} />
              <h2 className="mb-1 font-display text-[15px] font-bold">Colis</h2>
              <p className="text-xs leading-snug text-inksoft">
                Enveloppes, paquets, documents remis en main propre.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <MapPin aria-hidden="true" className="mb-2 h-8 w-8 text-clay" strokeWidth={2} />
              <h2 className="mb-1 font-display text-[15px] font-bold">Courses</h2>
              <p className="text-xs leading-snug text-inksoft">
                Courses et achats urgents livrés rapidement à votre porte.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Banknote aria-hidden="true" className="mb-2 h-8 w-8 text-clay" strokeWidth={2} />
              <h2 className="mb-1 font-display text-[15px] font-bold">Livraison</h2>
              <p className="text-xs leading-snug text-inksoft">
                Livraison de colis et de marchandises dans toute la région.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Phone aria-hidden="true" className="mb-2 h-8 w-8 text-clay" strokeWidth={2} />
              <h2 className="mb-1 font-display text-[15px] font-bold">Assistance</h2>
              <p className="text-xs leading-snug text-inksoft">
                Support client et assistance pour vos besoins de livraison.
              </p>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="neighborhoods-title" className="mb-8">
          <h2 id="neighborhoods-title" className="mb-3 text-center text-xs font-medium text-inksoft">
            Villes desservis par Livro
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
          <a
            href={`${baseUrl}zones/`}
            className="mt-4 mb-8 inline-flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold text-primary transition hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <MapPin aria-hidden="true" className="h-4 w-4" />
            <span>Voir les zones couvertes</span>
            <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </a>

        </section>

        <footer className="text-center">
          <p className="mb-1 font-display text-sm font-bold text-inksoft">
            Un message, un colis, une course en route.
          </p>
          <p className="text-xs text-inksoft">Lun – Dim · 07h00 – 21h00</p>
        </footer>
      </div>
    </main>
  );
}

export default HomePage;
