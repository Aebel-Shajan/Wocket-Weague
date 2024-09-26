import RAPIER from "@dimforge/rapier3d-compat";
import * as THREE from "three";

import GameObject from "../GameObject";
import type Scene from "../Scene";
import type { RigidBodyData, carInput } from "../types";
import type KeyboardHandler from "./KeyboardHandler";
import { getObjectSize } from "./ThreeJSHelpers";

/**
 * Represents a player in the game.
 */
class Player extends GameObject {
	/**
	 * Creates a new instance of the Player class.
	 *
	 * The mesh's origin is first corrected. Then its rotated to point forward.
	 * Then a cube collider is created based on the size information of the mesh.
	 *
	 * @param scene The scene the player belongs to.
	 * @param mesh The mesh representing the player.
	 */
	constructor(scene: Scene, mesh: THREE.Mesh) {
		// Correct the mesh such that its origin is at the centre of the object.
		const correctedMesh = new THREE.Object3D();
		correctedMesh.add(mesh);
		mesh.scale.set(0.5, 0.5, 0.5);
		// Point the mesh in the right direction
		mesh.rotateY(Math.PI);
		const size = getObjectSize(mesh);
		mesh.position.setY(-0.5 * size.y);

		// Create the collision body for the player using size information from the mesh.
		const colliderData: RigidBodyData = {
			colliderDesc: RAPIER.ColliderDesc.cuboid(
				0.5 * size.x,
				0.5 * size.y,
				0.5 * size.z,
			)
				.setMass(1)
				.setFriction(0)
				.setFrictionCombineRule(RAPIER.CoefficientCombineRule.Max),
			rigidBodyDesc: RAPIER.RigidBodyDesc.dynamic(),
		};

		// Create the corresponding GameObject for the player
		super(scene, correctedMesh as THREE.Mesh, colliderData);
	}

	/**
	 * Controls the player's movement based on keyboard input.
	 *
	 * The player should be able to move
	 *  * forward and backwards using w and s.
	 *  * turn right and left using a and d.
	 *  * roll clockwise and anticlockwise using q and e.
	 *  * jump with space bar
	 *  * drift with shift
	 *
	 * @param k The keyboard handler.
	 * @throws Error if the game object does not have a rapierRigidBody.
	 */
	control(k: KeyboardHandler) {
		const input: carInput = {
			yaw: Number(k.isKeyDown("a")) - Number(k.isKeyDown("d")),
			roll: Number(k.isKeyDown("q")) - Number(k.isKeyDown("e")),
			forward: Number(k.isKeyDown("w")) - Number(k.isKeyDown("s")),
			isJumping: k.isKeyDown(" "),
			isDrifiting: k.isShiftDown(),
		};

		this.controlYawRoll(input.yaw, input.roll);

		if (this.isOnGround()) {
			this.controlForwardVel(input.forward);
			this.controlDrift(input.isDrifiting);
			this.controlJump(input.isJumping);
		}
	}

	/**
	 * Control the yaw and roll of the car based on player input.
	 *
	 * @param yawAmount Amount to rotate left or right.
	 * @param rollAmount Amount to roll the car along forward axis.
	 */
	controlYawRoll(yawAmount: number, rollAmount: number) {
		const torque: THREE.Vector3 = this.getUpward().multiplyScalar(
			1.5 * yawAmount,
		);
		if (!this.isOnGround()) {
			torque.add(this.getForward().multiplyScalar(1.5 * rollAmount));
		}
		this.rapierRigidBody.setAngvel(torque, true);
	}

	/**
	 * Control how fast the car goes forward or backward. Apply some drag aswell.
	 *
	 * @param forwardAmount Amount to move forward or backwards
	 */
	controlForwardVel(forwardAmount: number) {
		const controlForce: THREE.Vector3 = this.getForward().multiplyScalar(
			15 * forwardAmount,
		);
		this.rapierRigidBody.addForce(controlForce, true);
		const dragForce = this.getVelocity().multiplyScalar(-0.9);
		this.rapierRigidBody.addForce(dragForce, true); // drag
	}

	/**
	 * Apply drifting physics to car based on input.
	 *
	 * @param isDrifting Boolean which indicates if the car wants to drift
	 */
	controlDrift(isDrifting: boolean) {
		const perpendicularVel = this.getVelocity().dot(this.getSideward());
		const redirectAmount = isDrifting ? 0.6 : 4;
		const centripetalForce = this.getSideward()
			.clone()
			.multiplyScalar(-1 * redirectAmount * perpendicularVel);
		this.rapierRigidBody.addForce(centripetalForce, true);
	}

	/**
	 *
	 * @param isJumping Boolean which indicates if car wants to jump
	 */
	controlJump(isJumping: boolean) {
		const upwardForce = new THREE.Vector3().set(0, 100 * Number(isJumping), 0);
		this.rapierRigidBody.addForce(upwardForce, true);
	}

	/**
	 * Performs a raycast to the ground and returns the .
	 * @returns The raycast hit information.
	 * @throws Error if the game object is not in a scene or does not have a rapierRigidBody.
	 */
	rayCastToGround(): RAPIER.RayColliderHit {
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
