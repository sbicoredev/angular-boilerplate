import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function mergeClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const noopFn = () => 0;

export const isElementContentTruncated = (
  element: HTMLElement | undefined
): boolean => {
  if (!element) {
    return false;
  }
  const range = document.createRange();
  range.selectNodeContents(element);
  const rangeWidth = range.getBoundingClientRect().width;
  const elementWidth = element.getBoundingClientRect().width;

  return rangeWidth > elementWidth;
};
