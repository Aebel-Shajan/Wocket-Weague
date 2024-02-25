// Three imports
import * as THREE from 'three';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
// Cannon imports
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';
// My imports
import { c } from './controls.js';
import { PlayerObject } from './PlayerObject.js';
import { PlayerCamera } from './PlayerCamera.js';
import { Environment } from './Environment.js';


// Setup
const scene = new THREE.Scene();
const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.81, 0)
});
const cannonDebugger = new CannonDebugger(scene, world, {})
let clock = new THREE.Clock();
const stats = Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);


// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true; // Enable shadows
document.getElementById('game-container').appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.gammaOutput = true;


// Camera
const playerCam = new PlayerCamera(renderer);

// Environment
const environment = new Environment(scene, world);

// Player
const loader = new GLTFLoader();
const playerModel = await loader.loadAsync('assets/models/raceFuture.glb');
const playerMesh = playerModel.scene;
const correctedMesh = new THREE.Object3D();
correctedMesh.add(playerMesh);
playerMesh.rotateY(Math.PI);
const playerPhysics = {
    mass: 1,
    material: new CANNON.Material({
        friction: 0
    })
}
const player = new PlayerObject(correctedMesh, playerPhysics);
player.setPosition(new Vector3(0,10,0))
player.addObjectTo(scene, world);


// Animation loop
function animate() {
    // Always at start of loop
	cannonDebugger.update();
    stats.begin();
    let dt = Math.min(clock.getDelta(), 1 / 10);
    requestAnimationFrame(animate);


    player.updateMesh();
    player.controlPlayer(c, environment.floor);

    playerCam.updatePlayerCamera(player);
    environment.floorMaterial.uniforms.time.value += 0.01;


    // Always at end of loop
    world.step(dt);
    renderer.render(scene, playerCam.camera);
    stats.end();
}
animate()

