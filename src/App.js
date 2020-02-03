import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar'
import { EffectComposer, RenderPass, GlitchPass } from "postprocessing";import * as THREE from "three";



var scene = new THREE.Scene();
var renderer;
var composer ;
function init(){
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  composer = new EffectComposer(renderer);


}

init();

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <NavBar />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
