import { BaseCell, type DatabaseTableCell } from "./BaseCell";
import { MathField } from "./MathField";
import type { Statement } from "../parser/types";

class TableRowLabelField {
  label: string;
  id: number;
  static nextId = 0;

  constructor (label = "") {
    this.label = label;
    this.id = TableRowLabelField.nextId++;
  }
}

export default class TableCell extends BaseCell {
  rowLabels: TableRowLabelField[];
  nextRowLabelId: number;
  parameterFields: MathField[];
  nextParameterId: number;
  parameterUnitFields: MathField[];
  rhsFields: MathField[][];
  selectedRow: number;
  hideUnselected: boolean;
  rowJsons: string[];
  richTextInstance: HTMLElement | null;

  constructor (arg?: DatabaseTableCell) {
    if (arg === undefined) {
      super("table");
      this.rowLabels = [new TableRowLabelField("Option 1"), new TableRowLabelField("Option 2")];
      this.nextRowLabelId = 3;
      this.parameterFields = [new MathField('Var1', 'parameter'), new MathField('Var2', 'parameter')];
      this.nextParameterId = 3;
      this.parameterUnitFields = [new MathField('', 'units'), new MathField('', 'units')];
      this.rhsFields = [[new MathField('', 'expression'), new MathField('', 'expression')],
                        [new MathField('', 'expression'), new MathField('', 'expression')]];
      this.selectedRow = 0;
      this.hideUnselected = false;
      this.rowJsons = [];
      this.richTextInstance = null;
    } else {
      super("table", arg.id);
      this.rowLabels = arg.rowLabels.map((label) => new TableRowLabelField(label));
      this.nextRowLabelId = arg.nextRowLabelId;
      this.parameterFields = arg.parameterLatexs.map((latex) => new MathField(latex, 'parameter'));
      this.nextParameterId = arg.nextParameterId;
      this.parameterUnitFields = arg.parameterUnitLatexs.map((latex) => new MathField(latex, 'units'));
      this.rhsFields = arg.rhsLatexs.map((row) => row.map((latex) => new MathField(latex, 'expression')));
      this.selectedRow = arg.selectedRow;
      this.hideUnselected = arg.hideUnselected;
      this.rowJsons = arg.rowJsons;
      this.richTextInstance = null;
    }
  }

  serialize(): DatabaseTableCell {
    return {
      type: "table",
      id: this.id,
      rowLabels: this.rowLabels.map((row) => row.label),
      nextRowLabelId: this.nextRowLabelId,
      parameterLatexs: this.parameterFields.map((field) => field.latex),
      nextParameterId: this.nextRowLabelId,
      parameterUnitLatexs: this.parameterUnitFields.map((parameter) => parameter.latex),
      rhsLatexs: this.rhsFields.map((row) => row.map((field) => field.latex)),
      selectedRow: this.selectedRow,
      hideUnselected: this.hideUnselected,
      rowJsons: this.rowJsons
    };
  }

  parseUnitField (latex: string, cellIndex: number, column: number) {
    this.parameterUnitFields[column].parseLatex(latex);

    const columnType = latex.replaceAll('\\','').trim() === "" ? "expression" : "number"; 

    // the presence or absence of units impacts the parsing of the rhs values so the current 
    // column of rhs values needs to be parsed again
    for ( const row of this.rhsFields) {
      row[column].type = columnType;
      row[column].parseLatex(row[column].latex);
    }
  }

  
  parseTableStatements(cellNum: number): Statement[] {
    const rowIndex = this.selectedRow;
    const statements = [];
  
    if (!(this.parameterFields.some(value => value.parsingError) ||
          this.parameterUnitFields.some(value => value.parsingError) ||
          this.rhsFields.reduce((accum, row) => accum || row.some(value => value.parsingError), false))) {
      for (let colIndex = 0; colIndex < this.parameterFields.length; colIndex++) {
        let combinedLatex: string, mathField: MathField;
        if (this.rhsFields[rowIndex][colIndex].latex.replaceAll('\\','').trim() !== "") {
          combinedLatex = this.parameterFields[colIndex].latex + "=" +
                          this.rhsFields[rowIndex][colIndex].latex +
                          this.parameterUnitFields[colIndex].latex;

          mathField = new MathField(combinedLatex);

          mathField.parseLatex(combinedLatex);

          statements.push(mathField.statement);
        }
      }
    } 
  
    return statements;
  }

  addRowDocumentation() {
    this.rowJsons = Array(this.rowLabels.length).fill('');
  }

  deleteRowDocumentation() {
    this.rowJsons = [];
  }


  addRow() {
    const newRowId = this.nextRowLabelId++;
    this.rowLabels = [...this.rowLabels, new TableRowLabelField(`Option ${newRowId}`)];
    
    if (this.rowJsons.length > 0) {
      this.rowJsons = [...this.rowJsons, ''];
    }

    let columnType: "expression" | "number";
    let newRhsRow: MathField[] = []; 
    for (const unitField of this.parameterUnitFields) {
      columnType = unitField.latex.replaceAll('\\','').trim() === "" ? "expression" : "number";
      newRhsRow.push(new MathField('', columnType));
    }

    this.rhsFields = [...this.rhsFields, newRhsRow];
  }

  addColumn() {
    const newVarId = this.nextParameterId++;

    this.parameterUnitFields = [...this.parameterUnitFields, new MathField('', 'units')];
    const newVarName = `Var${newVarId}`;
    this.parameterFields = [...this.parameterFields, new MathField(newVarName, 'parameter')];

    this.rhsFields = this.rhsFields.map( row => [...row, new MathField('', 'expression')]);
  }

  deleteRow(rowIndex: number):boolean {
    this.rowLabels = [...this.rowLabels.slice(0,rowIndex),
                                    ...this.rowLabels.slice(rowIndex+1)];

    if (this.rowJsons.length > 0) {
      this.rowJsons = [...this.rowJsons.slice(0,rowIndex),
                            ...this.rowJsons.slice(rowIndex+1)];
    }
    
    this.rhsFields = [...this.rhsFields.slice(0,rowIndex), 
                           ...this.rhsFields.slice(rowIndex+1)];

    if (this.selectedRow === rowIndex) {
      if (this.selectedRow !== 0) {
        this.selectedRow -= 1;
        return true
      }
    }

    return false
  }

  deleteColumn(colIndex: number) {
    this.parameterUnitFields = [...this.parameterUnitFields.slice(0,colIndex),
                                     ...this.parameterUnitFields.slice(colIndex+1)];

    this.parameterFields = [...this.parameterFields.slice(0,colIndex),
                                 ...this.parameterFields.slice(colIndex+1)];

    this.rhsFields = this.rhsFields.map( row => [...row.slice(0,colIndex), ...row.slice(colIndex+1)]);
  }

}