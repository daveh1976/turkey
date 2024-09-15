// Create scene and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set Background (Sky)
scene.background = new THREE.Color(0x87CEEB);  // Light blue sky

// Add Ambient and Directional Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);  // Soft white ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);  // Bright directional light (sunlight)
directionalLight.position.set(10, 10, 10);  // Position the light
directionalLight.castShadow = true;  // Enable shadows
scene.add(directionalLight);

// Add the Sun
createSun(scene);

// Create Ground
const ground = createGround();
scene.add(ground);

// Initialize Characters
const dog = createDog(scene);
const justin = createJustin(scene);
const gabrielle = createGabrielle(scene);
const skunk = createSkunk(scene);

// Store poop and treat objects in arrays
let poopObjects = [];
let treatObjects = [];

// Handle Keyboard Input
const keys = { left: false, right: false, up: false, space: false, p: false };

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') keys.right = true;
    if (event.key === 'ArrowLeft') keys.left = true;
    if (event.key === 'ArrowUp') keys.up = true;
    if (event.key === ' ') keys.space = true; // Bark
    if (event.key === 'p') keys.p = true; // Poop
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowRight') keys.right = false;
    if (event.key === 'ArrowLeft') keys.left = false;
    if (event.key === 'ArrowUp') keys.up = false;
    if (event.key === ' ') keys.space = false;
    if (event.key === 'p') keys.p = false;
});

// Function to create a poop object
function createPoop(x, y, z) {
    const poopGeometry = new THREE.SphereGeometry(0.2, 16, 16);  // Small sphere for poop
    const poopMaterial = new THREE.MeshStandardMaterial({ color: 0x6B4226 });  // Brown color
    const poop = new THREE.Mesh(poopGeometry, poopMaterial);
    
    poop.position.set(x, y, z);
    scene.add(poop);
    poopObjects.push(poop);  // Add poop to the array for collection later
    reduceAnxiety(3);  // Reduce anxiety by 3% when the dog poops
}

// Function to create a treat (rectangular shaped)
function createTreat(x, y, z) {
    const treatGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.2);  // Small rectangular treat
    const treatMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });  // Green treat
    const treat = new THREE.Mesh(treatGeometry, treatMaterial);
    treat.position.set(x, y, z);
    scene.add(treat);
    treatObjects.push(treat);  // Store the treat for later interaction
}

// Gabrielle drops treats for the dog to eat
function gabrielleDropTreats(gabrielle) {
    // Drop a treat at Gabrielle's position
    createTreat(gabrielle.position.x, gabrielle.position.y, gabrielle.position.z);
}

// Call this function every 5 seconds (or adjust the time as needed)
setInterval(() => gabrielleDropTreats(gabrielle), 5000);  // Gabrielle drops a treat every 5 seconds

// Function to handle dog eating treats
function checkDogEatsTreat(dog) {
    treatObjects.forEach((treat, index) => {
        const distance = dog.position.distanceTo(treat.position);  // Check distance between dog and treat
        if (distance < 0.5) {  // If the dog is close enough to the treat
            scene.remove(treat);  // Remove the treat from the scene
            treatObjects.splice(index, 1);  // Remove the treat from the array
            reduceAnxiety(20);  // Reduce the dog's anxiety by 20% when it eats the treat
        }
    });
}

// Function to reduce anxiety meter (you can adjust the logic here)
function reduceAnxiety(amount) {
    anxiety -= amount;  // Reduce anxiety by the specified amount
    if (anxiety < 0) anxiety = 0;  // Cap anxiety at 0%
    updateAnxietyMeter();  // Update the anxiety meter on the screen
}

// Function to increase anxiety meter
function increaseAnxiety(amount) {
    anxiety += amount;  // Increase anxiety by the specified amount
    if (anxiety > 100) anxiety = 100;  // Cap anxiety at 100%
    updateAnxietyMeter();  // Update the anxiety meter on the screen
}

// Anxiety Meter Tracking
let anxiety = 50;  // Start with some initial anxiety level
const anxietyBar = document.getElementById('anxietyBar');
function updateAnxietyMeter() {
    anxietyBar.style.width = anxiety + "%";
    if (anxiety > 100) anxiety = 100;  // Cap anxiety at 100%
}

// Skunk follows the dog slowly
function skunkChaseDog(skunk, dog) {
    const distance = skunk.position.distanceTo(dog.position);

    // If skunk is too far, it moves toward the dog
    if (distance > 1) {
        const direction = new THREE.Vector3().subVectors(dog.position, skunk.position).normalize();
        skunk.position.add(direction.multiplyScalar(0.02));  // Skunk moves slowly towards the dog
    }

    // If skunk touches the dog, increase anxiety by 10%
    if (distance < 0.5) {
        increaseAnxiety(10);  // Increase anxiety by 10%
    }
}

