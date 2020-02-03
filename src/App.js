import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar'
import * as THREE from "three";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"

import { DotScreenShader } from "three/examples/jsm/shaders/DotScreenShader"

var scene = new THREE.Scene();
let renderer;
let composer;
let camera;
let object
let light
var params = {
  exposure: 1,
  bloomStrength: 1.5,
  bloomThreshold: 0,
  bloomRadius: 0
};
init();
function init() {

  //--Renderer init : 

  // renderer = new THREE.WebGLRenderer();
  // renderer.setPixelRatio( window.devicePixelRatio );
  // renderer.setSize( window.innerWidth, window.innerHeight );
  // document.body.appendChild( renderer.domElement );

  const canvas = document.querySelector('#c');
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  renderer = new THREE.WebGLRenderer({ canvas });


  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 1, 1000);
  scene.add(camera)

  object = new THREE.Object3D();
  scene.add(object);


  var geometry = new THREE.SphereBufferGeometry(1, 4, 4);
  var material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });

  for (var i = 0; i < 100; i++) {

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(Math.random() * 400);
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
    object.add(mesh);

  }
  //--Lightning set up
  scene.add(new THREE.AmbientLight(0x222222));
  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);
  console.log("grgnr")



  //--Postprocessing : 
  composer = new EffectComposer(renderer);


  //Dot postprocessing just for testing :
  composer.addPass(new RenderPass(scene, camera))

  var effect = new ShaderPass(DotScreenShader);
  effect.uniforms['scale'].value = 4;
  composer.addPass(effect);

  //Unreal bloom effect : 

  var bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
  bloomPass.threshold = params.bloomThreshold;
  bloomPass.strength = params.bloomStrength;
  bloomPass.radius = params.bloomRadius;
  composer.addPass( bloomPass );

  window.addEventListener('resize', onWindowResize, false);
  animate()

}

function animate() {

  render();
  requestAnimationFrame(animate);

  object.rotation.x += 0.005;
  object.rotation.y += 0.01;
  composer.render();


}

function render() {



  renderer.render(scene, camera);



}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}


function App() {
  return (
    <div className="App">

      <header className="App-header">

      </header>
    </div>
  );
}

export default App;
