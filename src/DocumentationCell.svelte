<script lang="ts">
  import { onMount } from 'svelte';
  import { activeCell, nonMathCellChanged } from "./stores";
  import type DocumentationCell from "./cells/DocumentationCell";
  import DocumentationField from "./DocumentationField.svelte";

  export let index: number;
  export let documentationCell: DocumentationCell;

  let hideToolbar = true;

  onMount(() => {
    if (documentationCell.documentationField.json || documentationCell.documentationField.json === "") { 
      (documentationCell.documentationField.richTextInstance as any).setContents(documentationCell.documentationField.json);
    }

    if ($activeCell === index) {
      focus();
    }
  });

  function focus() {
    if (documentationCell.documentationField.richTextInstance) {
      documentationCell.documentationField.richTextInstance.focus();
    }
  }


  $: hideToolbar = !($activeCell === index);

  $: if ($activeCell === index) {
      focus();
    }

</script>


<div>
  <DocumentationField
    hideToolbar={hideToolbar}
    bind:quill={documentationCell.documentationField.richTextInstance}
    on:update={(e) => {
       documentationCell.documentationField.json = e.detail.json;
       $nonMathCellChanged = true;
    }}
  />
</div>