import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { DoubleSide, EquirectangularRefractionMapping } from "three";

export const use1001Test = class App {
  constructor(options) {
    this.options = options;
    this.scene = null;
    this.camera = null;
    this.orbit = null;
    this.renderer = null;

    this.createScene();
    this.addEventListeners();
  }

  createScene() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.options.canvas,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.orbit = new OrbitControls(this.camera, this.renderer.domElement);

    // Camera positioning
    this.camera.position.set(0, 0, 200);
    // this.orbit.autoRotate = true;

    //load manager
    const loadManager = new THREE.LoadingManager();

    loadManager.onLoad = () => {};

    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.9;

    const loader = new SVGLoader();

    // loader.load("/svg/test-1.svg", (data) => {
    //   const group = new THREE.Group(); // Create a group to hold all SVG planes
    //   group.scale.multiplyScalar(0.25);

    //   group.position.x = 0;
    //   group.position.y = 0;

    //   const material = new THREE.MeshBasicMaterial({
    //     color: 0x00ff00,
    //     side: THREE.DoubleSide,
    //   });
    //   const geometry = new THREE.PlaneGeometry(50, 70); // Small plane for each point

    //   data.paths.forEach((path) => {
    //     const shapes = path.toShapes(true);

    //     shapes.forEach((shape) => {
    //       const points = shape.getPoints();
    //       points.forEach((point) => {
    //         const plane = new THREE.Mesh(geometry, material);
    //         plane.position.set(point.x, -point.y, 0); // Flip Y-axis
    //         group.add(plane);
    //       });
    //     });
    //   });

    //   //   Center the group at (0, 0, 0)
    //   const box = new THREE.Box3().setFromObject(group); // Calculate the bounding box of the group
    //   const center = box.getCenter(new THREE.Vector3());
    //   group.position.set(-center.x, -center.y, 0);

    //   this.scene.add(group); // Add the group to the scene
    // });

    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera);
      this.orbit.update();
    });
  }

  addEventListeners() {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
};
