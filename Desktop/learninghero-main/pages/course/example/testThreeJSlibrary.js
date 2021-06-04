


// import { getRouteRegex } from "next/dist/next-server/lib/router/utils";
import React, { Component } from "react";
// import ReactDOM from "react-dom";
import * as THREE from "three";

// import Image from 'next/image'


export default class ThreeJS extends Component {


    componentDidMount() {
        var scene = new THREE.Scene();


        // Set up camera
        const aspectRatio = window.innerWidth / window.innerHeight;
        const cameraWidth = 960;
        const cameraHeight = cameraWidth / aspectRatio;

        const camera = new THREE.OrthographicCamera(
            cameraWidth / -2, // left
            cameraWidth / 2, // right
            cameraHeight / 2, // top
            cameraHeight / -2, // bottom
            50, // near plane
            700 // far plane
        );

        camera.position.set(0, -210, 300);
        camera.lookAt(0, 0, 0);

        const playerCar = this.Car();
        scene.add(playerCar)

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(100, -300, 300);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        dirLight.shadow.camera.left = -400;
        dirLight.shadow.camera.right = 350;
        dirLight.shadow.camera.top = 400;
        dirLight.shadow.camera.bottom = -300;
        dirLight.shadow.camera.near = 100;
        dirLight.shadow.camera.far = 800;
        scene.add(dirLight);


        const config = {
            showHitZones: false,
            shadows: true, // Use shadow
            trees: true, // Add trees to the map
            curbs: true, // Show texture on the extruded geometry
            grid: false // Show grid helper
          };

        // Set up renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (config.shadows) renderer.shadowMap.enabled = true;
        document.body.appendChild(renderer.domElement);


        renderer.render(scene, camera);


    }

    Car() {
        const car = new THREE.Group();

        const vehicleColors = [
            0xa52523,
            0xef2d56,
            0x0ad3ff,
            0xff9f1c /*0xa52523, 0xbdb638, 0x78b14b*/
        ];

        const color = this.pickRandom(vehicleColors);

        const main = new THREE.Mesh(
            new THREE.BoxBufferGeometry(60, 30, 15),
            new THREE.MeshLambertMaterial({ color })
        );
        main.position.z = 12;
        main.castShadow = true;
        main.receiveShadow = true;
        car.add(main);

        const carFrontTexture = this.getCarFrontTexture();
        carFrontTexture.center = new THREE.Vector2(0.5, 0.5);
        carFrontTexture.rotation = Math.PI / 2;

        const carBackTexture = this.getCarFrontTexture();
        carBackTexture.center = new THREE.Vector2(0.5, 0.5);
        carBackTexture.rotation = -Math.PI / 2;

        const carLeftSideTexture = this.getCarSideTexture();
        carLeftSideTexture.flipY = false;

        const carRightSideTexture = this.getCarSideTexture();

        const cabin = new THREE.Mesh(new THREE.BoxBufferGeometry(33, 24, 12), [
            new THREE.MeshLambertMaterial({ map: carFrontTexture }),
            new THREE.MeshLambertMaterial({ map: carBackTexture }),
            new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
            new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
            new THREE.MeshLambertMaterial({ color: 0xffffff }), // top
            new THREE.MeshLambertMaterial({ color: 0xffffff }) // bottom
        ]);
        cabin.position.x = -6;
        cabin.position.z = 25.5;
        cabin.castShadow = true;
        cabin.receiveShadow = true;
        car.add(cabin);

        // const backWheel = new Wheel();
        // backWheel.position.x = -18;
        // car.add(backWheel);

        // const frontWheel = new Wheel();
        // frontWheel.position.x = 18;
        // car.add(frontWheel);


        // if (config.showHitZones) {
        //     car.userData.hitZone1 = HitZone();
        //     car.userData.hitZone2 = HitZone();
        // }

        return car;
    }

    getCarFrontTexture() {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 32;
        const context = canvas.getContext("2d");

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, 64, 32);

        context.fillStyle = "#666666";
        context.fillRect(8, 8, 48, 24);

        return new THREE.CanvasTexture(canvas);
    }

    getCarSideTexture() {
        const canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 32;
        const context = canvas.getContext("2d");

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, 128, 32);

        context.fillStyle = "#666666";
        context.fillRect(10, 8, 38, 24);
        context.fillRect(58, 8, 60, 24);

        return new THREE.CanvasTexture(canvas);
    }

    pickRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }





    render() {
        return (
            <div>
                <div ref={ref => (this.mount = ref)} />
                <img src="/run.png" alt="my image" />
                <p> yo yo</p>
            </div>
        )
    }
}