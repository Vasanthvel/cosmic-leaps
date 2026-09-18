"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type LayerConfig = {
  count: number;
  minRadius: number;
  maxRadius: number;
  minSize: number;
  maxSize: number;
  brightnessMin: number;
  brightnessMax: number;
  rotationSpeed: number;
  drift: number;
  color: string;
};

const CAMERA_CONFIG = {
  fov: 55,
  near: 0.1,
  far: 3000,
  maxForwardTravel: 120,
  maxX: 4,
  maxY: 3,
  maxPitch: THREE.MathUtils.degToRad(0.8),
  maxYaw: THREE.MathUtils.degToRad(1.2),
  maxRoll: THREE.MathUtils.degToRad(0.25),
  positionDamping: 0.08,
  scrollSmoothing: 0.08,
  velocitySmoothing: 0.12,
  maxVelocityMultiplier: 1.8,
  farParallax: 0.15,
  midParallax: 0.45,
  nearParallax: 1,
  galaxyParallax: 0.12,
  nebulaParallax: 0.2,
  maxStarSpeedMultiplier: 2.5,
};

const RADIAL_CONFIG = {
  activationVelocity: 0.3,
  fullVelocity: 0.85,
  maxRadialStrength: 1,
  nearMultiplier: 1,
  midMultiplier: 0.65,
  farMultiplier: 0.3,
  accelerationSmoothing: 0.1,
  returnSmoothing: 0.07,
  maxParticleSpeed: 3,
};

const GALAXY_HOP_CONFIG = {
  triggerThreshold: 0.08,
  cooldown: 0.8,
  duration: 2.2,
  preparationDuration: 0.4,
  arrivalDuration: 0.6,
};

type GalaxyHopState = "idle" | "preparing" | "hopping" | "arriving";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function easeProgress(progress: number) {
  return progress * progress * (3 - 2 * progress);
}

function getViewportScale() {
  const width = typeof window !== "undefined" ? window.innerWidth : 1440;
  const height = typeof window !== "undefined" ? window.innerHeight : 900;
  const minSize = Math.min(width, height);
  const viewportFactor = THREE.MathUtils.clamp(minSize / 800, 0.7, 1.25);
  return viewportFactor;
}

