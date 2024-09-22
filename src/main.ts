import * as THREE from 'three';
import RAPIER from "@dimforge/rapier3d-compat";
import "./style.css";

import Scene from './Scene';
import Renderer from './Renderer';
import { RigidBodyData } from './types';
import GameObject from './GameObject';
import { standardMaterial, loadModel } from './util/ThreeJSHelpers';
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
    const arenaPath = "./assets/models/lowpoly_football_field_and_a_supermarket.glb";
    const mesh = await loadModel(
        arenaPath, 
        new THREE.Vector3(-8,-1.9,-23));
    const cubeMesh = new THREE.Object3D();
    cubeMesh.add(mesh);
    const cubeCollider: RigidBodyData = {
        colliderDesc: RAPIER.ColliderDesc.cuboid(100,0.1, 100),
        rigidBodyDesc: RAPIER.RigidBodyDesc.fixed()
    }
    new GameObject(scene, cubeMesh as THREE.Mesh, cubeCollider);

    // Sphere
    const sphereMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1),
        standardMaterial(0xff0000)
    )
    const sphereCollider: RigidBodyData = {
        colliderDesc: RAPIER.ColliderDesc.ball(1)
            .setMass(0.1),
        rigidBodyDesc: RAPIER.RigidBodyDesc.dynamic()
            .setLinearDamping(1)
            .setAngularDamping(0.3)
    }
    const sphereObject = new GameObject(scene, sphereMesh, sphereCollider);
    sphereObject.rapierRigidBody?.setTranslation({ x: 0, y: 2, z: 1 }, false);

    // Player
    const playerMesh = await loadModel("./assets/models/raceFuture.glb");
    const player: Player = new Player(scene, playerMesh as THREE.Mesh);
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