
import { Clock, AnimationClip, LoopOnce} from 'three';
import gsap from 'gsap'

const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
    this.animations = null;
    this.animationMixer = null;
    this.animationActions = {}; // Objeto para almacenar las acciones de animación
  }

  start() {
    gsap.to(this.camera.position, { z: 30, y: 10, duration: 2, onComplete: ()=>{
      gsap.to(this.camera.position, { z: 20, y: 10, duration: 1 });
    
   


    } },);
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  play_animation(name,finish) {
    const clip = AnimationClip.findByName(this.animations, name);
    // name: idle



    if (clip) {
      const action = this.animationMixer.clipAction(clip);

      console.log(action)

      if (finish){

      
        action.setLoop(LoopOnce, 1);
  
      }else{

        action.clampWhenFinished = false;


      }
      if ( !action.isRunning() ){
    
        action.play();
        this.animationActions[name] = action; 
        action.reset();
      }else{
        action.stop();
        this.animationActions[name] = action; 
        action.reset();
      }


    } else {
      console.error(`Animation clip "${name}" not found.`);
    }
  }


  tick() {
    const delta = clock.getDelta();
    for (const object of this.updatables) {
      object.tick(delta);
    }

    if (this.animationMixer) {
      this.animationMixer.update(delta);
    }
  }
}


export { Loop }