function createGlowTexture(color: string, alpha: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  const gradient = context.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    16,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2
  );

  gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
  gradient.addColorStop(0.18, `rgba(255, 255, 255, ${alpha * 0.85})`);
  gradient.addColorStop(0.35, color.replace(")", ", 0.24)").replace("rgb", "rgba") ?? color);
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createGalaxySprite(color: string, scale: number) {
  const spriteMap = createGlowTexture(color, 0.75);
  const material = new THREE.SpriteMaterial({
    map: spriteMap,
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const sprite = new THREE.Sprite(material);
  const constrainedScale = THREE.MathUtils.clamp(scale * getViewportScale(), 0.8, 9);
  sprite.scale.setScalar(constrainedScale);
  return sprite;
}

function createDestinationGalaxy(primaryColor: string, accentColor: string) {
  const group = new THREE.Group();
  const core = createGalaxySprite(primaryColor, window.innerWidth < 768 ? 4.2 : 6.2);
  const coreMaterial = core.material as THREE.SpriteMaterial;
  coreMaterial.opacity = window.innerWidth < 768 ? 0.32 : 0.42;
  group.add(core);

  const dustCount = 220;
  const dustGeometry = new THREE.BufferGeometry();
  const dustPositions = new Float32Array(dustCount * 3);

  for (let index = 0; index < dustCount; index += 1) {
    const offset = index * 3;
    const radius = 2 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const spread = (Math.random() - 0.5) * 2.5;

    dustPositions[offset] = Math.cos(theta) * radius + spread;
    dustPositions[offset + 1] = (Math.random() - 0.5) * 5;
    dustPositions[offset + 2] = Math.sin(theta) * radius;
  }

  dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));

  const dustMaterial = new THREE.PointsMaterial({
    color: new THREE.Color(accentColor),
    size: window.innerWidth < 768 ? 0.09 : 0.12,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const dust = new THREE.Points(dustGeometry, dustMaterial);
  dust.rotation.z = Math.random() * Math.PI;
  group.add(dust);

  return {
    group,
    core,
    dust,
    dustGeometry,
    dustMaterial,
  };
}

function createStarLayer(config: LayerConfig) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(config.count * 3);
  const sizes = new Float32Array(config.count);
  const brightness = new Float32Array(config.count);
  const phases = new Float32Array(config.count);
  const basePositions = new Float32Array(config.count * 3);

  for (let index = 0; index < config.count; index += 1) {
    const offset = index * 3;
    const radius = config.minRadius + Math.random() * (config.maxRadius - config.minRadius);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    positions[offset] = x;
    positions[offset + 1] = y;
    positions[offset + 2] = z;

    basePositions[offset] = x;
    basePositions[offset + 1] = y;
    basePositions[offset + 2] = z;

    sizes[index] = config.minSize + Math.random() * (config.maxSize - config.minSize);
    brightness[index] = config.brightnessMin + Math.random() * (config.brightnessMax - config.brightnessMin);
    phases[index] = Math.random() * Math.PI * 2;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aBrightness", new THREE.BufferAttribute(brightness, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uColor: { value: new THREE.Color(config.color) },
    },
    vertexShader: `
      attribute float aSize;
      attribute float aBrightness;
      attribute float aPhase;
      varying float vAlpha;
      uniform float uTime;
      uniform float uPixelRatio;

      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float twinkle = 0.62 + 0.38 * sin(uTime * (0.7 + aPhase) + aPhase * 11.0);
        float pointScale = (220.0 / max(1.0, -mvPosition.z)) * uPixelRatio;

        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = aSize * pointScale * (0.72 + aBrightness * twinkle);
        vAlpha = clamp(0.18 + aBrightness * twinkle, 0.12, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vAlpha;

      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float distance = dot(uv, uv);

        if (distance > 0.25) {
          discard;
        }

        float glow = 1.0 - (distance * 4.0);
        gl_FragColor = vec4(uColor, vAlpha * glow);
      }
    `,
  });

  const points = new THREE.Points(geometry, material);
  points.rotation.set(Math.random() * 0.6, Math.random() * 3.1, Math.random() * 0.6);

  return {
    points,
    material,
    drift: config.drift,
    rotationSpeed: config.rotationSpeed,
    basePositions,
    maxRadius: config.maxRadius,
  };
}

function createDustLayer(count: number, color: string) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const radius = 7 + Math.random() * 20;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[offset] = radius * Math.sin(phi) * Math.cos(theta);
    positions[offset + 1] = radius * Math.cos(phi);
    positions[offset + 2] = radius * Math.sin(phi) * Math.sin(theta);
    sizes[index] = 1.2 + Math.random() * 2.6;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.075,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: new THREE.Color(color),
  });

  return new THREE.Points(geometry, material);
}

