import { Directive, input } from "@angular/core";

import { classes } from "@/ui/utils";

import { HlmCardConfig, injectHlmCardConfig } from "./hlm-card.token";

@Directive({
  selector: "[hlmCard],hlm-card",
  host: {
    "data-slot": "card",
    "[attr.data-size]": "size()",
  },
})
export class HlmCard {
  private readonly _defaultConfig = injectHlmCardConfig();
  public readonly size = input<HlmCardConfig["size"]>(this._defaultConfig.size);

  constructor() {
    classes(
      () =>
        "group/card flex flex-col gap-6 overflow-hidden rounded-xl bg-card py-6 text-card-foreground text-sm shadow-xs ring-1 ring-foreground/10 has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl"
    );
  }
}
