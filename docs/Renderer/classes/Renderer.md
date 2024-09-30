[**Wocket Weague**](../../README.md) • **Docs**

***

[Wocket Weague](../../modules.md) / [Renderer](../README.md) / Renderer

# Class: Renderer

The Renderer class handles rendering the scene using Three.js.

## See

[three-game-engine](https://github.com/WesUnwin/three-game-engine/blob/main/src/Renderer.ts): I copied alot of code from here.

## Constructors

### new Renderer()

> **new Renderer**(): [`Renderer`](Renderer.md)

Initialise the Three js renderer, add it to the document body.
Setup the camera aswell

#### Returns

[`Renderer`](Renderer.md)

#### Defined in

[Renderer.ts:20](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Renderer.ts#L20)

## Properties

### cameraForward

> **cameraForward**: `Vector3`

#### Defined in

[Renderer.ts:14](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Renderer.ts#L14)

***

### threeJSCamera

> **threeJSCamera**: `Camera`

#### Defined in

[Renderer.ts:13](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Renderer.ts#L13)

***

### threeJSRenderer

> **threeJSRenderer**: `WebGLRenderer`

#### Defined in

[Renderer.ts:12](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Renderer.ts#L12)

## Methods

### followPlayer()

> **followPlayer**(`player`): `void`

Make the camera foloow the player using their translation data.

#### Parameters

• **player**: [`Player`](../../util/Player/classes/Player.md)

Player object to be followed.

#### Returns

`void`

#### Defined in

[Renderer.ts:99](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Renderer.ts#L99)

***

### render()

> **render**(`scene`): `void`

Renders a given scene and camera.

#### Parameters

• **scene**: [`Scene`](../../Scene/classes/Scene.md)

Scene object to be rendered

#### Returns

`void`

#### Defined in

[Renderer.ts:79](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Renderer.ts#L79)

***

### setSize()

> **setSize**(`width`, `height`): `void`

Set the size of the Three js renderer and update the camera to adjust for this.

#### Parameters

• **width**: `number`

New width of the three js renderer

• **height**: `number`

New heigh of the three js rendere

#### Returns

`void`

#### Defined in

[Renderer.ts:89](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Renderer.ts#L89)

***

### setupFullScreenCanvas()

> **setupFullScreenCanvas**(): `void`

Set the size of the renderer dom element. Allow it to change dimensions on window resizing.

#### Returns

`void`

#### Defined in

[Renderer.ts:55](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/Renderer.ts#L55)
