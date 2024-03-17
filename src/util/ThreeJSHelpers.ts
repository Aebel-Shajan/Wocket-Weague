import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Vec3 } from '../types';

export function standardMaterial(color: THREE.ColorRepresentation): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial(
        {
            color: color
        }
    )
}

export async function loadModel(modelPath: string, offset={x: 0, y: 0, z: 0}, offsetScale={x: 1, y: 1, z: 1}) {
    const loader = new GLTFLoader();
    const model = await loader.loadAsync(modelPath);
    const correctedMesh = new THREE.Object3D();
    correctedMesh.add(model.scene);
    correctedMesh.position.copy(offset);
    correctedMesh.scale.copy(offsetScale);
    return correctedMesh;
}

export function getObjectSize(object: THREE.Object3D) {
    const boundingBox = new THREE.Box3().setFromObject(object);
    return boundingBox.getSize(new THREE.Vector3());
}