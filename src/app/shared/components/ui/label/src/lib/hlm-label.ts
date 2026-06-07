import { Directive } from "@angular/core";
import { BrnLabel } from "@spartan-ng/brain/label";

import { classes } from "@/ui/utils";

@Directive({
  selector: "[hlmLabel]",
  hostDirectives: [{ directive: BrnLabel, inputs: ["id", "for"] }],
  host: { "data-slot": "label" },
})
export class HlmLabel {
  constructor() {
    classes(
      () =>
        "flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50"
    );
  }
}
