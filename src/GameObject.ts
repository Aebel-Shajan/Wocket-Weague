import type RAPIER from "@dimforge/rapier3d-compat";
import type * as THREE from "three";

import type Scene from "./Scene";
import type { RigidBodyData } from "./types";

/**
 * Represents a game object in the scene.
 *
 * @see [three-game-engine](https://github.com/WesUnwin/three-game-engine/blob/main/src/GameObject.ts)
 * copied hella code from there.
 */
class GameObject {
	scene: Scene;
	threeJSGroup: THREE.Mesh;
	rigidBodyData: RigidBodyData;
	// Used definite assignment operator here because logic is hidden away in
	// addGameObjectToScene.
	rapierRigidBody!: RAPIER.RigidBody;

	/**
	 * Creates a new GameObject instance.
	 * @param scene - The scene the game object belongs to.
	 * @param threeJSGroup - The Three.js mesh of the game object.
	 * @param rigidBodyData - The data for the rigid body associated with the game object.
	 */
	constructor(
		scene: Scene,
		threeJSGroup: THREE.Mesh,
		rigidBodyData: RigidBodyData,
	) {
		this.scene = scene;
		this.threeJSGroup = threeJSGroup;
		this.rigidBodyData = rigidBodyData;
		addGameObjectToScene(this, scene);
	}

	/**
	 * Synchronizes the objects three js mesh position and rotation with the rapier
	 * collision body.
	 */
	syncWithRigidBody() {
		if (this.rapierRigidBody) {
			this.threeJSGroup.position.copy(this.rapierRigidBody.translation());
			this.threeJSGroup.quaternion.copy(this.rapierRigidBody.rotation());
		}
	}

	/**
	 * Returns the scene the game object belongs to.
	 * @returns The scene.
	 */
	getScene() {
		return this.scene;
	}
}

/**
 * Adds a given game object to a given scene.
 * Setup the gameObject.rapierRigidBody property.
 * @param gameObject - The game object to add.
 * @param scene - The scene to add the object to
 */
function addGameObjectToScene(gameObject: GameObject, scene: Scene): void {
	if (scene.gameObjects.some((g) => g === gameObject)) {
		throw new Error("GameObject already exists in the scene.");
	}
	scene.gameObjects.push(gameObject);
	scene.threeJSScene.add(gameObject.threeJSGroup);
	const rapierRigidBody = scene.rapierWorld.createRigidBody(
		gameObject.rigidBodyData.rigidBodyDesc,
	);
	scene.rapierWorld.createCollider(
		gameObject.rigidBodyData.colliderDesc,
		rapierRigidBody,
	);
	gameObject.rapierRigidBody = rapierRigidBody;
}

export default GameObject;
