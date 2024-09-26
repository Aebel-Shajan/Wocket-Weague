import type RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";

import type Scene from "./Scene";
import type { RigidBodyData, Vec3 } from "./types";

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
	 * Gets the relative vector based on the game object's rotation.
	 * @param inputVec The input vector.
	 * @returns The relative vector.
	 */
	getRelativeVector(inputVec: Vec3) {
		const vec: THREE.Vector3 = new THREE.Vector3().copy(inputVec);
		vec.applyQuaternion(this.rapierRigidBody.rotation() as THREE.Quaternion);
		return vec;
	}

	/**
	 * Gets the sideward vector based on the game object's rotation.
	 * @returns The sideward vector.
	 */
	getSideward() {
		return this.getRelativeVector({ x: 1, y: 0, z: 0 });
	}

	/**
	 * Gets the upward vector based on the game object's rotation.
	 * @returns The upward vector.
	 */
	getUpward() {
		return this.getRelativeVector({ x: 0, y: 1, z: 0 });
	}

	/**
	 * Gets the forward vector based on the game object's rotation.
	 * @returns The forward vector.
	 */
	getForward() {
		return this.getRelativeVector({ x: 0, y: 0, z: 1 });
	}

	/**
	 * Gets the position of the game object from its rigid body..
	 * @returns The position vector.
	 */
	getPosition() {
		return new THREE.Vector3().copy(this.rapierRigidBody.translation());
	}

	/**
	 * Gets the velocity of the game object from its rigid body.
	 * @returns The velocity vector.
	 */
	getVelocity() {
		return new THREE.Vector3().copy(this.rapierRigidBody.linvel());
	}

	/**
	 * Synchronizes the objects three js mesh position and rotation with the rapier
	 * collision body.
	 */
	syncWithRigidBody() {
		this.threeJSGroup.position.copy(this.rapierRigidBody.translation());
		this.threeJSGroup.quaternion.copy(this.rapierRigidBody.rotation());
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
 *
 * @throws Error if GameObject already exists within the scene.
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
