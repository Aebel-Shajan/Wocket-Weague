import RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";

import type GameObject from "./GameObject";

/**
 * Represents a scene in the game.
 * A scene contains game objects and handles rendering and physics simulation.
 * @see [three-game-engine](https://github.com/WesUnwin/three-game-engine/blob/main/src/Scene.ts#L12) : I copied a lot of code from here.
 */
class Scene {
	threeJSScene: THREE.Scene;
	rapierWorld: RAPIER.World;
	gameObjects: GameObject[];
	physicsRenderingLines: THREE.LineSegments;

	/**
	 * Creates a new instance of the Scene class.
	 */
	constructor() {
		this.threeJSScene = new THREE.Scene();
		this.threeJSScene.background = new THREE.Color("lightblue");
		this.setupLighting();
		this.setupSkyBox();
		this.rapierWorld = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
		this.gameObjects = [];

		// Physics rendering lines
		const material = new THREE.LineBasicMaterial({
			color: 0xffffff,
			vertexColors: true,
		});
		const geometry = new THREE.BufferGeometry();
		this.physicsRenderingLines = new THREE.LineSegments(geometry, material);
		this.physicsRenderingLines.name = "PhysicsRenderingLines";
	}

	/**
	 * Sets up the lighting in the scene.
	 * Adds directional lights and ambient light.
	 */
	setupLighting() {
		// Create directional light
		const light1 = new THREE.DirectionalLight(0xffffff, 4);
		light1.position.set(100, 100, 100);
		const light2 = new THREE.DirectionalLight(0xffffff, 4);
		light2.position.set(-100, 100, -100);

		this.threeJSScene.add(light1);
		this.threeJSScene.add(light2);
		// Add ambient light
		this.threeJSScene.add(new THREE.AmbientLight(0xffffff, 0));
	}

	/**
	 * Sets up the skybox in the scene.
	 * Loads the skybox textures and sets them as the background.
	 */
	setupSkyBox() {
		const loader = new THREE.CubeTextureLoader();
		loader.setPath("assets/textures/skybox/");
		const texturefloor = loader.load([
			"px.jpg",
			"nx.jpg",
			"py.jpg",
			"ny.jpg",
			"pz.jpg",
			"nz.jpg",
		]);
		this.threeJSScene.background = texturefloor;
	}

	/**
	 * Advances the physics simulation in the scene.
	 * Updates the positions and forces of game objects.
	 */
	advancePhysics() {
		this.rapierWorld.step();
		this.gameObjects.forEach((gameObject) => {
			gameObject.syncWithRigidBody();
			gameObject.rapierRigidBody.resetForces(false);
			gameObject.rapierRigidBody.resetTorques(false);
		});
	}

	/**
	 * Adds the physics rendering lines to the scene if they are not already present.
	 */
	showPhysics() {
		const physicsRenderingLines = this.threeJSScene.getObjectByName(
			"PhysicsRenderingLines",
		);
		if (!physicsRenderingLines) {
			this.threeJSScene.add(this.physicsRenderingLines);
		}
	}

	/**
	 * Removes the physics rendering lines from the scene if they are present.
	 */
	hidePhysics() {
		const physicsRenderingLines = this.threeJSScene.getObjectByName(
			"PhysicsRenderingLines",
		);
		if (physicsRenderingLines) {
			this.threeJSScene.remove(this.physicsRenderingLines);
		}
	}

	/**
	 * Updates the position and color attributes of the rendering lines based on the physics simulation.
	 */
	updatePhysicsGraphics() {
		const physicsRenderingLines = this.threeJSScene.getObjectByName(
			"PhysicsRenderingLines",
		);
		if (physicsRenderingLines) {
			const buffers = this.rapierWorld.debugRender();
			this.physicsRenderingLines.geometry.setAttribute(
				"position",
				new THREE.BufferAttribute(buffers.vertices, 3),
			);
			this.physicsRenderingLines.geometry.setAttribute(
				"color",
				new THREE.BufferAttribute(buffers.colors, 4),
			);
		}
	}
}

export default Scene;