export function CosmicScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!containerRef.current) {
      return;
    }

    const mount = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      CAMERA_CONFIG.fov,
      window.innerWidth / window.innerHeight,
      CAMERA_CONFIG.near,
      CAMERA_CONFIG.far
    );
    camera.position.set(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const nebulaGroup = new THREE.Group();
    root.add(nebulaGroup);

    const nebulaTextures = [
      createGlowTexture("#8aa8ff", 0.44),
      createGlowTexture("#b38aff", 0.38),
      createGlowTexture("#d0d7ff", 0.3),
    ];

    nebulaTextures.forEach((texture, index) => {
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.26,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: new THREE.Color(index === 2 ? "#dfe7ff" : index === 1 ? "#b38aff" : "#8aa8ff"),
      });

      const sprite = new THREE.Sprite(material);
      sprite.scale.set(12 + index * 4.5, 9 + index * 3.5, 1);
      sprite.position.set(
        (index - 1) * 4.2,
        (index % 2 === 0 ? 2 : -2.5) - index * 0.8,
        -8 - index * 3
      );
      nebulaGroup.add(sprite);
    });

    const galaxyGroup = new THREE.Group();
    root.add(galaxyGroup);

    const galaxyConfigs = [
      { position: [-8, 5, -24], scale: 2.8, color: "#7da8ff" },
      { position: [8, -4, -29], scale: 3.1, color: "#d0c8ff" },
      { position: [-2, -8, -33], scale: 2.2, color: "#f0c77c" },
    ];

    galaxyConfigs.forEach((galaxy) => {
      const sprite = createGalaxySprite(galaxy.color, galaxy.scale);
      sprite.position.set(galaxy.position[0], galaxy.position[1], galaxy.position[2]);
      sprite.material.opacity = 0.13;
      galaxyGroup.add(sprite);
    });

    const destinationGalaxies = [
      createDestinationGalaxy("#88a8ff", "#dfe7ff"),
      createDestinationGalaxy("#c39bff", "#f1d7ff"),
      createDestinationGalaxy("#f2c98a", "#fff0bf"),
      createDestinationGalaxy("#88d7ff", "#dff6ff"),
    ];

    destinationGalaxies.forEach((galaxy, index) => {
      const x = (index % 2 === 0 ? -1 : 1) * (12 + index * 2.4);
      const y = (index % 3 === 0 ? 1 : -1) * (4 + index * 1.6);
      galaxy.group.position.set(x, y, -120 - index * 22);
      galaxy.group.scale.setScalar(0.18);
      galaxy.group.visible = false;
      root.add(galaxy.group);
    });

    const starLayers: Array<{
      points: THREE.Points;
      material: THREE.ShaderMaterial;
      drift: number;
      rotationSpeed: number;
      basePositions: Float32Array;
      maxRadius: number;
    }> = [];

    const layerConfigs: LayerConfig[] = [
      {
        count: 900,
        minRadius: 16,
        maxRadius: 34,
        minSize: 1.8,
        maxSize: 4.4,
        brightnessMin: 0.5,
        brightnessMax: 0.9,
        rotationSpeed: 0.03,
        drift: 0.12,
        color: "#eaf4ff",
      },
      {
        count: 620,
        minRadius: 12,
        maxRadius: 24,
        minSize: 2.2,
        maxSize: 5.4,
        brightnessMin: 0.6,
        brightnessMax: 1.1,
        rotationSpeed: 0.05,
        drift: 0.18,
        color: "#9ec8ff",
      },
      {
        count: 260,
        minRadius: 8,
        maxRadius: 18,
        minSize: 3.2,
        maxSize: 7.2,
        brightnessMin: 0.8,
        brightnessMax: 1.4,
        rotationSpeed: 0.08,
        drift: 0.24,
        color: "#f5f7ff",
      },
    ];

    layerConfigs.forEach((config, index) => {
      const layer = createStarLayer(config);
      layer.points.position.z = index * -2.2;
      root.add(layer.points);
      starLayers.push(layer);
    });

    const dust = createDustLayer(160, "#b4d8ff");
    dust.position.z = -6;
    root.add(dust);

    const scrollState = {
      targetProgress: 0,
      currentProgress: 0,
      lastScrollY: window.scrollY,
      lastTimestamp: 0,
      smoothedVelocity: 0,
      laneVelocity: 0,
      lastDelta: 0,
      radialStrength: 0,
    };

    const hopStateRef = {
      state: "idle" as GalaxyHopState,
      startedAt: 0,
      lastTriggerAt: 0,
      activeIndex: 0,
      direction: 1,
      progress: 0,
    };

    const triggerGalaxyHop = (direction: number) => {
      const now = performance.now();
      if (hopStateRef.state !== "idle") {
        return;
      }

      if (now - hopStateRef.lastTriggerAt < GALAXY_HOP_CONFIG.cooldown * 1000) {
        return;
      }

      hopStateRef.state = "preparing";
      hopStateRef.startedAt = now;
      hopStateRef.lastTriggerAt = now;
      hopStateRef.direction = direction;
      hopStateRef.activeIndex = (hopStateRef.activeIndex + 1 + (direction > 0 ? 1 : 0)) % destinationGalaxies.length;
      hopStateRef.progress = 0;

      destinationGalaxies.forEach((galaxy, index) => {
        const isActive = index === hopStateRef.activeIndex;
        galaxy.group.visible = isActive;
        galaxy.group.scale.setScalar(isActive ? (window.innerWidth < 768 ? 2.8 : 4.8) : 0.02);
        galaxy.group.position.set(
          isActive ? 0 : 0,
          isActive ? 0 : 0,
          isActive ? -48 : -220
        );
      });

      if (process.env.NODE_ENV === "development") {
        (window as typeof window & { __galaxyHopState?: typeof hopStateRef }).__galaxyHopState = hopStateRef;
      }
    };

    const clock = new THREE.Clock();
    let frameId = 0;

    const updateScrollState = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const nextTargetProgress = clamp(window.scrollY / maxScroll, 0, 1);
      const now = performance.now();
      const deltaTime = Math.max(16, now - scrollState.lastTimestamp || 16);
      const deltaY = window.scrollY - scrollState.lastScrollY;
      scrollState.lastScrollY = window.scrollY;
      scrollState.lastTimestamp = now;

      const rawVelocity = Math.abs(deltaY) / (deltaTime / 16.67);
      scrollState.smoothedVelocity = scrollState.smoothedVelocity * (1 - CAMERA_CONFIG.velocitySmoothing) + rawVelocity * CAMERA_CONFIG.velocitySmoothing;
      scrollState.targetProgress = nextTargetProgress;
      scrollState.laneVelocity = clamp(scrollState.smoothedVelocity / 16, 0, 1);
      scrollState.currentProgress += (scrollState.targetProgress - scrollState.currentProgress) * CAMERA_CONFIG.scrollSmoothing;
      scrollState.lastDelta = deltaY;

      const triggerDelta = Math.abs(deltaY);
      const direction = deltaY >= 0 ? 1 : -1;

      if (hopStateRef.state === "idle") {
        const sections = Array.from(document.querySelectorAll("section"));
        const sectionIndex = sections.findIndex((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;
        });

        const hasMeaningfulScroll =
          triggerDelta > 18 &&
          scrollState.laneVelocity > GALAXY_HOP_CONFIG.triggerThreshold;

        const nearScrollThreshold =
          window.scrollY > 220 &&
          (triggerDelta > 8 || sectionIndex >= 0);

        if (hasMeaningfulScroll || nearScrollThreshold || (sectionIndex >= 0 && triggerDelta > 10)) {
          triggerGalaxyHop(direction || 1);
        }
      }
    };

    const render = () => {
      const elapsed = clock.getElapsedTime();
      const now = performance.now();
      updateScrollState();

      const progress = easeProgress(scrollState.currentProgress);
      const velocityFactor = clamp(scrollState.laneVelocity * CAMERA_CONFIG.maxVelocityMultiplier, 0, CAMERA_CONFIG.maxVelocityMultiplier);
      const radialNormalized = clamp(
        (scrollState.laneVelocity - RADIAL_CONFIG.activationVelocity) /
          (RADIAL_CONFIG.fullVelocity - RADIAL_CONFIG.activationVelocity),
        0,
        1
      );
      const radialEased = radialNormalized * radialNormalized * (3 - 2 * radialNormalized);
      const radialTarget = reducedMotion ? 0 : radialEased * RADIAL_CONFIG.maxRadialStrength;
      const radialStrength = reducedMotion
        ? 0
        : scrollState.radialStrength +
          (radialTarget - scrollState.radialStrength) *
            (radialTarget > scrollState.radialStrength ? RADIAL_CONFIG.accelerationSmoothing : RADIAL_CONFIG.returnSmoothing);

      scrollState.radialStrength = radialStrength;

      if (hopStateRef.state !== "idle") {
        const totalDurationMs = GALAXY_HOP_CONFIG.duration * 1000;
        const elapsedInHop = now - hopStateRef.startedAt;
        const hopProgress = clamp(elapsedInHop / totalDurationMs, 0, 1);
        hopStateRef.progress = hopProgress;

        const prepEnd = GALAXY_HOP_CONFIG.preparationDuration / GALAXY_HOP_CONFIG.duration;
        const arrivalStart = 1 - GALAXY_HOP_CONFIG.arrivalDuration / GALAXY_HOP_CONFIG.duration;

        if (hopProgress < prepEnd) {
          hopStateRef.state = "preparing";
        } else if (hopProgress < arrivalStart) {
          hopStateRef.state = "hopping";
        } else if (hopProgress < 1) {
          hopStateRef.state = "arriving";
        } else {
          hopStateRef.state = "idle";
          hopStateRef.progress = 0;
        }

        if (process.env.NODE_ENV === "development") {
          (window as typeof window & { __galaxyHopState?: typeof hopStateRef }).__galaxyHopState = hopStateRef;
        }
      }

      const travelProgress = progress * CAMERA_CONFIG.maxForwardTravel;
      const xDrift = Math.sin(progress * Math.PI * 2.2) * CAMERA_CONFIG.maxX * (0.55 + velocityFactor * 0.35);
      const yDrift = progress * CAMERA_CONFIG.maxY * 0.7 + Math.sin(elapsed * 0.45) * 0.7;
      const pitch = progress * CAMERA_CONFIG.maxPitch * (0.65 + velocityFactor * 0.6);
      const yaw = Math.sin(progress * Math.PI * 1.5) * CAMERA_CONFIG.maxYaw * (0.4 + velocityFactor * 0.6);
      const roll = Math.sin(elapsed * 0.38) * CAMERA_CONFIG.maxRoll * 0.5;

      const hopState = hopStateRef.state;
      let hopBlend = 0;
      let hopDepthShift = 0;
      let hopFovShift = 0;
      let activeGalaxy: { group: THREE.Group; core: THREE.Sprite; dust: THREE.Points } | null = null;

      if (hopState !== "idle") {
        const activeIndex = hopStateRef.activeIndex;
        activeGalaxy = destinationGalaxies[activeIndex] ?? null;
        const prepEnd = GALAXY_HOP_CONFIG.preparationDuration / GALAXY_HOP_CONFIG.duration;
        const arrivalStart = 1 - GALAXY_HOP_CONFIG.arrivalDuration / GALAXY_HOP_CONFIG.duration;
        const normalized = hopStateRef.progress;

        if (hopState === "preparing") {
          hopBlend = easeProgress(clamp(normalized / prepEnd, 0, 1));
        } else if (hopState === "hopping") {
          hopBlend = 0.25 + easeProgress(clamp((normalized - prepEnd) / (arrivalStart - prepEnd), 0, 1)) * 0.85;
        } else {
          hopBlend = 0.9 + easeProgress(clamp((normalized - arrivalStart) / (1 - arrivalStart), 0, 1)) * 0.4;
        }

        const travelDirection = hopStateRef.direction > 0 ? -1 : 1;
        hopDepthShift = travelDirection * (35 + hopBlend * 135);
        hopFovShift = hopState === "preparing" ? 8 : hopState === "hopping" ? 18 : 12;
      }

      const targetPosition = new THREE.Vector3(
        xDrift,
        yDrift,
        -travelProgress + hopDepthShift
      );

      const targetRotation = {
        x: pitch,
        y: yaw,
        z: roll,
      };

      camera.position.lerp(targetPosition, CAMERA_CONFIG.positionDamping);
      camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotation.x, 0.08);
      camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotation.y, 0.08);
      camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRotation.z, 0.08);
      camera.fov = THREE.MathUtils.lerp(camera.fov, CAMERA_CONFIG.fov + hopFovShift, 0.08);
      camera.updateProjectionMatrix();

      if (activeGalaxy) {
        const galaxyProgress = clamp(hopBlend, 0, 1);
        const isMobile = window.innerWidth < 768;
        const visualScale = THREE.MathUtils.clamp(2.6 + galaxyProgress * (isMobile ? 8 : 12), 2.4, isMobile ? 12 : 18);
        const coreMaterial = activeGalaxy.core.material as THREE.SpriteMaterial;
        const dustMaterial = activeGalaxy.dust.material as THREE.PointsMaterial;

        activeGalaxy.group.visible = true;
        activeGalaxy.group.position.set(
          Math.sin(elapsed * 0.7 + hopStateRef.activeIndex) * (isMobile ? 1.1 : 1.8),
          Math.cos(elapsed * 0.9 + hopStateRef.activeIndex) * (isMobile ? 1.6 : 2.4),
          -22 + galaxyProgress * (isMobile ? 18 : 28)
        );
        activeGalaxy.group.scale.setScalar(visualScale);
        activeGalaxy.group.rotation.z += isMobile ? 0.012 : 0.018;
        activeGalaxy.group.rotation.y += isMobile ? 0.01 : 0.014;
        coreMaterial.opacity = isMobile ? 0.68 + galaxyProgress * 0.9 : 0.9 + galaxyProgress * 1.2;
        dustMaterial.opacity = isMobile ? 0.85 + galaxyProgress * 1.1 : 1.2 + galaxyProgress * 1.4;
      }

      destinationGalaxies.forEach((galaxy, index) => {
        if (index === hopStateRef.activeIndex && hopStateRef.state !== "idle") {
          return;
        }

        galaxy.group.visible = false;
        galaxy.group.scale.setScalar(0.05);
      });

      root.rotation.y = Math.sin(elapsed * 0.18) * 0.06 + yaw * 0.4;
      root.rotation.x = Math.cos(elapsed * 0.14) * 0.08 + pitch * 0.65;

      nebulaGroup.children.forEach((sprite, index) => {
        if (!(sprite instanceof THREE.Sprite)) {
          return;
        }

        const material = sprite.material as THREE.SpriteMaterial;
        const driftX = progress * CAMERA_CONFIG.nebulaParallax * (index - 1) * 3.2;
        const driftY = Math.sin(elapsed * (0.12 + index * 0.05) + index) * 0.35;
        sprite.position.x = (index - 1) * 4.2 + driftX;
        sprite.position.y = (index % 2 === 0 ? 2 : -2.5) - index * 0.8 + driftY;
        material.opacity = 0.18 + Math.sin(elapsed * 0.25 + index) * 0.05 + progress * 0.08;
      });

      galaxyGroup.rotation.z = elapsed * 0.014 + progress * 0.2;
      galaxyGroup.rotation.y = elapsed * 0.012 + progress * 0.3;
      galaxyGroup.position.x = Math.sin(progress * Math.PI * 2) * 1.2 * (0.4 + velocityFactor * 0.5);
      galaxyGroup.position.y = progress * 0.9;

      starLayers.forEach((layer, index) => {
        const multiplier = index === 0 ? CAMERA_CONFIG.farParallax : index === 1 ? CAMERA_CONFIG.midParallax : CAMERA_CONFIG.nearParallax;
        const layerRadialMultiplier = index === 0 ? RADIAL_CONFIG.farMultiplier : index === 1 ? RADIAL_CONFIG.midMultiplier : RADIAL_CONFIG.nearMultiplier;
        const scrollShift = progress * multiplier * 12 * (0.6 + velocityFactor * 0.9);
        const xWave = Math.sin(elapsed * (0.3 + index * 0.15)) * 0.85 * multiplier;

        layer.points.position.x = xWave + scrollShift * 0.22;
        layer.points.position.y = Math.sin(elapsed * (0.4 + index * 0.12)) * 0.7 * multiplier;
        layer.points.rotation.y = elapsed * layer.rotationSpeed * (index + 1) * 0.7 + progress * 0.6;
        layer.points.rotation.x = Math.sin(elapsed * (0.1 + index * 0.08)) * 0.1 + progress * 0.18;

        const positions = layer.points.geometry.attributes.position as THREE.BufferAttribute;
        const positionArray = positions.array as Float32Array;
        const directionFactor = scrollState.lastDelta === 0 ? 1 : Math.sign(scrollState.lastDelta) || 1;

        for (let particleIndex = 0; particleIndex < layer.basePositions.length; particleIndex += 3) {
          const baseX = layer.basePositions[particleIndex];
          const baseY = layer.basePositions[particleIndex + 1];
          const baseZ = layer.basePositions[particleIndex + 2];
          const distance = Math.sqrt(baseX * baseX + baseY * baseY + baseZ * baseZ) || 1;
          const normalX = baseX / distance;
          const normalY = baseY / distance;
          const normalZ = baseZ / distance;

          const travel = reducedMotion
            ? 0
            : radialStrength * layerRadialMultiplier * RADIAL_CONFIG.maxParticleSpeed * (0.2 + distance / (layer.maxRadius + 8));

          const nextX = baseX + normalX * travel * directionFactor;
          const nextY = baseY + normalY * travel * directionFactor;
          const nextZ = baseZ + normalZ * travel * directionFactor;
          const nextDistance = Math.sqrt(nextX * nextX + nextY * nextY + nextZ * nextZ) || 1;

          if (nextDistance > layer.maxRadius + 10) {
            const recycle = 0.2 + Math.random() * 0.55;
            positionArray[particleIndex] = baseX * recycle;
            positionArray[particleIndex + 1] = baseY * recycle;
            positionArray[particleIndex + 2] = baseZ * recycle;
          } else {
            positionArray[particleIndex] = nextX;
            positionArray[particleIndex + 1] = nextY;
            positionArray[particleIndex + 2] = nextZ;
          }
        }

        positions.needsUpdate = true;
        layer.material.uniforms.uTime.value = elapsed;
      });

      dust.position.x = Math.sin(progress * Math.PI * 2.5) * 1.8;
      dust.position.y = progress * 1.2;
      dust.rotation.y = elapsed * 0.04 + progress * 0.25;
      dust.rotation.x = Math.sin(elapsed * 0.09) * 0.14 + progress * 0.12;

      if (!reducedMotion) {
        root.position.x = Math.sin(elapsed * 0.23) * 0.4;
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
    };

    window.addEventListener("resize", handleResize);
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);

      starLayers.forEach((layer) => {
        layer.points.geometry.dispose();
        layer.material.dispose();
      });

      dust.geometry.dispose();
      dust.material.dispose();

      nebulaGroup.children.forEach((sprite) => {
        if (!(sprite instanceof THREE.Sprite)) {
          return;
        }

        const material = sprite.material as THREE.SpriteMaterial;
        material.map?.dispose();
        material.dispose();
      });

      galaxyGroup.children.forEach((sprite) => {
        if (!(sprite instanceof THREE.Sprite)) {
          return;
        }

        const material = sprite.material as THREE.SpriteMaterial;
        material.map?.dispose();
        material.dispose();
      });

      destinationGalaxies.forEach((galaxy) => {
        galaxy.dustGeometry.dispose();
        galaxy.dustMaterial.dispose();
        galaxy.core.material.map?.dispose();
        galaxy.core.material.dispose();
      });

      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="cosmic-scene"
    />
  );
}
