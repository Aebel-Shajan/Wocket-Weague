import RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";

import GameObject from "../GameObject";
import type Scene from "../Scene";
import type { RigidBodyData, Vec3, carInput } from "../types";
import type KeyboardHandler from "./KeyboardHandler";
import { getObjectSize } from "./ThreeJSHelpers";

/**
 * Represents a player in the game.
 */
class Player extends GameObject {
	/**
	 * Creates a new instance of the Player class.
	 * @param scene The scene the player belongs to.
	 * @param mesh The mesh representing the player.
	 */
	constructor(scene: Scene, mesh: THREE.Mesh) {
		const correctedMesh = new THREE.Object3D();
		correctedMesh.add(mesh);
		mesh.scale.set(0.5, 0.5, 0.5);
		mesh.rotateY(Math.PI);
		const size = getObjectSize(mesh);
		mesh.position.setY(-0.5 * size.y);
		const cubeCollider2: RigidBodyData = {
			colliderDesc: RAPIER.ColliderDesc.cuboid(
				0.5 * size.x,
				0.5 * size.y,
				0.5 * size.z,
			)
				.setMass(1)
				.setFriction(0)
				.setFrictionCombineRule(RAPIER.CoefficientCombineRule.Min),
			rigidBodyDesc: RAPIER.RigidBodyDesc.dynamic(),
		};
		super(scene, correctedMesh as THREE.Mesh, cubeCollider2);
	}

	/**
	 * Gets the relative vector based on the player's rotation.
	 * @param inputVec The input vector.
	 * @returns The relative vector.
	 */
	getRelativeVector(inputVec: Vec3) {
		const vec: THREE.Vector3 = new THREE.Vector3().copy(inputVec);
		vec.applyQuaternion(this.rapierRigidBody?.rotation() as THREE.Quaternion);
		return vec;
	}

	/**
	 * Gets the sideward vector based on the player's rotation.
	 * @returns The sideward vector.
	 */
	getSideward() {
		return this.getRelativeVector({ x: 1, y: 0, z: 0 });
	}

	/**
	 * Gets the upward vector based on the player's rotation.
	 * @returns The upward vector.
	 */
	getUpward() {
		return this.getRelativeVector({ x: 0, y: 1, z: 0 });
	}

	/**
	 * Gets the forward vector based on the player's rotation.
	 * @returns The forward vector.
	 */
	getForward() {
		return this.getRelativeVector({ x: 0, y: 0, z: 1 });
	}

	/**
	 * Gets the position of the player.
	 * @returns The position vector.
	 * @throws Error if the game object does not have a rapierRigidBody.
	 */
	getPosition() {
		if (!this.rapierRigidBody) {
			throw new Error("Game object does not have rapierRigidBody");
		}
		return new THREE.Vector3().copy(this.rapierRigidBody.translation());
	}

	/**
	 * Gets the velocity of the player.
	 * @returns The velocity vector.
	 * @throws Error if the game object does not have a rapierRigidBody.
	 */
	getVelocity() {
		if (!this.rapierRigidBody) {
			throw new Error("Game object does not have rapierRigidBody");
		}
		return new THREE.Vector3().copy(this.rapierRigidBody.linvel());
	}

	/**
	 * Controls the player's movement based on keyboard input.
	 * @param k The keyboard handler.
	 * @throws Error if the game object does not have a rapierRigidBody.
	 */
	control(k: KeyboardHandler) {
		if (!this.rapierRigidBody) {
			throw new Error("Game object does not have rapierRigidBody");
		}
		const input: carInput = {
			yaw: Number(k.isKeyDown("a")) - Number(k.isKeyDown("d")),
			roll: Number(k.isKeyDown("q")) - Number(k.isKeyDown("e")),
			forward: Number(k.isKeyDown("w")) - Number(k.isKeyDown("s")),
			upward: Number(k.isKeyDown(" ")),
		};

		// angular velocity control
		const torque: THREE.Vector3 = this.getUpward().multiplyScalar(
			1.5 * input.yaw,
		);

		console.log(this.isOnGround());
		if (!this.isOnGround()) {
			torque.add(this.getForward().multiplyScalar(1.5 * input.roll));
		}

		this.rapierRigidBody.setAngvel(torque, true);

		// linear velocity control
		if (this.isOnGround()) {
			const controlForce: THREE.Vector3 = this.getForward().multiplyScalar(
				15 * input.forward,
			);
			this.rapierRigidBody.addForce(controlForce, true);
			const dragForce = this.getVelocity().multiplyScalar(-0.9);
			this.rapierRigidBody.addForce(dragForce, true); // drag
			const perpendicularVel = this.getVelocity().dot(this.getSideward());
			const redirectAmount = k.isShiftDown() ? 0.6 : 4;
			const centripetalForce = this.getSideward()
				.clone()
				.multiplyScalar(-1 * redirectAmount * perpendicularVel);
			this.rapierRigidBody.addForce(centripetalForce, true);
			const upwardForce = new THREE.Vector3().set(0, 100 * input.upward, 0);
			this.rapierRigidBody.addForce(upwardForce, true);
		}
	}

	/**
	 * Performs a raycast to the ground and returns the .
	 * @returns The raycast hit information.
	 * @throws Error if the game object is not in a scene or does not have a rapierRigidBody.
	 */
	rayCastToGround(): RAPIER.RayColliderHit {
		if (!this.scene) {
			throw new Error("Game object is not in scene");
		}
		if (!this.rapierRigidBody) {
			throw new Error("Game object does not have rapierRigidBody");
		}
		const rapierWorld: RAPIER.World = this.scene.rapierWorld;
		const currentPosition: THREE.Vector3 = this.getPosition();

		const capsuleHalfHeight: number =
			0.5 * getObjectSize(this.threeJSGroup).y + 0.000001; //this.controllerOptions.capsule.halfHeight - this.controllerOptions.capsule.radius

		// Point just below the capsulate collider
		const rayOrigin: RAPIER.Vector3 = currentPosition.add(
			this.getUpward().multiplyScalar(-1 * capsuleHalfHeight),
		);

		const rayDirection: RAPIER.Vector3 = this.getUpward().multiplyScalar(-1); // downwards
		const ray = new RAPIER.Ray(rayOrigin, rayDirection);
		const toi: RAPIER.RayColliderHit | null = rapierWorld.castRay(ray, 1, true);
		if (!toi) {
			throw new Error("Could not calculate toi");
		}
		return toi;
	}

	/**
	 * Checks if the player is on the ground.
	 * @param threshold The threshold for the time of impact.
	 * @returns True if the player is on the ground, false otherwise.
	 */
	isOnGround(threshold = 0.1): boolean {
		try {
			const groundHit: RAPIER.RayColliderHit = this.rayCastToGround();
			return groundHit ? groundHit.timeOfImpact < threshold : false;
		} catch (error) {
			return false;
		}
	}
}

export default Player;
