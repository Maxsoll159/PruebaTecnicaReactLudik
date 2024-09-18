export const  GenerateFiguresRandom = () => {
    const types = ["square", "circle", "triangle"];
    const type = types[Math.floor(Math.random() * types.length)];
    const x = Math.random() * (800 - 100) + 50;
    const y = -50;
    const size = Math.random() * 30 + 30;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    return { type, x, y, size, velocity: 0, color };
  }