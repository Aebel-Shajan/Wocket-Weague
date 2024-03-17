import * as THREE from 'three';

export function standardMaterial(color: THREE.ColorRepresentation): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial(
        {
            color: color
        }
    )
}
