import stringWidth from "string-width";

export function unicodePadEnd(input: string, length: number, fill = " ") {
  return input + fill.repeat(length - stringWidth(input));
}
