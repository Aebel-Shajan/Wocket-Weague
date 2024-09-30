[**Wocket Weague**](../../README.md) • **Docs**

***

[Wocket Weague](../../modules.md) / [Scene](../README.md) / Scene

# Class: Scene

Represents a scene in the game.
A scene contains game objects and handles rendering and physics simulation.

## See

[three-game-engine](https://github.com/WesUnwin/three-game-engine/blob/main/src/Scene.ts#L12) : I copied a lot of code from here.

## Constructors

### new Scene()

> **new Scene**(): [`Scene`](Scene.md)

Creates a new instance of the Scene class.

#### Returns

[`Scene`](Scene.md)

#### Defined in

[Scene.ts:20](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Scene.ts#L20)

## Properties

### gameObjects

> **gameObjects**: [`GameObject`](../../GameObject/classes/GameObject.md)[]

#### Defined in

[Scene.ts:14](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Scene.ts#L14)

***

### physicsRenderingLines

> **physicsRenderingLines**: `LineSegments`\<`BufferGeometry`\<`NormalBufferAttributes`\>, `Material` \| `Material`[], `Object3DEventMap`\>

#### Defined in

[Scene.ts:15](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Scene.ts#L15)

***

### rapierWorld

> **rapierWorld**: `World`

#### Defined in

[Scene.ts:13](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Scene.ts#L13)

***

### threeJSScene

> **threeJSScene**: `Scene`

#### Defined in

[Scene.ts:12](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Scene.ts#L12)

## Methods

### advancePhysics()

> **advancePhysics**(): `void`

Advances the physics simulation in the scene.
Updates the positions and forces of game objects.

#### Returns

`void`

#### Defined in

[Scene.ts:77](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Scene.ts#L77)

***

### hidePhysics()

> **hidePhysics**(): `void`

Removes the physics rendering lines from the scene if they are present.

#### Returns

`void`

#### Defined in

[Scene.ts:101](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Scene.ts#L101)

***

### setupLighting()

> **setupLighting**(): `void`

Sets up the lighting in the scene.
Adds directional lights and ambient light.

#### Returns

`void`

#### Defined in

[Scene.ts:42](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Scene.ts#L42)

***

### setupSkyBox()

> **setupSkyBox**(): `void`

Sets up the skybox in the scene.
Loads the skybox textures and sets them as the background.

#### Returns

`void`

#### Defined in

[Scene.ts:59](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Scene.ts#L59)

***

### showPhysics()

> **showPhysics**(): `void`

Adds the physics rendering lines to the scene if they are not already present.

#### Returns

`void`

#### Defined in

[Scene.ts:89](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Scene.ts#L89)

***

### updatePhysicsGraphics()

> **updatePhysicsGraphics**(): `void`

Updates the position and color attributes of the rendering lines based on the physics simulation.

#### Returns

`void`

#### Defined in

[Scene.ts:113](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Scene.ts#L113)
