<template>
    <div>
      <div id="editorjs"></div>
    </div>

</template>

<script setup lang="ts">
import Header from '@editorjs/header';
import EditorJS from '@editorjs/editorjs'

var editor = new EditorJS({
  tools: {
    header: Header,
  }
});
</script>