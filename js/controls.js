// Handle Keyboard Input
function handleKeyboardInput(keys) {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') keys.right = true;
        if (event.key === 'ArrowLeft') keys.left = true;
        if (event.key === 'ArrowUp') keys.up = true;
        if (event.key === ' ') keys.space = true;
        if (event.key === 'p') keys.p = true;
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowRight') keys.right = false;
        if (event.key === 'ArrowLeft') keys.left = false;
        if (event.key === 'ArrowUp') keys.up = false;
        if (event.key === ' ') keys.space = false;
        if (event.key === 'p') keys.p = false;
    });
}

// Camera Control Variables
let isDragging = false;
let cameraAngleX = 0;
let cameraAngleY = 0;
let cameraDistance = 10;

// Mouse drag to rotate the camera
document.addEventListener('mousedown', function(event) {
    isDragging = true;
});

document.addEventListener('mousemove', function(event) {
    if (isDragging) {
        const deltaX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const deltaY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        cameraAngleX += deltaX * 0.01;
        cameraAngleY += deltaY * 0.01;
    }
});

document.addEventListener('mouseup', function() {
    isDragging = false;
});

// Mouse wheel to zoom in and out
document.addEventListener('wheel', function(event) {
    cameraDistance += event.deltaY * 0.01;
    if (cameraDistance < 5) cameraDistance = 5;
    if (cameraDistance > 20) cameraDistance = 20;
});

// Update Camera Position
function updateCameraPosition(camera, dog) {
    const offsetX = cameraDistance * Math.sin(cameraAngleX) * Math.cos(cameraAngleY);
    const offsetY = cameraDistance * Math.sin(cameraAngleY);
    const offsetZ = cameraDistance * Math.cos(cameraAngleX) * Math.cos(cameraAngleY);

    camera.position.set(dog.position.x + offsetX, dog.position.y + offsetY, dog.position.z + offsetZ);
    camera.lookAt(dog.position);
}
