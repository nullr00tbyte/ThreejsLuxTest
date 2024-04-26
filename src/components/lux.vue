<template>

     <div id="scene-container">
          <!-- Three.js canvas will be inserted here -->
     </div>
     <div class="fixed bottom-0 left-0 right-0 flex justify-center items-center p-4 bg-gray-900">
          <button @click=" world.play('idle')"
               class="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Colita</button>

          <button @click=" world.play('walk')"
               class="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Caminar</button>
     </div>


</template>

<script setup>

import { onMounted, ref } from "vue";
import { World } from "../utils/world.js";



const world = ref(null)




onMounted(() => {
     const container = document.querySelector("#scene-container");

     world.value = new World(container);

     // Start the loop (produce a stream of frames)
     world.value.start();




})

</script>