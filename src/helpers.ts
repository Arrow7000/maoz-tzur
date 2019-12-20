export function isNusach(name: Nusach | string | undefined): name is Nusach {
  const nusachim: Nusach[] = ["ashkenaz", "sefardi", "chabad"];
  return nusachim.includes(name as Nusach);
}
