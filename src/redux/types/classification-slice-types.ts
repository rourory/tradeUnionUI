export type ClassificationsType = {
  education: ClassType[];
  maritalState: ClassType[];
  hasErrors: boolean;
}

export type ClassType = {
  id: number
  name: string
  shortName: string
  charName: string
}