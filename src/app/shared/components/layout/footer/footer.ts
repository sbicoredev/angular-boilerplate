import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { Container } from "../../container/container";

@Component({
  selector: "footer[app-footer]",
  imports: [Container, RouterLink],
  templateUrl: "./footer.html",
})
export class Footer {
  protected readonly links = [
    {
      title: "Features",
      href: "#",
    },
    {
      title: "Solution",
      href: "#",
    },
    {
      title: "Customers",
      href: "#",
    },
    {
      title: "Pricing",
      href: "#",
    },
    {
      title: "Help",
      href: "#",
    },
    {
      title: "About",
      href: "#",
    },
  ];
}
