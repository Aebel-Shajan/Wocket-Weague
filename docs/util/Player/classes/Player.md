[**Wocket Weague**](../../../README.md) • **Docs**

***

[Wocket Weague](../../../modules.md) / [util/Player](../README.md) / Player

# Class: Player

Represents a player in the game.

## Extends

- [`GameObject`](../../../GameObject/classes/GameObject.md)

## Constructors

### new Player()

> **new Player**(`scene`, `mesh`): [`Player`](Player.md)

Creates a new instance of the Player class.

The mesh's origin is first corrected. Then its rotated to point forward.
Then a cube collider is created based on the size information of the mesh.

#### Parameters

• **scene**: [`Scene`](../../../Scene/classes/Scene.md)

The scene the player belongs to.

• **mesh**: `Mesh`\<`BufferGeometry`\<`NormalBufferAttributes`\>, `Material` \| `Material`[], `Object3DEventMap`\>

The mesh representing the player.

#### Returns

[`Player`](Player.md)

#### Overrides

[`GameObject`](../../../GameObject/classes/GameObject.md).[`constructor`](../../../GameObject/classes/GameObject.md#constructors)

#### Defined in

[util/Player.ts:23](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/util/Player.ts#L23)

## Properties

### rapierRigidBody

> **rapierRigidBody**: `RigidBody`

#### Inherited from

[`GameObject`](../../../GameObject/classes/GameObject.md).[`rapierRigidBody`](../../../GameObject/classes/GameObject.md#rapierrigidbody)

#### Defined in

[GameObject.ts:19](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L19)

***

### rigidBodyData

> **rigidBodyData**: [`RigidBodyData`](../../../types/interfaces/RigidBodyData.md)

#### Inherited from

[`GameObject`](../../../GameObject/classes/GameObject.md).[`rigidBodyData`](../../../GameObject/classes/GameObject.md#rigidbodydata)

#### Defined in

[GameObject.ts:16](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L16)

***

### scene

> **scene**: [`Scene`](../../../Scene/classes/Scene.md)

#### Inherited from

[`GameObject`](../../../GameObject/classes/GameObject.md).[`scene`](../../../GameObject/classes/GameObject.md#scene)

#### Defined in

[GameObject.ts:14](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L14)

***

### threeJSGroup

> **threeJSGroup**: `Mesh`\<`BufferGeometry`\<`NormalBufferAttributes`\>, `Material` \| `Material`[], `Object3DEventMap`\>

#### Inherited from

[`GameObject`](../../../GameObject/classes/GameObject.md).[`threeJSGroup`](../../../GameObject/classes/GameObject.md#threejsgroup)

#### Defined in

[GameObject.ts:15](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L15)

## Methods

### control()

> **control**(`k`): `void`

Controls the player's movement based on keyboard input.

The player should be able to move
 * forward and backwards using w and s.
 * turn right and left using a and d.
 * roll clockwise and anticlockwise using q and e.
 * jump with space bar
 * drift with shift

#### Parameters

• **k**: [`KeyboardHandler`](../../KeyboardHandler/classes/KeyboardHandler.md)

The keyboard handler.

#### Returns

`void`

#### Throws

Error if the game object does not have a rapierRigidBody.

#### Defined in

[util/Player.ts:63](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/util/Player.ts#L63)

***

### controlDrift()

> **controlDrift**(`isDrifting`): `void`

Apply drifting physics to car based on input.

#### Parameters

• **isDrifting**: `boolean`

Boolean which indicates if the car wants to drift

#### Returns

`void`

#### Defined in

[util/Player.ts:116](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/util/Player.ts#L116)

***

### controlForwardVel()

> **controlForwardVel**(`forwardAmount`): `void`

Control how fast the car goes forward or backward. Apply some drag aswell.

#### Parameters

• **forwardAmount**: `number`

Amount to move forward or backwards

#### Returns

`void`

#### Defined in

[util/Player.ts:102](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/util/Player.ts#L102)

***

### controlJump()

> **controlJump**(`isJumping`): `void`

#### Parameters

• **isJumping**: `boolean`

Boolean which indicates if car wants to jump

#### Returns

`void`

#### Defined in

[util/Player.ts:129](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/util/Player.ts#L129)

***

### controlYawRoll()

> **controlYawRoll**(`yawAmount`, `rollAmount`): `void`

Control the yaw and roll of the car based on player input.

#### Parameters

• **yawAmount**: `number`

Amount to rotate left or right.

• **rollAmount**: `number`

Amount to roll the car along forward axis.

#### Returns

`void`

#### Defined in

[util/Player.ts:87](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/util/Player.ts#L87)

***

### getForward()

> **getForward**(): `Vector3`

Gets the forward vector based on the game object's rotation.

#### Returns

`Vector3`

The forward vector.

#### Inherited from

[`GameObject`](../../../GameObject/classes/GameObject.md).[`getForward`](../../../GameObject/classes/GameObject.md#getforward)

#### Defined in

[GameObject.ts:69](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L69)

***

### getPosition()

> **getPosition**(): `Vector3`

Gets the position of the game object from its rigid body..

#### Returns

`Vector3`

The position vector.

#### Inherited from

[`GameObject`](../../../GameObject/classes/GameObject.md).[`getPosition`](../../../GameObject/classes/GameObject.md#getposition)

#### Defined in

[GameObject.ts:77](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L77)

***

### getRelativeVector()

> **getRelativeVector**(`inputVec`): `Vector3`

Gets the relative vector based on the game object's rotation.

#### Parameters

• **inputVec**: [`Vec3`](../../../types/interfaces/Vec3.md)

The input vector.

#### Returns

`Vector3`

The relative vector.

#### Inherited from

[`GameObject`](../../../GameObject/classes/GameObject.md).[`getRelativeVector`](../../../GameObject/classes/GameObject.md#getrelativevector)

#### Defined in

[GameObject.ts:43](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L43)

***

### getScene()

> **getScene**(): [`Scene`](../../../Scene/classes/Scene.md)

Returns the scene the game object belongs to.

#### Returns

[`Scene`](../../../Scene/classes/Scene.md)

The scene.

#### Inherited from

[`GameObject`](../../../GameObject/classes/GameObject.md).[`getScene`](../../../GameObject/classes/GameObject.md#getscene)

#### Defined in

[GameObject.ts:102](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L102)

***

### getSideward()

> **getSideward**(): `Vector3`

Gets the sideward vector based on the game object's rotation.

#### Returns

`Vector3`

The sideward vector.

#### Inherited from

[`GameObject`](../../../GameObject/classes/GameObject.md).[`getSideward`](../../../GameObject/classes/GameObject.md#getsideward)

#### Defined in

[GameObject.ts:53](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L53)

***

### getUpward()

> **getUpward**(): `Vector3`

Gets the upward vector based on the game object's rotation.

#### Returns

`Vector3`

The upward vector.

#### Inherited from

[`GameObject`](../../../GameObject/classes/GameObject.md).[`getUpward`](../../../GameObject/classes/GameObject.md#getupward)

#### Defined in

[GameObject.ts:61](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L61)

***

### getVelocity()

> **getVelocity**(): `Vector3`

Gets the velocity of the game object from its rigid body.

#### Returns

`Vector3`

The velocity vector.

#### Inherited from

[`GameObject`](../../../GameObject/classes/GameObject.md).[`getVelocity`](../../../GameObject/classes/GameObject.md#getvelocity)

#### Defined in

[GameObject.ts:85](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L85)

***

### isOnGround()

> **isOnGround**(`threshold`): `boolean`

Checks if the player is on the ground.

#### Parameters

• **threshold**: `number` = `0.1`

The threshold for the time of impact.

#### Returns

`boolean`

True if the player is on the ground, false otherwise.

#### Defined in

[util/Player.ts:165](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/util/Player.ts#L165)

***

### rayCastToGround()

> **rayCastToGround**(): `RayColliderHit`

Performs a raycast to the ground and returns the .

#### Returns

`RayColliderHit`

The raycast hit information.

#### Throws

Error if the game object is not in a scene or does not have a rapierRigidBody.

#### Defined in

[util/Player.ts:139](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/util/Player.ts#L139)

***

### syncWithRigidBody()

> **syncWithRigidBody**(): `void`

Synchronizes the objects three js mesh position and rotation with the rapier
collision body.

#### Returns

`void`

#### Inherited from

[`GameObject`](../../../GameObject/classes/GameObject.md).[`syncWithRigidBody`](../../../GameObject/classes/GameObject.md#syncwithrigidbody)

#### Defined in

[GameObject.ts:93](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/GameObject.ts#L93)
