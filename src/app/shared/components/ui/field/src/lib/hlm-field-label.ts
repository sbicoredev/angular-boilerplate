import { Directive } from "@angular/core";

import { HlmLabel } from "@/ui/label";
import { classes } from "@/ui/utils";

@Directive({
  selector: "[hlmFieldLabel],hlm-field-label",
  hostDirectives: [HlmLabel],
  host: { "data-slot": "field-label" },
})
export class HlmFieldLabel {
  constructor() {
    classes(() => [
      "group/field-label peer/field-label flex w-fit gap-2 leading-snug has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border has-data-checked:border-primary/30 has-data-checked:bg-primary/5 *:data-[slot=field]:p-3 group-data-[disabled=true]/field:opacity-50 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10",
      "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
    ]);
  }
}
