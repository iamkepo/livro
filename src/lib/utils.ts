import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const baseUrl = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
