import RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";
import "./style.css";

import GameObject from "./GameObject";
import Renderer from "./Renderer";
import Scene from "./Scene";
import type { RigidBodyData } from "./types";
import KeyboardHandler from "./util/KeyboardHandler";
import Player from "./util/Player";
import { loadModel, standardMaterial } from "./util/ThreeJSHelpers";

/**
 * Entry point to set up the game.
 *
 * @remarks
 * I have wrapped everything in an async function because you have to wait till RAPIER
 * initialises before doing anything else.
 *
 */
game();
async function game() {
	await RAPIER.init();

	// Setup
	const scene = new Scene();
	scene.showPhysics();
	const renderer = new Renderer();

	// Floor
	const arenaPath =
		"./assets/models/lowpoly_football_field_and_a_supermarket.glb";
	const mesh = await loadModel(arenaPath, new THREE.Vector3(-8, -1.9, -23));
	const cubeMesh = new THREE.Object3D();
	cubeMesh.add(mesh);
	const cubeCollider: RigidBodyData = {
		colliderDesc: RAPIER.ColliderDesc.cuboid(100, 0.1, 100),
		rigidBodyDesc: RAPIER.RigidBodyDesc.fixed(),
	};
	new GameObject(scene, cubeMesh as THREE.Mesh, cubeCollider);

	// Sphere
	const sphereMesh = new THREE.Mesh(
		new THREE.SphereGeometry(1),
		standardMaterial(0xff0000),
	);
	const sphereCollider: RigidBodyData = {
		colliderDesc: RAPIER.ColliderDesc.ball(1).setMass(0.1),
		rigidBodyDesc: RAPIER.RigidBodyDesc.dynamic()
			.setLinearDamping(1)
			.setAngularDamping(0.3),
	};
	const sphereObject = new GameObject(scene, sphereMesh, sphereCollider);
	sphereObject.rapierRigidBody.setTranslation({ x: 0, y: 2, z: 1 }, false);

	// Player
	const playerMesh = await loadModel("./assets/models/raceFuture.glb");
	const player: Player = new Player(scene, playerMesh as THREE.Mesh);
	player.rapierRigidBody.setTranslation({ x: 0, y: 3, z: 10 }, false);

	// Input
	const input = new KeyboardHandler();

	/**
	 * The main game render loop which runs once per frame.
	 */
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
