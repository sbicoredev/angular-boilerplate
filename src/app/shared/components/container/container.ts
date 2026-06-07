import { Component, computed, input, ViewEncapsulation } from "@angular/core";
import { cva, VariantProps } from "class-variance-authority";
import type { ClassValue } from "clsx";

import { hlm } from "@/ui/utils";

export const containerVariants = cva("mx-auto p-4 lg:p-6", {
  variants: {
    variant: {
      constrained: "max-w-7xl",
      constrainedNoPadding: "max-w-7xl px-0 lg:px-0",
      constrainedNoPaddingOnPhone: "max-w-7xl px-0",
      narrowConstrained: "max-w-4xl",
      narrowConstrainedNoPadding: "max-w-4xl px-0 lg:px-0",
      narrowConstrainedNoPaddingOnPhone: "max-w-4xl px-0",
      fluid: "",
      fluidNoPadding: "px-0 lg:px-0",
      fluidNoPaddingOnPhone: "px-0",
      responsive: "!container",
      responsiveNoPadding: "!container px-0",
    },
  },
  defaultVariants: {
    variant: "constrained",
  },
});

export type ContainerVariants = NonNullable<
  VariantProps<typeof containerVariants>["variant"]
>;

@Component({
  selector: "div[app-container]",
  imports: [],
  template: `
    <ng-content />
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class]": "classes()",
  },
})
export class Container {
  readonly class = input<ClassValue>("");
  readonly variant = input<ContainerVariants>("constrained");

  protected readonly classes = computed(() =>
    hlm(containerVariants({ variant: this.variant() }), this.class())
  );
}
