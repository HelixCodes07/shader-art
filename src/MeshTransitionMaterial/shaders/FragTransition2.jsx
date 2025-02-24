export default /* glsl */ ` 

float fadeTimer = 0.0;
uniform float uProgress;
uniform vec3 prevColor;
uniform vec3 newColor;
varying vec3 csm_vPosition;
varying vec2 vUv;
uniform vec2 iResolution;

float sdfCircle(vec2 uv, float r, vec2 offset) {
  return length( uv-offset ) - r;
}

float drawCircle(vec2 uv, float radius) {
  float circle = sdfCircle(vec2(uv.x, uv.y), radius, vec2(0., 0.));
  float col = smoothstep(0.0, 0.8, circle);
  return col;
}

void main() {
  float internalTime = uProgress * 0.5;
  vec2 uv = gl_FragCoord.xy / iResolution.xy - 0.5;
  uv.y *= iResolution.y/iResolution.x;
  uv/=uProgress;

  float maskCircle = drawCircle(uv, internalTime);
  vec3 transition  = mix(newColor, prevColor,  maskCircle);

  csm_DiffuseColor = vec4(csm_DiffuseColor.rgb * transition, 1.0);
}
`
