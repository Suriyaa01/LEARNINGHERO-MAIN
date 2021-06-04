// https://www.youtube.com/watch?v=JhgBwJn1bQw - Tutorial Example


import { getRouteRegex } from "next/dist/next-server/lib/router/utils";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

import Image from 'next/image'


export default class ThreeJS extends Component {


    componentDidMount() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.mount.appendChild(renderer.domElement);

        let loader = new THREE.TextureLoader();

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({
            map: loader.load('https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/blue.png')
            // color: 0x00ff00 
        });
        var cube = new THREE.Mesh(geometry, material);
        var cube2 = new THREE.Mesh(geometry, material);

        //scene.add(cube);
        scene.add(cube2);
        scene.background = new THREE.Color('blue');



        // Load an image file into a custom material
        
        //allow cross origin loading    
        //loader.src =  'https://seo-web.aun-thai.co.th/wp-content/uploads/2017/09/web_application_img.jpg'
        // loader.crossOrigin = '';
        // const image = loader.load('https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/zombieSoldier.png')
        // console.log(image)
        var material2 = new THREE.MeshBasicMaterial({
            map: loader.load('https://studysabaiapp.sgp1.digitaloceanspaces.com/Studysabai-ETextBook/Studysabai-ETextBook/wall.jpg')
        });
        // plane
        var plane = new THREE.Mesh(geometry, material2);
        plane.position.set(0,0,3)
        scene.add(plane);


        // //sprite.center(0,0)
        // sprite.scale.set(128, 128, 1);
        // sprite.position.x = -1
        // sprite.position.y = -1

        cube2.position.x = 3
        cube2.position.y = 3
        camera.position.z = 5;

        renderer.render(scene, camera);


        var angXvel = 0.01;
        var animate = function () {
            requestAnimationFrame(animate);

            cube.rotation.x += angXvel;
            cube.translateX(0.01)
            //cube.translateZ(-0.01)
            console.log(cube.rotation.x)

            if (cube.rotation.x > 2) {
                angXvel = -0.01;
            }
            else if (cube.rotation.x < -2) {
                angXvel = 0.01;
            }
            //cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        //animate();


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