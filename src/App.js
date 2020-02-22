import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { withStyles } from '@material-ui/core';

import './App.css';
import NavBar from './components/NavBar/NavBar';



/** THREE JS IMPORTS
 */
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js/dist/tween.cjs"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass"

import { DotScreenShader } from "three/examples/jsm/shaders/DotScreenShader"
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader"


var scene = new THREE.Scene();
let renderer;
let composer;
let camera;
let raycaster;
var mouse = new THREE.Vector2(), INTERSECTED;
var shaderMat = new THREE.ShaderMaterial({

  uniforms: {},

  vertexShader: [
    "varying vec2 vUV;",
    "varying vec3 vNormal;",

    "void main() {",

    "vUV = uv;",
    "vNormal = vec3( normal );",
    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}"
  ].join("\n"),

  fragmentShader: [
    "varying vec2 vUV;",
    "varying vec3 vNormal;",

    "void main() {",

    "vec4 c = vec4( abs( vNormal ) + vec3( vUV, 0.0 ), 0.0 );",
    "gl_FragColor = c;",

    "}"
  ].join("\n")
});
let objects = [];
let light;
var params = {
  exposure: 1,
  bloomStrength: 1,
  bloomThreshold: 0,
  bloomRadius: 0
};
var shrinkTweens = new TWEEN.Group();
var unshrinkTweens = new TWEEN.Group();

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

  raycaster = new THREE.Raycaster();



  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 1, 1000);



  var geometry = new THREE.SphereBufferGeometry(1, 4, 4);
  //var material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });




  //Populate scene with meshes
  for (var i = 0; i < 100; i++) {
    var mat2 = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
    var mesh = new THREE.Mesh(geometry, mat2);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(Math.random() * 400);
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
    mesh.name = i;
    scene.add(mesh)
    objects.push(mesh);

  }
  //--Camera set up
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;
  scene.add(camera)

  //--Lightning set up
  scene.add(new THREE.AmbientLight(0x222222));
  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);


  //--Postprocessing : 
  composer = new EffectComposer(renderer);


  //Dot postprocessing just for testing :
  composer.addPass(new RenderPass(scene, camera))

  var effect = new ShaderPass(DotScreenShader);
  effect.uniforms['scale'].value = 4;

  //Unreal bloom effect : 

  var bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
  bloomPass.threshold = params.bloomThreshold;
  bloomPass.strength = params.bloomStrength;
  bloomPass.radius = params.bloomRadius;
  composer.addPass(bloomPass);



  //Film effect : 

  var effectFilmBW = new FilmPass(0.35, 0.5, 2048, true);
  var gammaCorrection = new ShaderPass(GammaCorrectionShader);
  composer.addPass(effectFilmBW);
  composer.addPass(gammaCorrection);


  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('mousemove', onMouseMove, false);
  document.addEventListener('mousedown', onMouseClick, false);
  animate();

  



}

function animate() {

  render();
  requestAnimationFrame(animate);


  for (let i = 0; i < objects.length; i++) {

    objects[i].rotation.x += 0.005;
    objects[i].rotation.y += 0.01;
  }


  raycaster.setFromCamera(mouse, camera);

  //Check for if hovered on object
  var intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {


    if (INTERSECTED !== intersects[0].object) {

      if (INTERSECTED) INTERSECTED.material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });

      INTERSECTED = intersects[0].object;
      //INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      //INTERSECTED.material.emissive.setHex( 0xff0000 );
      INTERSECTED.material = shaderMat;
    }

  } else {

    if (INTERSECTED) INTERSECTED.material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });


    INTERSECTED = null;
  }
  composer.render();


  shrinkTweens.update()
  unshrinkTweens.update()
  
}

function render() {



  renderer.render(scene, camera);
}

function shrink(object, target, duration, delay, easing) {
  //Check if object already has tween for shrinking
  if (Object.keys(shrinkTweens._tweens).length > 0) {

    for (let t = 0; t < Object.keys(shrinkTweens._tweens).length; t++) {

      if (shrinkTweens._tweens[t]._object.name === object.name)
        return;
    }

  }

  var t = new TWEEN.Tween(object);

  var l_delay = (delay !== undefined) ? delay : 0;
  var l_easing = (easing !== undefined) ? easing : TWEEN.Easing.Linear.None;


  t.to(target, duration)
  t.delay(l_delay)
  t.easing(l_easing)
  t.onUpdate(function () {
    //Inflate
    if (object.scale.distanceTo(target) > 0.2) {

      object.scale.x -= 0.2;
      object.scale.y -= 0.2;
      object.scale.z -= 0.2;
    } else {


      object.visible = false;
      t.stop();
      
  
    }


  })
  t.start()
  shrinkTweens.add(t);

  
  //console.log("Shrink : " + object.name)
}



function onMouseClick(event) {

  event.preventDefault();

  if (INTERSECTED) {

    shrink(INTERSECTED,
      { x: 0, y: 0, z: 0 },
      2000, TWEEN.Easing.Linear.None);


  }

}
function onMouseMove(event) {

  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}
function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}



const useStyles = theme => ({
  App: {


  },

});


// kick off the polyfill!
smoothscroll.polyfill();
class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      section: [
        {
          id: 0,
          title: 'Home',
          selected: false,
          selector: "c",
          key: 'section'

        },
        {
          id: 1,
          title: 'Portfolio',
          selected: false,
          selector: "portfolio",
          key: 'section'


        },
        {
          id: 2,
          title: 'About',
          selected: false,
          selector: "about",
          key: 'section'

        },
        {
          id: 3,
          title: 'Contact',
          selected: false,
          selector: "curve",
          key: 'section'

        },





      ]
    }






  }



  //Function passed to navbar to select an item from the mobile dropdown : 
  toggleSelected = (id, key) => {
    let temp = this.state[key]
    temp[id].selected = !temp[id].selected
    this.setState({
      [key]: temp
    })


    document.querySelector("#" + temp[id].selector).scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return <NavBar list={this.state.section} toggleItem={this.toggleSelected} ></NavBar>

  }

}
export default withStyles(useStyles)(App);
