import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from 'dat.gui'

//Global variables
let currentRef = null;
const gui = new dat.GUI();

//Scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, 100 / 100, 0.1, 100);
scene.add(camera);
camera.position.set(5, 5, 5);
camera.lookAt(new THREE.Vector3());

const renderer = new THREE.WebGLRenderer();
renderer.setSize(100, 100);

//OrbitControls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

//Resize canvas
const resize = () => {
  renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
  camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", resize);

//Animate the scene
const animate = () => {
  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();

//cube
let geometry = new THREE.BoxBufferGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ wireframe: true });
let cube = new THREE.Mesh(
  geometry,
  material
);

const cubeAuxs = {
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1,
  subX: 1,
  subY: 1,
  subZ: 1
}

const cubeFolder = gui.addFolder("Cube Tweaks")
cubeFolder.add(cubeAuxs, 'scaleX')
  .min(1)
  .max(3)
  .name("Scale X")
  .onChange(() => {
    cube.scale.x=cubeAuxs.scaleX
  })
  cubeFolder.add(cubeAuxs, 'scaleY')
  .min(1)
  .max(3)
  .name("Scale Y")
  .onChange(() => {
    cube.scale.y=cubeAuxs.scaleY
  })
  cubeFolder.add(cubeAuxs, 'scaleZ')
  .min(1)
  .max(3)
  .name("Scale Z")
  .onChange(() => {
    cube.scale.z=cubeAuxs.scaleZ
  })
  
  //Subdivisiones
cubeFolder.add(cubeAuxs, 'subX')
  .min(1)
  .max(5)
  .name("Sub X")
  .step(1)
  .onChange(() => {
    scene.remove(cube);
    geometry = new THREE.BoxBufferGeometry(cubeAuxs.scaleX,cubeAuxs.scaleY,cubeAuxs.scaleZ,cubeAuxs.subX,cubeAuxs.subY,cubeAuxs.subZ)
     cube = new THREE.Mesh(
      geometry,
      material
    );
    scene.add(cube)
  })
  cubeFolder.add(cubeAuxs, 'subY')
  .min(1)
  .max(5)
  .name("Sub Y")
  .step(1)
  .onChange(() => {
    scene.remove(cube);
    geometry = new THREE.BoxBufferGeometry(cubeAuxs.scaleX,cubeAuxs.scaleY,cubeAuxs.scaleZ,cubeAuxs.subX,cubeAuxs.subY,cubeAuxs.subZ)
     cube = new THREE.Mesh(
      geometry,
      material
    );
    scene.add(cube)
  })
  cubeFolder.add(cubeAuxs, 'subZ')
  .min(1)
  .max(5)
  .name("Sub Z")
  .step(1)
  .onChange(() => {
    scene.remove(cube);
    geometry = new THREE.BoxBufferGeometry(cubeAuxs.scaleX,cubeAuxs.scaleY,cubeAuxs.scaleZ,cubeAuxs.subX,cubeAuxs.subY,cubeAuxs.subZ)
     cube = new THREE.Mesh(
      geometry,
      material
    );
    scene.add(cube)
  })

scene.add(cube);
const positions = gui.addFolder("Positions")
const subFolders = positions.addFolder("SubPosition")
positions.add(cube.position, 'x')
  .min(-10)
  .max(10)
  .step(0.5)
  .name("POS X")
  positions.add(cube.position, 'y')
  .min(-10)
  .max(10)
  .step(0.5)
  .name("POS Y")
  subFolders.add(cube.position, 'z')
  .min(-10)
  .max(10)
  .step(0.5)
  .name("POS Z")

const cubeAux = {
  scale: 1,
  color: 0xffffff
}
  const Scale = gui.addFolder("Scale")
  Scale.add(cubeAux, 'scale',{"small":1,"Medium":2,"Big":3})
  .name("SCALE Z")
    .onChange(() => {
      cube.scale.set(
        cubeAux.scale,
        cubeAux.scale,
        cubeAux.scale,
      )
  })

const Color = gui.addFolder("Color")
Color.addColor(cubeAux, 'color')
  .onChange(() => {
    cube.material.color.set(cubeAux.color)
  })

//Init and mount the scene
export const initScene = (mountRef) => {
  currentRef = mountRef.current;
  resize();
  currentRef.appendChild(renderer.domElement);
};

//Dismount and clena up the buffer from the scene
export const cleanUpScene = () => {
  scene.dispose();
  positions.destroy()
  currentRef.removeChild(renderer.domElement);
};
