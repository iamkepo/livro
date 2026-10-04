import { ArrowLeft, ArrowRight, MapPin, MessageCircle, Route, Map, Banknote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import NeighborhoodSelect from "../common/NeighborhoodSelect";
import { baseUrl, cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

const WHATSAPP_NUMBER = "2290141969857";

export default function EstimatePage() {
  const origin = useAppStore((state) => state.origin);
  const destination = useAppStore((state) => state.destination);
  const setOrigin = useAppStore((state) => state.setOrigin);
  const setDestination = useAppStore((state) => state.setDestination);

  const sameNeighborhood = Boolean(origin && destination && origin === destination);
  const canRequestQuote = Boolean(origin && destination && !sameNeighborhood);
  const googleMapsUrl = origin && destination
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`
    : "";
  const message =
    `Bonjour Livro, je souhaite connaître le tarif pour une livraison de ${origin} à ${destination}. ` +
    `Pouvez-vous me faire un devis, s’il vous plaît ?\n\nVoir le trajet sur Google Maps : ${googleMapsUrl}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <main className="page-shell">
      <div className="w-full max-w-sm">
        <a
          href={baseUrl}
          className="mb-7 inline-flex items-center gap-2 rounded-lg py-2 pr-2 text-sm font-semibold text-inksoft transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Retour à l’accueil
        </a>
        <header className="mb-6">
          <Badge variant="secondary" className="mb-3 gap-1.5 border-0">
            <Route aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
            Demande de devis
          </Badge>
          <h1 className="font-display text-3xl font-extrabold leading-tight text-ink">
            Où va votre colis ?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-inksoft">
            Indiquez le trajet et demandez votre tarif directement à Livro.
          </p>
        </header>

        <Card className="mb-4">
          <CardContent className="p-5">
            <div className="space-y-5">
              <NeighborhoodSelect
                id="origin"
                label="Quartier de départ"
                value={origin}
                otherValue={destination}
                onChange={setOrigin}
              />

              {/* <div className="flex justify-center" aria-hidden="true">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-inksoft">
                  <ArrowRight className="h-4 w-4 rotate-90" />
                </span>
              </div> */}

              <NeighborhoodSelect
                id="destination"
                label="Quartier d’arrivée"
                value={destination}
                otherValue={origin}
                onChange={setDestination}
              />

              {sameNeighborhood && (
                <p role="alert" className="text-sm font-medium text-clay">
                  Choisissez deux quartiers différents pour votre trajet.
                </p>
              )}

              {canRequestQuote ? (
                <p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "default" }), "w-full justify-between")}
                  >
                    <span className="inline-flex items-center gap-2">
                      <MessageCircle aria-hidden="true" className="h-5 w-5" />
                      Demander un devis sur WhatsApp
                    </span>
                    <ArrowRight aria-hidden="true" className="h-5 w-5" />
                  </a>
                  <a 
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "outline" }), "mt-2 w-full justify-between")}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Map aria-hidden="true" className="h-4 w-4" />
                      Voir le trajet sur Google Maps
                    </span>
                    <ArrowRight aria-hidden="true" className="h-5 w-5" />
                  </a>
                </p>
              ) : (
                <Button
                  type="button"
                  disabled
                  className="w-full justify-between disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-[#c8c0b3] disabled:text-white disabled:shadow-none"
                >
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle aria-hidden="true" className="h-5 w-5" />
                    Demander un devis sur WhatsApp
                  </span>
                  <ArrowRight aria-hidden="true" className="h-5 w-5" />
                </Button>
              )}
              {!canRequestQuote && !sameNeighborhood && (
                <p className="text-center text-xs text-inksoft">
                  Choisissez un départ et une arrivée pour préparer votre demande.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 rounded-2xl border border-[#e8dece] bg-white/65 p-4">
          <Banknote aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-clay" />
          <p className="text-xs leading-relaxed text-inksoft">
            Le tarif sera confirmé par Livro selon votre trajet. Aucun prix estimatif n’est affiché
            avant confirmation.
          </p>
        </div>
        <a
          href={`${baseUrl}zones/`}
          className="mt-4 mb-8 inline-flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold text-primary transition hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <MapPin aria-hidden="true" className="h-4 w-4" />
          <span>Voir les zones couvertes</span>
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </a>
      </div>
    </main>
  );
}
