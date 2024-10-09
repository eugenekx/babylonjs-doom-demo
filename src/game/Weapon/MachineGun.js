import * as BABYLON from '@babylonjs/core';
import { Bullet } from '../Bullet';
import { AdvancedDynamicTexture, Image, Control } from '@babylonjs/gui';

export class MachineGun {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.isAutoFireWeapon = true;
        this.fireRate = 200; // milliseconds. 5 bullets per second
        this.spread = 0.03; // measures the precision of the gun. 0.0 means no spread at all, 1.0 stands for 180 degree spread
        this.ammo = 100; // Initial ammo count for machine gun
        this.isAnimating = false;
        this.currentFrame = 0;
        this.framesHold = 4;
        this.totalFrames = 5;
        this.setupGunSprite();
    }

    setupGunSprite() {
        this.advancedTexture =
            AdvancedDynamicTexture.CreateFullscreenUI('MachineGun');
        this.machineGunImage = new Image('machinegun');
        this.machineGunImage.width = `${parseInt(454 / 1.25)}px`;
        this.machineGunImage.height = `${parseInt(310 / 1.25)}px`;
        this.machineGunImage.horizontalAlignment =
            Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.machineGunImage.verticalAlignment =
            Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.machineGunImage.source = 'assets/textures/machinegun.png';
        this.machineGunImage.cellId = 0;
        this.machineGunImage.cellWidth = 454;
        this.machineGunImage.cellHeight = 310;
        this.advancedTexture.addControl(this.machineGunImage);
    }

    shoot() {
        if (this.ammo <= 0) return;

        this.shootInterval = setInterval(() => {
            // shoot one bullet
            this.shootOnce();
        }, this.fireRate);  // 60 FPS

        this.animateGun();
    }
    
    shootOnce() {
        if (this.ammo <= 0) return;

        const startPosition = this.camera.position.clone();

        // this vector will be added to the direction of the camera view to randomly spread the bullets
        // within the circle shape. Radius is defined by the "spread" parameter
        const spreadVector = new BABYLON.Polar(Math.random() * this.spread, Math.random() * Math.PI * 2).toVector2();

        const direction = this.camera.getDirection(
            new BABYLON.Vector3(spreadVector.x, spreadVector.y, 1)
        );

        //console.log('Machine Gun fired!');

        this.ammo--;

        startPosition
            .addInPlace(direction.scale(1.0))
            .addInPlace(new BABYLON.Vector3(0, -0.15, 0));
        new Bullet(this.scene, startPosition, direction);
    }

    animateGun() {
        this.isAnimating = true;
        this.currentFrame = 0;
        this.updateGunSprite();
        this.animationInterval = setInterval(() => {
            this.currentFrame++;
            if (this.currentFrame >= this.totalFrames * this.framesHold) {
                // re-start the loop from the first frame related to the gun firing animation
                // (skip the idle frame)
                this.currentFrame = this.framesHold;    
            }
            this.updateGunSprite();
        }, 1000 / 60); // 60 FPS
    }

    updateGunSprite() {
        const frameToShow = Math.floor(this.currentFrame / this.framesHold);
        this.machineGunImage.cellId = frameToShow;
    }

    stopShooting() {
        this.isAnimating = false;
        this.currentFrame = 0;

        clearInterval(this.animationInterval);
        clearInterval(this.shootInterval);
        this.updateGunSprite();
    }

    setVisibility(visible) {
        if (this.machineGunImage) {
            this.machineGunImage.isVisible = visible;
        }
    }
}
