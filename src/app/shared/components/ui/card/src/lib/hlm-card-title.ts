import { Directive } from "@angular/core";

import { classes } from "@/ui/utils";

@Directive({
  selector: "[hlmCardTitle]",
  host: {
    "data-slot": "card-title",
  },
})
export class HlmCardTitle {
  constructor() {
    classes(
      () =>
        "font-medium text-base leading-normal group-data-[size=sm]/card:text-sm"
    );
  }
}
