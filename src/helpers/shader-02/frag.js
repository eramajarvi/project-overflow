// by SamuelYAN
// more works //
// https://twitter.com/SamuelAnn0924
// https://www.instagram.com/samuel_yan_1990/

//noprotect
const frag = /* glsl */ `
// learn from https://www.shadertoy.com/view/7lyXWz

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform int u_frame;
uniform vec2 u_mouse;

#define pi 3.14159
#define MAX_STEPS 100
#define MAX_DIST 20.
#define SURF_DIST 0.05

mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
} 

float thc(float a, float b) {
    return tan(a * cos(b)) / tan(a);
}


float h21 (vec2 a) {
    return fract(sin(dot(a.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float mlength(vec2 uv) {
    return max(abs(uv.x), abs(uv.y));
}

float mlength(vec3 p) {
    return max(max(abs(p.x), abs(p.y)), abs(p.z));
}

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318/2.5*(c*t+d) );
}

float GetDist(vec3 p) {
    float sc = 1.;
    float sc2 = 2.;
    
    float a = atan(p.z, p.x);
    float th = atan(p.y, p.x);
    float r = length(p)-(0.01 + p.x);
    
    float tim = 1. * a + r * 1. - u_time;
    tim += 0.05 * h21(p.xz);
    p = 0.75 * r * vec3(sin(a + tim) * cos(th+ tim), cos(a - tim) * sin(th+ tim), cos(th + tim) + sin(th + tim));
    
    vec3 ip = floor(sc2 * p) + 0.;
    vec3 fp = fract(sc2 * p) - 0.5;
    
    
    vec3 vec = 0.3 * vec3(cos(10. * h21(ip.xy) + tim), cos(10. * h21(ip.yz) + tim), cos(10. * h21(ip.zx) + tim));
    float d0 = length(p) - 4. * mlength(fp) - 0.;
    //d0 = length(p) - 1.;
    
    //p.y += cos(0.4 * r);
   // p = vec3(a / pi, p.y, -0.4 * log(r) + .2 * u_time);
    
    vec2 ipos = floor(sc * p.xz) + 0.5;
    vec2 fpos = fract(sc * p.xz) - 0.5; //cos(sc * p.xz / pi) - 0.5;
    
    return 0.23 * d0;
}

float RayMarch(vec3 ro, vec3 rd) {
	float dO=0.;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = ro + rd*dO;
        float dS = GetDist(p);
        dO += dS;
        if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
    }
    
    return dO;
}

vec3 GetNormal(vec3 p) {
	float d = GetDist(p);
    vec2 e = vec2(.001, 0);
    
    vec3 n = d - vec3(
        GetDist(p-e.xyy),
        GetDist(p-e.yxy),
        GetDist(p-e.yyx));
    
    return normalize(n);
}

vec3 GetRayDir(vec2 uv, vec3 p, vec3 l, float z) {
    vec3 f = normalize(l-p),
        r = normalize(cross(vec3(0,1,0), f)),
        u = cross(f,r),
        c = f*z,
        i = c + uv.x*r + uv.y*u,
        d = normalize(i);
    return d;
}

vec3 Bg(vec3 rd) {
    float k = rd.y *.5 + .5;
    
    vec3 col = mix(vec3(.5,0.,0.),vec3(0.),k);
    return col;
}

void main( )
{
    vec2 uv = (gl_FragCoord.xy-1.0*u_resolution.xy)/u_resolution.y;
		
     float time = 0.2 * u_time;

    float height = 0.;//1. + cos(time);
    float dist = 5.;
    vec3 ro = vec3(dist * cos(time), height, dist * sin(time));
    //ro.yz *= Rot(-m.y*3.14+1.);
    //ro.xz *= Rot(-m.x*6.2831);
    
    vec3 rd = GetRayDir(uv, ro, vec3(0,height,0), 1.);
    vec3 col = vec3(0);
   
    float d = RayMarch(ro, rd);   
   
    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);
        vec3 rf = refract(rd, n,0.1);
        
        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
        col = 0.5 * vec3(dif);
        
        float b = .25 + .25 * cos(u_time);
        
         uv = gl_FragCoord.xy / u_resolution.xy;
         
        float a = atan(rf.z, rf.x);
        float c = atan(rf.z,rf.y);
        vec2 ipos = floor(p.xz) + 0.5;
        float h = mix(h21(ipos),0., 0.5 + 0.5 * cos(u_time));
        col.r += 0.25 + .5 * cos(10. * rf.y + u_time - .5 * pi);
        col.g += 0.25 + .5 * cos(10. * rf.y + u_time);
        col.b += 0.25 + .5 * cos(10. * rf.y + u_time + .5 * pi);
        col += thc(1., 2.5 * length(p) - u_time);
        
        vec3 e = vec3(1.);
        col = col * pal(2.5 * length(p) - u_time, e, e, e, 0.25 * vec3(0.,0.33,0.66));
       // col *= n.y;
    } 
    
    col = pow(col, vec3(.5545));
    gl_FragColor = vec4(col,1.0);
}
`;

export default frag;
