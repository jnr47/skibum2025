const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {execFileSync}=require('node:child_process');
test('scheduled publisher targets the new snapshot and pushes only that file (isolated local remote)',()=>{
 const workflow=fs.readFileSync(path.join(__dirname,'../.github/workflows/update-snow-data.yml'),'utf8');
 assert.match(workflow,/cron: '17 0,6,12,18 \* \* \*'/);
 assert.match(workflow,/if: github.ref == 'refs\/heads\/main'/);
 assert.match(workflow,/run: npm run fetch:snow/);
 assert.equal(require('../package.json').scripts['fetch:snow'],'node scripts/fetch-snow-data.js');
 const collector=fs.readFileSync(path.join(__dirname,'../scripts/fetch-snow-data.js'),'utf8');
 assert.match(collector,/path.join\(__dirname, '\.\.\/forecast-data.json'\)/);
 const script=workflow.split('      - name: Commit snapshot\n        run: |\n')[1].split('      - name:')[0].split('\n').map(l=>l.replace(/^          /,'')).join('\n');
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'skibum-workflow-'));
 const cwd=path.join(tmp,'checkout'),remote=path.join(tmp,'remote.git');fs.mkdirSync(cwd);
 const git=(...args)=>execFileSync('git',args,{cwd,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
 try{
  git('init','--bare',remote);git('init','-b','main');git('config','user.name','Workflow test');git('config','user.email','test@example.invalid');
  fs.writeFileSync(path.join(cwd,'forecast-data.json'),'old');fs.writeFileSync(path.join(cwd,'snow-data.json'),'legacy');git('add','.');git('commit','-m','fixture');git('remote','add','origin',remote);git('push','origin','main');
  fs.writeFileSync(path.join(cwd,'forecast-data.json'),'refreshed');fs.writeFileSync(path.join(cwd,'snow-data.json'),'must not publish');
  execFileSync('bash',['-e','-c',script],{cwd,stdio:'pipe'});
  assert.equal(git('--git-dir='+remote,'show','main:forecast-data.json'),'refreshed');
  assert.equal(git('--git-dir='+remote,'show','main:snow-data.json'),'legacy');
  assert.equal(git('--git-dir='+remote,'diff-tree','--no-commit-id','--name-only','-r','main'),'forecast-data.json');
 }finally{fs.rmSync(tmp,{recursive:true,force:true});}
});
