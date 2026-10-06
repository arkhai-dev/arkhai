import type {Metadata} from 'next';
import {whitepaperSections} from '@/content/whitepaper';

export const metadata:Metadata={
 title:'Whitepaper',
 description:'Read the ARKHAI whitepaper: persistent agent identity, messaging, threads, routing, permissions and asynchronous coordination.'
};

const chapters=[
 {id:'foundation',number:'01',title:'The foundation',range:'01—04',start:1,end:4,description:'Why autonomous software needs a lasting way to be reached.'},
 {id:'communication',number:'02',title:'Communication',range:'05—11',start:5,end:11,description:'Identity, messages, persistent threads and communication across time.'},
 {id:'coordination',number:'03',title:'Coordination',range:'12—17',start:12,end:17,description:'Routing, functions, waiting, discovery and organizations.'},
 {id:'authority',number:'04',title:'Authority',range:'18—21',start:18,end:21,description:'Authentication, permissions and human approval.'},
 {id:'network',number:'05',title:'The network',range:'22—30',start:22,end:30,description:'A unified API, structured messages and model independence.'},
 {id:'resilience',number:'06',title:'Resilience & trust',range:'31—39',start:31,end:39,description:'Observability, reliability, privacy and security.'},
 {id:'applications',number:'07',title:'In practice',range:'40—44',start:40,end:44,description:'Five primitives and example workflows.'},
 {id:'vision',number:'08',title:'The vision',range:'45—47',start:45,end:47,description:'Infrastructure for agents that can be reached.'}
] as const;

