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

https://github.com/jwtea/three-viewer/blob/20744c53faf7ece7ee1bd19bc593a6322f39d002/components/Shapes/Points.jsx#L7

Cool codepen:

https://codesandbox.io/s/czhxx?file=/src/App.js (r3f)

Some UV & Indices config for various mesh triangles: (all these directions are from render-init view)

Right:

  var quad_uvs =
  [
  0.0, 0.0,
  0.0, 1.0,
  1.0, 0.0,
  1.0, 1.0
  ];
  
var quad_indices =
  [
  0, 1, 2, 3, 2, 1
  ];

Left: