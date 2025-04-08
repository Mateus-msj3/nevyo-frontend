export enum PrimaryColorEnum {
  Indigo = 'indigo',
  Blue = 'blue',
  Purple = 'purple',
  Teal = 'teal',
  Cyan = 'cyan',
  Green = 'green',
  Orange = 'orange',
  Pink = 'pink'
}

// Um objeto de mapeamento para converter o Enum para um valor de cor
export const ColorMapping: { [key in PrimaryColorEnum]: string } = {
  [PrimaryColorEnum.Indigo]: 'INDIGO',
  [PrimaryColorEnum.Blue]: 'BLUE',
  [PrimaryColorEnum.Purple]: 'PURPLE',
  [PrimaryColorEnum.Teal]: 'TEAL',
  [PrimaryColorEnum.Cyan]: 'CYAN',
  [PrimaryColorEnum.Green]: 'GREEN',
  [PrimaryColorEnum.Orange]: 'ORANGE',
  [PrimaryColorEnum.Pink]: 'PINK'
};

// Função para obter a cor hexadecimal com base no Enum
export function getColorHex(color: PrimaryColorEnum): string {
  return ColorMapping[color];
}
