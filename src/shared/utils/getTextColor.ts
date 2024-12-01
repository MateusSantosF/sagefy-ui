export const getTextColor = (hexColor: string) => {
  // Remove "#" se estiver presente
  const color = hexColor.replace("#", "");
  // Converte a cor hex para RGB
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  // Calcula o brilho usando a fórmula de luminância relativa
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  // Retorna 'text-black' se o brilho for alto, 'text-white' caso contrário
  return brightness > 128 ? "text-black" : "text-white";
};
