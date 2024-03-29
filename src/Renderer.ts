// https://github.com/WesUnwin/three-game-engine/blob/main/src/Renderer.ts
import * as THREE from 'three';

import Scene from './Scene';
import Player from './util/Player';


class Renderer {
    threeJSRenderer: THREE.WebGLRenderer;
    threeJSCamera: THREE.Camera;
    cameraForward: THREE.Vector3;

    constructor() {
        this.threeJSRenderer = new THREE.WebGLRenderer({ antialias: true });
        this.threeJSRenderer.shadowMap.enabled = true;
        this.threeJSRenderer.shadowMap.type = 1;
        this.threeJSRenderer.toneMapping = 0;
        this.threeJSRenderer.toneMappingExposure = 1;
        document.body.appendChild(this.threeJSRenderer.domElement);

        const defaultCameraOptions = {
            fov: 50, // field of view
            aspect: window.innerWidth / window.innerHeight,
            near: 0.01,
            far: 1000,
            position: {
                x: 0,
                y: 1.5,
                z: 5
            }
        };
        const cameraOptions = defaultCameraOptions;
        this.threeJSCamera = new THREE.PerspectiveCamera(cameraOptions.fov, cameraOptions.aspect, cameraOptions.near, cameraOptions.far);
        this.threeJSCamera.position.set(10, 10, 10);
        this.threeJSCamera.lookAt(0, 0, 0)
        this.setupFullScreenCanvas()
        this.cameraForward = new THREE.Vector3(-1, -1, -1);
    }

    setupFullScreenCanvas() {
        const canvas = this.threeJSRenderer.domElement;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        document.body.innerHTML = '';
        document.body.appendChild(canvas);
        document.body.style.margin = '0px';

        // on resizing the viewport update the dimensions of the canvas to fill the viewport
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.setSize(window.innerWidth, window.innerHeight);
        });

        this.setSize(window.innerWidth, window.innerHeight);
    }

    render(scene: Scene) {
        this.threeJSRenderer.render(scene.threeJSScene, this.threeJSCamera)
    }

    setSize(width: number, height: number) {
        this.threeJSRenderer.setSize(width, height);
        this.threeJSCamera.updateMatrix();
    }

    followPlayer(player: Player) {
        let newForward = player.getForward();
        newForward.y = 0;
        newForward.normalize();
        const position = player.getPosition();
        newForward.multiplyScalar(-10).add(new THREE.Vector3().set(0, 3, 0));
        this.cameraForward.lerp(newForward, 0.17);
        this.cameraForward.normalize().multiplyScalar(10);
        this.threeJSCamera.position.copy(position.clone().add(this.cameraForward));
        this.threeJSCamera.lookAt(position);
    }
}


export default Renderer