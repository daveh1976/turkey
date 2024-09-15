function createGround() {
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    return ground;
}

function createSun(scene) {
    const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(-10, 15, -20);
    scene.add(sun);
}

function justinCollectPoop(poopObjects, justin, scene) {
    poopObjects.forEach((poop, index) => {
        if (poop) {
            justin.position.x = poop.position.x;
            justin.position.z = poop.position.z;
            scene.remove(poop);
            poopObjects.splice(index, 1);
        }
    });
}
