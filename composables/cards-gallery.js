import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MapControls } from "three/addons/controls/MapControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { DoubleSide, EquirectangularRefractionMapping } from "three";
import { useTextureStore } from "@/store/texture";

export const useCardsGallery = class App {
  constructor(options) {
    this.options = options;
    this.textureStore = useTextureStore();
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
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(1, 1);
    this.prevCameraZ = null;

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
    this.renderer.setClearColor(0xf9f9f9);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      50000
    );

    this.camera.position.set(0, 0, 1);
    this.prevCameraZ = this.camera.position.z;

    this.orbit = new MapControls(this.camera, this.renderer.domElement);
    this.orbit.enableDamping = true;
    this.orbit.dampingFactor = 0.05;
    this.orbit.screenSpacePanning = true;
    this.orbit.minDistance = 0.6;
    this.orbit.maxDistance = 15;
    this.orbit.maxPolarAngle = Math.PI / 2;

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

      if (this.textureStore.textureIndex !== null) return;

      const instanceOpacity =
        this.instancedMesh.geometry.attributes.instanceOpacity.array;
      for (let i = 0; i < instanceOpacity.length; i++) {
        instanceOpacity[i] = 1.0; // Set opacity to 1 (fully opaque) for all instances
      }

      if (intersection.length > 0) {
        const instanceId = intersection[0].instanceId;
        instanceOpacity[instanceId] = 0.8;
        this.instancedMesh.geometry.attributes.instanceOpacity.needsUpdate = true;
      } else {
        this.instancedMesh.geometry.attributes.instanceOpacity.needsUpdate = true;
      }
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

    // Load the texture
    const texture = textureLoader.load("/images/five/atlas_1.png");

    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;

    // Shader material to handle UV mapping per instance
    const material = new THREE.ShaderMaterial({
      uniforms: {
        textureAtlas: { value: texture },
        instanceOpacity: { value: 1.0 }, // Add opacity uniform for instance
      },
      vertexShader: `
        attribute vec2 instanceUVOffset;  // UV offset for each instance
        attribute float instanceOpacity;  // Opacity for each instance

        varying vec2 vUv;  // Varying UVs passed to the fragment shader
        varying float vOpacity;  // Varying opacity passed to the fragment shader

        void main() {
          vUv = uv * vec2(0.0625) + instanceUVOffset;
          vOpacity = instanceOpacity;  // Pass opacity value to fragment shader
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
      uniform sampler2D textureAtlas;  // Texture atlas for instances
      varying vec2 vUv;  // UV coordinates for each instance
      varying float vOpacity;  // Opacity for each instance

      void main() {
        vec4 color = texture2D(textureAtlas, vUv);  // Get texture color
        color.a *= vOpacity;  // Apply opacity to alpha channel
        gl_FragColor = color;  // Final color with adjusted alpha
      }
      `,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(
      0.2 * (450 / 630),
      0.2 * (630 / 450)
    );

    const instanceCount = this.particles.length;
    const uvsLength = this.uvs.length; // Get total available UV mappings
    const instanceUVOffsets = new Float32Array(instanceCount * 2); // 2D UV offset per instance

    const instanceOpacity = new Float32Array(instanceCount);

    // Assign UV offsets, cycling through `this.uvs` using modulo
    for (let i = 0; i < instanceCount; i++) {
      instanceOpacity[i] = 1.0; // Set initial opacity to 1 (fully opaque)

      const uvIndex = i % uvsLength; // Wrap around if `i` exceeds `uvs.length`
      instanceUVOffsets[i * 2] = this.uvs[uvIndex].x; // X offset in atlas
      instanceUVOffsets[i * 2 + 1] = this.uvs[uvIndex].y; // Y offset in atlas
    }

    geometry.setAttribute(
      "instanceOpacity",
      new THREE.InstancedBufferAttribute(instanceOpacity, 1)
    );

    // Attach UV offsets as an instanced attribute
    geometry.setAttribute(
      "instanceUVOffset",
      new THREE.InstancedBufferAttribute(instanceUVOffsets, 2)
    );

    this.instancedMesh = new THREE.InstancedMesh(
      geometry,
      material,
      instanceCount
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
    document.addEventListener("mousemove", (event) => {
      event.preventDefault();

      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    this.options.canvas.addEventListener("click", (event) => {
      if (this.textureStore.textureIndex !== null) return;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersections = this.raycaster.intersectObject(this.instancedMesh);

      if (intersections.length > 0) {
        const instanceId = intersections[0].instanceId;
        this.textureStore.changeTextureIndex(instanceId);
      }
    });
    this.orbit.addEventListener("change", () => {
      if (this.camera.position.z > 10) return;

      const currentZ = this.camera.position.z;

      // Determine if camera is zooming in or out
      const isZoomingIn = currentZ < this.prevCameraZ; // Zooming in (decreasing Z)
      const isZoomingOut = currentZ > this.prevCameraZ; // Zooming out (increasing Z)

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        if (isZoomingIn) {
          p.x = THREE.MathUtils.lerp(p.x, p.targetX, 0.01);
          p.z = THREE.MathUtils.lerp(p.z, p.targetZ, 0.01);
        } else if (isZoomingOut) {
          p.x = THREE.MathUtils.lerp(p.x, p.originalX, 0.01);
          p.z = THREE.MathUtils.lerp(p.z, p.originalZ, 0.01);
        }

        // Update the instance matrix
        this.dummy.position.set(p.x, this.stringBox.hScene - p.y, p.z);
        this.dummy.updateMatrix();
        this.instancedMesh.setMatrixAt(i, this.dummy.matrix);
      }

      this.instancedMesh.instanceMatrix.needsUpdate = true;

      // Store current Z for next frame comparison
      this.prevCameraZ = currentZ;
    });
  }
};
