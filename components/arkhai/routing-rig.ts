import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {routingMotion,STATION_X,motionEase} from './routing-motion';

export function createRoutingRig(){
 const group=new THREE.Group();
 const finish=(color:string,roughness=.32)=>new THREE.MeshPhysicalMaterial({color,roughness,metalness:.06,clearcoat:.3,clearcoatRoughness:.35});
 const cream=finish('#eee4d2'),orange=finish('#ef603d'),purple=finish('#7761c9'),dark=finish('#383733',.65),steel=finish('#a7a197',.35),paper=finish('#fff7e5',.45);
 const box=(w:number,h:number,d:number,m:THREE.Material,x:number,y:number,z:number,parent:THREE.Object3D=group,r=Math.min(w,h,d)*.3)=>{const mesh=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,5,r),m);mesh.position.set(x,y,z);parent.add(mesh);return mesh};
 const cylinder=(radius:number,length:number,m:THREE.Material,x:number,y:number,z:number,parent:THREE.Object3D=group)=>{const mesh=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,length,32),m);mesh.rotation.x=Math.PI/2;mesh.position.set(x,y,z);parent.add(mesh);return mesh};
 // A continuous mechanical belt, with open sightlines through every station.
 box(9.7,.22,2.45,cream,0,-.16,0,group,.1);
 for(const x of [-3.65,3.65])for(const z of [-.65,.65])box(.22,.43,.25,steel,x,.08,z);
 box(9.15,.3,1.5,dark,0,.37,0,group,.13);
 box(9.15,.08,1.23,dark,0,.545,0,group,.035);
 for(const z of [-.78,.78]){box(9.15,.24,.12,cream,0,.43,z);box(8.6,.025,.035,orange,0,.565,z)}
 const rollers=[cylinder(.225,1.5,orange,-4.52,.36,0),cylinder(.225,1.5,orange,4.52,.36,0)];
 for(const x of [-4.52,4.52])for(const z of [-.81,.81])cylinder(.105,.06,steel,x,.36,z);
 const slats:THREE.Mesh[]=[];
 for(let i=0;i<34;i++)slats.push(box(.018,.009,1.16,steel,0,.593,0));
 // Five coherent stations: intake arch, memory rack, routing scanner, permission gate, dispatch arch.
 const lamps:THREE.Mesh<THREE.SphereGeometry,THREE.MeshStandardMaterial>[]=[];
 const fills:THREE.Mesh[]=[];
 STATION_X.forEach((x,i)=>{
  const accent=i===1||i===3?purple:orange;
  box(.68,.12,.58,cream,x,.1,-1.0,group,.05);
  box(.16,1.25,.18,accent,x,.76,-.9,group,.06);
  box(.54,.16,.28,accent,x,1.44,-.9,group,.06);
  const lamp=new THREE.Mesh(new THREE.SphereGeometry(.066,20,16),new THREE.MeshStandardMaterial({color:'#8e887e',emissive:'#f0643e',roughness:.25}));lamp.position.set(x,1.46,-.72);group.add(lamp);lamps.push(lamp);
  box(.55,.065,.045,dark,x,1.27,-.786,group,.02);
  const fill=box(.51,.039,.05,accent,x-.255,1.27,-.755,group,.016);fills.push(fill);
  if(i===0||i===2||i===4){box(.18,1.02,.16,accent,x,.99,.88,group,.05);box(.26,.15,1.97,accent,x,1.52,0,group,.055);box(.12,.025,1.25,paper,x,1.426,0)}
 });
 const archive=new THREE.Group();archive.position.set(-1.7,.81,-.06);group.add(archive);
 const sheets:THREE.Mesh[]=[];
 for(let i=0;i<3;i++)sheets.push(box(.72,.035,.5,i===1?purple:paper,0,i*.05,0,archive,.015));
 const scanner=box(.065,.012,1.1,new THREE.MeshBasicMaterial({color:'#fca479',transparent:true,opacity:.7,depthWrite:false}),0,.61,0);
 const barrier=new THREE.Group();barrier.position.set(1.95,.92,0);group.add(barrier);
 box(.115,.43,1.5,purple,0,0,0,barrier,.04);
 for(const z of [-.91,.91])box(.16,1.8,.18,purple,1.95,1.23,z,group,.06);
 box(.27,.17,2,purple,1.95,2.08,0,group,.06);
 // The message rides on the belt surface; its crease stays legible from the camera.
 const envelope=new THREE.Group();group.add(envelope);
 const envelopeMaterial=paper.clone();envelopeMaterial.transparent=true;
 box(.84,.1,.58,envelopeMaterial,0,0,0,envelope,.045);
 const lineMaterial=new THREE.MeshBasicMaterial({color:'#bf6244',transparent:true});
 const flap=new THREE.CurvePath<THREE.Vector3>();const points=[[-.36,.053,-.23],[0,.053,.085],[.36,.053,-.23]];
 for(let i=1;i<points.length;i++)flap.add(new THREE.LineCurve3(new THREE.Vector3(...points[i-1] as [number,number,number]),new THREE.Vector3(...points[i] as [number,number,number])));
 envelope.add(new THREE.Mesh(new THREE.TubeGeometry(flap,24,.009,8,false),lineMaterial));
 const sealMaterial=new THREE.MeshStandardMaterial({color:'#ef603d',transparent:true,roughness:.3});
 const seal=new THREE.Mesh(new THREE.CylinderGeometry(.058,.058,.012,24),sealMaterial);seal.position.set(.25,.061,.16);envelope.add(seal);
 const check=new THREE.Group();check.position.set(3.4,.78,0);group.add(check);
 const checkMat=new THREE.MeshStandardMaterial({color:'#527f5d',roughness:.35});
 const a=box(.09,.23,.065,checkMat,-.09,.09,0,check,.03);a.rotation.z=.75;const b=box(.09,.43,.065,checkMat,.07,.17,0,check,.03);b.rotation.z=-.7;
 group.traverse((o:any)=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}});
 return {group,update(seconds:number){
  const s=routingMotion(seconds);
  envelope.position.set(...s.position);envelope.visible=s.opacity>.001;envelopeMaterial.opacity=s.opacity;lineMaterial.opacity=s.opacity;sealMaterial.opacity=s.opacity;sealMaterial.color.set(s.approved?'#527f5d':'#ef603d');
  slats.forEach((slat,i)=>{slat.position.x=-4.48+((i*.267+s.travel)%9.08)});rollers.forEach(r=>r.rotation.y=-s.travel/.225);
  archive.visible=s.t>=7&&s.t<25.4;archive.scale.setScalar(Math.max(.01,s.retained));sheets.forEach((sheet,i)=>{sheet.position.z=-.07*i*motionEase((s.t-7)/.7);sheet.position.y=.05*i});
  scanner.visible=s.step===2&&s.processing;scanner.position.x=-.34+.68*(.5+.5*Math.sin((s.t-12)*2.8));
  barrier.position.y=.92+.8*s.gateOpen;
  check.visible=s.t>=23.2&&s.t<25.4;check.scale.setScalar(Math.max(.01,motionEase((s.t-23.2)/.45)));
  lamps.forEach((lamp,i)=>{const done=i<s.step||(i===3&&s.approved);lamp.material.color.set(done?'#527f5d':i===s.step?'#ffad63':'#8e887e');lamp.material.emissive.set(done?'#527f5d':'#ef603d');lamp.material.emissiveIntensity=i===s.step?.35+.2*Math.sin(s.progress*Math.PI*4):done?.15:0;const value=i<s.step?1:i===s.step?s.progress:0;fills[i].scale.x=Math.max(.001,value);fills[i].position.x=STATION_X[i]-.255+.255*value});
  return s;
 }};
}
