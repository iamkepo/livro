import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { Check, ChevronDown, MapPin, Search, X } from "lucide-react";
import { coverage } from "@/core/constents";
import { cn } from "@/lib/utils";
import type { Neighborhood } from "@/store/useAppStore";

export type NeighborhoodSelectProps = {
  id: string;
  label: string;
  value: Neighborhood | "";
  otherValue: Neighborhood | "";
  onChange: (value: Neighborhood | "") => void;
};

type CoverageOption = {
  value: string;
  label: string;
  kind: "Quartier" | "Village";
};

function getArrondissementName(
  arrondissement: (typeof coverage)[number]["communes"][number]["arrondissements"][number],
  index: number,
) {
  if ("nom" in arrondissement) return arrondissement.nom;
  if ("numero" in arrondissement) return `Arrondissement ${arrondissement.numero}`;
  return `Secteur ${index + 1}`;
}

const coverageOptions: CoverageOption[] = coverage.flatMap((department) =>
  department.communes.flatMap((commune) =>
    commune.arrondissements.flatMap((arrondissement, index) => {
      const arrondissementName = getArrondissementName(arrondissement, index);
      const context = `${arrondissementName}, ${commune.nom}, ${department.nom}`;
      return [
        ...arrondissement.quartiers_urbains.map((place) => ({
          value: `${place.nom} · ${context}`,
          label: place.nom,
          kind: "Quartier" as const,
        })),
        ...arrondissement.villages_ruraux.map((place) => ({
          value: `${place.nom} · ${context}`,
          label: place.nom,
          kind: "Village" as const,
        })),
      ];
    }),
  ),
);

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr");
}

export default function NeighborhoodSelect({
  id,
  label,
  value,
  otherValue,
  onChange,
}: NeighborhoodSelectProps) {
  const selectedOption = coverageOptions.find((option) => option.value === value);
  const [query, setQuery] = useState(selectedOption?.label ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (value) setQuery(selectedOption?.label ?? value);
  }, [selectedOption, value]);

  const matchingOptions = coverageOptions
    .filter((option) => option.value !== otherValue)
    .filter((option) => normalize(option.value).includes(normalize(query.trim())))
    .slice(0, 8);

  const selectOption = (option: CoverageOption) => {
    onChange(option.value);
    setQuery(option.label);
    setIsOpen(false);
    setActiveIndex(0);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    setIsOpen(true);
    setActiveIndex(0);
    if (value) onChange("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (event.key === "ArrowDown" && matchingOptions.length > 0) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => (index + 1) % matchingOptions.length);
      document.getElementById(`${id}-option-${(activeIndex + 1) % matchingOptions.length}`)?.focus();
      return;
    }

    if (event.key === "Enter" && isOpen && matchingOptions[activeIndex]) {
      event.preventDefault();
      selectOption(matchingOptions[activeIndex]);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-inksoft"
        />
        <input
          id={id}
          name={id}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen && query.trim().length > 0}
          aria-controls={`${id}-listbox`}
          aria-required="true"
          autoComplete="off"
          value={query}
          onChange={handleChange}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher un quartier ou village"
          className="w-full rounded-xl border border-[#e1d8c8] bg-white py-3 pl-10 pr-10 text-sm text-ink shadow-sm outline-none transition placeholder:text-inksoft/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              onChange("");
              setIsOpen(false);
            }}
            aria-label={`Effacer ${label.toLocaleLowerCase("fr")}`}
            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-inksoft transition hover:bg-paper hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        ) : (
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-inksoft"
          />
        )}
      </div>

      {isOpen && query.trim() && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          aria-label={`Résultats pour ${label.toLocaleLowerCase("fr")}`}
          className="max-h-64 overflow-y-auto rounded-xl border border-[#e1d8c8] bg-white p-1 shadow-md"
        >
          {matchingOptions.length > 0 ? (
            matchingOptions.map((option, index) => (
              <li key={option.value} role="presentation">
                <button
                  id={`${id}-option-${index}`}
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectOption(option)}
                  className={cn(
                    "flex w-full items-start gap-2 rounded-lg px-3 py-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    index === activeIndex ? "bg-paper" : "hover:bg-paper/70",
                  )}
                >
                  <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink">{option.label}</span>
                    <span className="block text-xs text-inksoft">
                      {option.kind} · {option.value.slice(option.label.length + 3)}
                    </span>
                  </span>
                  {option.value === value && <Check aria-hidden="true" className="h-4 w-4 text-primary" />}
                </button>
              </li>
            ))
          ) : (
            <li className="px-3 py-3 text-sm text-inksoft">Aucun quartier ou village correspondant.</li>
          )}
        </ul>
      )}
    </div>
  );
}
