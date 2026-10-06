export const ROUTE_DURATION=26;
export const ROUTE_MARKS=[0,5,10,15,21,ROUTE_DURATION] as const;
export const STATION_X=[-3.4,-1.7,0,1.7,3.4] as const;
export const ROUTE_STEPS=[
 {title:'Receive',action:'Receiving message',detail:'A request arrives at procurement@company.arkhai.'},
 {title:'Retain',action:'Keeping context',detail:'The message joins its conversation. Every reply keeps the same history.'},
 {title:'Route',action:'Selecting specialist',detail:'The routing rule selects the right specialist for this request.'},
 {title:'Approval',action:'Waiting for approval',detail:'The message waits for finance@company.arkhai before work continues.'},
 {title:'Reply',action:'Sending response',detail:'The approved response returns in the original conversation.'},
] as const;
export const motionEase=(x:number)=>{const t=Math.max(0,Math.min(1,x));return t*t*t*(t*(t*6-15)+10)};
const lerp=(a:number,b:number,t:number)=>a+(b-a)*motionEase(t);
export function routingStepProgress(seconds:number){
 const t=((seconds%ROUTE_DURATION)+ROUTE_DURATION)%ROUTE_DURATION;
 const step=ROUTE_MARKS.findIndex((start,i)=>i<5&&t>=start&&t<ROUTE_MARKS[i+1]);
 return {step,progress:(t-ROUTE_MARKS[step])/(ROUTE_MARKS[step+1]-ROUTE_MARKS[step])};
}
export function routingMotion(seconds:number){
 const t=((seconds%ROUTE_DURATION)+ROUTE_DURATION)%ROUTE_DURATION;
 const {step,progress}=routingStepProgress(t);
 let x=-3.4;
 if(t<5)x=lerp(-4.5,-3.4,t/1.8);
 else if(t<10)x=lerp(-3.4,-1.7,(t-5)/2);
 else if(t<15)x=lerp(-1.7,0,(t-10)/2);
 else if(t<21)x=lerp(0,1.25,(t-15)/2);
 else if(t<24.5)x=lerp(1.25,3.4,(t-21)/2.2);
 else x=lerp(3.4,4.65,(t-24.5)/1.3);
 const processing=progress>.4&&progress<.94;
 return {t,step,progress,position:[x,.655,0] as const,opacity:motionEase(t/.4)*(1-motionEase((t-25.4)/.6)),gateOpen:motionEase((t-19.3)/1.3),approved:t>=20.6,processing,travel:x+4.5,retained:motionEase((t-7)/.65)*(1-motionEase((t-25.4)/.6))};
}
