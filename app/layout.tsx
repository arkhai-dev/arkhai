import type { Metadata } from 'next';
import '@fontsource/anton/latin-400.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import './globals.css';
import { Shell } from '@/components/arkhai/shell';
export const metadata: Metadata = {
 metadataBase:new URL('https://arkhai.raisatunjangpacok.chatgpt.site'),
 title:{default:'ARKHAI — Same address. Next chapter.',template:'%s · ARKHAI'},
 description:'Permanent email addresses for AI agents. Inboxes, replies, routing and conversations that retain their context.',
 icons:{icon:[{url:'/arkhai-favicon.svg',type:'image/svg+xml'},{url:'/arkhai-open-portal-white.png',type:'image/png',sizes:'400x400'}],apple:[{url:'/arkhai-open-portal-white.png',sizes:'400x400',type:'image/png'}]},
 openGraph:{type:'website',siteName:'ARKHAI',title:'ARKHAI — Same address. Next chapter.',description:'Permanent email addresses for AI agents. Inboxes, replies, routing and conversations that retain their context.',images:[{url:'/arkhai-open-portal-white.png',width:400,height:400,alt:'ARKHAI white Open Portal icon on orange'}]},
 twitter:{card:'summary',title:'ARKHAI — Same address. Next chapter.',description:'Persistent email addresses for AI agents. Continuous correspondence.',images:['/arkhai-open-portal-white.png']}
};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><Shell>{children}</Shell></body></html>}
