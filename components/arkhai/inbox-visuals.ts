import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeVertices} from 'three/addons/utils/BufferGeometryUtils.js';

// Hard-surface reconstruction of approved Concept B. Every visible region has
// its own solid material; no photographic or generated texture is displayed.
export function createInbox(){
 const group=new THREE.Group();
 const ink=new THREE.MeshStandardMaterial({color:'#201e1b',roughness:.46,metalness:.06});
 const paper=new THREE.MeshStandardMaterial({color:'#f4f0e8',roughness:.62,metalness:0});
 const orange=new THREE.MeshStandardMaterial({color:'#f04b2d',roughness:.48,metalness:0});
 const line=new THREE.MeshStandardMaterial({color:'#aaa297',roughness:.8});
 const box=(w:number,h:number,d:number,r:number,material:THREE.Material,x:number,y:number,z:number,parent=group)=>{
  const mesh=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,5,r),material);mesh.position.set(x,y,z);parent.add(mesh);return mesh;
 };
 const roundedPath=(x:number,y:number,w:number,h:number,r:number)=>{
  const p=new THREE.Path();p.moveTo(x+r,y);p.lineTo(x+w-r,y);p.quadraticCurveTo(x+w,y,x+w,y+r);p.lineTo(x+w,y+h-r);p.quadraticCurveTo(x+w,y+h,x+w-r,y+h);p.lineTo(x+r,y+h);p.quadraticCurveTo(x,y+h,x,y+h-r);p.lineTo(x,y+r);p.quadraticCurveTo(x,y,x+r,y);return p;
 };
 const smoothSurface=(geometry:THREE.BufferGeometry)=>{geometry.deleteAttribute('normal');geometry.deleteAttribute('uv');const smooth=mergeVertices(geometry,0.0001);smooth.computeVertexNormals();geometry.dispose();return smooth};
 const side=(right:boolean)=>{
  const shape=new THREE.Shape();shape.moveTo(-.78,-1.32);shape.lineTo(-.78,-.55);shape.bezierCurveTo(-.78,-.1,-.1,1.6,.55,1.6);shape.lineTo(.71,1.6);shape.quadraticCurveTo(.83,1.6,.83,1.48);shape.lineTo(.83,-1.32);shape.closePath();
  if(right)shape.holes.push(roundedPath(-.18,-.53,.74,1.18,.075));
  const mesh=new THREE.Mesh(smoothSurface(new THREE.ExtrudeGeometry(shape,{depth:.12,bevelEnabled:true,bevelSegments:5,steps:1,bevelSize:.045,bevelThickness:.045,curveSegments:32})),ink);
  mesh.rotation.y=Math.PI/2;mesh.position.x=right?1.36:-1.49;group.add(mesh);
 };
 side(false);side(true);
 box(2.98,2.76,.16,.08,ink,0,.22,-.74);
 box(2.70,2.53,.05,.025,paper,0,.21,-.639);
 box(3.08,.18,1.75,.08,paper,0,-1.45,0);
 box(2.84,.11,1.5,.045,paper,0,-1.27,0);
 box(3.03,.78,.19,.085,ink,0,-1.0,.73);
 box(2.16,.30,.05,.025,paper,-.16,-1.0,.842);
 const rim=new THREE.Shape(roundedPath(-.24,-.59,.86,1.30,.115).getPoints(32));rim.holes.push(roundedPath(-.18,-.53,.74,1.18,.075));
 const outlet=new THREE.Mesh(smoothSurface(new THREE.ExtrudeGeometry(rim,{depth:.035,bevelEnabled:true,bevelSegments:3,bevelSize:.012,bevelThickness:.012,curveSegments:24})),orange);outlet.rotation.y=Math.PI/2;outlet.position.x=1.505;group.add(outlet);
 box(2.62,1.14,.065,.03,paper,0,.96,-.55);
 const cards:THREE.Group[]=[];
 for(let i=0;i<3;i++){
  const card=new THREE.Group();card.position.set(0,-.48+i*.5,.55-i*.37);card.rotation.x=-.18;card.userData.restY=card.position.y;group.add(card);cards.push(card);
  box(2.59,1.12,.066,.032,paper,0,0,0,card);
  const dot=new THREE.Mesh(new THREE.CircleGeometry(.074,32),new THREE.MeshStandardMaterial({color:['#201e1b','#7561d1','#f04b2d'][i],roughness:.7}));dot.position.set(-.98,.24,.037);card.add(dot);
  box(1.35,.027,.009,.004,line,-.08,.25,.037,card);box(1.70,.027,.009,.004,line,.095,.075,.037,card);
 }
 const lamp=new THREE.MeshStandardMaterial({color:'#7561d1',emissive:'#7561d1',emissiveIntensity:.35,roughness:.5});
 box(.042,.23,.028,.014,lamp,1.11,-1.0,.84);
 return {group,cards,lamp};
}

export function createEnvelope(color:string){
 const group=new THREE.Group();
 const material=new THREE.MeshStandardMaterial({color,roughness:.55,metalness:0,transparent:true});
 group.add(new THREE.Mesh(new RoundedBoxGeometry(1.62,1.06,.12,5,.06),material));
 const seamMaterial=new THREE.MeshStandardMaterial({color:color==='#f04b2d'?'#a52e1a':'#b3a997',roughness:.8,transparent:true});
 const seam=(points:number[][])=>{
  const curve=new THREE.CurvePath<THREE.Vector3>();
  for(let i=1;i<points.length;i++)curve.add(new THREE.LineCurve3(new THREE.Vector3(...points[i-1] as [number,number,number]),new THREE.Vector3(...points[i] as [number,number,number])));
  group.add(new THREE.Mesh(new THREE.TubeGeometry(curve,24,.009,6,false),seamMaterial));
 };
 seam([[-.73,.43,.066],[0,-.09,.071],[.73,.43,.066]]);
 seam([[-.73,-.43,.066],[-.28,-.01,.067]]);seam([[.73,-.43,.066],[.28,-.01,.067]]);
 return group;
}
const ease=(x:number)=>{const t=THREE.MathUtils.clamp(x,0,1);return t*t*t*(t*(t*6-15)+10)};
export function inboxMotion(seconds:number){
 const t=seconds%14;
 const arrive=ease((t-.35)/2.9),release=ease((t-9)/2.25),turn=ease((t-10.8)/1.6);
 return {
  phase:t<3.5?0:t<6?1:t<9?2:3,
  incoming:{x:-.3*(1-arrive)+.08*Math.sin(Math.PI*arrive),y:2.15-1.48*arrive,z:.36+.22*arrive,rz:-.09*(1-arrive),opacity:t<3.5?ease(t/.45)*(1-ease((t-3.1)/.35)):0},
  outgoing:{x:.83+1.67*release,y:.06+.3*turn,z:-.19+.22*turn,ry:.4-.28*turn,rz:-.06*turn,opacity:t>=9?ease((t-9)/.3)*(1-ease((t-13.25)/.65)):0},
 };
}
