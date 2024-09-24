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
	scene: Scene | null;
	threeJSGroup: THREE.Mesh;
	rigidBodyData: RigidBodyData;
	rapierRigidBody: RAPIER.RigidBody | null;

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
		this.rapierRigidBody = null;
		this.scene.addGameObject(this); // why do this??
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

export default GameObject;
