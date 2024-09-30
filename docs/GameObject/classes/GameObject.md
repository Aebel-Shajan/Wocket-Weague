[**Wocket Weague**](../../README.md) • **Docs**

***

[Wocket Weague](../../modules.md) / [GameObject](../README.md) / GameObject

# Class: GameObject

Represents a game object in the scene.

## See

[three-game-engine](https://github.com/WesUnwin/three-game-engine/blob/main/src/GameObject.ts)
copied hella code from there.

## Extended by

- [`Player`](../../util/Player/classes/Player.md)

## Constructors

### new GameObject()

> **new GameObject**(`scene`, `threeJSGroup`, `rigidBodyData`): [`GameObject`](GameObject.md)

Creates a new GameObject instance.

#### Parameters

• **scene**: [`Scene`](../../Scene/classes/Scene.md)

The scene the game object belongs to.

• **threeJSGroup**: `Mesh`\<`BufferGeometry`\<`NormalBufferAttributes`\>, `Material` \| `Material`[], `Object3DEventMap`\>

The Three.js mesh of the game object.

• **rigidBodyData**: [`RigidBodyData`](../../types/interfaces/RigidBodyData.md)

The data for the rigid body associated with the game object.

#### Returns

[`GameObject`](GameObject.md)

#### Defined in

[GameObject.ts:27](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L27)

## Properties

### rapierRigidBody

> **rapierRigidBody**: `RigidBody`

#### Defined in

[GameObject.ts:19](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L19)

***

### rigidBodyData

> **rigidBodyData**: [`RigidBodyData`](../../types/interfaces/RigidBodyData.md)

#### Defined in

[GameObject.ts:16](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L16)

***

### scene

> **scene**: [`Scene`](../../Scene/classes/Scene.md)

#### Defined in

[GameObject.ts:14](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L14)

***

### threeJSGroup

> **threeJSGroup**: `Mesh`\<`BufferGeometry`\<`NormalBufferAttributes`\>, `Material` \| `Material`[], `Object3DEventMap`\>

#### Defined in

[GameObject.ts:15](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L15)

## Methods

### getForward()

> **getForward**(): `Vector3`

Gets the forward vector based on the game object's rotation.

#### Returns

`Vector3`

The forward vector.

#### Defined in

[GameObject.ts:69](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L69)

***

### getPosition()

> **getPosition**(): `Vector3`

Gets the position of the game object from its rigid body..

#### Returns

`Vector3`

The position vector.

#### Defined in

[GameObject.ts:77](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L77)

***

### getRelativeVector()

> **getRelativeVector**(`inputVec`): `Vector3`

Gets the relative vector based on the game object's rotation.

#### Parameters

• **inputVec**: [`Vec3`](../../types/interfaces/Vec3.md)

The input vector.

#### Returns

`Vector3`

The relative vector.

#### Defined in

[GameObject.ts:43](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L43)

***

### getScene()

> **getScene**(): [`Scene`](../../Scene/classes/Scene.md)

Returns the scene the game object belongs to.

#### Returns

[`Scene`](../../Scene/classes/Scene.md)

The scene.

#### Defined in

[GameObject.ts:102](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L102)

***

### getSideward()

> **getSideward**(): `Vector3`

Gets the sideward vector based on the game object's rotation.

#### Returns

`Vector3`

The sideward vector.

#### Defined in

[GameObject.ts:53](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L53)

***

### getUpward()

> **getUpward**(): `Vector3`

Gets the upward vector based on the game object's rotation.

#### Returns

`Vector3`

The upward vector.

#### Defined in

[GameObject.ts:61](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L61)

***

### getVelocity()

> **getVelocity**(): `Vector3`

Gets the velocity of the game object from its rigid body.

#### Returns

`Vector3`

The velocity vector.

#### Defined in

[GameObject.ts:85](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L85)

***

### syncWithRigidBody()

> **syncWithRigidBody**(): `void`

Synchronizes the objects three js mesh position and rotation with the rapier
collision body.

#### Returns

`void`

#### Defined in

[GameObject.ts:93](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L93)
