
import { WebGLRenderer } from "three";
 
function createRenderer() {
 const renderer = new WebGLRenderer({ antialias: true });
 renderer.setSize(window.innerWidth, window.innerHeight);
 renderer.setClearColor(0xffffff);
 renderer.physicallyCorrectLights = true;
 renderer.shadowMap.enabled = true;
 return renderer;
}
 
export { createRenderer };