import { Directive } from "@angular/core";
import { BrnFieldControlDescribedBy } from "@spartan-ng/brain/field";
import { BrnInput } from "@spartan-ng/brain/input";

import { classes } from "@/ui/utils";

@Directive({
  selector: "[hlmInput]",
  hostDirectives: [
    { directive: BrnInput, inputs: ["id", "forceInvalid"] },
    BrnFieldControlDescribedBy,
  ],
})
export class HlmInput {
  constructor() {
    classes(
      () =>
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-[matches-spartan-invalid=true]:border-destructive data-[matches-spartan-invalid=true]:ring-3 data-[matches-spartan-invalid=true]:ring-destructive/20 md:text-sm dark:bg-input/30 dark:data-[matches-spartan-invalid=true]:border-destructive/50 dark:data-[matches-spartan-invalid=true]:ring-destructive/40"
    );
  }
}
