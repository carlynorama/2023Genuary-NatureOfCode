//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 19-recordable-particles/02-particle-interfaces.ts
// written by calynorama 2023 Jan 18
// following: https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/4-particles/2-particle-emitters


let controller:ControlledCanvas;


//NOTE Particles have a dissipation factor to chill out the world.

const vehicleSize = 20; //same as docking distance
let vehicle:SimpleVehicle;
let target:Vector;


function setup() {
  
  controller = new ControlledCanvas(400, 400);
  controller.disableGalleryMode()
  controller.enableRecording()

  vehicle = SimpleVehicle.createStillVehicle(20,20);
  target = new Vector(width/2, height/2);

  background(0, 0, 80);

  ellipseMode(CENTER);
  colorMode(HSB);
  console.log("-------- DONE SETUP --------");
}
function draw() {
      background(0, 0, 80, 10);

      target = new Vector(mouseX, mouseY);
      

      vehicle.seek(target);
      vehicle.update();

      let distance = vehicle.position.distanceTo(target);
      
      showTarget(target, distance);
      showVehicle(vehicle, distance);

      controller.recordingWatcher();
}

function keyPressed() {
  controller.keyPressed();
}

function showDesireLineBetween(a:{x:number, y:number}, b:{x:number, y:number}) {
  line(a.x, a.y, b.x, b.y);
}

function showVehicle(vehicle:DrawableVehicle, distance:number) {
  //strokeWeight(2);
  push();
    translate(vehicle.x, vehicle.y);
    let hue = map(distance, 0, width, 240, 420);
    fill(hue, 60, 60);
    //TRIANGLE
    push();
      rotate(vehicle.heading);
      triangle(-vehicleSize, -vehicleSize / 2, -vehicleSize, vehicleSize / 2, vehicleSize, 0);
    pop();
  pop();

}

function showTarget(target:Vector, distance:number) {
  push();
  translate(target.x, target.y);
  let hue = map(distance, 0, width, 420, 240);
  fill(hue, 60, 60);
  circle(0,0, vehicleSize*2);
  pop();
}

