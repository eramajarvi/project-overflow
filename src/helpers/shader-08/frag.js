// by SamuelYAN
// more works //
// https://twitter.com/SamuelAnn0924
// https://www.instagram.com/samuel_yan_1990/

//noprotect
const frag = `
// learn from https://www.shadertoy.com/view/7syXzw

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform int u_frame;
uniform vec2 u_mouse;

#define pi 3.14159
#define MAX_STEPS 100
#define MAX_DIST 10.0
#define SURF_DIST 0.001

mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
} 

float sdBox(vec3 p, vec3 s) {
    float a = atan(p.z, p.x);
    float b = atan(p.z, p.y);
    p = 1.0 + .1 * cos(p  + p.x * 16. + u_time)-s;
    p.xz += .5 + .5 * cos(8. * p.y + u_time);

	return length(max(p, 0.))+min(max(p.x, max(p.y, p.z)), 0.);
}


float GetDist(vec3 p) {
    float d = sdBox(p, vec3(1));
    d = mix(length(p) - 3., d, .75 );
    return 2. * d;
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
    vec2 e = vec2(.01, 0);
    
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
    float k = rd.y*.5 + .5;
    
    vec3 col = mix(vec3(.5,0.,0.),vec3(0.),k);
    return col;
}


void main( )
{
vec2 uv = (gl_FragCoord.xy-1.*u_resolution.xy)/u_resolution.y;
    // vec2 uv = gl_FragCoord.xy/u_resolution.y;
		
     vec3 ro = vec3(4.5 * cos(0.5 * u_time), cos(0.3 * u_time) * 2.5, 4.5 * sin(0.5 * u_time));
    
    vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), 1.);
    vec3 col = vec3(0);
   
    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);
        vec3 rf = refract(rd, n,0.2);
        
        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.0;
        col = 0.52 *vec3(dif);
         
        col.r += 0.15 + .3 * cos(10. * rf.y + 4. * u_time - pi / 2.);
        col.g += 0.15 + .3 * cos(10. * rf.y + 4. * u_time );
        col.b += 0.15 + .3 * cos(10. * rf.y + 4. * u_time + pi / 2.);
    } 
    
    col = pow(col, vec3(.4545));	
    gl_FragColor = vec4(col,1.0);
}
`;

export default frag;
