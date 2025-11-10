function setup() {
  window_x = (windowWidth);
  window_y = (windowWidth*0.5625);
  createCanvas(window_x, window_y);
}

function draw() {
  background(150);
  container_width = window_y/14
  square(container_width, container_width, 3*container_width)
  square(container_width, 5*container_width, 3*container_width)
  square(container_width, 9*container_width, 3*container_width)
  square(21*container_width, container_width, 3*container_width)
  square(21*container_width, 5*container_width, 3*container_width)
  square(21*container_width, 9*container_width, 3*container_width)
}
