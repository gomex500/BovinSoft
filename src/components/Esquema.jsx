// App.js
import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GLView } from 'expo-gl';
import * as THREE from 'three';
import { Renderer } from 'expo-three';

export default Esquema = () => {
  const requestRef = useRef();
  const clockRef = useRef(new THREE.Clock());

  const onContextCreate = async (gl) => {
    // Configurar la escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Configurar la cámara
    const camera = new THREE.PerspectiveCamera(
      130,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    // Configurar el renderizador
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    // Agregar un cubo
    // const geometry = new THREE.DodecahedronGeometry(1);
    // const geometry = new THREE.SphereGeometry(1, 32, 32);
    const geometry = new THREE.IcosahedronGeometry(0.8);
    const material = new THREE.MeshPhongMaterial({
      color: 0x1B4725,
      wireframe: false
    });
    material.wireframeLinewidth = 10;

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const ambientLight = new THREE.AmbientLight(0x1B4725, 10);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xc3c3c3, 10000);
    pointLight.position.set(8, 8, 20);
    scene.add(pointLight);


    const clock = clockRef.current;

    // Función de animación
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.position.y = Math.sin(elapsedTime);

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
  };

  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <View style={styles.container}>
      <GLView style={styles.glview} onContextCreate={onContextCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  glview: {
    flex: 1,
  },
});
