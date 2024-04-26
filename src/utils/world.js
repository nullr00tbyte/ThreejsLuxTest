import { createCamera } from "./camera.js";
import { createLights } from "./lights.js";
import { createScene } from "./scene.js";
import { createRenderer } from "./renderer.js";
import { Loop } from "./loop.js";
import { Resizer } from "./resizer.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { AnimationMixer, CircleGeometry, MeshStandardMaterial, Mesh,Raycaster, Vector2} from 'three';

// These variables are module-scoped: we cannot access them
// from outside the module.
let camera;
let renderer;
let scene;
let loop;


class World {
  constructor(container) {
    // Instances of camera, scene, and renderer


    this.onPointerMove = ( event) => {
      const raycaster = new Raycaster();
      const pointer = new Vector2();
  
      // calculate pointer position in normalized device coordinates
      // (-1 to +1) for both components
    
      pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  
  
      raycaster.setFromCamera( pointer, camera );
      const intersects = raycaster.intersectObjects( scene.children );

      console.log(loop)
      console.log(intersects[0])

      const obj = intersects[0].object.name

      if (obj === "cube_6"){
        loop.play_animation("saludo_1", true)
      }
  
    }

    scene = createScene("pink");
    
    renderer = createRenderer();
    const camera = createCamera(renderer);
    const loader = new GLTFLoader();
    loader.load(
      "lux_wolf.gltf",
      (gltf) => {
        // Once loaded, add the model to the scene
        const model = gltf.scene;
        scene.add(model);
          

        model.castShadow = true;

        model.traverse(function(node){
          if(node.isMesh){
            node.castShadow = true;
          }
        })
        model.rotation.set(0, Math.PI / 1.1, 0); 
        loop.animations = gltf.animations;

        this.animationMixer = new AnimationMixer(model);

        loop.animationMixer = this.animationMixer

   
        const groundGeometry = new CircleGeometry(10,30)
        const groundMaterial = new MeshStandardMaterial({ color: "green", });
        const ground = new Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = 0;
        ground.castShadow = false
        ground.receiveShadow = true
        scene.add(ground);
        
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('Error loading GLTF model:', error);
      }
    );



    // Initialize Loop
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    // Light Instance, with optional light helper
    const { light } = createLights("white");
    loop.updatables.push(light);
    scene.add(light);




    const resizer = new Resizer(container, camera, renderer);
    resizer.onResize = () => {
      this.render();
    };
    

  }




  // Animation handlers
  start() {

    loop.start();
    window.addEventListener( 'click', this.onPointerMove );
  }
  stop() {
    loop.stop();
  }

  play(animation, finish) {

    loop.play_animation(animation, finish)

  }



}
export { World };