function threeInit({ width, height, root }) {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
        75, width / height, 0.1, 1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    
    const loader = new THREE.GLTFLoader();

    document.querySelector(root).appendChild(renderer.domElement)
    return { scene, camera, renderer, loader }
}

function render(scene, camera, renderer, callback) {
    function animate() {
        requestAnimationFrame(animate);
        callback(); 
        renderer.render(scene, camera);
    }; animate();
}

const { scene, camera, renderer, loader } = threeInit({
    width: window.innerWidth, height: window.innerHeight, root: '.root'
}), controls = new THREE.OrbitControls(camera, renderer.domElement),
    ambient = new THREE.AmbientLight(0xFFFFFF, 0.7),
    pointLight = new THREE.PointLight(0xFFFFFF, 1);

const pointLightHelper = new THREE.PointLightHelper(pointLight);

pointLight.position.y = 6;
pointLight.position.x -= -1;

scene.add(ambient);
scene.add(pointLight);
scene.add(pointLightHelper);

camera.position.set(-15, 5, -10);

controls.autoRotate = true;
controls.autoRotateSpeed = 1;
        
loader.load('assets/3D/snow/scene.gltf', (gltf) => {    
    // gltf.scene.scale.set(0.01, 0.01, 0.01)
    scene.add(gltf.scene);

    window.addEventListener('resize', onWindowResize);
    render(scene, camera, renderer, () => {
        controls.update()
    });
});

function onWindowResize(e) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight)
}