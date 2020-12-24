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
    ambient = new THREE.AmbientLight(0xFFEEFF, 1);

loader.load('assets/3D/snow/scene.gltf', (gltf) => {    
    scene.add(ambient);
    scene.add(gltf.scene);

    camera.position.set(-15, 5, 0);
    
    // gltf.scene.position.x = +25;
    // gltf.scene.position.y = -50;
    // gltf.scene.position.z = -10;
    
    const girl3D = gltf.scene.children[0];
    girl3D.rotation.z = 300;

    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;

    window.addEventListener('resize', onWindowResize);
    render(scene, camera, renderer, () => {
        controls.update()
        // girl3D.rotation.z += 0.01;
    });
});

function onWindowResize(e) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight)
}