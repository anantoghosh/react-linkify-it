export interface LinkProps {
  match: string;
  key: number;
  className?: string;
}

export type Component = (match: string, key: number) => JSX.Element;
