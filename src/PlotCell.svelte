<script lang="ts">
  import { onMount } from "svelte";
  import { cells, results, activeCell, mathCellChanged, modifierKey} from "./stores";
  import type PlotCell from "./cells/PlotCell";
  import type { MathField as MathFieldClass } from "./cells/MathField";
  import { unitsEquivalent, unitsValid, convertArrayUnits } from "./utility.js";
  import type { PlotResult } from "./resultTypes";
  import { tick } from 'svelte';
  import MathField from "./MathField.svelte";
  import Plot from "./Plot.svelte";
  import TextCheckbox from "./TextCheckbox.svelte";
  import TextButton from "./TextButton.svelte";

  import { TooltipIcon } from "carbon-components-svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";
  import RowDelete from "carbon-icons-svelte/lib/RowDelete.svelte";

  export let index: number;
  export let plotCell: PlotCell;

  let containerDiv: HTMLDivElement;
  let plotData = {data: [{}], layout: {}};
  let clipboardPlotData = {headers: [], units: [], columns: []};
  let copyButtonText = "Copy Data";

  onMount( () => {
    if ($activeCell === index) {
      focus();

      window.setTimeout( () => {
        const mathElement = document.getElementById(`plot-expression-${index}-0`);
        if (mathElement) {
          mathElement.scrollIntoView({behavior: "smooth", block: "center"});
        }
      }, 100);
    }
  });

  function focus() {
    if (containerDiv && !containerDiv.contains(document.activeElement)) {
      const mathElement: HTMLTextAreaElement = document.querySelector(`#plot-expression-${index}-0 textarea`);
      if (mathElement) {
        mathElement.focus();
      }
    }
  }

  function renderAxisTitle(names, units) {
    return [...names].join(", ") + (units ? ` [${units}]` : '');
  }

  function parseLatex(latex: string, mathField: MathFieldClass) {
    mathField.parseLatex(latex);
    $mathCellChanged = true;
    $cells = $cells;
  }

  async function addMathField() {
    plotCell.addRow();
    $cells = $cells;
    await tick();
    if (plotCell.mathFields.slice(-1)[0].element) {
      plotCell.mathFields.slice(-1)[0].element.focus();
    }
  }

  function deleteRow(rowIndex: number) {
    plotCell.deleteRow(rowIndex);

    $mathCellChanged = true;
    $cells = $cells;
  }


  function convertPlotUnits() {
    let userInputUnits: string | undefined;     
    if (plotCell.mathFields[0].statement?.type === "query" && plotCell.mathFields[0].statement.isRange) { 
      // use input units from first plot statement
      userInputUnits = plotCell.mathFields[0].statement.input_units;
    }
    for (const [j, statement] of plotCell.mathFields.map((field) => field.statement).entries()) {
      if ($results[index] && $results[index][j] &&
          statement && statement.type === "query" &&
          $results[index][j].plot) {
        for (const data of ($results[index][j] as PlotResult).data) {
          data.unitsMismatch = true;
          if (data.numericOutput) {
            data.unitsMismatch = false;
            // convert inputs if units provided
            if (userInputUnits) {
              const startingInputUnits = data.inputUnits;

              if ( unitsEquivalent(userInputUnits, startingInputUnits) ) {
                data.displayInput = convertArrayUnits(data.input, startingInputUnits, userInputUnits);
                data.displayInputUnits = userInputUnits;
              } else {
                data.unitsMismatch = true;
                data.unitsMismatchReason = "All x-axis units must be compatible";
              }
            } else {
              data.displayInput = data.input;
              data.displayInputUnits = data.inputUnits;
            } 
          
            // convert outputs if units provided
            if (statement.units && statement.units_valid) {
              const userOutputUnits = statement.units;
              const startingOutputUnits = data.outputUnits;

              if ( unitsEquivalent(userOutputUnits, startingOutputUnits) ) {
                data.displayOutput = convertArrayUnits(data.output, startingOutputUnits, userOutputUnits);
                data.displayOutputUnits = userOutputUnits;
              } else {
                data.unitsMismatch = true;
              }
            } else {
              data.displayOutput = data.output;
              data.displayOutputUnits = data.outputUnits;
            } 
          }
        }
      }
    }
  }


  function collectPlotData() {
    const firstResult = ($results[index] as PlotResult[]).find( (result) => result.data[0].numericOutput );
    if (firstResult === undefined) {
      console.warn('No valid plot found');
      return;
    }

    const inputNames = new Set();
    const outputUnits = new Map([[firstResult.data[0].displayOutputUnits,
                                  new Set([firstResult.data[0].outputName])]]);
    const inputUnits = firstResult.data[0].displayInputUnits;

    const data = [];
    clipboardPlotData = {headers: [], units: [], columns: []};
    for (const result of ($results[index] as PlotResult[])) {
      if (result.plot && result.data[0].numericOutput && !result.data[0].unitsMismatch && 
          unitsValid(result.data[0].displayInputUnits) && unitsValid(result.data[0].displayOutputUnits) ){
        if( unitsEquivalent(result.data[0].displayInputUnits, inputUnits) ) {
          let yAxisNum;
          const axisNames = outputUnits.get(result.data[0].displayOutputUnits)
          if (axisNames !== undefined) {
            outputUnits.set(result.data[0].displayOutputUnits, axisNames.add(result.data[0].outputName));
            yAxisNum = [...outputUnits.keys()].indexOf(result.data[0].displayOutputUnits);
          } else {
            outputUnits.set(result.data[0].displayOutputUnits, new Set([result.data[0].outputName]));
            yAxisNum = outputUnits.size - 1;
          }
          
          if (yAxisNum < 4) {
            const newCurve = {
              x: result.data[0].displayInput,
              y: result.data[0].displayOutput,
              type: "scatter",
              mode: "lines",
              name: result.data[0].outputName,
            }

            if (yAxisNum > 0) {
              (newCurve as any).yaxis = "y" + (yAxisNum+1);
            }

            data.push(newCurve);

            inputNames.add(result.data[0].inputName);
          } else {
            result.data[0].unitsMismatch = true;
            result.data[0].unitsMismatchReason = "Cannot have more than 4 different y-axis units"
          }

          clipboardPlotData.headers.push(result.data[0].inputName);
          clipboardPlotData.headers.push(result.data[0].outputName);
          clipboardPlotData.units.push(result.data[0].displayInputUnits);
          clipboardPlotData.units.push(result.data[0].displayOutputUnits);
          clipboardPlotData.columns.push(result.data[0].displayInput);
          clipboardPlotData.columns.push(result.data[0].displayOutput);
        } else {
          result.data[0].unitsMismatch = true;
          result.data[0].unitsMismatchReason = "All x-axis units must be compatible"
        }
      }
    }

    if (data.length > 0) {

      const yAxisUnits = [...outputUnits.keys()];
      const yAxisNames = [...outputUnits.values()];

      const layout = {
            xaxis: {
              title: {
                text: `${renderAxisTitle(inputNames, inputUnits)}`,
                standoff: 5
              },
              automargin: true,
              type: `${plotCell.logX ? 'log' : 'linear'}`
            },
            yaxis: {
              title: {
                text: `${renderAxisTitle(yAxisNames[0], yAxisUnits[0])}`,
                standoff: 5
              },
              automargin: true,
              type: `${plotCell.logY ? 'log' : 'linear'}`
            },
            margin: {t: 40, b: 40, l: 40, r: 40},
            showlegend: data.length > 1,
            legend: { orientation: "h"}
          };

      if (outputUnits.size > 1) {
        layout["yaxis2"] = {
          title: {
            text: `${renderAxisTitle(yAxisNames[1], yAxisUnits[1])}`,
            standoff: 5
          },
          automargin: true,
          anchor: 'x',
          overlaying: 'y',
          side: 'right',
          type: `${plotCell.logY ? 'log' : 'linear'}`
        }
      }

      if (outputUnits.size > 2) {
        layout["yaxis3"] = {
          title: {
            text: `${renderAxisTitle(yAxisNames[2], yAxisUnits[2])}`,
            standoff: 5
          },
          automargin: true,
          anchor: 'free',
          overlaying: 'y',
          side: 'left',
          position: 0.15,
          type: `${plotCell.logY ? 'log' : 'linear'}`
        };

        (layout.xaxis as any).domain = [0.3, 1.0];
      }

      if (outputUnits.size > 3) {
        layout["yaxis4"] = {
          title: {
            text: `${renderAxisTitle(yAxisNames[3], yAxisUnits[3])}`,
            standoff: 5
          },
          automargin: true,
          anchor: 'free',
          overlaying: 'y',
          side: 'right',
          position: 0.85,
          type: `${plotCell.logY ? 'log' : 'linear'}`
        };

        (layout.xaxis as any).domain = [0.3, 0.7];
      }

      plotData = {
          data: data,
          layout: layout 
        };

    } else {
      plotData = {data: [{}], layout: {}};
    }
  }


  function getClipboardPlotData(): string {
    if (clipboardPlotData.headers.length === 0) {
      return "";
    }

    let text = "";

    for (const [i, header] of clipboardPlotData.headers.entries()) {
      text += header;
      if (i < clipboardPlotData.headers.length-1) {
        text += "\t";
      }
    }

    if (!clipboardPlotData.units.every( value => value === "")) {
      text += "\n";
      for (const [i, unit] of clipboardPlotData.units.entries()) {
        text += `[${unit}]`;
        if (i < clipboardPlotData.units.length-1) {
          text += "\t";
        }
      }
    }

    const longestCol = clipboardPlotData.columns.reduce( (acum, value) => value.length > acum ? value.length : acum, 0);

    if (longestCol === 0) {
      return "";
    } 

    for (let i = 0; i<longestCol; i++) {
      text += "\n";
      for (const [j, column] of clipboardPlotData.columns.entries()) {
        if (column[i] !== undefined) {
          text += `${column[i]}`;
        }
        if (j < clipboardPlotData.columns.length-1) {
          text += "\t";
        }
      }
    }

    return text;
  }


  async function copyData() {
    const clipboardPlotData = getClipboardPlotData(); 

    if (clipboardPlotData === "") {
      copyButtonText = "No data to copy";
    } else {
      try {
        await navigator.clipboard.writeText(clipboardPlotData);
        copyButtonText = "Copied!";
      } catch (e) {
        copyButtonText = "Copy failed, check browser settings";
      }
    }

    setTimeout(() => copyButtonText="Copy Data", 2000);
  }

  function handleKeyboardShortcuts(event: KeyboardEvent, row: number) {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case "Enter":
        if (event.shiftKey || event[$modifierKey]) {
          return;
        }
        if (row < plotCell.mathFields.length - 1) {
          if (plotCell.mathFields[row+1].element?.focus) {
            plotCell.mathFields[row+1].element?.focus();
          }
        } else {
          addMathField();
        }
        break;
      default:
        return;
    }

    event.preventDefault();
  }


  function validPlotReducer(accum, value) {
    return (value.plot && value.data && 
            value.data[0].numericOutput) || accum;
  }


  $: if ($activeCell === index) {
      focus();
    }

  $: numRows = plotCell.mathFields.length;

  $: if (plotCell && $results[index] &&
         $results[index][0] && ($results[index] as PlotResult[]).reduce(validPlotReducer, false ) ) {
    convertPlotUnits();
    collectPlotData();
  } else {
    plotData = {data: [{}], layout: {}};
    clipboardPlotData = {headers: [], units: [], columns: []};
  }

