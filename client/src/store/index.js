import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: 'pink',
  isLogoTexture: true, //Texture: kết cấu
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
});

export default state;