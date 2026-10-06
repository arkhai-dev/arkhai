import { readdirSync, readFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
const root = process.cwd();
const excluded = new Set(['node_modules','dist','.git','.vinext','.next']);
function walk(dir) { return readdirSync(dir,{withFileTypes:true}).flatMap(e => excluded.has(e.name) ? [] : e.isDirectory() ? walk(resolve(dir,e.name)) : [resolve(dir,e.name)]); }
const errors=[];
const secrets=[/gh[pousr]_[A-Za-z0-9]{30,}/, /AKIA[A-Z0-9]{16}/, /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/];
for(const file of walk(root)) {
  const name=relative(root,file);
  if (/(^|\/)\.env(?:\.|$)|\.pem$|\.key$|(^|\/)\.openai\//.test(name)) errors.push(name+': forbidden private/deployment file');
  if (/\.(mjs|ts|tsx|json|md|yml|svg|css)$/.test(file)) {
    const text=readFileSync(file,'utf8');
    if(secrets.some(pattern=>pattern.test(text))) errors.push(name+': possible secret; value withheld');
    if(name.startsWith('.github/workflows/')) {
      for(const [,action] of text.matchAll(/uses:\s*(\S+)/g)) if(!/^[\w-]+\/[\w-]+@[a-f0-9]{40}$/.test(action)) errors.push(name+': action must use a full commit SHA');
      if(!/contents: read/.test(text)||/continue-on-error:\s*true/.test(text)) errors.push(name+': unsafe or suppressed workflow checks');
    }
  }
}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log('Repository secret patterns and workflow configuration verified.');
