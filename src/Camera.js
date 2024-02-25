import * as THREE from 'three';
import { Vector3 } from 'three';


export class PlayerCamera {

    camera = new THREE.PerspectiveCamera();
    forward = new Vector3(0, 1, 0);

    constructor(renderer) {
        this.camera = new THREE.PerspectiveCamera(
            75, // field of view
            window.innerWidth / window.innerHeight, // aspect ratio
            0.1, // near clipping plane
            1000 // far clipping plane
        );


        // Handle window resize
        window.addEventListener('resize', onWindowResize, false);

        function onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    updatePlayerCamera(player) {
        let newForward = getXZ(player.getForward()).normalize();
        const velocity = getXZ(player.getVelocity());
        const position = player.getPosition();
        if (Math.abs(velocity.length()) > 5) {
            newForward = velocity.normalize();
        }
        newForward.multiplyScalar(-10).add(new Vector3().set(0, 1.5, 0));
        this.forward.lerp(newForward, 0.17);
        this.forward.normalize().multiplyScalar(10);
        this.camera.position.copy(position.clone().add(this.forward));
        this.camera.lookAt(position);
    }
}

function getXZ(vec) {
    return new Vector3(vec.x, 0, vec.z);
}