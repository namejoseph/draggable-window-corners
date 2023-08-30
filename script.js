let p1, p2, p3, p4;
let mouseChecker;
let draggedPoint = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  p1 = createVector((windowWidth / 3), (windowHeight / 3));
  p2 = createVector((windowWidth / 3 * 2), (windowHeight / 3));
  p3 = createVector((windowWidth / 3), (windowHeight / 3 * 2));
  p4 = createVector((windowWidth / 3 * 2), (windowHeight / 3 * 2));
}

// Add touch event listeners
canvas = document.querySelector('canvas');
canvas.addEventListener('touchstart', touchStarted);
canvas.addEventListener('touchmove', touchMoved);
canvas.addEventListener('touchend', touchEnded);

function draw() {
  background(220);
  crazyBackground();
  fill(0);
  noStroke();
  drawTrapezoids();
  renderMouse();
}

function drawTrapezoids() {
   beginShape();
  vertex(0, 0);
  vertex(windowWidth, 0);
  vertex(p2.x, p2.y);
  vertex(p1.x, p1.y);
  endShape(CLOSE);

   beginShape();
  vertex(0, 0);
   vertex(p1.x, p1.y);
  vertex(p3.x, p3.y);
  vertex(0, windowHeight);
  endShape(CLOSE);

   beginShape();
  vertex(p4.x, p4.y);
  vertex(p2.x, p2.y);
  vertex(windowWidth, 0);
  vertex(windowWidth, windowHeight);
  endShape(CLOSE);

   beginShape();
  vertex(0, windowHeight);
  vertex(p3.x, p3.y);
   vertex(p4.x, p4.y);
  vertex(windowWidth, windowHeight);
  endShape(CLOSE);
}

function mousePressed() {
  // Check if the mouse is near any point
  let tolerance = 15;
  if (dist(mouseX, mouseY, p1.x, p1.y) < tolerance) {
    draggedPoint = p1;
  } else if (dist(mouseX, mouseY, p2.x, p2.y) < tolerance) {
    draggedPoint = p2;
  } else if (dist(mouseX, mouseY, p3.x, p3.y) < tolerance) {
    draggedPoint = p3;
  } else if (dist(mouseX, mouseY, p4.x, p4.y) < tolerance) {
    draggedPoint = p4;
  }
}

function mouseDragged() {
  if (draggedPoint) {
    draggedPoint.x = mouseX;
    draggedPoint.y = mouseY;
  }
}

function mouseReleased() {
  draggedPoint = null;
}

function crazyBackground() {
  let squareSize = 8; // Adjust this value to control the size of the squares
  
  for (let i = 0; i < windowHeight / squareSize; i++) {
    for (let j = 0; j < windowWidth / squareSize; j++) {
      let fillColor = color(random(255), 75, random(255));
      fill(fillColor);
      noStroke(); // Turn off stroke to have filled squares
      
      rect(j * squareSize, i * squareSize, squareSize, squareSize);
    }
  }
}

function touchStarted(event) {
  let tolerance = 15;
  let touchX = event.touches[0].clientX - canvas.getBoundingClientRect().left;
let touchY = event.touches[0].clientY - canvas.getBoundingClientRect().top;

  if (dist(touchX, touchY, p1.x, p1.y) < tolerance) {
    draggedPoint = p1;
  } else if (dist(touchX, touchY, p2.x, p2.y) < tolerance) {
    draggedPoint = p2;
  } else if (dist(touchX, touchY, p3.x, p3.y) < tolerance) {
    draggedPoint = p3;
  } else if (dist(touchX, touchY, p4.x, p4.y) < tolerance) {
    draggedPoint = p4;
  }
}

function touchMoved(event) {
  if (draggedPoint) {
    let touchX = event.touches[0].clientX - canvas.getBoundingClientRect().left;
let touchY = event.touches[0].clientY - canvas.getBoundingClientRect().top;
    draggedPoint.x = touchX;
    draggedPoint.y = touchY;
  }
}

function touchEnded() {
  draggedPoint = null;
}

// ... (rest of your code)

function renderMouse() {
  checkCursor();
  if (mouseChecker == 0) {
    stroke("#bd4ba2");
strokeWeight(2);
fill("#0b4b6a");
beginShape();
vertex(mouseX, mouseY);
vertex(mouseX + 13, mouseY + 31);
vertex(mouseX + 17, mouseY + 20);
vertex(mouseX + 26, mouseY + 29);
vertex(mouseX + 28, mouseY + 26);
vertex(mouseX + 20, mouseY + 17);
    vertex(mouseX + 31, mouseY + 13);
vertex(mouseX, mouseY);
endShape(CLOSE);

  } else if (mouseChecker == 1) {
    fill("#fd4be3");
    rect(mouseX - 5, mouseY - 5, 10, 10);
    noFill();
    stroke("#dc4a1d");
    strokeWeight(3);
    line(mouseX - 16, mouseY - 16, mouseX - 16, mouseY - 11);
    line(mouseX - 16, mouseY - 16, mouseX - 11, mouseY - 16);
    line(mouseX + 16, mouseY + 16, mouseX + 16, mouseY + 11);
    line(mouseX + 16, mouseY + 16, mouseX + 11, mouseY + 16);
    line(mouseX + 16, mouseY - 16, mouseX + 11, mouseY - 16);
    line(mouseX + 16, mouseY - 16, mouseX + 16, mouseY - 11);
    line(mouseX - 16, mouseY + 16, mouseX - 16, mouseY + 11);
    line(mouseX - 16, mouseY + 16, mouseX - 11, mouseY + 16);
  }
}


function checkCursor() {
  let tolerance = 15;
  let isNearPoint1 = dist(mouseX, mouseY, p1.x, p1.y) < tolerance;
  let isNearPoint2 = dist(mouseX, mouseY, p2.x, p2.y) < tolerance;
  let isNearPoint3 = dist(mouseX, mouseY, p3.x, p3.y) < tolerance;
  let isNearPoint4 = dist(mouseX, mouseY, p4.x, p4.y) < tolerance;

  if (isNearPoint1 || isNearPoint2 || isNearPoint3 || isNearPoint4) {
    mouseChecker = 1;
  } else {
    mouseChecker = 0;
  }
}

