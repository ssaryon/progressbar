export interface ComponentConfig {
  action: string;
  element: string;
  parentClassName: string;
  customElement: string;
  siblingElement: string;
  placement?: InsertPosition;
  style: string;
  spendingGoal: string;
}

export interface MessageConfig {
  totalSpent: number;
  spendingGoal: number;
  isLoggedIn: boolean;
}
