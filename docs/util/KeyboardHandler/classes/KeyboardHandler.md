[**Wocket Weague**](../../../README.md) • **Docs**

***

[Wocket Weague](../../../modules.md) / [util/KeyboardHandler](../README.md) / KeyboardHandler

# Class: KeyboardHandler

Represents a keyboard handler that tracks pressed keys and shift state.

## Constructors

### new KeyboardHandler()

> **new KeyboardHandler**(): [`KeyboardHandler`](KeyboardHandler.md)

#### Returns

[`KeyboardHandler`](KeyboardHandler.md)

#### Defined in

[util/KeyboardHandler.ts:8](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/util/KeyboardHandler.ts#L8)

## Properties

### pressedKeys

> **pressedKeys**: `object` = `{}`

#### Index Signature

 \[`key`: `string`\]: `boolean`

#### Defined in

[util/KeyboardHandler.ts:5](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/util/KeyboardHandler.ts#L5)

***

### shiftIsDown

> **shiftIsDown**: `boolean` = `false`

#### Defined in

[util/KeyboardHandler.ts:6](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/util/KeyboardHandler.ts#L6)

## Methods

### isKeyDown()

> **isKeyDown**(`key`): `boolean`

Checks if a specific key is currently being pressed.

#### Parameters

• **key**: `string`

The key to check.
@see[Key reference](https://www.toptal.com/developers/key)

#### Returns

`boolean`

`true` if the key is currently being pressed, `false` otherwise.

#### Defined in

[util/KeyboardHandler.ts:28](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/util/KeyboardHandler.ts#L28)

***

### isShiftDown()

> **isShiftDown**(): `boolean`

Checks if the shift key is currently being pressed.

#### Returns

`boolean`

`true` if the shift key is currently being pressed, `false` otherwise.

#### Defined in

[util/KeyboardHandler.ts:36](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/util/KeyboardHandler.ts#L36)
