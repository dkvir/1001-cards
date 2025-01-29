import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MapControls } from "three/addons/controls/MapControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { DoubleSide, EquirectangularRefractionMapping } from "three";
import { useImageStore } from "@/store/imagesLoaded";

export const useHorizontalSlider = class App {
  constructor(options) {
    this.options = options;
    this.imageStore = useImageStore();
    this.scene = null;
    this.camera = null;
    this.orbit = null;
    this.renderer = null;
    this.textCanvas = null;
    this.textCtx = null;
    this.dummy = null;
    this.stringBox = null;
    this.textInputEl = null;
    this.textureCoordinates = [];
    this.particles = [];
    this.stringBox = {
      wTexture: 0,
      wScene: 0,
      hTexture: 0,
      hScene: 0,
      caretPosScene: [],
    };
    this.string = "1001";
    this.fontName = "evexweb-Regular";
    this.textureFontSize = 50;
    this.fontScaleFactor = 0.15;
    this.instancedMesh = null;

    this.uvs = [
      { x: 0.0, y: 0.0, width: 0.0434782608696, height: 0.0434782608696 },
      {
        x: 0.0434782608696,
        y: 0.0,
        width: 0.0434782608696,
        height: 0.0434782608696,
      },
      // there are much more
    ];
    this.uvs2 = [
      { x: 0.0, y: 0.0, width: 0.0434782608696, height: 0.0434782608696 },
      {
        x: 0.0434782608696,
        y: 0.0,
        width: 0.0434782608696,
        height: 0.0434782608696,
      },
      //there are much more
    ];

    this.createScene();
    this.addEventListeners();
  }

  createScene() {
    this.textInputEl = document.querySelector("#text-input");

    this.textInputEl.style.fontSize = this.textureFontSize + "px";
    this.textInputEl.style.font =
      "100 " + this.textureFontSize + "px " + this.fontName;
    this.textInputEl.style.lineHeight = 1.1 * this.textureFontSize + "px";
    this.textInputEl.style.fontWeight = 100;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.options.canvas,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.setClearColor(0x000000);

    this.scene = new THREE.Scene();

    // this.camera = new THREE.PerspectiveCamera(
    //   45,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000
    // );
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );

    this.camera.position.set(0, 0, 1);

    this.orbit = new MapControls(this.camera, this.renderer.domElement);
    this.orbit.enableDamping = true;

    // this.orbit = new OrbitControls(this.camera, this.renderer.domElement);

    this.textCanvas = document.createElement("canvas");
    this.textCanvas.width = this.textCanvas.height = 0;
    this.textCtx = this.textCanvas.getContext("2d");

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    this.scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(-20, 10, 20);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = pointLight.shadow.mapSize.height = 2048;
    this.scene.add(pointLight);

    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    const trackingPlaneMaterial = new THREE.MeshBasicMaterial({
      visible: false,
    });
    const trackingPlane = new THREE.Mesh(planeGeometry, trackingPlaneMaterial);
    trackingPlane.position.z = 6;
    this.scene.add(trackingPlane);

    const shadowPlaneMaterial = new THREE.ShadowMaterial({
      opacity: 0.2,
    });

    const shadowPlaneMesh = new THREE.Mesh(planeGeometry, shadowPlaneMaterial);
    shadowPlaneMesh.position.z = -0.2;
    shadowPlaneMesh.receiveShadow = true;
    this.scene.add(shadowPlaneMesh);

    this.dummy = new THREE.Object3D();

    this.textInputEl.innerHTML = this.string;
    this.handleInput();
    this.refreshText();
    this.updateParticlesMatrices();

    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera);
      this.orbit.update();
    });
  }

  handleInput() {
    this.stringBox.wTexture = this.textInputEl.clientWidth;
    this.stringBox.wScene = this.stringBox.wTexture * this.fontScaleFactor;
    this.stringBox.hTexture = this.textInputEl.clientHeight;
    this.stringBox.hScene = this.stringBox.hTexture * this.fontScaleFactor;
    this.stringBox.caretPosScene = getCaretCoordinates().map(
      (c) => c * this.fontScaleFactor
    );

    function getCaretCoordinates() {
      const range = window.getSelection().getRangeAt(0);
      const rects = range.getClientRects();
      if (rects[0]) {
        return [rects[0].left, rects[0].top];
      } else {
        document.execCommand("selectAll", false, null);
        return [0, 0];
      }
    }
  }

  refreshText() {
    this.sampleCoordinates();

    this.particles = this.textureCoordinates.map((c, cIdx) => {
      const x = c.x * this.fontScaleFactor;
      const y = c.y * this.fontScaleFactor;
      let p = new useParticle([x, y]);
      return p;
    });

    this.createInstancedMesh();
    this.makeTextFitScreen();
  }

  sampleCoordinates() {
    this.textCanvas.width = this.stringBox.wTexture;
    this.textCanvas.height = this.stringBox.hTexture;
    this.textCtx.font = "100 " + this.textureFontSize + "px " + this.fontName;
    this.textCtx.fillStyle = "#2a9d8f";
    this.textCtx.clearRect(0, 0, this.textCanvas.width, this.textCanvas.height);

    this.textCtx.fillText(this.string, 0, 0.8 * this.stringBox.hTexture);

    // Image data to 2d array
    const imageData = this.textCtx.getImageData(
      0,
      0,
      this.textCanvas.width,
      this.textCanvas.height
    );
    const imageMask = Array.from(
      Array(this.textCanvas.height),
      () => new Array(this.textCanvas.width)
    );
    for (let i = 0; i < this.textCanvas.height; i++) {
      for (let j = 0; j < this.textCanvas.width; j++) {
        imageMask[i][j] =
          imageData.data[(j + i * this.textCanvas.width) * 4] > 0;
      }
    }

    for (let i = 0; i < this.textCanvas.height; i++) {
      for (let j = 0; j < this.textCanvas.width; j++) {
        if (imageMask[i][j]) {
          this.textureCoordinates.push({
            x: j,
            y: i,
            old: false,
          });
        }
      }
    }
  }

  createInstancedMesh() {
    const textureLoader = new THREE.TextureLoader();
    const textureAtlas = textureLoader.load("/images/atlas_1-min.png");
    const textureAtlas2 = textureLoader.load("/images/atlas_2-min.png");

    const material = new THREE.MeshBasicMaterial();
    const geometry = new THREE.PlaneGeometry(0.09, 0.2);

    this.instancedMesh = new THREE.InstancedMesh(
      geometry,
      material,
      this.particles.length
    );

    this.scene.add(this.instancedMesh);

    this.instancedMesh.position.x = -0.5 * this.stringBox.wScene;
    this.instancedMesh.position.y = -0.6 * this.stringBox.hScene;

    this.instancedMesh.castShadow = true;
  }

  updateParticlesMatrices() {
    let idx = 0;
    this.particles.forEach((p) => {
      this.dummy.position.set(p.x, this.stringBox.hScene - p.y, p.z);
      this.dummy.scale.set(p.scale, p.scale, p.scale);
      this.dummy.updateMatrix();
      this.instancedMesh.setMatrixAt(idx, this.dummy.matrix);
      idx++;
    });
    this.instancedMesh.instanceMatrix.needsUpdate = true;
  }

  makeTextFitScreen() {
    const fov = this.camera.fov * (Math.PI / 180);
    const fovH = 2 * Math.atan(Math.tan(fov / 2) * this.camera.aspect);
    const dx = Math.abs((0.7 * this.stringBox.wScene) / Math.tan(0.5 * fovH));
    const dy = Math.abs((0.6 * this.stringBox.hScene) / Math.tan(0.5 * fov));
    const factor = Math.max(dx, dy) / this.camera.position.length();
    if (factor > 1) {
      this.camera.position.x *= factor;
      this.camera.position.y *= factor;
      this.camera.position.z *= factor;
    }
  }

  addEventListeners() {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
};
