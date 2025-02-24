export default /* glsl */ `
uniform float uProgress;
uniform vec3 prevColor;
uniform vec3 newColor;
varying vec3 csm_vPosition;
varying vec2 vUv;
uniform vec2 iResolution;

// Smooth random function
float rand2(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 78.233))) * 43758.5453123);
}

// Smooth noise with gentler interpolation
float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    // Smoother interpolation curve for gentler transitions
    u = u * u * u * (u * (u * 6.0 - 15.0) + 10.0);
    
    float a = rand2(ip);
    float b = rand2(ip + vec2(1.0, 0.0));
    float c = rand2(ip + vec2(0.0, 1.0));
    float d = rand2(ip + vec2(1.0, 1.0));
    
    return mix(
        mix(a, b, u.x),
        mix(c, d, u.x),
        u.y
    );
}

// Gentle FBM with fewer octaves for smoother result
float fbm(vec2 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.5; // Reduced frequency for smoother patterns
    float lacunarity = 1.8; // Gentler frequency increase
    float gain = 0.6; // Slower amplitude decrease
    
    for (int i = 0; i < octaves; ++i) {
        value += amplitude * noise(p * frequency);
        frequency *= lacunarity;
        amplitude *= gain;
    }
    
    return value;
}

// Gentle vortex effect
vec2 vortex(vec2 uv, float strength) {
    float dist = length(uv);
    float angle = atan(uv.y, uv.x) + strength * smoothstep(0.0, 1.0, 1.0 - dist);
    return vec2(cos(angle), sin(angle)) * dist;
}

// Smooth easing function
float easeInOutCubic(float x) {
    return x < 0.5 
        ? 4.0 * x * x * x 
        : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
}

void main() {
    // Normalize coordinates
    vec2 uv = gl_FragCoord.xy / iResolution.xy - 0.5;
    uv.y *= iResolution.y/iResolution.x;
    
    // Slower progress
    float slowProgress = easeInOutCubic(uProgress);
    
    // Gentler vortex effect
    float vortexStrength = slowProgress * 1.5; // Reduced strength
    uv = vortex(uv, vortexStrength);
    
    // Smoother noise pattern
    float noiseScale = 2.0 + slowProgress * 1.5; // Reduced scale
    float noiseFactor = fbm(uv * noiseScale, 2); // Fewer octaves
    
    // Gentle angle variation
    float angle = atan(uv.y, uv.x);
    angle += noiseFactor * 0.4; // Reduced influence
    vec2 p = vec2(cos(angle), sin(angle));
    
    // Slower transition timing
    float t = smoothstep(0.0, 1.0, slowProgress);
    t = t * (2.0 - t); // Smooth easing
    
    // Gentler pattern
    float l = length(uv / (t + 0.2)); // Increased offset for smoother transition
    l *= 1.0 + fbm(uv * 15.0, 3) * 0.3; // Reduced noise influence
    
    // Smoother pattern composition
    float pattern = fbm(p * (8.0 + t * 4.0), 2); // Reduced frequency
    float ink = pattern + 1.8 - l;
    
    // Extra smooth color transition
    float transition = smoothstep(0.1, 0.9, ink); // Wider smoothstep range
    vec3 col = mix(prevColor, newColor, transition);
    
    // Subtle variation
    col += vec3(noiseFactor * 0.05); // Reduced variation
    
    // Final color
    csm_DiffuseColor = vec4(csm_DiffuseColor.rgb * col, 1.0);
}
`;