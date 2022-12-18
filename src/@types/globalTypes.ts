export interface Entity {
  id: number | undefined;
}

export type Violations = {
  violations: ViolationObject[];
};

type ViolationObject = {
  attribute: string;
  messages: string[];
};

export type ErrorWithMessage = {
  message: string;
};
