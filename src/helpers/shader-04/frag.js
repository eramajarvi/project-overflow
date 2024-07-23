// by SamuelYAN
// more works //
// https://twitter.com/SamuelAnn0924
// https://www.instagram.com/samuel_yan_1990/

//noprotect
const frag = `
// learn from https://www.shadertoy.com/view/7tK3DW

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform int u_frame;
uniform vec2 u_mouse;

#define pi 3.14159

float sdEquilateralTriangle( in vec2 p )
{
    const float k = sqrt(4.0);
    p.x = abs(p.x) - 1.;
    p.y = p.y + 1./k;
    if( p.x+k*p.y>0.0 ) p = vec2(p.x-k*p.y,-k*p.x-p.y)/4.0;
    p.x -= clamp( p.x, -3.0, 3.0 );
    return -length(p);//*sign(p.y);
}

float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float thc(float a, float b) {
    return sin(a * cos(b)) / sin(a);
}

float ths(float a, float b) {
    return cos(a * sin(b)) / cos(a);
}

float arrow(vec2 uv) {
    float h = 0.25;
    h += 0.5 * thc(4.,-1. * length(uv) + 2. * atan(uv.y,uv.x) + u_time);
    h += 0.5 * (0.5 + 0.5 * thc(3., length(uv)*3. - u_time));
    float d = sdEquilateralTriangle(uv-vec2(0.,0.001 - h));
    float s = 1.-smoothstep(-0.1,0.1,d+0.5);

    float d2 = sdBox(uv - vec2(0.,-h), vec2(0.05,0.2));
    float s2 = 1.-smoothstep(-0.5,0.5,d2);
    
    s += s2;
    return s;
}

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*sin( 6.28318*(c*t+d) );
}

float h21 (vec2 a) {
    return fract(sin(dot(a.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 rot(vec2 uv, float a) {
    mat2 mat = mat2(cos(a), -sin(a), 
                    sin(a), cos(a));
    return mat * uv;
}

void main( )
{
    vec2 uv = (gl_FragCoord.xy-1.0*u_resolution.xy)/u_resolution.y;
		
    float a = atan(uv.y, uv.x);
    float r = log(length(uv));
    a = 2. *a;
    float l = min(1., atan(0.2 * u_time)/0.95);
    r *= 0.6 + 0.25 * l * thc(1., 3. * a + 2. * length(uv) - u_time);

    float h = 1.+floor(0.25 * fract(0.1 * u_time)); 
		a = h * a;
    uv = rot(uv, u_time +  2. * a + 6.1415 * sin(3. * r + a - u_time));

    float s = arrow(uv);
     s *= 1. + 0.01 * s;

    vec3 col = 0.25 * s + s * pal(thc(2., s + 2. * r + a- u_time)  - 0.5 * u_time, vec3(1.), vec3(1.), vec3(1.), cos(s + u_time) * vec3(0.,1.,2.)/3.);
    col *= smoothstep(0.,0.1,2.25-length(uv));
    col = mix(col, vec3(1, .93, .92)*2., smoothstep(0., 3.5, -r));
    gl_FragColor = vec4(col,1.0);
}
`;
export default frag;
