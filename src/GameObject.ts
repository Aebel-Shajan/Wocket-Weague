// https://github.com/WesUnwin/three-game-engine/blob/main/src/GameObject.ts
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

import { RigidBodyData } from './types';
import Scene from './Scene';


class GameObject {
    scene: Scene | null;
    threeJSGroup: THREE.Mesh;
    rigidBodyData: RigidBodyData;
    rapierRigidBody: RAPIER.RigidBody | null;


    constructor(scene: Scene, threeJSGroup: THREE.Mesh, rigidBodyData: RigidBodyData) {
        this.scene = scene;
        this.threeJSGroup = threeJSGroup;
        this.rigidBodyData = rigidBodyData;
        this.rapierRigidBody = null;
        this.scene.addGameObject(this);
    }

    syncWithRigidBody() {
        if (this.rapierRigidBody) {
            this.threeJSGroup.position.copy(this.rapierRigidBody.translation());
            this.threeJSGroup.quaternion.copy(this.rapierRigidBody.rotation());
        }
    }

    getScene() {
        return this.scene;
    }
}

export default GameObject;