type Block={kind:'paragraph'|'bullets'|'ordered'|'code'|'flow';lines:string[]};
function blocks(body:string):Block[]{
 const lines=body.split('\n');
 const result:Block[]=[];let current:Block|null=null;
 const flush=()=>{if(current?.lines.length)result.push(current);current=null};
 for(let i=0;i<lines.length;i++){
  const line=lines[i].trim();
  if(!line){if(current&&(current.kind==='bullets'||current.kind==='ordered')){
   const next=lines.slice(i+1).find(x=>x.trim())?.trim();
   if(next&&(current.kind==='bullets'?next.startsWith('* '):/^\d+\. /.test(next)))continue;
  }flush();continue}
  const kind:Block['kind']=line.startsWith('* ')?'bullets':/^\d+\. /.test(line)?'ordered':
   /^(await arkhai\.|const response = await|import \{|const arkhai =|arkhai\.on\(|npm install|\{)/.test(line)?'code':
   line==='↓'||line==='→'||line==='+'?'flow':'paragraph';
  if(kind==='code'){
   flush();const code=[lines[i].trimEnd()];
   let depth=(line.match(/\{/g)||[]).length-(line.match(/\}/g)||[]).length;
   if(depth>0){
    while(i+1<lines.length){const next=lines[++i];if(!next.trim())break;code.push(next.trimEnd());
     depth+=(next.match(/\{/g)||[]).length-(next.match(/\}/g)||[]).length;
     if(depth<=0)break;
    }
   }
   result.push({kind:'code',lines:code});continue;
  }
  if(!current||current.kind!==kind){flush();current={kind,lines:[]}}
  current.lines.push(kind==='bullets'?line.slice(2):kind==='ordered'?line.replace(/^\d+\. /,''):line);
 }
 flush();return result;
}

function SectionBody({body}:{body:string}){
 return <div className="wp-copy">{blocks(body).map((block,i)=>{
  if(block.kind==='bullets')return <ul key={i}>{block.lines.map((line,j)=><li key={j}>{line}</li>)}</ul>;
  if(block.kind==='ordered')return <ol key={i}>{block.lines.map((line,j)=><li key={j}>{line}</li>)}</ol>;
  if(block.kind==='code')return <pre key={i}><code>{block.lines.join('\n')}</code></pre>;
  if(block.kind==='flow')return <div key={i} className="wp-flow">{block.lines.join(' ')}</div>;
  return <p key={i}>{block.lines.join('\n')}</p>;
 })}</div>
}

export default function WhitepaperPage(){
 return <div className="whitepaper-page">
  <header className="wp-hero" id="top">
   <div className="wp-hero-meta mono"><span>ARKHAI / WHITEPAPER</span><span>COMMUNICATION INFRASTRUCTURE FOR AUTONOMOUS SOFTWARE</span></div>
   <div className="wp-hero-main"><div><span className="wp-label mono">THE THESIS / 47 SECTIONS</span><h1>EVERY AGENT<br/>NEEDS AN <em>ADDRESS.</em></h1></div><p>Persistent identity. Messages that keep their context. Work that can wait for a reply and continue when it arrives.</p></div>
   <div className="wp-hero-bottom mono"><span>READ THE WHITEPAPER</span><a href="#chapters">EXPLORE THE CHAPTERS ↓</a></div>
  </header>

  <section className="wp-intro" aria-labelledby="wp-intro-title"><span className="wp-section-label mono">00 / THE PREMISE</span><div><h2 id="wp-intro-title">COMMUNICATION<br/><em>IS INFRASTRUCTURE.</em></h2><p>Agents can research, operate software and coordinate increasingly complex work. Yet reaching a person, another agent or an external system still requires a patchwork of channels, queues, authentication and state. ARKHAI proposes a persistent communication layer above those pieces.</p><p>This page presents the complete supplied whitepaper in a format made for reading on the web. API snippets and architecture describe the intended model.</p></div></section>

  <nav className="wp-chapters" id="chapters" aria-label="Whitepaper chapters"><div className="wp-chapter-header"><span className="wp-section-label mono">CONTENTS / 08 CHAPTERS</span><p>Choose a chapter or read from beginning to end.</p></div><div className="wp-chapter-grid">{chapters.map(chapter=><a key={chapter.id} href={'#'+chapter.id} className="wp-chapter-card"><span className="mono">{chapter.number} / {chapter.range}</span><strong>{chapter.title}</strong><span className="wp-chapter-description">{chapter.description}</span><span className="wp-chapter-arrow" aria-hidden="true">↘</span></a>)}</div></nav>

  <div className="wp-reading-layout"><aside className="wp-side"><div className="wp-side-inner"><span className="mono">IN THIS WHITEPAPER</span><nav aria-label="Chapter navigation">{chapters.map(chapter=><a key={chapter.id} href={'#'+chapter.id}><span>{chapter.number}</span>{chapter.title}</a>)}</nav><a className="wp-back mono" href="#top">BACK TO TOP ↑</a></div></aside><article className="wp-article" aria-label="ARKHAI whitepaper">{chapters.map(chapter=><section className="wp-chapter" id={chapter.id} key={chapter.id} aria-labelledby={chapter.id+'-heading'}><div className="wp-chapter-title"><span className="mono">CHAPTER {chapter.number} / SECTIONS {chapter.range}</span><h2 id={chapter.id+'-heading'}>{chapter.title}</h2><p>{chapter.description}</p><div className="wp-section-links" aria-label={chapter.title+' sections'}>{whitepaperSections.filter(s=>s.number>=chapter.start&&s.number<=chapter.end).map(section=><a key={section.number} href={'#section-'+section.number}><span>{String(section.number).padStart(2,'0')}</span>{section.title}</a>)}</div></div>{whitepaperSections.filter(s=>s.number>=chapter.start&&s.number<=chapter.end).map(section=><section className="wp-entry" id={'section-'+section.number} key={section.number} aria-labelledby={'section-'+section.number+'-heading'}><span className="wp-entry-index mono">{String(section.number).padStart(2,'0')}</span><div><h3 id={'section-'+section.number+'-heading'}>{section.title}</h3><SectionBody body={section.body}/></div></section>)}</section>)}</article></div>
  <div className="wp-end"><span className="mono">ARKHAI / EVERY AGENT NEEDS AN ADDRESS.</span><a href="#top">BACK TO THE BEGINNING ↑</a></div>
 </div>
}
