export interface IButton {
  text: string,
  taskButton?: boolean,
  classList?: string,
  onClick?: (ev?: React.MouseEvent) => void,
}