export interface CalculationPanelEntry {
    label: string;
    valueNumber: number;
    valueUnit?: string;
    defaultValue: number;
    showAsAffected?: boolean;
    formula?: string;
    sources?: string[];
    classes?: string;
  }
  
  export interface CalculationPanel extends CalculationPanelEntry {
    children?: CalculationPanelEntry[];
  }
