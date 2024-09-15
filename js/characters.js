// Helper function to create a box-shaped body
function createBody(width, height, depth, color, x, y, z) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhongMaterial({ color });  // Switch to Phong material
    const body = new THREE.Mesh(geometry, material);
    body.position.set(x, y, z);
    return body;
}

// Helper function to create eyes
function createEye(x, y, z) {
    const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });  // Phong material for eyes
    const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye.position.set(x, y, z);
    return eye;
}

// Helper function to create legs
function createLegs(dog) {
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });  // Phong material for legs

    const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontLeftLeg.position.set(0.5, 0, 0.3);

    const frontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontRightLeg.position.set(0.5, 0, -0.3);

    const backLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    backLeftLeg.position.set(-0.5, 0, 0.3);

    const backRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    backRightLeg.position.set(-0.5, 0, -0.3);

    return [frontLeftLeg, frontRightLeg, backLeftLeg, backRightLeg];
}

// Helper function to create the tail
function createTail(dog) {
    const tailGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.6);
    const tailMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });  // Phong material for tail
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.rotation.z = Math.PI / 4;
    tail.position.set(-0.9, 0.7, 0);
    return tail;
}

// Create the Dog (Chihuahua) with Moving Legs and Triangular Eyes
function createDog(scene) {
    const dog = new THREE.Group();
    
    // Body
    const bodyGeometry = new THREE.BoxGeometry(1.5, 0.8, 0.8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0.5, 0);
    dog.add(body);

    // Head
    const headGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.set(0.9, 1.2, 0);
    dog.add(head);

    // Ears
    const earGeometry = new THREE.BoxGeometry(0.2, 0.3, 0.1);
    const leftEar = new THREE.Mesh(earGeometry, bodyMaterial);
    const rightEar = new THREE.Mesh(earGeometry, bodyMaterial);
    leftEar.position.set(1.2, 1.4, 0.4);
    rightEar.position.set(1.2, 1.4, -0.4);
    dog.add(leftEar, rightEar);

    // Triangular Eyes (using ConeGeometry)
    const eyeGeometry = new THREE.ConeGeometry(0.1, 0.2, 4);  // Triangle shape for the eyes
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });  // Black eyes
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);

    // Position and rotate the eyes
    leftEye.position.set(1.1, 1.3, 0.2);  // Left eye position
    leftEye.rotation.z = Math.PI / 2;  // Rotate to make it look triangular
    rightEye.position.set(1.1, 1.3, -0.2);  // Right eye position
    rightEye.rotation.z = Math.PI / 2;  // Rotate to make it look triangular

    dog.add(leftEye, rightEye);  // Add the eyes to the dog

    // Legs (4 legs)
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    const frontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    const backLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    const backRightLeg = new THREE.Mesh(legGeometry, legMaterial);

    frontLeftLeg.position.set(0.5, 0, 0.3);
    frontRightLeg.position.set(0.5, 0, -0.3);
    backLeftLeg.position.set(-0.5, 0, 0.3);
    backRightLeg.position.set(-0.5, 0, -0.3);

    dog.add(frontLeftLeg, frontRightLeg, backLeftLeg, backRightLeg);

    // Tail
    const tailGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.6);
    const tail = new THREE.Mesh(tailGeometry, legMaterial);
    tail.rotation.z = Math.PI / 4;
    tail.position.set(-0.9, 0.7, 0);
    dog.add(tail);

    scene.add(dog);
    return dog;
}
// Create Justin character
function createJustin(scene) {
    const justin = new THREE.Group();
    
    // Body and head
    const body = createBody(1, 2, 0.6, 0x0000ff, 0, 1, 0);
    const head = createBody(0.6, 0.6, 0.6, 0xffcc99, 0, 2, 0);
    
    // Eyes
    const leftEye = createEye(-0.2, 1.8, 0.3);
    const rightEye = createEye(0.2, 1.8, 0.3);
    
    // Label
    const label = createLabel("Justin", 0, 3, 0);

    justin.add(body, head, leftEye, rightEye, label);
    scene.add(justin);

    return justin;
}

