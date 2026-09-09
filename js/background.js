// 3D animated node network — represents database/systems connections.
// Loaded via ES module import from CDN inside an inline module script in main.js load order.
(function () {
  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = `
    import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

    const canvas = document.getElementById('bg-canvas');
    if (!canvas) { throw new Error('no canvas'); }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 34;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const NODE_COUNT = 60;
    const nodes = [];
    const nodeGeo = new THREE.SphereGeometry(0.16, 10, 10);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xE0A458, transparent: true, opacity: 0.85 });
    const nodeMatDim = new THREE.MeshBasicMaterial({ color: 0x5D6B84, transparent: true, opacity: 0.5 });

    const group = new THREE.Group();
    scene.add(group);

    for (let i = 0; i < NODE_COUNT; i++) {
      const mat = Math.random() > 0.82 ? nodeMat : nodeMatDim;
      const mesh = new THREE.Mesh(nodeGeo, mat);
      const radius = 16 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      mesh.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta) * 0.6,
        radius * Math.cos(phi)
      );
      group.add(mesh);
      nodes.push(mesh);
    }

    // Connect nearby nodes with faint lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0x223049, transparent: true, opacity: 0.5 });
    const linePositions = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i].position.distanceTo(nodes[j].position);
        if (d < 9 && Math.random() > 0.7) {
          linePositions.push(nodes[i].position.x, nodes[i].position.y, nodes[i].position.z);
          linePositions.push(nodes[j].position.x, nodes[j].position.y, nodes[j].position.z);
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5);
      mouseY = (e.clientY / window.innerHeight - 0.5);
    });

    function animate() {
      requestAnimationFrame(animate);
      group.rotation.y += 0.0009;
      group.rotation.x = mouseY * 0.15;
      group.rotation.y += mouseX * 0.0002;
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  `;
  document.head.appendChild(script);
})();
