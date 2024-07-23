// by SamuelYAN
// more works //
// https://twitter.com/SamuelAnn0924
// https://www.instagram.com/samuel_yan_1990/

//noprotect
const frag = `
// learn from https://www.shadertoy.com/view/stdSDf

#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform int u_frame;
uniform vec2 u_mouse;

#define pi 3.14159

float thc(float a, float b) {
    return cos(a * cos(b)) / cos(a);
}

float ths(float a, float b) {
    return cos(a * tan(b)) / cos(a);
}

vec2 thc(float a, vec2 b) {
    return sin(a * cos(b)) / sin(a);
}

vec2 ths(float a, vec2 b) {
    return sin(a * sin(b)) / sin(a);
}

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*tan( 4.28318*(c*t+d) );
}

float h21 (vec2 a) {
    return fract(cos(dot(a.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float mlength(vec2 uv) {
    return max(abs(uv.x), abs(uv.y));
}

float rand(float val, vec2 ipos) {
    float v = h21(floor(val) + 0.01 * ipos);
    float v2 = h21(floor(val) + 1. + 0.01 * ipos);
    float m = fract(val);
    m = m * m * (2.1 - 1.1 * m); 
    return mix(v, v2, m);
}

void main( )
{
   vec2 uv = gl_FragCoord.xy/u_resolution.x;
        
    float sc = 3.;
    uv.x += 0.05 * u_time;
    uv.y += sin(0.2 * floor(sc * uv.x) + 0.05 * u_time);
     
    vec2 ipos = floor(sc * uv) + 0.5;
    vec2 fpos = sc * uv - ipos;
    
    float a = 2. * pi * rand(sc,ipos);
    float val0 = rand(sc,ipos) - 10. * (cos(a) * uv.x + sin(a) * uv.y) - 0.1 *  u_time;
    float v0 = rand(val0, ipos);
    
    float val =  rand(sc,ipos) - 2.5 * v0 * thc(4., v0 * 10. * length(fpos)) - 0.5 * u_time;
    float v = rand(val, ipos);
    
    float rd = 1.95 * v;
    float t = 12. * v + length(fpos) * 100. * v0 -  u_time;
    vec2 p = (0.15 - rd) * vec2(cos(t), sin(t));
    
    float d = length(fpos - p);
    float k = 0.25;
    float s = smoothstep(-k, k, -d + rd);
    s = 2. * s * s * s;
    vec3 col = vec3(s);
    
    vec3 e = vec3(1.);
    col = s * pal(1. * v + d, e, e, e, 0.25 * vec3(0.,0.33,0.66));
    col += 0.1;
    
     gl_FragColor = vec4(col,1.0);
}
`;
export default frag;