// Handle Dog Movement
function handleDogMovement(keys, dog) {
    let dogVelocityX = 0;
    let dogVelocityY = dog.position.y > 0.5 ? -0.02 : 0; // Gravity applied if the dog is above the ground
    let isJumping = dog.position.y > 0.5; // Check if dog is in the air

    // Handle left and right movement
    if (keys.left) dogVelocityX = -0.1;
    if (keys.right) dogVelocityX = 0.1;

    // Jumping logic (if 'up' arrow is pressed and the dog is not already in the air)
    if (keys.up && !isJumping) {
        dogVelocityY = 0.15;
        isJumping = true;
    }

    // Apply velocity to dog's position
    dog.position.x += dogVelocityX;
    dog.position.y += dogVelocityY;

    // Ensure dog doesn't fall below the ground
    if (dog.position.y < 0.5) {
        dog.position.y = 0.5;
    }
}

// Gabrielle follows the dog at a safe distance
function updateGabriellePosition(gabrielle, dog) {
    const safeDistance = 3; // Safe distance to maintain between Gabrielle and the dog
    const currentDistance = gabrielle.position.distanceTo(dog.position);

    // Only move Gabrielle if she's too far from the dog
    if (currentDistance > safeDistance) {
        // Calculate the direction from Gabrielle to the dog
        const direction = new THREE.Vector3().subVectors(dog.position, gabrielle.position).normalize();

        // Move Gabrielle towards the dog, but maintain safe distance
        gabrielle.position.add(direction.multiplyScalar(0.05)); // Adjust speed as necessary
    }
}

// Justin moves toward and picks up poop
function justinCollectPoop() {
    poopObjects.forEach((poop, index) => {
        if (poop) {
            justin.position.x = poop.position.x;
            justin.position.z = poop.position.z;
            scene.remove(poop);  // Remove the poop after Justin "collects" it
            poopObjects.splice(index, 1);  // Remove from the array
        }
    });
}

// Poop collection every 10 seconds
setInterval(justinCollectPoop, 10000);

// Custom Camera Controls
let isCameraDragging = false;  // Renamed variable to avoid conflicts
let previousMousePosition = { x: 0, y: 0 };
let dogCameraAngleX = 0;  // Renamed to dogCameraAngleX to avoid conflicts
let dogCameraAngleY = 0;  // Renamed to dogCameraAngleY to avoid conflicts
let dogCameraDistance = 10;  // Renamed to dogCameraDistance to avoid conflicts

// Mouse drag to rotate the camera
document.addEventListener('mousedown', function(event) {
    isCameraDragging = true;  // Use renamed variable
});

document.addEventListener('mousemove', function(event) {
    if (isCameraDragging) {  // Use renamed variable
        const deltaX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const deltaY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        dogCameraAngleX += deltaX * 0.01;
        dogCameraAngleY += deltaY * 0.01;
    }
});

document.addEventListener('mouseup', function() {
    isCameraDragging = false;  // Use renamed variable
});

// Mouse wheel to zoom in and out
document.addEventListener('wheel', function(event) {
    dogCameraDistance += event.deltaY * 0.01;
    if (dogCameraDistance < 5) dogCameraDistance = 5;  // Limit zoom-in
    if (dogCameraDistance > 20) dogCameraDistance = 20;  // Limit zoom-out
});

// Update Camera Position
function updateCameraPosition(camera, dog) {
    const offsetX = dogCameraDistance * Math.sin(dogCameraAngleX) * Math.cos(dogCameraAngleY);
    const offsetY = dogCameraDistance * Math.sin(dogCameraAngleY);
    const offsetZ = dogCameraDistance * Math.cos(dogCameraAngleX) * Math.cos(dogCameraAngleY);

    camera.position.set(dog.position.x + offsetX, dog.position.y + offsetY, dog.position.z + offsetZ);
    camera.lookAt(dog.position);
}

// Game Loop
function animate() {
    requestAnimationFrame(animate);

    // Handle dog movement
    handleDogMovement(keys, dog);

    // Gabrielle follows the dog
    updateGabriellePosition(gabrielle, dog);

    // Skunk follows and attacks the dog
    skunkChaseDog(skunk, dog);

    // Check if the dog eats any treats
    checkDogEatsTreat(dog);

    // If 'P' key is pressed, create poop at the dog's current position
    if (keys.p) {
        createPoop(dog.position.x, dog.position.y, dog.position.z);
        keys.p = false;  // Reset the key to prevent continuous pooping
    }

    // Update camera to follow the dog
    updateCameraPosition(camera, dog);

    // Render the scene
    renderer.render(scene, camera);
}

// Start the Game Loop
animate();
