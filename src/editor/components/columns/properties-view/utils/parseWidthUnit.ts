

export type WidthUnit =
  "px"
  | "%"
  | "em"
  | ""
  | "cm"
  | "mm"
  | "in"
  | "pc"
  | "pt"
  | "ch"
  | "rem"
  | "vh"
  | "vw"
  | "vmin"
  | "vmax";

export const widthUnits: WidthUnit[] = [
  "",
  "px",
  "%",
  "vh",
  "vw",
  "em",
  "vmin",
  "vmax",
  "rem",
  "cm",
  "mm",
  "in",
  "pc",
  "pt",
  "ch",
];

export const parseWidthUnit = (val: string): WidthUnit => {
  if (!val) {
    return "";
  }
  switch (true) {
    case (val.endsWith("px")): {
      return "px";
    }
    case (val.endsWith("%")): {
      return "%";
    }
    case (val.endsWith("em")): {
      return "em";
    }
    case (val.endsWith("vh")): {
      return "vh";
    }
    case (val.endsWith("vw")): {
      return "vw";
    }
    case (val.endsWith("vmin")): {
      return "vmin";
    }
    case (val.endsWith("vmax")): {
      return "vmax";
    }
    case (val.endsWith("rem")): {
      return "rem";
    }
    case (val.endsWith("cm")): {
      return "cm";
    }
    case (val.endsWith("mm")): {
      return "mm";
    }
    case (val.endsWith("in")): {
      return "in";
    }
    case (val.endsWith("pc")): {
      return "pc";
    }
    case (val.endsWith("pt")): {
      return "pt";
    }
    case (val.endsWith("ch")): {
      return "ch";
    }
  }
  return "";
}