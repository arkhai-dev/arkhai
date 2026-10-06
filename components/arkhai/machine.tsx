'use client';
import {useEffect,useRef,useState} from 'react';
import {Pause,Play,RotateCcw} from 'lucide-react';
import {ROUTE_STEPS,routingStepProgress,STATION_X,ROUTE_MARKS} from './routing-motion';
export type Phase='idle'|'sending'|'waiting'|'approved'|'complete';
export function Machine({compact=false}:{compact?:boolean}){
 const mount=useRef<HTMLDivElement>(null),stages=useRef<HTMLDivElement>(null),indicators=useRef<HTMLDivElement>(null),elapsed=useRef(0),pausedRef=useRef(false),redraw=useRef<(()=>void)|null>(null);
 const [paused,setPaused]=useState(false),[ready,setReady]=useState(false),[failed,setFailed]=useState(false),[step,setStep]=useState(0),[reduceMotion,setReduceMotion]=useState(false);
 useEffect(()=>{pausedRef.current=paused},[paused]);
 useEffect(()=>{if(ready)redraw.current?.()},[ready]);
 useEffect(()=>{
  let disposed=false,cleanup=()=>{};const reduced=matchMedia('(prefers-reduced-motion: reduce)');setReduceMotion(reduced.matches);
  (async()=>{let renderer:import('three').WebGLRenderer|undefined;
   try{
    const [THREE,{createRoutingRig},{RoomEnvironment}]=await Promise.all([import('three'),import('./routing-rig'),import('three/addons/environments/RoomEnvironment.js')]);
    if(disposed||!mount.current)return;
    const el=mount.current,scene=new THREE.Scene();
    renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,matchMedia('(max-width:850px)').matches?1.25:1.5));renderer.setClearColor(0,0);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
    const room=new RoomEnvironment(),pmrem=new THREE.PMREMGenerator(renderer),environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;scene.environmentIntensity=.7;room.dispose();pmrem.dispose();
    const camera=new THREE.OrthographicCamera(-5.7,5.7,3,-3,.1,80);camera.position.set(3.6,6,11);camera.lookAt(0,.7,0);
    scene.add(new THREE.HemisphereLight(0xffffff,0xb8afa2,1));const key=new THREE.DirectionalLight(0xffffff,2.1);key.position.set(-3,7,5);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-7;key.shadow.camera.right=7;key.shadow.camera.top=5;key.shadow.camera.bottom=-5;key.shadow.normalBias=.025;scene.add(key);const fill=new THREE.DirectionalLight(0xffffff,.8);fill.position.set(4,3,-2);scene.add(fill);
    const rig=createRoutingRig();scene.add(rig.group);
    let readyToDraw=false,visible=true,raf=0,last=performance.now(),previousStep=-1;
    let viewWidth=1,viewHeight=1,mobile=false;
    const anchor=new THREE.Vector3();
    const draw=()=>{
     if(!readyToDraw||disposed)return;
     const s=rig.update(elapsed.current),current=routingStepProgress(elapsed.current);
     if(s.step!==previousStep){previousStep=s.step;setStep(s.step)}
     const follow=mobile?Math.max(-2.8,Math.min(2.8,s.position[0])):0;
     camera.position.set(follow+3.6,6,11);camera.lookAt(follow,.7,0);camera.updateMatrixWorld();
     stages.current?.querySelectorAll<HTMLButtonElement>('button').forEach((button,i)=>button.style.setProperty('--step-progress',String(i<current.step?1:i===current.step?current.progress:0)));
     indicators.current?.querySelectorAll<HTMLElement>('.conveyor-marker').forEach((label,i)=>{anchor.set(STATION_X[i],2.45,-.6).project(camera);label.style.left=`${(anchor.x*.5+.5)*viewWidth}px`;label.style.top=`${Math.max(24,(-anchor.y*.5+.5)*viewHeight)}px`});
     renderer!.render(scene,camera);
    };
    const resize=()=>{viewWidth=Math.max(1,el.clientWidth);viewHeight=Math.max(1,el.clientHeight);mobile=matchMedia('(max-width:700px)').matches;renderer!.setSize(viewWidth,viewHeight);const span=mobile?5.2:11.2;camera.left=-span/2;camera.right=span/2;camera.top=span*viewHeight/viewWidth/2;camera.bottom=-camera.top;camera.updateProjectionMatrix();draw()};
    const ro=new ResizeObserver(resize);ro.observe(el);resize();const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;last=performance.now();if(visible)draw()});io.observe(el);
    function frame(now:number){raf=requestAnimationFrame(frame);const dt=Math.min(.05,Math.max(0,(now-last)/1000));last=now;if(!visible||document.hidden||pausedRef.current||reduced.matches)return;elapsed.current+=dt;draw()}
    const motion=()=>{setReduceMotion(reduced.matches);last=performance.now();if(reduced.matches)elapsed.current=14;draw()};reduced.addEventListener('change',motion);
    const lost=(e:Event)=>{e.preventDefault();setFailed(true);setReady(false);cancelAnimationFrame(raf)};renderer.domElement.addEventListener('webglcontextlost',lost);
    let released=false;const release=()=>{if(released)return;released=true;redraw.current=null;cancelAnimationFrame(raf);ro.disconnect();io.disconnect();reduced.removeEventListener('change',motion);renderer!.domElement.removeEventListener('webglcontextlost',lost);key.shadow.dispose();environment.dispose();const textures=new Set<import('three').Texture>(),materials=new Set<import('three').Material>(),geometries=new Set<import('three').BufferGeometry>();scene.traverse((o:any)=>{if(o.geometry)geometries.add(o.geometry);for(const m of o.material?(Array.isArray(o.material)?o.material:[o.material]):[]){materials.add(m);for(const value of Object.values(m))if(value instanceof THREE.Texture)textures.add(value)}});textures.forEach(t=>t.dispose());materials.forEach(m=>m.dispose());geometries.forEach(g=>g.dispose());renderer!.dispose();renderer!.domElement.remove()};cleanup=release;
    await renderer.compileAsync(scene,camera);if(disposed){release();return}readyToDraw=true;if(reduced.matches)elapsed.current=14;redraw.current=draw;draw();setReady(true);raf=requestAnimationFrame(frame);
   }catch{cleanup();renderer?.dispose();renderer?.domElement.remove();if(!disposed)setFailed(true)}
  })();return()=>{disposed=true;cleanup()};
 },[]);
 const seek=(i:number)=>{elapsed.current=ROUTE_MARKS[i];pausedRef.current=reduceMotion;setPaused(reduceMotion);if(reduceMotion)elapsed.current+=2.8;redraw.current?.()};
 return <div className={'machine conveyor-machine '+(compact?'compact ':'')+(failed?'failed':'')} aria-label="ARKHAI message conveyor">
  <div className="conveyor-top"><div><span className="mono">ONE MESSAGE. FIVE CONNECTED STAGES.</span><code>procurement@company.arkhai</code></div><div className="conveyor-playback">{!reduceMotion&&<><button onClick={()=>{pausedRef.current=!pausedRef.current;setPaused(pausedRef.current)}} aria-label={paused?'Play conveyor':'Pause conveyor'}>{paused?<Play size={15}/>:<Pause size={15}/>} {paused?'Play':'Pause'}</button><button onClick={()=>{elapsed.current=0;pausedRef.current=false;setPaused(false);redraw.current?.()}} aria-label="Replay conveyor"><RotateCcw size={15}/></button></>}</div></div>
  <div className="conveyor-viewport">
   <div ref={mount} className={'machine-canvas '+(ready&&!failed?'loaded':'')}/>
   {!ready&&!failed&&<div className="routing-loading" role="status">Preparing the message conveyor</div>}
   {failed&&<div className="machine-unavailable" role="status"><strong>3D view unavailable on this device.</strong><a href="/explore">Open the agent inbox</a></div>}
   {ready&&!failed&&<div ref={indicators} className="conveyor-markers" aria-hidden="true">{ROUTE_STEPS.map((s,i)=><div key={s.title} className="conveyor-marker" data-active={step===i} data-complete={step>i}><span className="conveyor-marker-number">{step>i?'✓':`0${i+1}`}</span><strong>{s.title}</strong><small>{step>i?'COMPLETE':step===i?(paused?'PAUSED':reduceMotion?'SELECTED':'IN PROGRESS'):'UP NEXT'}</small></div>)}</div>}
  </div>
  {ready&&!failed&&<div className="conveyor-footer"><div ref={stages} className="routing-stages" data-paused={paused||reduceMotion} aria-label="Conveyor stages">{ROUTE_STEPS.map((s,i)=><button key={s.title} onClick={()=>seek(i)} aria-current={step===i?'step':undefined}><span>0{i+1}</span>{s.title}</button>)}</div><div className="conveyor-caption"><div><span className="conveyor-live-dot" data-paused={paused||reduceMotion}/><strong>{paused?'Playback paused':ROUTE_STEPS[step].action}</strong></div><p>{ROUTE_STEPS[step].detail}</p><a href="/explore">Open agent inbox ↗</a></div></div>}
 </div>;
}
