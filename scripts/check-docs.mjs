import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
const root = process.cwd();
const excluded = new Set(['node_modules', 'dist', '.git', '.vinext', '.next']);
function walk(dir) { return readdirSync(dir, {withFileTypes:true}).flatMap(e => excluded.has(e.name) ? [] : e.isDirectory() ? walk(resolve(dir,e.name)) : [resolve(dir,e.name)]); }
const scripts = JSON.parse(readFileSync('package.json')).scripts;
const errors = [];
for (const file of walk(root).filter(f => f.endsWith('.md'))) {
  const text = readFileSync(file,'utf8');
  const links = [...text.matchAll(/\]\(([^\s)]+)\)/g), ...text.matchAll(/(?:href|src)="([^"]+)"/g)];
  for (const [, link] of links) {
    if (/^(https?:|mailto:|#)/.test(link)) continue;
    if (!existsSync(resolve(dirname(file),link.split('#')[0]))) errors.push(file+': broken link '+link);
  }
  for (const [, command] of text.matchAll(/npm run ([\w:-]+)/g)) if (!scripts[command]) errors.push(file+': unknown npm script '+command);
}
if (!existsSync('docs/assets/arkhai-banner.svg')) errors.push('Missing README banner');
if(errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('Documentation links, commands, and banner verified.');
