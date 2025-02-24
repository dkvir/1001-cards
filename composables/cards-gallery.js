import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MapControls } from "three/addons/controls/MapControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { DoubleSide, EquirectangularRefractionMapping } from "three";
import { useTextureStore } from "@/store/texture";
import { createLimitPan } from "@ocio/three-camera-utils";
import { useTextureLoaderStore } from "@/store/texturesLoaded";
import gsap from "gsap";

export const useCardsGallery = class App {
  constructor(options) {
    this.options = options;
    this.textureStore = useTextureStore();
    this.textureLoader = useTextureLoaderStore();
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
    };
    this.string = "1001";
    this.fontName = "evexweb-Regular";
    this.textureFontSize = 120;
    this.fontScaleFactor = 0.15;
    this.instancedMesh = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(1, 1);

    this.mDragging = false;
    this.mDown = false;

    // Add properties for scale animation
    this.hoveredInstanceId = null;
    this.baseScale = 1.0;
    this.hoverScale = 1.2;
    this.scaleAnimations = new Map(); // Store active animations
    this.instanceScales = new Map(); // Store current scales

    this.uvs = useUvCoordinates();

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
      alpha: true,
      canvas: this.options.canvas,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100000
    );

    this.camera.position.set(0, 0, 50);

    this.orbit = new MapControls(this.camera, this.renderer.domElement);
    this.orbit.enableDamping = true;
    this.orbit.dampingFactor = 0.05;
    this.orbit.screenSpacePanning = true;
    this.orbit.zoomToCursor = true;
    this.orbit.minDistance = 0.6;
    this.orbit.maxDistance = 50;
    this.orbit.maxPolarAngle = Math.PI / 2;
    this.enableRotate = false;
    this.orbit.enableZoom = true;

    if (window.innerWidth <= 1024 && window.innerWidth > 540) {
      this.orbit.maxDistance = 70;
    } else if (window.innerWidth <= 540) {
      this.orbit.maxDistance = 100;
    }

    this.orbit.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      RIGHT: THREE.MOUSE.PAN,
    };
    this.orbit.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_PAN };

    this.limitPan = createLimitPan({
      camera: this.camera,
      controls: this.orbit,
      THREE,
    });

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
      this.raycaster.setFromCamera(this.mouse, this.camera);

      const intersection = this.raycaster.intersectObject(this.instancedMesh);

      if (
        this.textureStore.textureIndex !== null ||
        this.textureLoader.mountedTexture !== null
      )
        return;

      // Handle hover state changes
      if (intersection.length > 0) {
        const instanceId = intersection[0].instanceId;
        if (this.hoveredInstanceId !== instanceId) {
          // Reset previous hover if exists
          if (this.hoveredInstanceId !== null) {
            this.animateScale(this.hoveredInstanceId, this.baseScale);
          }
          // Set new hover
          this.hoveredInstanceId = instanceId;
          this.textureStore.togglechangeCursor(true);
          this.animateScale(instanceId, this.hoverScale);
        }
      } else if (this.hoveredInstanceId !== null) {
        // Reset hover when no intersection
        this.animateScale(this.hoveredInstanceId, this.baseScale);
        this.textureStore.togglechangeCursor(false);
        this.hoveredInstanceId = null;
      }

      // Update all instance matrices that have active animations
      this.updateAnimatedInstances();
      this.orbit.update();
    });
  }

  handleInput() {
    this.stringBox.wTexture = this.textInputEl.clientWidth;
    this.stringBox.wScene = this.stringBox.wTexture * this.fontScaleFactor;
    this.stringBox.hTexture = this.textInputEl.clientHeight;
    this.stringBox.hScene = this.stringBox.hTexture * this.fontScaleFactor;
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
        if (
          i % Math.floor(Math.random() * 5) == 0 &&
          j % Math.floor(Math.random() * 5) == 0
        ) {
          imageMask[i][j] =
            imageData.data[(j + i * this.textCanvas.width) * 4] > 0;
        }
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
    // Ensure the texture is loaded and set filtering
    this.textureLoader.loadedTexture.magFilter = THREE.NearestFilter;
    this.textureLoader.loadedTexture.minFilter = THREE.NearestFilter;

    // Shader material to handle per-instance UV mapping
    const material = new THREE.ShaderMaterial({
      uniforms: {
        textureAtlas: { value: this.textureLoader.loadedTexture },
      },
      vertexShader: `
        attribute vec4 instanceUVOffset;  // x, y, width, height

        varying vec2 vUv;

        void main() {
            vUv = vec2(
                instanceUVOffset.x + uv.x * instanceUVOffset.z,
                instanceUVOffset.y + uv.y * instanceUVOffset.w
            );

            gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D textureAtlas;

        varying vec2 vUv;

        void main() {
            vec4 color = texture2D(textureAtlas, vUv);

            // Completely remove transparent pixels
            if (color.a < 0.1) discard;

            gl_FragColor = color;
        }
      `,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(
      0.35 * (500 / 700),
      0.25 * (700 / 500)
    );

    const instanceCount = this.particles.length;
    const uvsLength = this.uvs.length;
    const instanceUVData = new Float32Array(instanceCount * 4);

    for (let i = 0; i < instanceCount; i++) {
      const uvIndex = i % uvsLength;
      const uv = this.uvs[uvIndex];

      instanceUVData[i * 4] = uv.x;
      instanceUVData[i * 4 + 1] = uv.y;
      instanceUVData[i * 4 + 2] = uv.width;
      instanceUVData[i * 4 + 3] = uv.height;
    }

    geometry.setAttribute(
      "instanceUVOffset",
      new THREE.InstancedBufferAttribute(instanceUVData, 4)
    );

    this.instancedMesh = new THREE.InstancedMesh(
      geometry,
      material,
      instanceCount
    );
    this.scene.add(this.instancedMesh);

    this.instancedMesh.position.x = -0.5 * this.stringBox.wScene;
    this.instancedMesh.position.y = -0.3 * this.stringBox.hScene;

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
  updateAnimatedInstances() {
    this.instanceScales.forEach((scale, instanceId) => {
      const matrix = new THREE.Matrix4();
      this.instancedMesh.getMatrixAt(instanceId, matrix);

      const position = new THREE.Vector3();
      position.setFromMatrixPosition(matrix);

      this.dummy.position.copy(position);
      this.dummy.scale.set(scale, scale, scale);
      this.dummy.updateMatrix();

      this.instancedMesh.setMatrixAt(instanceId, this.dummy.matrix);
    });

    if (this.instanceScales.size > 0) {
      this.instancedMesh.instanceMatrix.needsUpdate = true;
    }
  }

  animateScale(instanceId, targetScale) {
    if (this.scaleAnimations.has(instanceId)) {
      this.scaleAnimations.get(instanceId).kill();
    }

    const currentScale = this.instanceScales.get(instanceId) || this.baseScale;

    const scaleObj = { scale: currentScale };

    const animation = gsap.to(scaleObj, {
      scale: targetScale,
      duration: 0.3,
      ease: "power2.out",
      onUpdate: () => {
        this.instanceScales.set(instanceId, scaleObj.scale);
      },
      onComplete: () => {
        this.scaleAnimations.delete(instanceId);
        if (scaleObj.scale === this.baseScale) {
          this.instanceScales.delete(instanceId);
        }
      },
    });

    this.scaleAnimations.set(instanceId, animation);
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
    document.addEventListener("mousemove", (event) => {
      event.preventDefault();

      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    this.options.canvas.addEventListener("click", (event) => {
      if (
        this.textureStore.textureIndex !== null ||
        this.mDragging ||
        this.textureLoader.mountedTexture !== null
      )
        return;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersections = this.raycaster.intersectObject(this.instancedMesh);

      if (intersections.length > 0) {
        const instanceId = intersections[0].instanceId;
        this.textureStore.changeTextureIndex(instanceId);
      }
    });
    this.orbit.addEventListener("change", () => {
      this.limitPan({
        minX: -25,
        maxX: 25,
        maxY: 15,
        minY: -15,
      });
    });

    window.addEventListener("mousedown", () => {
      this.mDown = true;
      if (this.textureLoader.mountedTexture == null) {
        this.textureLoader.changeIsZoomedStatus(false);
      }
    });
    window.addEventListener("touchstart", () => {
      if (this.textureLoader.mountedTexture == null) {
        this.textureLoader.changeIsZoomedStatus(false);
      }
    });
    window.addEventListener("mousemove", () => {
      if (this.mDown) {
        this.mDragging = true;
      }
    });
    window.addEventListener("mouseup", () => {
      setTimeout(() => {
        this.mDown = false;
        this.mDragging = false;
      }, 250);
    });
  }

  //autozoom function :3
  zoomToPoint(
    targetPoint = new THREE.Vector3(-2, 0, 0),
    targetZoom = 5,
    duration = 2
  ) {
    const startPosition = this.camera.position.clone();

    gsap.to(this.camera.position, {
      x: targetPoint.x,
      y: targetZoom,
      z: targetZoom,
      duration: duration,
      ease: "power2.inOut",
      onUpdate: () => {
        this.orbit.target.set(
          this.camera.position.x,
          this.camera.position.y,
          0
        );
        this.orbit.update();
      },
      onComplete: () => {
        this.textureLoader.changeIsZoomedStatus(true);
      },
    });
  }
};
