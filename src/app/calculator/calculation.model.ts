export interface CalculationFormulaEntry {
    label: string;
    valueNumber: number;
    valueUnit?: string;
    defaultValue: number;
    isAffected?: boolean;
    formula: string;
    sources?: string[];
    classes?: string;
  }
  
  export interface CalculationFormula extends CalculationFormulaEntry {
    children: CalculationFormulaEntry[];
  }
