'use client'

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function ThreeScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const modelRef = useRef<any>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // === Scene & Camera ===
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#000000');

        const camera = new THREE.PerspectiveCamera(
            500,
            window.innerWidth / window.innerHeight,
            1,
            0
        );
        camera.position.set(0, 2.5, 3);

        // === Light ===
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(5, 5, 5);
        scene.add(dirLight);
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        // === CSS3D Renderer (DOM UI) ===
        const cssRenderer = new CSS3DRenderer();
        cssRenderer.setSize(window.innerWidth, window.innerHeight);
        cssRenderer.domElement.style.position = 'absolute';
        cssRenderer.domElement.style.top = '0';
        containerRef.current.appendChild(cssRenderer.domElement);

        // === Controls ===
        const controls = new OrbitControls(camera, cssRenderer.domElement);
        controls.enableDamping = true; // 부드러운 모션
        controls.dampingFactor = 0.05;

        // === WebGL Renderer (3D 모델) ===
        const webglRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        webglRenderer.setSize(window.innerWidth, window.innerHeight);
        webglRenderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(webglRenderer.domElement);


        // === GLTF Model ===
        const loader = new GLTFLoader();
        loader.load('/models/RobotExpressive.glb', (gltf) => {
            modelRef.current = gltf.scene;
            modelRef.current.scale.set(1, 1, 1);
            scene.add(modelRef.current);
        });


        // === Animation Loop ===
        const animate = () => {
            requestAnimationFrame(animate);

            webglRenderer.render(scene, camera);
            cssRenderer.render(scene, camera);
        };
        animate();

        // === Resize ===
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            webglRenderer.setSize(window.innerWidth, window.innerHeight);
            cssRenderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // === Cleanup ===
        return () => {
            window.removeEventListener('resize', handleResize);
            containerRef.current?.removeChild(webglRenderer.domElement);
            containerRef.current?.removeChild(cssRenderer.domElement);
        };
    }, []);

    return <div ref={containerRef} className="w-full h-screen" />;
}