

export const widthUnits = [
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
] as const;

export type WidthUnit = UnionOfArrayElements<typeof widthUnits>;

export const parseWidthUnit = (val: string): WidthUnit => {
  if (!val) {
    return "";
  }
  return widthUnits.find(u => val.includes(u)) || "";
}