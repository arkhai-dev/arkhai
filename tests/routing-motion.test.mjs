import assert from 'node:assert/strict';
import {test} from 'node:test';
import {routingMotion,routingStepProgress,ROUTE_DURATION,ROUTE_MARKS} from '../components/arkhai/routing-motion.ts';

test('the message rides above the belt and clears the lifted approval gate',()=>{
 let previous;
 const envelopeHalfWidth=.84/2,gateLeft=1.95-.115/2;
 for(let t=0;t<ROUTE_DURATION;t+=1/120){
  const s=routingMotion(t);
  assert.ok(s.position[1]-.05>.598,'message clears the belt slats');
  if(t>=17&&t<21){assert.equal(s.position[0],1.25);assert.ok(s.position[0]+envelopeHalfWidth<gateLeft,'waiting message remains before the barrier')}
  if(s.position[0]+envelopeHalfWidth>=gateLeft&&s.position[0]-.42<=2.0075){assert.ok(.92+.8*s.gateOpen-.43/2>s.position[1]+.05,'barrier clears the complete message before it passes')}
  if(previous)assert.ok(Math.hypot(...s.position.map((v,i)=>v-previous[i]))<.025,'travel is continuous');
  previous=s.position;
 }
 assert.equal(routingMotion(21).gateOpen,1);
 for(const [a,b] of [[2,4.9],[7.1,9.9],[12.1,14.9],[17.1,20.9],[23.3,24.4]])assert.equal(routingMotion(a).position[0],routingMotion(b).position[0],'belt stops for processing');
 assert.equal(routingMotion(0).opacity,0);
 assert.ok(routingMotion(ROUTE_DURATION-1e-6).opacity<1e-6,'loop reset is hidden');
});

test('the running stage cue follows the message timeline and resets with the loop',()=>{
 for(let i=0;i<ROUTE_MARKS.length-1;i++){
  const start=routingStepProgress(ROUTE_MARKS[i]);
  const midpoint=routingStepProgress((ROUTE_MARKS[i]+ROUTE_MARKS[i+1])/2);
  assert.equal(start.step,i);
  assert.equal(start.progress,0);
  assert.equal(midpoint.step,i);
  assert.equal(midpoint.progress,.5);
  assert.equal(routingMotion(ROUTE_MARKS[i]).step,start.step);
 }
 assert.deepEqual(routingStepProgress(ROUTE_DURATION),{step:0,progress:0});
});