// Create Gabrielle who follows the dog
function createGabrielle(scene) {
    const gabrielle = new THREE.Group();

    // Head (Sphere with red material)
    const headGeometry = new THREE.SphereGeometry(0.3, 16, 16);  // Sphere for head
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffcc99 });  // Skin color
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 0.8, 0);
    gabrielle.add(head);

    // Hair (BoxGeometry for hair, red color)
    const hairGeometry = new THREE.BoxGeometry(0.6, 0.3, 0.5);  // Box for hair
    const hairMaterial = new THREE.MeshPhongMaterial({ color: 0xff4500 });  // Red hair
    const hair = new THREE.Mesh(hairGeometry, hairMaterial);
    hair.position.set(0, 1.0, 0);  // Position the hair on top of the head
    gabrielle.add(hair);

    // Body (Scaled down)
    const bodyGeometry = new THREE.BoxGeometry(0.5, 1, 0.3);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xff6347 });  // Red body
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    gabrielle.add(body);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.1, 0.9, 0.2);
    rightEye.position.set(0.1, 0.9, 0.2);
    gabrielle.add(leftEye, rightEye);

    // Label for Gabrielle
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 128;
    labelCanvas.height = 32;
    const context = labelCanvas.getContext('2d');
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText('Gabrielle', 10, 20);
    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelMaterial = new THREE.SpriteMaterial({ map: labelTexture });
    const label = new THREE.Sprite(labelMaterial);
    label.position.set(0, 1.5, 0);
    gabrielle.add(label);

    gabrielle.position.set(5, 0.5, 0);
    scene.add(gabrielle);
    return gabrielle;
}

// Create a realistic skunk with legs and a tail
function createSkunk(scene) {
    const skunk = new THREE.Group();

    // Body
    const bodyGeometry = new THREE.BoxGeometry(1, 0.5, 0.5);  // Skunk body shape
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });  // Black color
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0.5, 0);  // Adjust body height
    skunk.add(body);

    // White stripe on the back
    const stripeGeometry = new THREE.BoxGeometry(0.6, 0.1, 0.1);  // Thin white stripe for the back
    const stripeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe.position.set(0, 0.75, 0);  // Place the stripe on top of the body
    skunk.add(stripe);

    // Legs (4 legs)
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5);  // Cylinders for the legs
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });  // Black legs
    const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    const frontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    const backLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    const backRightLeg = new THREE.Mesh(legGeometry, legMaterial);

    // Position the legs relative to the body
    frontLeftLeg.position.set(0.35, 0, 0.2);
    frontRightLeg.position.set(0.35, 0, -0.2);
    backLeftLeg.position.set(-0.35, 0, 0.2);
    backRightLeg.position.set(-0.35, 0, -0.2);

    skunk.add(frontLeftLeg, frontRightLeg, backLeftLeg, backRightLeg);

    // Tail (Bushy tail with a curve)
    const tailGeometry = new THREE.CylinderGeometry(0.2, 0.5, 1.5, 32);  // Larger and curved tail
    const tailMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });  // Black tail with white tip
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(-0.5, 1.25, 0);  // Position the tail behind the skunk
    tail.rotation.z = Math.PI / 4;  // Slightly raise and curve the tail for a bushy effect

    // Add white tip to the tail
    const tailTipGeometry = new THREE.SphereGeometry(0.2, 16, 16);  // White spherical tip for the tail
    const tailTipMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const tailTip = new THREE.Mesh(tailTipGeometry, tailTipMaterial);
    tailTip.position.set(0, 0.75, 0);  // Place at the end of the tail
    tail.add(tailTip);

    skunk.add(tail);  // Add the tail to the skunk

    scene.add(skunk);
    return skunk;
}

// Helper function to create a box-shaped body
function createBody(width, height, depth, color, x, y, z) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ color });
    const body = new THREE.Mesh(geometry, material);
    body.position.set(x, y, z);
    return body;
}

// Helper function to create eyes
function createEye(x, y, z) {
    const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye.position.set(x, y, z);
    return eye;
}

// Helper function to create legs
function createLegs(dog) {
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8);
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

    const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontLeftLeg.position.set(0.5, 0, 0.3);

    const frontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontRightLeg.position.set(0.5, 0, -0.3);

    const backLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    backLeftLeg.position.set(-0.5, 0, 0.3);

    const backRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    backRightLeg.position.set(-0.5, 0, -0.3);

    return [frontLeftLeg, frontRightLeg, backLeftLeg, backRightLeg];
}

// Helper function to create the tail
function createTail(dog) {
    const tailGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.6);
    const tailMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.rotation.z = Math.PI / 4;
    tail.position.set(-0.9, 0.7, 0);
    return tail;
}

// Helper function to create a label for characters
function createLabel(name, x, y, z) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(name, 10, 20);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const label = new THREE.Sprite(material);
    label.position.set(x, y, z);
    return label;
}

// Helper function to create the stripe on the skunk
function createStripe(width, height, depth, color, x, y, z) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ color });
    const stripe = new THREE.Mesh(geometry, material);
    stripe.position.set(x, y, z);
    return stripe;
}
