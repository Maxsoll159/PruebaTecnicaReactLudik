export function DetectFigure(x, y, figures) {
  return figures.find((shape) => {
    switch (shape.type) {
      case "square":
        return (
          x > shape.x - shape.size / 2 &&
          x < shape.x + shape.size / 2 &&
          y > shape.y - shape.size / 2 &&
          y < shape.y + shape.size / 2
        );
      case "circle":
        const dist = Math.hypot(x - shape.x, y - shape.y);
        return dist <= shape.size / 2;
      case "triangle":
        return (
          x > shape.x - shape.size / 2 &&
          x < shape.x + shape.size / 2 &&
          y > shape.y - shape.size / 2 &&
          y < shape.y + shape.size / 2
        );
    }
  });
}
