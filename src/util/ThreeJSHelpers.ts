import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * More concise way of creating a new MeshStandardMaterial.
 *
 * I have no idea why I made this??
 *
 * @param color Threejs color
 * @returns Mesh standard material from Three
 */
export function standardMaterial(
	color: THREE.ColorRepresentation,
): THREE.MeshStandardMaterial {
	return new THREE.MeshStandardMaterial({
		color: color,
	});
}

/**
 * Load a ThreeJs mesh, correcting its origin and initial size.
 *
 * @param modelPath Relative path to model file from the public folder.
 * @param offset Amount to offset the models origin by.
 * @param offsetScale Amount to scale the models initial size by.
 * @returns ThreeJs mesh
 */
export async function loadModel(
	modelPath: string,
	offset = { x: 0, y: 0, z: 0 },
	offsetScale = { x: 1, y: 1, z: 1 },
) {
	const loader = new GLTFLoader();
	const model = await loader.loadAsync(modelPath);
	const correctedMesh = new THREE.Object3D();
	correctedMesh.add(model.scene);
	correctedMesh.position.copy(offset);
	correctedMesh.scale.copy(offsetScale);
	return correctedMesh;
}

/**
 * Calculate objects size given its mesh.
 *
 * @param object ThreeJs mesh
 * @returns ThreeJS size vector
 */
export function getObjectSize(object: THREE.Object3D): THREE.Vector3 {
	const boundingBox = new THREE.Box3().setFromObject(object);
	return boundingBox.getSize(new THREE.Vector3());
}
