<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import type InsertCell from "./cells/InsertCell";
  import { cells, activeCell, results, mathCellChanged, inCellInsertMode, addCell, onMobile } from "./stores";
  import type { CellTypes } from "./cells/BaseCell";

  import AddAlt from "carbon-icons-svelte/lib/AddAlt.svelte";
  import AddComment from "carbon-icons-svelte/lib/AddComment.svelte";
  import Grid from "carbon-icons-svelte/lib/Grid.svelte";
  import ChartLine from "carbon-icons-svelte/lib/ChartLine.svelte";
  import IbmWatsonStudio from "carbon-icons-svelte/lib/IbmWatsonStudio.svelte";
  import ChartLineSmooth from "carbon-icons-svelte/lib/ChartLineSmooth.svelte";
  import Error from "carbon-icons-svelte/lib/Error.svelte";
  import InsertPage from "carbon-icons-svelte/lib/InsertPage.svelte";

  export let index: number;
  export let insertCell: InsertCell;

  const timeout = 5000;
  const delta = 50;
  let currentTime = timeout;
  let intervalId = null;
  let firstButtonElement: HTMLElement;

  const dispatch = createEventDispatcher();

  function insertSheet() {
    deleteMyself();
    dispatch('insertSheet', {
      index: index
    });
  }

  onMount(() => {
    intervalId = setInterval(intervalFunc, delta);
    if (firstButtonElement) {
      firstButtonElement.focus({preventScroll: true});
      firstButtonElement.scrollIntoView({behavior: "smooth", block: "center"});
    }
  });

  onDestroy(() => {
    clearInterval(intervalId);
    $inCellInsertMode = false;
  });

  function intervalFunc() {
    currentTime -= delta;

    if (currentTime <= 0) {
      clearInterval(intervalId);
      deleteMyself();
    }
  }

  function deleteMyself() {
    if (insertCell.id === $cells[index].id) { 
      $cells = [...$cells.slice(0,index), ...$cells.slice(index+1)];
      $activeCell = index - 1;
      if ($activeCell >= $cells.length) {
        $activeCell = $cells.length-1;
      }
      $results = [];
      $mathCellChanged = true;
    }
  }

  function insertNewCell(type: CellTypes) {
    deleteMyself();
    addCell(type, index);
  }

</script>

<style>
  div.container {
    display: flex;
    padding: 20px;
    justify-content: center;
    background-color: whitesmoke;
    border-radius: 10px;
  }

  div.container.mobile {
    padding: 5px;
  }

  div.controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    row-gap: 10px;
  }

  p {
    font-size: larger;
  }

  div.button-grid {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(3, 1fr);
  }

  button {
    background-color: white;
    border-radius: 5px;
    margin: 3px;
  }

  div.button-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
  }

  div.button-text.mobile {
    column-gap: 5px;
  }

</style>


<div class="container" class:mobile={$onMobile}>
  <div class="controls">
    {#if !$onMobile}
      <p>Press the number to the desired cell type or press Escape to cancel:</p>
    {/if}
    
    <div class="button-grid">

      <button 
        id={"insert-popup-button-1"}
        on:click={() => insertNewCell('math')}
        bind:this={firstButtonElement}
      >
        <div class="button-text" class:mobile={$onMobile}>
          {#if !$onMobile}
            <div>1</div>
          {/if}
          <div>Math Cell</div>
          <div><AddAlt size={20}/></div>
        </div>
      </button>

      <button 
        id={"insert-popup-button-2"}
        on:click={() => insertNewCell('documentation')}
      >
        <div class="button-text">
          {#if !$onMobile}
            <div>2</div>
            <div>Documetation Cell</div>
          {:else}
            <div>Comment Cell</div>
          {/if}
          <div><AddComment size={20}/></div>
        </div>
      </button>

      <button 
        id={"insert-popup-button-3"}
        on:click={() => insertNewCell('plot')}
      >
        <div class="button-text">
          {#if !$onMobile}
            <div>3</div>
          {/if}
          <div>Plot Cell</div>
          <div><ChartLineSmooth size={20}/></div>
        </div>
      </button>

      <button 
        id={"insert-popup-button-4"}
        on:click={() => insertNewCell('table')}
      >
        <div class="button-text">
          {#if !$onMobile}
            <div>4</div>
          {/if}
          <div>Table Cell</div>
          <div><Grid size={20}/></div>
        </div>
      </button>

      <button 
        id={"insert-popup-button-5"}
        on:click={() => insertNewCell('piecewise')}
      >
        <div class="button-text">
          {#if !$onMobile}
            <div>5</div>
            <div>Piecewise Expression Cell</div>
          {:else}
            <div>Piecewise Function Cell</div>
          {/if}
          <div><ChartLine size={20}/></div>
        </div>
      </button>

      <button 
        id={"insert-popup-button-6"}
        on:click={() => insertNewCell('system')}
      >
        <div class="button-text">
          {#if !$onMobile}
            <div>6</div>
          {/if}
          <div>System Solve Cell</div>
          <div><IbmWatsonStudio size={20}/></div>
        </div>
      </button>

      <button 
        id={"insert-popup-button-7"}
        on:click={insertSheet}
      >
        <div class="button-text">
          {#if !$onMobile}
            <div>7</div>
          {/if}
          <div>Insert Sheet</div>
          <div><InsertPage size={20}/></div>
        </div>
      </button>

      <button 
        id={"insert-popup-button-esc"}
        on:click={deleteMyself}
      >
        <div class="button-text">
          {#if !$onMobile}
            <div>Escape</div>
          {/if}
          <div>Cancel</div>
          <div><Error size={20}/></div>
        </div>
      </button>

    </div>
    <progress value={currentTime/timeout-.1}></progress>
  </div>
</div>