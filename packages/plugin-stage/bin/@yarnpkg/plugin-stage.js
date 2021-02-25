/* eslint-disable */
module.exports = {
name: "@orta/yarn-plugin-stage",
factory: function (require) {
var plugin;plugin=(()=>{"use strict";var t={454:(t,e,n)=>{n.r(e),n.d(e,{default:()=>E});function a(t,e,n,a){var o,i=arguments.length,s=i<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,a);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(s=(i<3?o(s):i>3?o(e,n,s):o(e,n))||s);return i>3&&s&&Object.defineProperty(e,n,s),s}var o,i=n(594),s=n(966),r=n(688),c=n(42);async function l(t,{marker:e}){do{if(r.xfs.existsSync(r.ppath.join(t,e)))return t;t=r.ppath.dirname(t)}while("/"!==t);return null}function d(t,e){let n=0,a=0;for(const o of t)"wip"!==o&&(e.test(o)?n+=1:a+=1);return n>=a}!function(t){t[t.CREATE=0]="CREATE",t[t.DELETE=1]="DELETE",t[t.ADD=2]="ADD",t[t.REMOVE=3]="REMOVE",t[t.MODIFY=4]="MODIFY"}(o||(o={}));const p=new Map([[o.CREATE,"create"],[o.DELETE,"delete"],[o.ADD,"add"],[o.REMOVE,"remove"],[o.MODIFY,"update"]]);async function u(t){const{code:e,stdout:n}=await s.execUtils.execvp("git",["log","-1","--pretty=format:%H"],{cwd:t});return 0===e?n.trim():null}async function f(t,e){const n=[],a=e.filter(t=>"package.json"===r.ppath.basename(t.path));for(const{action:e,path:i}of a){const a=r.ppath.relative(t,i);if(e===o.MODIFY){const e=await u(t),{stdout:r}=await s.execUtils.execvp("git",["show",`${e}:${a}`],{cwd:t,strict:!0}),c=await s.Manifest.fromText(r),l=await s.Manifest.fromFile(i),d=new Map([...l.dependencies,...l.devDependencies]),p=new Map([...c.dependencies,...c.devDependencies]);for(const[t,e]of p){const a=s.structUtils.stringifyIdent(e),i=d.get(t);i?i.range!==e.range&&n.push([o.MODIFY,`${a} to ${i.range}`]):n.push([o.REMOVE,a])}for(const[t,e]of d)p.has(t)||n.push([o.ADD,s.structUtils.stringifyIdent(e)])}else if(e===o.CREATE){const t=await s.Manifest.fromFile(i);t.name?n.push([o.CREATE,s.structUtils.stringifyIdent(t.name)]):n.push([o.CREATE,"a package"])}else{if(e!==o.DELETE)throw new Error("Assertion failed: Unsupported action type");{const e=await u(t),{stdout:i}=await s.execUtils.execvp("git",["show",`${e}:${a}`],{cwd:t,strict:!0}),r=await s.Manifest.fromText(i);r.name?n.push([o.DELETE,s.structUtils.stringifyIdent(r.name)]):n.push([o.DELETE,"a package"])}}}const{code:i,stdout:c}=await s.execUtils.execvp("git",["log","-11","--pretty=format:%s"],{cwd:t});return function(t,e){const n=function(t){return t.useComponent?"chore(yarn): ":""}(t),a=[],o=e.slice().sort((t,e)=>t[0]-e[0]);for(;o.length>0;){const[e,n]=o.shift();let i=p.get(e);t.useUpperCase&&0===a.length&&(i=`${i[0].toUpperCase()}${i.slice(1)}`),t.useThirdPerson&&(i+="s");const s=[n];for(;o.length>0&&o[0][0]===e;){const[,t]=o.shift();s.push(t)}s.sort();let r=s.shift();1===s.length?r+=" (and one other)":s.length>1&&(r+=` (and ${s.length} others)`),a.push(`${i} ${r}`)}return`${n}${a.join(", ")}`}(function(t){return{useThirdPerson:d(t,/^(\w\(\w+\):\s*)?\w+s/),useUpperCase:d(t,/^(\w\(\w+\):\s*)?[A-Z]/),useComponent:d(t,/^\w\(\w+\):/)}}(0===i?c.split(/\n/g).filter(t=>""!==t):[]),n)}const h={[o.CREATE]:[" A ","?? "],[o.MODIFY]:[" M "],[o.DELETE]:[" D "]},m={[o.CREATE]:["A  "],[o.MODIFY]:["M  "],[o.DELETE]:["D  "]},g=[{findRoot:async t=>await l(t,{marker:".git"}),async filterChanges(t,e,n,a){const{stdout:i}=await s.execUtils.execvp("git",["status","-s"],{cwd:t,strict:!0}),c=i.toString().split(/\n/g),l=(null==a?void 0:a.staged)?m:h;return[].concat(...c.map(e=>{if(""===e)return[];const n=e.slice(0,3),i=r.ppath.resolve(t,e.slice(3));if(!(null==a?void 0:a.staged)&&"?? "===n&&e.endsWith("/"))return function(t){const e=[],n=[t];for(;n.length>0;){const t=n.pop(),a=r.xfs.readdirSync(t);for(const o of a){const a=r.ppath.resolve(t,o);r.xfs.lstatSync(a).isDirectory()?n.push(a):e.push(a)}}return e}(i).map(t=>({action:o.CREATE,path:t}));{const t=[o.CREATE,o.MODIFY,o.DELETE].find(t=>l[t].includes(n));return void 0!==t?[{action:t,path:i}]:[]}})).filter(t=>function(t,{roots:e,names:n}){if(n.has(r.ppath.basename(t)))return!0;do{if(e.has(t))return!0;t=r.ppath.dirname(t)}while("/"!==t);return!1}(t.path,{roots:e,names:n}))},genCommitMessage:async(t,e)=>await f(t,e),async makeStage(t,e){const n=e.map(t=>r.npath.fromPortablePath(t.path));await s.execUtils.execvp("git",["add","--",...n],{cwd:t,strict:!0})},async makeCommit(t,e,n){const a=e.map(t=>r.npath.fromPortablePath(t.path));await s.execUtils.execvp("git",["add","-N","--",...a],{cwd:t,strict:!0}),await s.execUtils.execvp("git",["commit","-m",n+"\n\nCommit generated via `yarn stage`\n","--",...a],{cwd:t,strict:!0})},async makeReset(t,e){const n=e.map(t=>r.npath.fromPortablePath(t.path));await s.execUtils.execvp("git",["reset","HEAD","--",...n],{cwd:t,strict:!0})}},{findRoot:async t=>await l(t,{marker:".hg"}),filterChanges:async(t,e,n)=>[],genCommitMessage:async(t,e)=>"",async makeStage(t,e){},async makeCommit(t,e,n){},async makeReset(t,e){},async makeUpdate(t,e){}}];class w extends i.BaseCommand{constructor(){super(...arguments),this.commit=!1,this.reset=!1,this.update=!1,this.dryRun=!1}async execute(){const t=await s.Configuration.find(this.context.cwd,this.context.plugins),{project:e}=await s.Project.find(t,this.context.cwd),{driver:n,root:a}=await async function(t){let e=null,n=null;for(const a of g)if(null!==(n=await a.findRoot(t))){e=a;break}if(null===e||null===n)throw new c.UsageError("No stage driver has been found for your current project");return{driver:e,root:n}}(e.cwd),o=[t.get("bstatePath"),t.get("cacheFolder"),t.get("globalFolder"),t.get("virtualFolder"),t.get("yarnPath")];await t.triggerHook(t=>t.populateYarnPaths,e,t=>{o.push(t)});const i=new Set;for(const t of o)for(const e of y(a,t))i.add(e);const l=new Set([t.get("rcFilename"),t.get("lockfileFilename"),"package.json"]),d=await n.filterChanges(a,i,l),p=await n.genCommitMessage(a,d);if(this.dryRun)if(this.commit)this.context.stdout.write(p+"\n");else for(const t of d)this.context.stdout.write(r.npath.fromPortablePath(t.path)+"\n");else if(this.reset){const t=await n.filterChanges(a,i,l,{staged:!0});0===t.length?this.context.stdout.write("No staged changes found!"):await n.makeReset(a,t)}else 0===d.length?this.context.stdout.write("No changes found!"):this.commit?await n.makeCommit(a,d,p):(await n.makeStage(a,d),this.context.stdout.write(p))}}function y(t,e){const n=[];if(null===e)return n;for(;;){let a;(e===t||e.startsWith(t+"/"))&&n.push(e);try{a=r.xfs.statSync(e)}catch(t){break}if(!a.isSymbolicLink())break;e=r.ppath.resolve(r.ppath.dirname(e),r.xfs.readlinkSync(e))}return n}w.usage=c.Command.Usage({description:"add all yarn files to your vcs",details:"\n      This command will add to your staging area the files belonging to Yarn (typically any modified `package.json` and `.yarnrc.yml` files, but also linker-generated files, cache data, etc). It will take your ignore list into account, so the cache files won't be added if the cache is ignored in a `.gitignore` file (assuming you use Git).\n\n      Running `--reset` will instead remove them from the staging area (the changes will still be there, but won't be committed until you stage them back).\n\n      Since the staging area is a non-existent concept in Mercurial, Yarn will always create a new commit when running this command on Mercurial repositories. You can get this behavior when using Git by using the `--commit` flag which will directly create a commit.\n    ",examples:[["Adds all modified project files to the staging area","yarn stage"],["Creates a new commit containing all modified project files","yarn stage --commit"]]}),a([c.Command.Boolean("-c,--commit",{description:"Commit the staged files"})],w.prototype,"commit",void 0),a([c.Command.Boolean("-r,--reset",{description:"Remove all files from the staging area"})],w.prototype,"reset",void 0),a([c.Command.Boolean("-u,--update",{hidden:!0})],w.prototype,"update",void 0),a([c.Command.Boolean("-n,--dry-run",{description:"Print the commit message and the list of modified files without staging / committing"})],w.prototype,"dryRun",void 0),a([c.Command.Path("stage")],w.prototype,"execute",null);const E={commands:[w]}},594:t=>{t.exports=require("@orta/yarn-cli")},966:t=>{t.exports=require("@orta/yarn-core")},688:t=>{t.exports=require("@orta/yarn-fslib")},42:t=>{t.exports=require("clipanion")}},e={};function n(a){if(e[a])return e[a].exports;var o=e[a]={exports:{}};return t[a](o,o.exports,n),o.exports}return n.d=(t,e)=>{for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n(454)})();
return plugin;
}
};
