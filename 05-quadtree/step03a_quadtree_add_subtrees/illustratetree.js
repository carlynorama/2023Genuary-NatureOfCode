function drawSubTrees(parent) {
  parent.subTrees.forEach(tree => {
    if (tree.subTrees.length != 0) {
      drawSubTrees(tree);
    } else {
      drawBounds(tree);
    }
  });
}

function drawBounds(tree) {
  noFill();

  let box = tree.bounds;
  //console.log(box)
  rectMode(CORNER);
  rect(box.origin.x, box.origin.y, box.size.width, box.size.height);
}

function subdivideTest(tree) {
    let minX = tree.bounds.origin.x;
    let minY = tree.bounds.origin.y;
    //these are also our widths and heights
    let width = tree.bounds.size.width/2;
    let height = tree.bounds.size.height/2;

    let midX = width + minX;
    let midY = height + minY;

    let ne  = new Bounds(midX, minY, midX, midY);
    let se  = new Bounds(midX, midY, midX, midY);
    let sw  = new Bounds(minX, midY, midX, midY);
    let nw  = new Bounds(minX, minY, midX, midY);

    rectMode(CORNER);
    noFill();
    stroke(204, 0, 0);
    rect(ne.origin.x, ne.origin.y, ne.size.width, ne.size.height);
    stroke(0, 204, 0);
    rect(nw.origin.x, nw.origin.y, nw.size.width, nw.size.height);
    stroke(0, 0, 204);
    rect(se.origin.x, se.origin.y, se.size.width, se.size.height);
    // stroke(153, 204, 0);
    // rect(sw.origin.x, sw.origin.y, sw.size.width, sw.size.height);

}


class QuadTreeDrawer {
  constructor(tree) {
    this.tree = tree;
  }

  drawBounds() {
    let box = this.tree.bounds;
    rectMode(CORNER);
    rect(box.origin.x, box.origin.y, box.size.width, box.size.height);
  }

  drawPoint(point) {
    rect(point.x, point.y, 10, 10);
  }

  drawPoints() {
    rectMode(CENTER);
    fill(102);
    this.tree.points.forEach(point => {
      this.drawPoint(point);
    });
  }



}
