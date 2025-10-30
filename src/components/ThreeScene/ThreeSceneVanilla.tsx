import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  className?: string;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Detect if mobile for performance optimization (MUST be defined before use)
    const isMobile = window.innerWidth < 768;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    // Interactive controls state
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cameraRotation = { x: 0, y: 0 };
    let targetZoom = 8;
    let currentZoom = 8;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: !isMobile 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xec4899, 0.5);
    pointLight1.position.set(-10, -10, -5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 0.5);
    pointLight2.position.set(10, 10, 10);
    scene.add(pointLight2);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);
    
    // Main Sphere with custom shader material for distortion effect
    const sphereGeometry = new THREE.SphereGeometry(2, isMobile ? 32 : 100, isMobile ? 32 : 100);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Rotating Torus
    const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      wireframe: true,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(3, 0, 0);
    scene.add(torus);

    // Floating Cubes
    const cubes: THREE.Mesh[] = [];
    const cubeColors = [0x8b5cf6, 0x9333ea, 0xa855f7, 0xc084fc, 0xd8b4fe];
    
    for (let i = 0; i < 5; i++) {
      const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const cubeMaterial = new THREE.MeshStandardMaterial({
        color: cubeColors[i],
        emissive: cubeColors[i],
        emissiveIntensity: 0.5,
      });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      
      cube.position.set(
        Math.cos(i * 1.2) * 4,
        Math.sin(i * 0.8) * 2,
        Math.sin(i * 1.5) * 3
      );
      
      scene.add(cube);
      cubes.push(cube);
    }

    // Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = isMobile ? 300 : 1000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xa855f7,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Raycaster for object interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredObject: THREE.Mesh | null = null;
    const interactiveObjects = [sphere, torus, ...cubes];

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      if (isDragging) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;

        cameraRotation.y += deltaX * 0.005;
        cameraRotation.x += deltaY * 0.005;

        // Limit vertical rotation
        cameraRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cameraRotation.x));

        previousMousePosition = { x: event.clientX, y: event.clientY };
      } else {
        // Check for hover
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveObjects);

        if (hoveredObject && hoveredObject !== sphere) {
          hoveredObject.scale.setScalar(1);
        }

        if (intersects.length > 0) {
          const object = intersects[0].object as THREE.Mesh;
          hoveredObject = object;
          if (object !== sphere) {
            object.scale.setScalar(1.2);
          }
          containerRef.current.style.cursor = 'pointer';
        } else {
          hoveredObject = null;
          containerRef.current.style.cursor = 'grab';
        }
      }
    };

    // Mouse down handler
    const handleMouseDown = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      isDragging = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
      containerRef.current.style.cursor = 'grabbing';

      // Check for click on objects
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects);

      if (intersects.length > 0) {
        const object = intersects[0].object as THREE.Mesh;
        // Spin the clicked object
        object.rotation.x += Math.PI / 2;
        object.rotation.y += Math.PI / 2;
      }
    };

    // Mouse up handler
    const handleMouseUp = () => {
      isDragging = false;
      if (containerRef.current) {
        containerRef.current.style.cursor = hoveredObject ? 'pointer' : 'grab';
      }
    };

    // Wheel handler for zoom
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      targetZoom += event.deltaY * 0.01;
      targetZoom = Math.max(3, Math.min(15, targetZoom));
    };

    // Touch support
    let lastTouchDistance = 0;
    
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        isDragging = true;
        previousMousePosition = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
      } else if (event.touches.length === 2) {
        const dx = event.touches[0].clientX - event.touches[1].clientX;
        const dy = event.touches[0].clientY - event.touches[1].clientY;
        lastTouchDistance = Math.sqrt(dx * dx + dy * dy);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (event.touches.length === 1 && isDragging) {
        const deltaX = event.touches[0].clientX - previousMousePosition.x;
        const deltaY = event.touches[0].clientY - previousMousePosition.y;

        cameraRotation.y += deltaX * 0.005;
        cameraRotation.x += deltaY * 0.005;
        cameraRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cameraRotation.x));

        previousMousePosition = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
      } else if (event.touches.length === 2) {
        const dx = event.touches[0].clientX - event.touches[1].clientX;
        const dy = event.touches[0].clientY - event.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (lastTouchDistance > 0) {
          const delta = lastTouchDistance - distance;
          targetZoom += delta * 0.02;
          targetZoom = Math.max(3, Math.min(15, targetZoom));
        }
        
        lastTouchDistance = distance;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
      lastTouchDistance = 0;
    };

    // Add event listeners
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mousedown', handleMouseDown);
    containerRef.current.addEventListener('mouseup', handleMouseUp);
    containerRef.current.addEventListener('mouseleave', handleMouseUp);
    containerRef.current.addEventListener('wheel', handleWheel, { passive: false });
    containerRef.current.addEventListener('touchstart', handleTouchStart);
    containerRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
    containerRef.current.addEventListener('touchend', handleTouchEnd);
    containerRef.current.style.cursor = 'grab';

    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate sphere
      sphere.rotation.x = elapsedTime * 0.2;
      sphere.rotation.y = elapsedTime * 0.3;

      // Animate sphere with "distortion" (scaling)
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.05;
      sphere.scale.set(scale, scale, scale);

      // Rotate torus
      torus.rotation.x = elapsedTime * 0.3;
      torus.rotation.z = elapsedTime * 0.2;

      // Float cubes
      cubes.forEach((cube, i) => {
        cube.position.y += Math.sin(elapsedTime + i) * 0.002;
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      });

      // Rotate particles
      particles.rotation.y = elapsedTime * 0.05;

      // Smooth zoom
      currentZoom += (targetZoom - currentZoom) * 0.05;
      
      // Update camera position based on user rotation and zoom
      camera.position.x = Math.sin(cameraRotation.y) * Math.cos(cameraRotation.x) * currentZoom;
      camera.position.y = Math.sin(cameraRotation.x) * currentZoom;
      camera.position.z = Math.cos(cameraRotation.y) * Math.cos(cameraRotation.x) * currentZoom;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Store container reference for cleanup
    const currentContainer = containerRef.current;

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (currentContainer) {
        currentContainer.removeEventListener('mousemove', handleMouseMove);
        currentContainer.removeEventListener('mousedown', handleMouseDown);
        currentContainer.removeEventListener('mouseup', handleMouseUp);
        currentContainer.removeEventListener('mouseleave', handleMouseUp);
        currentContainer.removeEventListener('wheel', handleWheel);
        currentContainer.removeEventListener('touchstart', handleTouchStart);
        currentContainer.removeEventListener('touchmove', handleTouchMove);
        currentContainer.removeEventListener('touchend', handleTouchEnd);
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (currentContainer && rendererRef.current) {
        currentContainer.removeChild(rendererRef.current.domElement);
      }
      
      renderer.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      
      cubes.forEach(cube => {
        cube.geometry.dispose();
        (cube.material as THREE.Material).dispose();
      });
    };
  }, []);

  return <div ref={containerRef} className={className} />;
};

