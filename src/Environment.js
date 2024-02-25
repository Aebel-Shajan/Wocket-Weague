import * as THREE from "three";
import * as CANNON from "cannon-es"
import { GameObject } from "./GameObject";

export class Environment {
    floor;
    scene;
    world;
    constructor(scene, world) {
        this.scene = scene;
        this.world = world;
        this.floor = createFloorObject();
        this.floor.addObjectTo(scene, world);
        setupBackground(scene);
        setupLighting(scene);
    }
}


function setupLighting(scene) {
    // Create directional light
    const light1 = new THREE.DirectionalLight(0xffffff, 4);
    light1.position.set(100, 100, 100);
    const light2 = new THREE.DirectionalLight(0xffffff, 4);
    light2.position.set(-100, 100, -100);

    scene.add(light1);
    scene.add(light2);
    // Add ambient light
    scene.add(new THREE.AmbientLight(0xffffff, 0));
}

function setupBackground(scene) {
    const loader = new THREE.CubeTextureLoader();
    loader.setPath('assets/textures/skybox/');
    const texturefloor = loader.load([
        'px.jpg', 'nx.jpg',
        'py.jpg', 'ny.jpg',
        'pz.jpg', 'nz.jpg'
    ]);
    scene.background = texturefloor;
}

function createFloorObject() {
    // Create a ground plane
    const floorMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000),
        new THREE.MeshStandardMaterial({ roughness: 0.9, color: 0xaaaaaa })
    );
    const floorPhysics = {
        shape: new CANNON.Plane(),
        type: CANNON.Body.STATIC,
        material: new CANNON.Material({
            friction: 0
        }),
    }
    const floorObject = new GameObject(floorMesh, floorPhysics);
    floorObject.rotateAroundAxis(new THREE.Vector3(1, 0, 0), - Math.PI / 2);
    floorObject.updateMesh();
    return floorObject;
}