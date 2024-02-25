import * as THREE from 'three';
import * as CANNON from 'cannon-es';

class GameObject {

    #originalSize = new THREE.Vector3();
    #size = new THREE.Vector3();
    #scale = new THREE.Vector3();
    #position = new THREE.Vector3();
    #velocity = new THREE.Vector3();
    #quaternion = new THREE.Quaternion();
    
    constructor(mesh, bodyParams) {
        let boundingBox = new THREE.Box3().setFromObject(mesh);
        let centrePos = boundingBox.getCenter(new THREE.Vector3());
        this.#originalSize = boundingBox.getSize(new THREE.Vector3());
        this.#size.copy(this.#originalSize);
        this.#scale.set(1,1,1);
        this.mesh = new THREE.Object3D();
        this.mesh.add(mesh);
        this.body = new CANNON.Body({
            shape: new CANNON.Box(this.#originalSize.clone().multiplyScalar(0.5)),
            ...bodyParams
        })
        mesh.position.copy(centrePos).multiplyScalar(-1); // centre mesh 
    }

    addObjectTo(scene, world) {
        scene.add(this.mesh);
        world.addBody(this.body);
    }

    getVelocity() {
        return this.#velocity;
    }

    setVelocity(velocity) {
        if (this.body.type === CANNON.Body.STATIC) {
            throw new Error( 'Attempting to set velocity of static body' );
        }
        this.#velocity.copy(velocity)
        this.body.velocity.copy(this.#velocity);
    }

    getPosition() {
        return this.#position;
    }

    setPosition(position) {
        this.#position.copy(position);
        this.body.position.copy(this.#position);
    }
    
    setBottomPosition(position) {
        position.y += 0.5 * this.getSize().y;
        this.setPosition(position);
    }

    getQuaternion() {
        return this.#quaternion;
    }

    setQuaternion(quaternion) {
        this.#quaternion.copy(quaternion);
        this.body.quaternion.copy(this.#quaternion);
    }

    getOriginalSize() {
        return this.#originalSize;
    }

    getSize() {
        var bbox = new THREE.Box3().setFromObject(this.mesh);
        bbox.getSize(this.#size)
        return this.#size;
    }

    setSize(size) {
        this.#scale.set(
        size.x / this.#originalSize.x,
        size.y / this.#originalSize.y,
        size.z / this.#originalSize.z);
        this.setScale(this.#scale);
    }

    getScale() {
        return this.#scale;
    }

    setScale(scale) {
        this.#scale.copy(scale);
        this.mesh.scale.copy(scale);
        this.body.removeShape(this.body.shapes[0]);
        this.body.addShape(new CANNON.Box(this.getSize().clone().multiplyScalar(0.5)));
        this.body.updateBoundingRadius();
        this.body.updateAABB();
        this.updateMesh()
    }

    updateMesh() {
        this.#quaternion.copy(this.body.quaternion);
        this.#position.copy(this.body.position);
        this.#velocity.copy(this.body.velocity);
        this.mesh.position.copy(this.#position);
        this.mesh.quaternion.copy(this.#quaternion);
    }
    
    rotateAroundAxis(axis, angle) {
        const newQuaternion = this.getQuaternion().multiply(new THREE.Quaternion().setFromAxisAngle(axis, angle));
        this.setQuaternion(newQuaternion);
    }

    overlaps(gameObject) {
        this.body.updateAABB();
        gameObject.body.updateAABB();
        return this.body.aabb.overlaps(gameObject.body.aabb);
    }

}

export { GameObject };