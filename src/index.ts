import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import RAPIER from "@dimforge/rapier3d-compat";

import Scene from './Scene';
import Renderer from './Renderer';
import { RigidBodyData } from './types';
import GameObject from './GameObject';
import { standardMaterial } from './util/ThreeJSHelpers';
import Player from './util/Player';
import KeyboardHandler from './util/KeyboardHandler';


// js be like: YoU cAnT UsE ToP lEVel AWait UnLEsS YoU hAvE ES2050 🤓 
game();
async function game() {
    await RAPIER.init();

    // Setup
    let scene = new Scene();
    scene.showPhysics();
    let renderer = new Renderer();

    // Floor
    const cubeMesh = new THREE.Mesh(
        new THREE.BoxGeometry(100, 0.1, 100),
        standardMaterial(0xffffff)
    )
    const p = cubeMesh.geometry.parameters;
    const cubeCollider: RigidBodyData = {
        colliderDesc: RAPIER.ColliderDesc.cuboid(0.5 * p.width, 0.5 * p.height, 0.5 * p.depth),
        rigidBodyDesc: RAPIER.RigidBodyDesc.fixed()
    }
    const cubeObject = new GameObject(scene, cubeMesh, cubeCollider);

    // Sphere
    const sphereMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1),
        standardMaterial(0xff0000)
    )
    const sphereCollider: RigidBodyData = {
        colliderDesc: RAPIER.ColliderDesc.ball(1)
            .setMass(0.1),
        rigidBodyDesc: RAPIER.RigidBodyDesc.dynamic()
    }
    const sphereObject = new GameObject(scene, sphereMesh, sphereCollider);
    sphereObject.rapierRigidBody?.setTranslation({ x: 0, y: 2, z: 1 }, false);

    // Player
    const player: Player = new Player(scene);
    player.rapierRigidBody?.setTranslation({x: 0, y: 3, z: 10}, false);

    // Input
    const input = new KeyboardHandler();

    // Game Loop
    function gameLoop(): void {
        requestAnimationFrame(gameLoop);
        scene.advancePhysics();
        scene.updatePhysicsGraphics();
        player.control(input);
        renderer.followPlayer(player);
        renderer.render(scene);
    }
    gameLoop();
}