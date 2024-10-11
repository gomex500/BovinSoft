import React, { useRef, useEffect } from 'react';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';

const Esquema = React.memo(() => {
  const glViewRef = useRef(null);

  useEffect(() => {
    const initThree = async (gl) => {
      // Crear la escena
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf2f2f2); // Fondo color #f2f2f2

      // Configurar la cámara
      const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
      const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 100);
      camera.position.set(20, 2, 5); // Ajusta la posición de la cámara para mejor visualización
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      scene.add(camera);
      // Configurar el renderizador
      const renderer = new Renderer({ gl });
      renderer.setSize(width, height);

      // Crear geometría y material
      const geometry = new THREE.DodecahedronGeometry(1);
      const material = new THREE.MeshPhongMaterial({
        color: 0x1B4725,
        wireframe: false
      });

      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // Añadir luces
      const ambientLight = new THREE.AmbientLight(0x1B4725, 10);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xc3c3c3, 10000);
      pointLight.position.set(8, 8, 20);
      scene.add(pointLight);


      // Animación
      const clock = new THREE.Clock();
      const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        cube.rotation.x = elapsedTime;
        cube.rotation.y = elapsedTime;
        cube.position.y = Math.sin(elapsedTime);

        renderer.render(scene, camera);
        gl.endFrameEXP();
        requestAnimationFrame(animate);
      };
      animate();
    };

    if (glViewRef.current) {
      const gl = glViewRef.current;
      initThree(gl);
    }
  }, []);


  return (
    <GLView
      style={{ flex: 1 }} // Asegúrate de que GLView ocupe todo el espacio
      onContextCreate={(gl) => {
        glViewRef.current = gl;
      }}
    />
  );
});

export default Esquema;