Some good ressources:

https://github.com/birkir/react-three-fiber-examples/blob/0a016d4f6ad09db4e43aae056b447e0cc77df038/src/screens/Physics.js#L7

https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_minecraft.html
https://www.youtube.com/watch?v=kxXaIHi1j4w

Facing up Rotation: [-Math.PI / 2, 0, 0] (y+1)
Facing down Rotation: [Math.PI / 2, 0, 0] (y-1)
(left side view): [0, -Math.PI / 2 , 0] (x-1)
(Right side view): [0, Math.PI / 2 , 0] (x+1)
Facing viewer: [0, 0, -Math.PI / 2] (y-1)
 Facing 180deg: [0, 0, Math.PI / 2] (y+1)

