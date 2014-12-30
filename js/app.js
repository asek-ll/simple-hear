/* global THREE */
var scene = new THREE.Scene();
//var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setClearColor( 0xf0f0f0 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshNormalMaterial( { color: 0x00aa00 } );
var cube = new THREE.Mesh( geometry, material );
//scene.add( cube );
//camera.position.z = 100;

var x = -25, y = -25;

var heartShape = new THREE.Shape(); // From http://blog.burlock.org/html5/130-paths

heartShape.moveTo( x + 25, y + 25 );
heartShape.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y );
heartShape.bezierCurveTo( x - 30, y, x - 30, y + 35, x - 30, y + 35 );
heartShape.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 );
heartShape.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 );
heartShape.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y );
heartShape.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 );

var extrudeSettings = {
  amount: 10,
  bevelEnabled: true,
  bevelSegments: 10,
  steps: 1
};

var mesh = (function (shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
  var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  console.log(color);
  var mesh = THREE.SceneUtils.createMultiMaterialObject( geometry, [
    new THREE.MeshLambertMaterial( { color: color } ),
    //new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } )
  ] );
  mesh.position.set( x, y, z );
  mesh.rotation.set( rx, ry, rz );
  mesh.scale.set( s, s, s );
  return mesh;
}( heartShape, extrudeSettings, 0xff1100, 0, 180, 0, 0, 0, Math.PI, 1 ));

scene.add( mesh );

var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set( 0, 150, 500 );

var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0, 0, 1 );
scene.add( light );

function render() {
  requestAnimationFrame( render );
  mesh.rotation.y += 0.01;
  var sc = Math.sin(mesh.rotation.y*10) * 0.05 + 0.9
  mesh.scale.set( sc, sc, sc );
  renderer.render( scene, camera );
} render();
