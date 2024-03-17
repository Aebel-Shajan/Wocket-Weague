import * as THREE from 'three';
import RAPIER, { Rotation } from "@dimforge/rapier3d-compat";

import GameObject from '../GameObject';
import { RigidBodyData, Vec3, carInput } from '../types';
import { standardMaterial } from './ThreeJSHelpers';
import KeyboardHandler from './KeyboardHandler';
import Scene from '../Scene';


class Player extends GameObject {

    constructor(scene: Scene) {
        const cubeMesh2 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            standardMaterial(0xffffff)
        )
        const cubeCollider2: RigidBodyData = {
            colliderDesc: RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5)
                .setMass(1)
                .setFriction(0)
                .setFrictionCombineRule(RAPIER.CoefficientCombineRule.Min),
            rigidBodyDesc: RAPIER.RigidBodyDesc.dynamic()
        }
        super(scene, cubeMesh2, cubeCollider2);
    }

    getRelativeVector(inputVec: Vec3) {
        const vec: THREE.Vector3 = new THREE.Vector3().copy(inputVec);
        vec.applyQuaternion(this.rapierRigidBody?.rotation() as THREE.Quaternion);
        return vec
    }

    getSideward() {
        return this.getRelativeVector({ x: 1, y: 0, z: 0 });
    }

    getUpward() {
        return this.getRelativeVector({ x: 0, y: 1, z: 0 });
    }

    getForward() {
        return this.getRelativeVector({ x: 0, y: 0, z: 1 });
    }

    getPosition() {
        if (!this.rapierRigidBody) { throw new Error("Game object does not have rapierRigidBody") }
        return new THREE.Vector3().copy(this.rapierRigidBody.translation());
    }

    getVelocity() {
        if (!this.rapierRigidBody) { throw new Error("Game object does not have rapierRigidBody") }
        return new THREE.Vector3().copy(this.rapierRigidBody.linvel())
    }

    control(k: KeyboardHandler) {
        if (!this.rapierRigidBody) { throw new Error("Game object does not have rapierRigidBody") }
        const input: carInput = {
            yaw: Number(k.isKeyDown("a")) - Number(k.isKeyDown("d")),
            roll: Number(k.isKeyDown("q")) - Number(k.isKeyDown("e")),
            forward: Number(k.isKeyDown("w")) - Number(k.isKeyDown("s")),
            upward: Number(k.isKeyDown(" "))
        }


        // angular velocity control
        let torque: THREE.Vector3 =
            this.getUpward()
                .multiplyScalar(1.5 * input.yaw);

        console.log(this.isOnGround());
        if (!this.isOnGround()) {
            torque.add(
                this.getForward()
                    .multiplyScalar(1.5 * input.roll)
            );
        }

        this.rapierRigidBody.setAngvel(torque, true);


        // linear velocity control
        if (this.isOnGround()) {
            const controlForce: THREE.Vector3 = this.getForward()
                .multiplyScalar(15 * input.forward);
            this.rapierRigidBody.addForce(controlForce, true);
            const dragForce = this
                .getVelocity()
                .multiplyScalar(-0.9);
            this.rapierRigidBody.addForce(dragForce, true);// drag
            const perpendicularVel = this.getVelocity().dot(this.getSideward());
            const redirectAmount = k.isShiftDown() ? 0.6 : 4;
            const centripetalForce = this.getSideward()
                .clone()
                .multiplyScalar(-1 * redirectAmount * perpendicularVel);
            this.rapierRigidBody.addForce(centripetalForce, true);
            const upwardForce = new THREE.Vector3().set(0, 100 * input.upward, 0)
            this.rapierRigidBody.addForce(upwardForce, true);
        }
    }


    rayCastToGround(): RAPIER.RayColliderToi {
        if (!this.scene) { throw new Error("Game object is not in scene"); }
        if (!this.rapierRigidBody) { throw new Error("Game object does not have rapierRigidBody") }
        const rapierWorld: RAPIER.World = this.scene.rapierWorld;
        const currentPosition: THREE.Vector3 = this.getPosition();

        const capsuleHalfHeight: number = 0.5001;//this.controllerOptions.capsule.halfHeight - this.controllerOptions.capsule.radius

        // Point just below the capsulate collider
        const rayOrigin: RAPIER.Vector3 = currentPosition.add(this.getUpward().multiplyScalar(-1 * capsuleHalfHeight));

        const rayDirection: RAPIER.Vector3 = this.getUpward().multiplyScalar(-1); // downwards
        const ray = new RAPIER.Ray(rayOrigin, rayDirection);
        const toi: RAPIER.RayColliderToi | null = rapierWorld.castRay(ray, 1, true);
        if (!toi) { throw new Error("Could not calculate toi") };
        return toi;
    }

    isOnGround(threshold: number = 0.1): boolean {
        try {
            const groundHit: RAPIER.RayColliderToi = this.rayCastToGround();
            return groundHit ? groundHit.toi < threshold : false;
        } catch (error) {
            return false;
        }
    }

}

export default Player;