</script>

<style>
  div.container {
    display: grid;
    grid-auto-flow: row;
    break-inside: avoid;
  }

  div.plot-sizer {
    max-width: min(90vw, 886px);
  }

  div.math-field-container {
    display: grid;
    width: fit-content;
    padding-top: 0px;
    padding-bottom: 0px;
  }

  div.item {
    display: flex;
    align-self: center;
    justify-content: left;
    padding: 7px;
  }

  div.item.math-field {
    display: flex;
    align-items: center;
    padding-left: 0px;
  }

  div.item.add-button {
    padding: 0px;
    padding-bottom: 7px;
  }

  :global(.bx--tooltip__trigger) {
    margin-left: 0.5rem;
  }

  :global(svg.error) {
    fill: #da1e28;
  }

  div.log-buttons {
    margin: 10px;
    margin-left: 0px;
  }

  @media print {
    div.log-buttons {
      display: none;
    }

    :global(div.modebar-container) {
      display: none;
    }
  }

  button {
    background: none;
    border: none;
    border-radius: 50%;
    position: relative;
    width: 20px;
    height: 20px;
  }

  button:hover {
    background: gainsboro;
  }

  div.icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    height: 16px;
    width: 16px;
  }
</style>

<div 
  class="container"
  bind:this={containerDiv}
