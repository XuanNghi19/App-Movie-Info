export interface DropdownItem {
  label: string;
  route: string;
}
export interface DropdownState {
  visible: boolean;
  position: { top: number; left: number };
  items: DropdownItem[];
}