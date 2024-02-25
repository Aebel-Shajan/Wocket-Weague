import * as THREE from "three";
import * as CANNON from "cannon-es";
import { GameObject } from "./GameObject.js";

export class PlayerObject extends GameObject {

    #forward = new THREE.Vector3();
    #sideward = new THREE.Vector3();
    #upward = new THREE.Vector3();

    constructor(mesh, bodyParams) {
        super(mesh, bodyParams);
        this.debug = new THREE.ArrowHelper(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(10, 10, 10),
            3,
            0xffff00
        );
    }

    getRelativeVector(x, y, z) {
        const vec = new THREE.Vector3(x, y, z);
        vec.applyQuaternion(this.body.quaternion);
        return vec
    }

    getForward() {
        return this.#forward.set(0, 0, 1).applyQuaternion(this.body.quaternion);
    }

    getSideward() {
        return this.#sideward.set(1, 0, 0).applyQuaternion(this.body.quaternion);
    }

    getUpward() {
        return this.#upward.set(0, 1, 0).applyQuaternion(this.body.quaternion);
    }

    controlPlayer(c) {
        // angular velocity control
        const torque =
            this.getUpward()
                .clone()
                .multiplyScalar(1.5 * (c.KeyA - c.KeyD));
        this.body.angularDamping = c.ShiftLeft ? 0.6 : 0.8;
        this.body.angularVelocity.lerp(torque, 0.1, this.body.angularVelocity);

        // linear velocity control
        const controlForce = this.getForward()
            .clone()
            .multiplyScalar(15 * (c.KeyW - c.KeyS));
        this.body.applyForce(controlForce);
        const dragForce = this.getVelocity()
            .clone()
            .multiplyScalar(-0.1);
        this.body.applyForce(dragForce);// drag
        const perpendicularVel = this.getVelocity().dot(this.getSideward());
        const redirectAmount = c.ShiftLeft ? 0.6 : 4;
        const centripetalForce = this.getSideward()
            .clone()
            .multiplyScalar(-1 * redirectAmount * perpendicularVel);
        this.body.applyForce(centripetalForce);
        this.body.applyForce(new THREE.Vector3().set(0, c.Space * 30, 0));
    }

    updateDebug() {
        // force debug
        const debugPos = this.getPosition()
            .clone()
            .add(new THREE.Vector3().set(0, 2, 0));
        this.debug.position.copy(debugPos);
        this.debug.setDirection(this.getVelocity());
        this.debug.setLength(3);
    }
}