>
  <div class="plot-sizer">
    <Plot plotData={plotData} />
  </div>
  <div class="log-buttons">
    <TextCheckbox 
      bind:checked={plotCell.logX}
      title="Use log scale for x axis"
    >
      log x
    </TextCheckbox>

    <TextCheckbox
      bind:checked={plotCell.logY}
      title="Use log scale for y asix"
    >
      log y
    </TextCheckbox>

    <TextButton on:click={copyData}>
      {copyButtonText}
    </TextButton>
  </div>

  <div
    class="math-field-container"
  >
    {#if plotCell.mathFields}
      {#each plotCell.mathFields as mathField, i (mathField.id)}
        <div
          class="item math-field"
          id={`plot-expression-${index}-${i}`}
          on:keydown={(e) => handleKeyboardShortcuts(e,i)}
          style="grid-column: 1; grid-row: {i+1};"
        >
          <MathField
            editable={true}
            on:update={(e) => parseLatex(e.detail.latex, mathField)}
            mathField={mathField}
            parsingError={mathField.parsingError}
            bind:this={mathField.element}
            latex={mathField.latex}
          />
          {#if mathField.parsingError}
            <TooltipIcon direction="right" align="end">
              <span slot="tooltipText">{mathField.parsingErrorMessage}</span>
              <Error class="error"/>
            </TooltipIcon>
          {:else if mathField.latex && $results[index] && $results[index][i]?.plot && !$results[index][i].data[0].numericInput}
            <TooltipIcon direction="right" align="end">
              <span slot="tooltipText">X-axis limits of plot do not evaluate to a number</span>
              <Error class="error"/>
            </TooltipIcon>
          {:else if mathField.latex && $results[index] && $results[index][i]?.plot > 0 && !$results[index][i].data[0].limitsUnitsMatch}
            <TooltipIcon direction="right" align="end">
              <span slot="tooltipText">Units of the x-axis upper and lower limits do not match</span>
              <Error class="error"/>
            </TooltipIcon>
          {:else if mathField.latex && $results[index] && $results[index][i]?.plot > 0 && !$results[index][i].data[0].numericOutput}
            <TooltipIcon direction="right" align="end">
              <span slot="tooltipText">Results of expression does not evaluate to finite and real numeric values</span>
              <Error class="error"/>
            </TooltipIcon>
          {:else if mathField.latex && $results[index] && $results[index][i]?.plot > 0 && !unitsValid($results[index][i].data[0].displayInputUnits)}
            <TooltipIcon direction="right" align="end">
              <span slot="tooltipText">X-axis upper and/or lower limit dimension error{$results[index][i].data[0].displayInputUnits === "Exponent Not Dimensionless" ? ": Exponent Not Dimensionless": ""}</span>
              <Error class="error"/>
            </TooltipIcon>
          {:else if mathField.latex && $results[index] && $results[index][i]?.plot > 0 && !unitsValid($results[index][i].data[0].displayOutputUnits)}
            <TooltipIcon direction="right" align="end">
              <span slot="tooltipText">Y-axis dimension error{$results[index][i].data[0].displayOutputUnits === "Exponent Not Dimensionless" ? ": Exponent Not Dimensionless": ""}</span>
              <Error class="error"/>
            </TooltipIcon>
          {:else if mathField.latex && $results[index] && $results[index][i]?.plot > 0 && $results[index][i].data[0].unitsMismatch}
            <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">
                  { $results[index][i].data[0].unitsMismatchReason ? $results[index][i].data[0].unitsMismatchReason : "Units Mismatch" }
                </span>
              <Error class="error"/>
            </TooltipIcon>
          {:else if mathField.latex && $results[index] && $results[index][i]?.plot > 0 && $results[index][i].data[0].inputReversed}
            <TooltipIcon direction="right" align="end">
                <span slot="tooltipText">X-axis upper and lower limits are reversed</span>
              <Error class="error"/>
            </TooltipIcon>
          {/if}
        </div>
    
        {#if numRows > 1 }
          <div
            class="item"
            style="grid-column: 2; grid-row: {i+1};"
          >
            <button
              on:click={() => deleteRow(i)}
              title="Delete Row"
              id={`delete-row-${index}-${i}`}
            >
              <div class="icon">
                <RowDelete />
              </div>
            </button>
          </div>
        {/if}
      {/each}

      <div
        class="item add-button"
        style="grid-column: 1; grid-row: {numRows+1};"
      >
        <button
          on:click={addMathField}
          id={`add-row-${index}`}
          title="Add Equation"
        >
          <div class="icon">
            <Add />
          </div>
        </button>
      </div>
    {/if}
  </div>
</div>


