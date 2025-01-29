import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

const canvas = document.getElementById('canvas');

// 1. create the scene 
const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0');

// 2. add the camera 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 3. add objects 
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585' });
const dodmesh = new THREE.Mesh(geometry, material);

const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2); 
const boxMaterial = new THREE.MeshLambertMaterial({ color: '#B4B4B3', emissive: '#B4B4B3' });
const boxmesh = new THREE.Mesh(boxGeometry, boxMaterial);

boxmesh.position.y = -1.5;

scene.add(dodmesh);
scene.add(boxmesh); 

//4. add light 
const light = new THREE.SpotLight(0x006769, 100);
light.position.set(1,1,1);
scene.add(light);

// 5. render everything 
const renderer = new THREE.WebGLRenderer({ canvas }); 
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 6. add orbit controls 
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true; 

// 7. add animations 
function animate() {
  requestAnimationFrame(animate);

  dodmesh.rotation.x += 0.01;
  dodmesh.rotation.y += 0.01;

  boxmesh.rotation.y += 0.005;

  controls.update();
  renderer.render(scene, camera);

}

// 8. handle window resizing 
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight); 
});

animate(); 
