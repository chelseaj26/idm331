// Module imports
//

import * as THREE from '../node_modules/three/build/three.module.js';

import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';


import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';

const myWorldObj = document.getElementById('myWorld');

// SCENE required 1 of 3
const scene = new THREE.Scene();
// customize some scene props
scene.background = new THREE.Color(0x80CEFA);
  
  //289fe3

// Add Light to scene .. REQUIRED for 3d models
const ambLight = new THREE.AmbientLight(0x101010, 25);
scene.add(ambLight);

// ADD SPOTLIGHT
const spotLight = new THREE.SpotLight( 0xffffff);
spotLight.position.set( 100, 1000, 200);
// spotLight.target.position.set(10,100,100);

// spotLight.castShadow = true;

// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;

// spotLight.shadow.camera.near = 500;
// spotLight.shadow.camera.far = 4000;
// spotLight.shadow.camera.fov = 30;

scene.add( spotLight );


const camera = new THREE.PerspectiveCamera(45, myWorldObj.scrollWidth / myWorldObj.scrollHeight, 1, 1000);

camera.position.z = 5;

// RENDER required 3 of 3
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(myWorldObj.scrollWidth, myWorldObj.scrollHeight);
myWorldObj.appendChild(renderer.domElement);

let modelObj;

// Load a glTF resource
const loaderObj = new GLTFLoader().setPath('./media/cake/');
loaderObj.load(
  'cake.gltf',
  function ( gltf ) {
    modelObj = gltf.scene;
    scene.add(modelObj);
    modelObj.position.y = 3;
  },
  // While loading is processing
  function ( xhr ) {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  },
  // called if loading error
  function ( error ) {
    console.log ('An error happened ' + error);
  }
);

function controlsRender() {
  renderer.render(scene, camera);
}

let controlsObj = new OrbitControls(camera, myWorldObj);
controlsObj.addEventListener('change', controlsRender);


// Auto LOOP
// Create JS function that auto LOOPS
const animate = function () {
  requestAnimationFrame(animate);

  if (modelObj) {
    modelObj.rotation.y += 0.015;
    
  }
  renderer.render(scene, camera);
};
animate();
