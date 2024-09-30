[**Wocket Weague**](../../../README.md) • **Docs**

***

[Wocket Weague](../../../modules.md) / [util/ThreeJSHelpers](../README.md) / loadModel

# Function: loadModel()

> **loadModel**(`modelPath`, `offset`, `offsetScale`): `Promise`\<`Object3D`\<`Object3DEventMap`\>\>

Load a ThreeJs mesh, correcting its origin and initial size.

## Parameters

• **modelPath**: `string`

Relative path to model file from the public folder.

• **offset** = `...`

Amount to offset the models origin by.

• **offset.x**: `number` = `0`

• **offset.y**: `number` = `0`

• **offset.z**: `number` = `0`

• **offsetScale** = `...`

Amount to scale the models initial size by.

• **offsetScale.x**: `number` = `1`

• **offsetScale.y**: `number` = `1`

• **offsetScale.z**: `number` = `1`

## Returns

`Promise`\<`Object3D`\<`Object3DEventMap`\>\>

ThreeJs mesh

## Defined in

[util/ThreeJSHelpers.ts:12](https://github.com/Aebel-Shajan/Wocket-Weague/blob/5b758607dc322162aa7bb6e3ab674c98807f2d70/src/util/ThreeJSHelpers.ts#L12)
