import RAPIER from "@dimforge/rapier3d-compat";

// This makes me cringe looking back

interface RendererOptions {
    width?: number;
    height?: number;
    enableVR?: boolean;
    pixelRatio?: number;
    cameraOptions?: CameraOptions;
    setupFullScreenCanvas?: boolean;
    canvas?: HTMLCanvasElement;
    beforeRender?: (args: { deltaTimeInSec: number, time: number}) => void;
}

interface CameraOptions {
    fov?: number;
    aspect?: number;
    near?: number;
    far?: number;
}

interface RigidBodyData {
    colliderDesc: RAPIER.ColliderDesc;
    rigidBodyDesc: RAPIER.RigidBodyDesc;
}

interface Vec3 {
    x: number, 
    y: number, 
    z: number
}

interface movementInput {
    sideward?: number,
    upward?: number,
    forward?: number,
    pitch?: number,
    yaw?: number,
    roll?: number
}

interface carInput extends movementInput {
    forward: number,
    yaw: number,
    roll: number,
    upward: number
}