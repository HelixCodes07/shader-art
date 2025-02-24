export default /* glsl */ ` 
// based on: https://www.shadertoy.com/view/wlKfzc

float fadeTimer = 0.0;
uniform float gridWidth;
uniform float gridHeight;
uniform float uProgress;
uniform vec3 prevColor;
uniform vec3 newColor;
varying vec3 csm_vPosition;
varying vec2 vUv;
uniform vec2 iResolution;


void main() {

    fadeTimer = uProgress * 2.5;

    vec2 posI =  vec2(vUv.x * gridWidth, vUv.y * gridHeight);
    
    vec2 finalPos = mod(posI,2.) - vec2(1.0,1.0);
    float size;
    
    posI = vec2(floor(posI.x/2.)/gridWidth,floor(posI.y/.5)/gridHeight);
    
    size = clamp(pow( fadeTimer / (-vUv.x - vUv.y) * fadeTimer,2.), 0.0, 2.);
    
    size = abs(size * fadeTimer);
    
    vec4 outcol = vec4(newColor, 1.0);
    
    if(abs(finalPos.x) + abs(finalPos.y) > size  ){
        outcol =  vec4(prevColor, 1.0);
    }
    csm_DiffuseColor = csm_DiffuseColor * outcol;
}

`
