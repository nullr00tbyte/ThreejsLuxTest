import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function createCamera(renderer) {
 const camera = new PerspectiveCamera(
   100, // FOV = Field Of View
   1920/1080, // Aspect ratio (dummy value)
   1.0, // Near clipping plane
   1000, // Far clipping plane
 );
 
 // Move the camera back so we can view the scene
 //      x y  z
 camera.position.set(0, 9, 20);
camera.rotation.set(0,0,0)
const controls = new OrbitControls( camera, renderer.domElement );
 camera.tick = (delta) => {
  
 };
 
 return {camera, controls};
}
 
export { createCamera };