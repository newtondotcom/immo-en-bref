<template>
    <div class="flex flex-row">

      <EditorListArticles :articles />

      <div id="editorjs" class="border-2 w-[40vw]"></div>

      <div class="w-[40vw] border-red-400 border-2">
      <!-- <Separator orientation="vertical" /> -->
        <div v-for="block in schema.blocks">
          <EditorRendererHeader v-if="block.type === 'header'" :data="block.data"/>
          <EditorRendererParagraph v-if="block.type === 'paragraph'" :data="block.data" />
          <EditorRendererQuote v-if="block.type === 'quote'" :data="block.data" />
          <EditorRendererImage v-if="block.type === 'image'" :data="block.data" />
        </div>
      </div>
    </div>

    <div class="absolute right-0 bottom-0">
    <Button @click="save">Sauvegarder</Button>
    </div>

</template>

<script setup lang="ts">
import Header from '@editorjs/header';
import EditorJS from '@editorjs/editorjs';

const schema = ref({});

var editor = new EditorJS({
  tools: {
    header: Header,
  },
   onChange: async (api, event) => {
    schema.value = await editor.save()
   }
});

async function save(){
  const data =  await editor.save();
    schema.value = data
  console.log(data)
};

const articles = ref([
  {
    name : "credit"
  }, 
  {
    name : "taux"
  }
])

</script>