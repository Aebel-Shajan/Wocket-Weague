import * as THREE from "three";
import * as CANNON from "cannon-es"
import { GameObject } from "./GameObject";

export class Environment {
    floor;
    floorMaterial;
    scene;
    world;
    constructor(scene, world) {
        this.scene = scene;
        this.world = world;
        this.floor = this.createFloorObject();
        this.floor.addObjectTo(scene, world);
        setupBackground(scene);
        setupLighting(scene);
    }
    createFloorObject() {

     
        const vertexShader = `
        varying vec2 vUv;
        uniform float time;
        
          void main() {
      
          vUv = uv;
          
          // VERTEX POSITION
          
          vec4 mvPosition = vec4( position, 1.0 );
          #ifdef USE_INSTANCING
              mvPosition = instanceMatrix * mvPosition;
          #endif
          
          // DISPLACEMENT
          
          // here the displacement is made stronger on the blades tips.
          float dispPower = 1.0 - cos( uv.y * 3.1416 / 2.0 );
          
          float displacement = sin( mvPosition.z + time * 10.0 ) * ( 0.1 * dispPower );
          mvPosition.z += displacement;
          
          //
          
          vec4 modelViewPosition = modelViewMatrix * mvPosition;
          gl_Position = projectionMatrix * modelViewPosition;
      
          }
      `;
      
      const fragmentShader = `
        varying vec2 vUv;
        
        void main() {
            vec3 baseColor = vec3( 0.41, 1.0, 0.5 );
          float clarity = ( vUv.y * 0.5 ) + 0.5;
          gl_FragColor = vec4( baseColor * clarity, 1 );
        }
      `;
      
      const uniforms = {
          time: {
            value: 0
        }
      }
      
      const leavesMaterial = new THREE.ShaderMaterial({
          vertexShader,
        fragmentShader,
        uniforms,
        side: THREE.DoubleSide
      });
      
    
        // Create a material using the custom shader
        this.floorMaterial = leavesMaterial;
    
        // Create a ground plane
        const floorMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1000, 1000),
            this.floorMaterial
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
