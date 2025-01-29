export const useParticle = class App {
  constructor([x, y]) {
    this.x = x + 0.1 * (Math.random() - 0.5);
    this.y = y + 0.1 * (Math.random() - 0.5);
    // this.z = z + 0.1 * (Math.random() - 0.5);
    this.z = 1.5 * (Math.random() - 0.5);

    this.isGrowing = false;
    this.toDelete = false;

    this.scale = 1;
  }
};
