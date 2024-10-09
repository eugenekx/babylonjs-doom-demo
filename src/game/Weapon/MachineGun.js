import * as BABYLON from '@babylonjs/core';
import { Bullet } from '../Bullet';
import { AdvancedDynamicTexture, Image, Control } from '@babylonjs/gui';

export class MachineGun {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.fireRate = 100; // milliseconds
        this.ammo = 100; // Initial ammo count for machine gun
        this.isAnimating = false;
        this.currentFrame = 0;
        this.framesHold = 5;
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

        console.log('Machine Gun fired!');
    }

    setVisibility(visible) {
        if (this.machineGunImage) {
            this.machineGunImage.isVisible = visible;
        }
    }
}
