import { readFileSync, writeFileSync } from 'node:fs';
const repo=process.argv[2];
if(!repo || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo)) {console.error('Usage: node scripts/configure-repository.mjs OWNER/REPOSITORY');process.exit(1);}
const badges=['typecheck','behavior','motion','build','docs','hygiene'].map(name=>'[!['+name+'](https://github.com/'+repo+'/actions/workflows/'+name+'.yml/badge.svg)](https://github.com/'+repo+'/actions/workflows/'+name+'.yml)').join('\n');
const readme=readFileSync('README.md','utf8');
writeFileSync('README.md',readme.replace(/<!-- workflow-badges:start -->[\s\S]*?<!-- workflow-badges:end -->/,'<!-- workflow-badges:start -->\n'+badges+'\n<!-- workflow-badges:end -->'));
console.log('Configured native Actions badges for '+repo);
