import { useState } from "react";
import { ArrowLeft, ArrowRight, MapPin, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { baseUrl, cn } from "@/lib/utils";
import { coverage } from "@/core/constents";

function arrondissementLabel(
  arrondissement: (typeof coverage)[number]["communes"][number]["arrondissements"][number],
  index: number,
) {
  if ("nom" in arrondissement) return arrondissement.nom;
  if ("numero" in arrondissement) return `Arrondissement ${arrondissement.numero}`;
  return `Secteur ${index + 1}`;
}

function communeKey(department: string, commune: string) {
  return `${department}::${commune}`;
}

const filterClassName =
  "w-full rounded-lg border border-[#d9cbb4] bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";

export default function ZonesPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [selectedArrondissement, setSelectedArrondissement] = useState("");

  const availableDepartments = coverage.map((department) => department.nom);
  const availableCommunes = coverage.flatMap((department) =>
    !selectedDepartment || department.nom === selectedDepartment
      ? department.communes.map((commune) => ({
          key: communeKey(department.nom, commune.nom),
          name: commune.nom,
        }))
      : [],
  );
  const availableArrondissements = coverage.flatMap((department) =>
    !selectedDepartment || department.nom === selectedDepartment
      ? department.communes.flatMap((commune) => {
          const currentCommuneKey = communeKey(department.nom, commune.nom);
          if (selectedCommune && currentCommuneKey !== selectedCommune) return [];

          return commune.arrondissements.map((arrondissement, index) => {
            const label = arrondissementLabel(arrondissement, index);
            return {
              key: `${currentCommuneKey}::${label}`,
              communeKey: currentCommuneKey,
              label,
            };
          });
        })
      : [],
  );

  const hasFilters = Boolean(selectedDepartment || selectedCommune || selectedArrondissement);

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
            <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
            Secteur de livraison
          </Badge>
          <h1 className="font-display text-3xl font-extrabold leading-tight text-ink">
            Nos zones couvertes
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-inksoft">
            Retrouvez les communes et quartiers desservis par Livro.
          </p>
        </header>

        <Card className="mb-5">
          <CardContent className="space-y-4 p-4">
            <div>
              <label htmlFor="coverage-department" className="mb-1.5 block text-xs font-semibold text-inksoft">
                Département
              </label>
              <select
                id="coverage-department"
                value={selectedDepartment}
                onChange={(event) => {
                  setSelectedDepartment(event.target.value);
                  setSelectedCommune("");
                  setSelectedArrondissement("");
                }}
                className={filterClassName}
              >
                <option value="">Tous les départements</option>
                {availableDepartments.map((department) => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="coverage-commune" className="mb-1.5 block text-xs font-semibold text-inksoft">
                Ville / commune
              </label>
              <select
                id="coverage-commune"
                value={selectedCommune}
                onChange={(event) => {
                  setSelectedCommune(event.target.value);
                  setSelectedArrondissement("");
                }}
                className={filterClassName}
              >
                <option value="">Toutes les communes</option>
                {availableCommunes.map((commune) => (
                  <option key={commune.key} value={commune.key}>{commune.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="coverage-arrondissement" className="mb-1.5 block text-xs font-semibold text-inksoft">
                Arrondissement
              </label>
              <select
                id="coverage-arrondissement"
                value={selectedArrondissement}
                onChange={(event) => setSelectedArrondissement(event.target.value)}
                className={filterClassName}
              >
                <option value="">Tous les arrondissements</option>
                {availableArrondissements.map((arrondissement) => (
                  <option key={arrondissement.key} value={arrondissement.key}>
                    {selectedCommune ? arrondissement.label : `${arrondissement.label} · ${arrondissement.key.split("::")[1]}`}
                  </option>
                ))}
              </select>
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setSelectedDepartment("");
                  setSelectedCommune("");
                  setSelectedArrondissement("");
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-primary transition hover:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                Réinitialiser les filtres
              </button>
            )}
          </CardContent>
        </Card>

        <div className="mb-5 space-y-6">
          {coverage.map((department) => (
            (!selectedDepartment || department.nom === selectedDepartment) &&
            <section key={department.nom} aria-labelledby={`department-${department.nom}`}>
              <h2
                id={`department-${department.nom}`}
                className="mb-3 border-b border-[#d9cbb4] pb-2 font-display text-lg font-bold text-primary"
              >
                {department.nom}
              </h2>

              <div className="space-y-4">
                {department.communes
                  .filter((commune) =>
                    !selectedCommune || communeKey(department.nom, commune.nom) === selectedCommune,
                  )
                  .map((commune) => (
                  <article key={`${department.nom}-${commune.nom}`}>
                    <h3 className="mb-1 font-display text-base font-bold text-ink">
                      {commune.nom}
                    </h3>
                    {"description" in commune && typeof commune.description === "string" && (
                      <p className="mb-2 text-xs leading-relaxed text-inksoft">
                        {commune.description}
                      </p>
                    )}

                    <Card>
                      <CardContent className="p-2">
                        <ul className="m-0 list-none divide-y divide-[#eee5d7] p-0">
                          {commune.arrondissements.map((arrondissement, index) => {
                            const label = arrondissementLabel(arrondissement, index);
                            const key = `${communeKey(department.nom, commune.nom)}::${label}`;
                            if (selectedArrondissement && key !== selectedArrondissement) return null;

                            const places = [
                              ...arrondissement.quartiers_urbains.map((place) => ({ ...place, type: "Quartier" })),
                              ...arrondissement.villages_ruraux.map((place) => ({ ...place, type: "Village" })),
                            ];

                            return (
                              <li key={`${commune.nom}-${label}`}>
                                <details className="group">
                                  <summary className="flex cursor-pointer list-none items-center gap-3 px-3 py-3 marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper text-clay">
                                      <MapPin aria-hidden="true" className="h-4 w-4" />
                                    </span>
                                    <span className="flex-1 text-sm font-semibold text-ink">
                                      {label}
                                    </span>
                                    <span className="text-xs text-inksoft">{places.length} zones</span>
                                    <span aria-hidden="true" className="text-lg leading-none text-inksoft transition-transform group-open:rotate-45">+</span>
                                  </summary>
                                  <ul className="mb-2 ml-14 mr-3 list-none space-y-1 border-l border-[#e8dece] pl-3">
                                    {places.map((place) => (
                                      <li key={`${place.type}-${place.nom}`} className="flex items-center justify-between gap-2 py-1.5">
                                        <span className="text-sm text-ink">
                                          <span className="mr-1.5 text-xs text-inksoft">{place.type}</span>
                                          {place.nom}
                                        </span>
                                        {"statut" in place && typeof place.statut === "string" && (
                                          <Badge variant="secondary" className="shrink-0 px-2 py-1 text-[10px]">
                                            {place.statut}
                                          </Badge>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </details>
                              </li>
                            );
                          })}
                        </ul>
                      </CardContent>
                    </Card>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mb-5 text-center text-xs leading-relaxed text-inksoft">
          Votre quartier n’apparaît pas dans la liste ? Contactez Livro pour vérifier la disponibilité.
        </p>

        <a
          href={`${baseUrl}estimation/`}
          className={cn(buttonVariants({ variant: "default" }), "w-full justify-between")}
        >
          <span>Demander une estimation</span>
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </a>
      </div>
    </main>
  );
}
