import {
    DirectionalLight,

  } from "three";


  function createLights(color) {
    const light = new DirectionalLight(color, 4);
    light.castShadow = true; // Habilitar sombras para la luz

    
    // Otras configuraciones de sombras, como el ángulo de sombra y la resolución del mapa de sombras, pueden ser ajustadas según necesites.


    light.position.set(30, 30, 50);
    light.tick = (delta) => {
    
    };
    return { light };
}

   export { createLights };