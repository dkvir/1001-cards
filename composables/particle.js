export const useParticle = class App {
  constructor([x, y]) {
    this.x = x + 0.1 * (Math.random() - 0.5);
    this.y = y + 0.1 * (Math.random() - 0.5);
    this.z = 1.5 * (Math.random() - 0.5);

    this.targetX = this.x + 2.5 * (Math.random() - 0.5);
    this.targetY = this.y + 1 * (Math.random() - 0.5);
    this.targetZ = Math.floor(Math.random() * 5);

    this.originalX = this.x;
    this.originalZ = this.z;
    this.originalY = this.y;

    this.isGrowing = false;
    this.toDelete = false;

    this.scale = 1;
  }
};
