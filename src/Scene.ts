// https://github.com/WesUnwin/three-game-engine/blob/main/src/Scene.ts#L12
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

import GameObject from './GameObject';


class Scene {
    threeJSScene: THREE.Scene;
    rapierWorld: RAPIER.World;
    gameObjects: GameObject[];
    physicsRenderingLines: THREE.LineSegments;

    constructor() {
        this.threeJSScene = new THREE.Scene();
        this.threeJSScene.background = new THREE.Color('lightblue');
        this.setupLighting();
        this.setupSkyBox();
        this.rapierWorld = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
        this.gameObjects = [];

        // Physics rendering lines
        let material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            vertexColors: true
        });
        let geometry = new THREE.BufferGeometry();
        this.physicsRenderingLines = new THREE.LineSegments(geometry, material);
        this.physicsRenderingLines.name = 'PhysicsRenderingLines';
    }

    setupLighting() {
        // Create directional light
        const light1 = new THREE.DirectionalLight(0xffffff, 4);
        light1.position.set(100, 100, 100);
        const light2 = new THREE.DirectionalLight(0xffffff, 4);
        light2.position.set(-100, 100, -100);

        this.threeJSScene.add(light1);
        this.threeJSScene.add(light2);
        // Add ambient light
        this.threeJSScene.add(new THREE.AmbientLight(0xffffff, 0));
    }

    setupSkyBox() {
        const loader = new THREE.CubeTextureLoader();
        loader.setPath('assets/textures/skybox/');
        const texturefloor = loader.load([
            'px.jpg', 'nx.jpg',
            'py.jpg', 'ny.jpg',
            'pz.jpg', 'nz.jpg'
        ]);
        this.threeJSScene.background = texturefloor;
    }

    advancePhysics() {
        this.rapierWorld.step();
        this.gameObjects.forEach(gameObject => {
            gameObject.syncWithRigidBody();
            gameObject.rapierRigidBody?.resetForces(false);
            gameObject.rapierRigidBody?.resetTorques(false);
        });
    }

    addGameObject(gameObject: GameObject) {
        if (!this.gameObjects.some(g => g === gameObject)) {
            gameObject.scene = this;
            this.gameObjects.push(gameObject);
            this.threeJSScene.add(gameObject.threeJSGroup);
            gameObject.rapierRigidBody = this.rapierWorld.createRigidBody(gameObject.rigidBodyData.rigidBodyDesc);
            this.rapierWorld.createCollider(gameObject.rigidBodyData.colliderDesc, gameObject.rapierRigidBody);
        }
    }

    removeGameObject(gameObject: GameObject) {
        if (this.gameObjects.some(g => g === gameObject)) {
            // gameObject is indeed a child of this scene
            this.gameObjects = this.gameObjects.filter(g => g !== gameObject);
            gameObject.scene = null;
            this.threeJSScene.remove(gameObject.threeJSGroup);
        }
    }

    showPhysics() {
        let physicsRenderingLines = this.threeJSScene.getObjectByName('PhysicsRenderingLines');
        if (!physicsRenderingLines) {
            this.threeJSScene.add(this.physicsRenderingLines);
        }
    }

    hidePhysics() {
        const physicsRenderingLines = this.threeJSScene.getObjectByName('PhysicsRenderingLines');
        if (physicsRenderingLines) {
            this.threeJSScene.remove(this.physicsRenderingLines);
        }
    }

    updatePhysicsGraphics() {
        const physicsRenderingLines = this.threeJSScene.getObjectByName('PhysicsRenderingLines');
        if (physicsRenderingLines) {
            const buffers = this.rapierWorld.debugRender();
            this.physicsRenderingLines.geometry.setAttribute('position', new THREE.BufferAttribute(buffers.vertices, 3));
            this.physicsRenderingLines.geometry.setAttribute('color', new THREE.BufferAttribute(buffers.colors, 4));
        }
    }
}

export default Scene;