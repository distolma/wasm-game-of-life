import { Universe } from "wasm-game-of-life";
import { memory } from "wasm-game-of-life/game_of_life_bg";


const canvas = document.getElementById("game-of-life-canvas");
const dpr = window.devicePixelRatio || 1;
const cell_size = 5; // 5px
const width = 102;
const height = 102;
const universe = Universe.new(width, height);

canvas.style.width = '700px';
canvas.height = ((cell_size + 1) * height + 1) * dpr;
canvas.width = ((cell_size + 1) * width + 1) * dpr;
const ctx = canvas.getContext('2d');
ctx.scale(dpr, dpr);

const renderLoop = () => {
  universe.tick();
  drawGrid();
  drawCells();

  requestAnimationFrame(renderLoop);
};
requestAnimationFrame(renderLoop);

const drawGrid = () => {
  ctx.beginPath();
  ctx.strokeStyle = '#ccc';

  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (cell_size + 1) + 1, 0);
    ctx.lineTo(i * (cell_size + 1) + 1, (cell_size + 1) * height + 1);
  }

  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0, j * (cell_size + 1) + 1);
    ctx.lineTo((cell_size + 1) * width + 1, j * (cell_size + 1) + 1);
  }

  ctx.stroke();
}

const getIndex = (row, column) => row * width + column;

const bitIsSet = (n, arr) => {
  const byte = Math.floor(n / 8);
  const mask = 1 << (n % 8);
  return (arr[byte] & mask) === mask;
};

const drawCells = () => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, (width * height) / 8);

  ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);

      ctx.fillStyle = bitIsSet(idx, cells) ? '#000' : '#fff';

      ctx.fillRect(col * (cell_size + 1) + 1, row * (cell_size + 1) + 1, cell_size, cell_size);
    }
  }

  ctx.stroke();
}