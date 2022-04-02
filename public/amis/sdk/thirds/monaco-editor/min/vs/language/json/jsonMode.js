/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define("vs/language/json/jsonMode",["require","require"],(e=>(()=>{var t,n=Object.create,r=Object.defineProperty,i=Object.getOwnPropertyDescriptor,o=Object.getOwnPropertyNames,a=Object.getPrototypeOf,s=Object.prototype.hasOwnProperty,u=e=>r(e,"__esModule",{value:!0}),c=(t=function(t){if(void 0!==e)return e.apply(this,arguments);throw new Error('Dynamic require of "'+t+'" is not supported')},void 0!==e?e:"undefined"!=typeof Proxy?new Proxy(t,{get:(t,n)=>(void 0!==e?e:t)[n]}):t),d=(e,t,n,a)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let u of o(t))!s.call(e,u)&&(n||"default"!==u)&&r(e,u,{get:()=>t[u],enumerable:!(a=i(t,u))||a.enumerable});return e},l=(e,t)=>d(u(r(null!=e?n(a(e)):{},"default",!t&&e&&e.__esModule?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e),g=(e=>(t,n)=>e&&e.get(t)||(n=d(u({}),t,1),e&&e.set(t,n),n))("undefined"!=typeof WeakMap?new WeakMap:0),f=((e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports))(((e,t)=>{var n=l(c("vs/editor/editor.api"));t.exports=n})),h={};((e,t)=>{for(var n in t)r(e,n,{get:t[n],enumerable:!0})})(h,{CompletionAdapter:()=>xe,DefinitionAdapter:()=>We,DiagnosticsAdapter:()=>Ee,DocumentColorAdapter:()=>$e,DocumentFormattingEditProvider:()=>qe,DocumentHighlightAdapter:()=>Fe,DocumentLinkAdapter:()=>ze,DocumentRangeFormattingEditProvider:()=>Xe,DocumentSymbolAdapter:()=>He,FoldingRangeAdapter:()=>Qe,HoverAdapter:()=>Pe,ReferenceAdapter:()=>Ue,RenameAdapter:()=>Ve,SelectionRangeAdapter:()=>Je,WorkerManager:()=>H,fromPosition:()=>Ie,fromRange:()=>Se,setupMode:()=>vt,toRange:()=>Te,toTextEdit:()=>De});var p={};d(p,l(f()));var m,v,_,b,k,w,C,y,E,A,x,I,S,T,R,D,M,P,j,L,F,O,W,N,U,V,H=class{_defaults;_idleCheckInterval;_lastUsedTime;_configChangeListener;_worker;_client;constructor(e){this._defaults=e,this._worker=null,this._client=null,this._idleCheckInterval=window.setInterval((()=>this._checkIfIdle()),3e4),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange((()=>this._stopWorker()))}_stopWorker(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null}dispose(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()}_checkIfIdle(){this._worker&&Date.now()-this._lastUsedTime>12e4&&this._stopWorker()}_getClient(){return this._lastUsedTime=Date.now(),this._client||(this._worker=p.editor.createWebWorker({moduleId:"vs/language/json/jsonWorker",label:this._defaults.languageId,createData:{languageSettings:this._defaults.diagnosticsOptions,languageId:this._defaults.languageId,enableSchemaRequest:this._defaults.diagnosticsOptions.enableSchemaRequest}}),this._client=this._worker.getProxy()),this._client}getLanguageServiceWorker(...e){let t;return this._getClient().then((e=>{t=e})).then((t=>{if(this._worker)return this._worker.withSyncedResources(e)})).then((e=>t))}};!function(e){e.MIN_VALUE=-2147483648,e.MAX_VALUE=2147483647}(m||(m={})),function(e){e.MIN_VALUE=0,e.MAX_VALUE=2147483647}(v||(v={})),function(e){e.create=function(e,t){return e===Number.MAX_VALUE&&(e=v.MAX_VALUE),t===Number.MAX_VALUE&&(t=v.MAX_VALUE),{line:e,character:t}},e.is=function(e){var t=e;return Ce.objectLiteral(t)&&Ce.uinteger(t.line)&&Ce.uinteger(t.character)}}(_||(_={})),function(e){e.create=function(e,t,n,r){if(Ce.uinteger(e)&&Ce.uinteger(t)&&Ce.uinteger(n)&&Ce.uinteger(r))return{start:_.create(e,t),end:_.create(n,r)};if(_.is(e)&&_.is(t))return{start:e,end:t};throw new Error("Range#create called with invalid arguments["+e+", "+t+", "+n+", "+r+"]")},e.is=function(e){var t=e;return Ce.objectLiteral(t)&&_.is(t.start)&&_.is(t.end)}}(b||(b={})),function(e){e.create=function(e,t){return{uri:e,range:t}},e.is=function(e){var t=e;return Ce.defined(t)&&b.is(t.range)&&(Ce.string(t.uri)||Ce.undefined(t.uri))}}(k||(k={})),function(e){e.create=function(e,t,n,r){return{targetUri:e,targetRange:t,targetSelectionRange:n,originSelectionRange:r}},e.is=function(e){var t=e;return Ce.defined(t)&&b.is(t.targetRange)&&Ce.string(t.targetUri)&&(b.is(t.targetSelectionRange)||Ce.undefined(t.targetSelectionRange))&&(b.is(t.originSelectionRange)||Ce.undefined(t.originSelectionRange))}}(w||(w={})),function(e){e.create=function(e,t,n,r){return{red:e,green:t,blue:n,alpha:r}},e.is=function(e){var t=e;return Ce.numberRange(t.red,0,1)&&Ce.numberRange(t.green,0,1)&&Ce.numberRange(t.blue,0,1)&&Ce.numberRange(t.alpha,0,1)}}(C||(C={})),function(e){e.create=function(e,t){return{range:e,color:t}},e.is=function(e){var t=e;return b.is(t.range)&&C.is(t.color)}}(y||(y={})),function(e){e.create=function(e,t,n){return{label:e,textEdit:t,additionalTextEdits:n}},e.is=function(e){var t=e;return Ce.string(t.label)&&(Ce.undefined(t.textEdit)||P.is(t))&&(Ce.undefined(t.additionalTextEdits)||Ce.typedArray(t.additionalTextEdits,P.is))}}(E||(E={})),function(e){e.Comment="comment",e.Imports="imports",e.Region="region"}(A||(A={})),function(e){e.create=function(e,t,n,r,i){var o={startLine:e,endLine:t};return Ce.defined(n)&&(o.startCharacter=n),Ce.defined(r)&&(o.endCharacter=r),Ce.defined(i)&&(o.kind=i),o},e.is=function(e){var t=e;return Ce.uinteger(t.startLine)&&Ce.uinteger(t.startLine)&&(Ce.undefined(t.startCharacter)||Ce.uinteger(t.startCharacter))&&(Ce.undefined(t.endCharacter)||Ce.uinteger(t.endCharacter))&&(Ce.undefined(t.kind)||Ce.string(t.kind))}}(x||(x={})),function(e){e.create=function(e,t){return{location:e,message:t}},e.is=function(e){var t=e;return Ce.defined(t)&&k.is(t.location)&&Ce.string(t.message)}}(I||(I={})),function(e){e.Error=1,e.Warning=2,e.Information=3,e.Hint=4}(S||(S={})),function(e){e.Unnecessary=1,e.Deprecated=2}(T||(T={})),function(e){e.is=function(e){var t=e;return null!=t&&Ce.string(t.href)}}(R||(R={})),function(e){e.create=function(e,t,n,r,i,o){var a={range:e,message:t};return Ce.defined(n)&&(a.severity=n),Ce.defined(r)&&(a.code=r),Ce.defined(i)&&(a.source=i),Ce.defined(o)&&(a.relatedInformation=o),a},e.is=function(e){var t,n=e;return Ce.defined(n)&&b.is(n.range)&&Ce.string(n.message)&&(Ce.number(n.severity)||Ce.undefined(n.severity))&&(Ce.integer(n.code)||Ce.string(n.code)||Ce.undefined(n.code))&&(Ce.undefined(n.codeDescription)||Ce.string(null===(t=n.codeDescription)||void 0===t?void 0:t.href))&&(Ce.string(n.source)||Ce.undefined(n.source))&&(Ce.undefined(n.relatedInformation)||Ce.typedArray(n.relatedInformation,I.is))}}(D||(D={})),function(e){e.create=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i={title:e,command:t};return Ce.defined(n)&&n.length>0&&(i.arguments=n),i},e.is=function(e){var t=e;return Ce.defined(t)&&Ce.string(t.title)&&Ce.string(t.command)}}(M||(M={})),function(e){e.replace=function(e,t){return{range:e,newText:t}},e.insert=function(e,t){return{range:{start:e,end:e},newText:t}},e.del=function(e){return{range:e,newText:""}},e.is=function(e){var t=e;return Ce.objectLiteral(t)&&Ce.string(t.newText)&&b.is(t.range)}}(P||(P={})),function(e){e.create=function(e,t,n){var r={label:e};return void 0!==t&&(r.needsConfirmation=t),void 0!==n&&(r.description=n),r},e.is=function(e){var t=e;return void 0!==t&&Ce.objectLiteral(t)&&Ce.string(t.label)&&(Ce.boolean(t.needsConfirmation)||void 0===t.needsConfirmation)&&(Ce.string(t.description)||void 0===t.description)}}(j||(j={})),function(e){e.is=function(e){return"string"==typeof e}}(L||(L={})),function(e){e.replace=function(e,t,n){return{range:e,newText:t,annotationId:n}},e.insert=function(e,t,n){return{range:{start:e,end:e},newText:t,annotationId:n}},e.del=function(e,t){return{range:e,newText:"",annotationId:t}},e.is=function(e){var t=e;return P.is(t)&&(j.is(t.annotationId)||L.is(t.annotationId))}}(F||(F={})),function(e){e.create=function(e,t){return{textDocument:e,edits:t}},e.is=function(e){var t=e;return Ce.defined(t)&&q.is(t.textDocument)&&Array.isArray(t.edits)}}(O||(O={})),function(e){e.create=function(e,t,n){var r={kind:"create",uri:e};return void 0!==t&&(void 0!==t.overwrite||void 0!==t.ignoreIfExists)&&(r.options=t),void 0!==n&&(r.annotationId=n),r},e.is=function(e){var t=e;return t&&"create"===t.kind&&Ce.string(t.uri)&&(void 0===t.options||(void 0===t.options.overwrite||Ce.boolean(t.options.overwrite))&&(void 0===t.options.ignoreIfExists||Ce.boolean(t.options.ignoreIfExists)))&&(void 0===t.annotationId||L.is(t.annotationId))}}(W||(W={})),function(e){e.create=function(e,t,n,r){var i={kind:"rename",oldUri:e,newUri:t};return void 0!==n&&(void 0!==n.overwrite||void 0!==n.ignoreIfExists)&&(i.options=n),void 0!==r&&(i.annotationId=r),i},e.is=function(e){var t=e;return t&&"rename"===t.kind&&Ce.string(t.oldUri)&&Ce.string(t.newUri)&&(void 0===t.options||(void 0===t.options.overwrite||Ce.boolean(t.options.overwrite))&&(void 0===t.options.ignoreIfExists||Ce.boolean(t.options.ignoreIfExists)))&&(void 0===t.annotationId||L.is(t.annotationId))}}(N||(N={})),function(e){e.create=function(e,t,n){var r={kind:"delete",uri:e};return void 0!==t&&(void 0!==t.recursive||void 0!==t.ignoreIfNotExists)&&(r.options=t),void 0!==n&&(r.annotationId=n),r},e.is=function(e){var t=e;return t&&"delete"===t.kind&&Ce.string(t.uri)&&(void 0===t.options||(void 0===t.options.recursive||Ce.boolean(t.options.recursive))&&(void 0===t.options.ignoreIfNotExists||Ce.boolean(t.options.ignoreIfNotExists)))&&(void 0===t.annotationId||L.is(t.annotationId))}}(U||(U={})),function(e){e.is=function(e){var t=e;return t&&(void 0!==t.changes||void 0!==t.documentChanges)&&(void 0===t.documentChanges||t.documentChanges.every((function(e){return Ce.string(e.kind)?W.is(e)||N.is(e)||U.is(e):O.is(e)})))}}(V||(V={}));var K,z,q,X,B,$,Q,G,J,Y,Z,ee,te,ne,re,ie,oe,ae,se,ue,ce,de,le,ge,fe,he,pe,me,ve,_e,be,ke=function(){function e(e,t){this.edits=e,this.changeAnnotations=t}return e.prototype.insert=function(e,t,n){var r,i;if(void 0===n?r=P.insert(e,t):L.is(n)?(i=n,r=F.insert(e,t,n)):(this.assertChangeAnnotations(this.changeAnnotations),i=this.changeAnnotations.manage(n),r=F.insert(e,t,i)),this.edits.push(r),void 0!==i)return i},e.prototype.replace=function(e,t,n){var r,i;if(void 0===n?r=P.replace(e,t):L.is(n)?(i=n,r=F.replace(e,t,n)):(this.assertChangeAnnotations(this.changeAnnotations),i=this.changeAnnotations.manage(n),r=F.replace(e,t,i)),this.edits.push(r),void 0!==i)return i},e.prototype.delete=function(e,t){var n,r;if(void 0===t?n=P.del(e):L.is(t)?(r=t,n=F.del(e,t)):(this.assertChangeAnnotations(this.changeAnnotations),r=this.changeAnnotations.manage(t),n=F.del(e,r)),this.edits.push(n),void 0!==r)return r},e.prototype.add=function(e){this.edits.push(e)},e.prototype.all=function(){return this.edits},e.prototype.clear=function(){this.edits.splice(0,this.edits.length)},e.prototype.assertChangeAnnotations=function(e){if(void 0===e)throw new Error("Text edit change is not configured to manage change annotations.")},e}(),we=function(){function e(e){this._annotations=void 0===e?Object.create(null):e,this._counter=0,this._size=0}return e.prototype.all=function(){return this._annotations},Object.defineProperty(e.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),e.prototype.manage=function(e,t){var n;if(L.is(e)?n=e:(n=this.nextId(),t=e),void 0!==this._annotations[n])throw new Error("Id "+n+" is already in use.");if(void 0===t)throw new Error("No annotation provided for id "+n);return this._annotations[n]=t,this._size++,n},e.prototype.nextId=function(){return this._counter++,this._counter.toString()},e}();!function(){function e(e){var t=this;this._textEditChanges=Object.create(null),void 0!==e?(this._workspaceEdit=e,e.documentChanges?(this._changeAnnotations=new we(e.changeAnnotations),e.changeAnnotations=this._changeAnnotations.all(),e.documentChanges.forEach((function(e){if(O.is(e)){var n=new ke(e.edits,t._changeAnnotations);t._textEditChanges[e.textDocument.uri]=n}}))):e.changes&&Object.keys(e.changes).forEach((function(n){var r=new ke(e.changes[n]);t._textEditChanges[n]=r}))):this._workspaceEdit={}}Object.defineProperty(e.prototype,"edit",{get:function(){return this.initDocumentChanges(),void 0!==this._changeAnnotations&&(0===this._changeAnnotations.size?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),e.prototype.getTextEditChange=function(e){if(q.is(e)){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var t={uri:e.uri,version:e.version};if(!(r=this._textEditChanges[t.uri])){var n={textDocument:t,edits:i=[]};this._workspaceEdit.documentChanges.push(n),r=new ke(i,this._changeAnnotations),this._textEditChanges[t.uri]=r}return r}if(this.initChanges(),void 0===this._workspaceEdit.changes)throw new Error("Workspace edit is not configured for normal text edit changes.");var r;if(!(r=this._textEditChanges[e])){var i=[];this._workspaceEdit.changes[e]=i,r=new ke(i),this._textEditChanges[e]=r}return r},e.prototype.initDocumentChanges=function(){void 0===this._workspaceEdit.documentChanges&&void 0===this._workspaceEdit.changes&&(this._changeAnnotations=new we,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},e.prototype.initChanges=function(){void 0===this._workspaceEdit.documentChanges&&void 0===this._workspaceEdit.changes&&(this._workspaceEdit.changes=Object.create(null))},e.prototype.createFile=function(e,t,n){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var r,i,o;if(j.is(t)||L.is(t)?r=t:n=t,void 0===r?i=W.create(e,n):(o=L.is(r)?r:this._changeAnnotations.manage(r),i=W.create(e,n,o)),this._workspaceEdit.documentChanges.push(i),void 0!==o)return o},e.prototype.renameFile=function(e,t,n,r){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var i,o,a;if(j.is(n)||L.is(n)?i=n:r=n,void 0===i?o=N.create(e,t,r):(a=L.is(i)?i:this._changeAnnotations.manage(i),o=N.create(e,t,r,a)),this._workspaceEdit.documentChanges.push(o),void 0!==a)return a},e.prototype.deleteFile=function(e,t,n){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var r,i,o;if(j.is(t)||L.is(t)?r=t:n=t,void 0===r?i=U.create(e,n):(o=L.is(r)?r:this._changeAnnotations.manage(r),i=U.create(e,n,o)),this._workspaceEdit.documentChanges.push(i),void 0!==o)return o}}();!function(e){e.create=function(e){return{uri:e}},e.is=function(e){var t=e;return Ce.defined(t)&&Ce.string(t.uri)}}(K||(K={})),function(e){e.create=function(e,t){return{uri:e,version:t}},e.is=function(e){var t=e;return Ce.defined(t)&&Ce.string(t.uri)&&Ce.integer(t.version)}}(z||(z={})),function(e){e.create=function(e,t){return{uri:e,version:t}},e.is=function(e){var t=e;return Ce.defined(t)&&Ce.string(t.uri)&&(null===t.version||Ce.integer(t.version))}}(q||(q={})),function(e){e.create=function(e,t,n,r){return{uri:e,languageId:t,version:n,text:r}},e.is=function(e){var t=e;return Ce.defined(t)&&Ce.string(t.uri)&&Ce.string(t.languageId)&&Ce.integer(t.version)&&Ce.string(t.text)}}(X||(X={})),function(e){e.PlainText="plaintext",e.Markdown="markdown"}(B||(B={})),function(e){e.is=function(t){var n=t;return n===e.PlainText||n===e.Markdown}}(B||(B={})),function(e){e.is=function(e){var t=e;return Ce.objectLiteral(e)&&B.is(t.kind)&&Ce.string(t.value)}}($||($={})),function(e){e.Text=1,e.Method=2,e.Function=3,e.Constructor=4,e.Field=5,e.Variable=6,e.Class=7,e.Interface=8,e.Module=9,e.Property=10,e.Unit=11,e.Value=12,e.Enum=13,e.Keyword=14,e.Snippet=15,e.Color=16,e.File=17,e.Reference=18,e.Folder=19,e.EnumMember=20,e.Constant=21,e.Struct=22,e.Event=23,e.Operator=24,e.TypeParameter=25}(Q||(Q={})),function(e){e.PlainText=1,e.Snippet=2}(G||(G={})),function(e){e.Deprecated=1}(J||(J={})),function(e){e.create=function(e,t,n){return{newText:e,insert:t,replace:n}},e.is=function(e){var t=e;return t&&Ce.string(t.newText)&&b.is(t.insert)&&b.is(t.replace)}}(Y||(Y={})),function(e){e.asIs=1,e.adjustIndentation=2}(Z||(Z={})),function(e){e.create=function(e){return{label:e}}}(ee||(ee={})),function(e){e.create=function(e,t){return{items:e||[],isIncomplete:!!t}}}(te||(te={})),function(e){e.fromPlainText=function(e){return e.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")},e.is=function(e){var t=e;return Ce.string(t)||Ce.objectLiteral(t)&&Ce.string(t.language)&&Ce.string(t.value)}}(ne||(ne={})),function(e){e.is=function(e){var t=e;return!!t&&Ce.objectLiteral(t)&&($.is(t.contents)||ne.is(t.contents)||Ce.typedArray(t.contents,ne.is))&&(void 0===e.range||b.is(e.range))}}(re||(re={})),function(e){e.create=function(e,t){return t?{label:e,documentation:t}:{label:e}}}(ie||(ie={})),function(e){e.create=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i={label:e};return Ce.defined(t)&&(i.documentation=t),Ce.defined(n)?i.parameters=n:i.parameters=[],i}}(oe||(oe={})),function(e){e.Text=1,e.Read=2,e.Write=3}(ae||(ae={})),function(e){e.create=function(e,t){var n={range:e};return Ce.number(t)&&(n.kind=t),n}}(se||(se={})),function(e){e.File=1,e.Module=2,e.Namespace=3,e.Package=4,e.Class=5,e.Method=6,e.Property=7,e.Field=8,e.Constructor=9,e.Enum=10,e.Interface=11,e.Function=12,e.Variable=13,e.Constant=14,e.String=15,e.Number=16,e.Boolean=17,e.Array=18,e.Object=19,e.Key=20,e.Null=21,e.EnumMember=22,e.Struct=23,e.Event=24,e.Operator=25,e.TypeParameter=26}(ue||(ue={})),function(e){e.Deprecated=1}(ce||(ce={})),function(e){e.create=function(e,t,n,r,i){var o={name:e,kind:t,location:{uri:r,range:n}};return i&&(o.containerName=i),o}}(de||(de={})),function(e){e.create=function(e,t,n,r,i,o){var a={name:e,detail:t,kind:n,range:r,selectionRange:i};return void 0!==o&&(a.children=o),a},e.is=function(e){var t=e;return t&&Ce.string(t.name)&&Ce.number(t.kind)&&b.is(t.range)&&b.is(t.selectionRange)&&(void 0===t.detail||Ce.string(t.detail))&&(void 0===t.deprecated||Ce.boolean(t.deprecated))&&(void 0===t.children||Array.isArray(t.children))&&(void 0===t.tags||Array.isArray(t.tags))}}(le||(le={})),function(e){e.Empty="",e.QuickFix="quickfix",e.Refactor="refactor",e.RefactorExtract="refactor.extract",e.RefactorInline="refactor.inline",e.RefactorRewrite="refactor.rewrite",e.Source="source",e.SourceOrganizeImports="source.organizeImports",e.SourceFixAll="source.fixAll"}(ge||(ge={})),function(e){e.create=function(e,t){var n={diagnostics:e};return null!=t&&(n.only=t),n},e.is=function(e){var t=e;return Ce.defined(t)&&Ce.typedArray(t.diagnostics,D.is)&&(void 0===t.only||Ce.typedArray(t.only,Ce.string))}}(fe||(fe={})),function(e){e.create=function(e,t,n){var r={title:e},i=!0;return"string"==typeof t?(i=!1,r.kind=t):M.is(t)?r.command=t:r.edit=t,i&&void 0!==n&&(r.kind=n),r},e.is=function(e){var t=e;return t&&Ce.string(t.title)&&(void 0===t.diagnostics||Ce.typedArray(t.diagnostics,D.is))&&(void 0===t.kind||Ce.string(t.kind))&&(void 0!==t.edit||void 0!==t.command)&&(void 0===t.command||M.is(t.command))&&(void 0===t.isPreferred||Ce.boolean(t.isPreferred))&&(void 0===t.edit||V.is(t.edit))}}(he||(he={})),function(e){e.create=function(e,t){var n={range:e};return Ce.defined(t)&&(n.data=t),n},e.is=function(e){var t=e;return Ce.defined(t)&&b.is(t.range)&&(Ce.undefined(t.command)||M.is(t.command))}}(pe||(pe={})),function(e){e.create=function(e,t){return{tabSize:e,insertSpaces:t}},e.is=function(e){var t=e;return Ce.defined(t)&&Ce.uinteger(t.tabSize)&&Ce.boolean(t.insertSpaces)}}(me||(me={})),function(e){e.create=function(e,t,n){return{range:e,target:t,data:n}},e.is=function(e){var t=e;return Ce.defined(t)&&b.is(t.range)&&(Ce.undefined(t.target)||Ce.string(t.target))}}(ve||(ve={})),function(e){e.create=function(e,t){return{range:e,parent:t}},e.is=function(t){var n=t;return void 0!==n&&b.is(n.range)&&(void 0===n.parent||e.is(n.parent))}}(_e||(_e={})),function(e){function t(e,n){if(e.length<=1)return e;var r=e.length/2|0,i=e.slice(0,r),o=e.slice(r);t(i,n),t(o,n);for(var a=0,s=0,u=0;a<i.length&&s<o.length;){var c=n(i[a],o[s]);e[u++]=c<=0?i[a++]:o[s++]}for(;a<i.length;)e[u++]=i[a++];for(;s<o.length;)e[u++]=o[s++];return e}e.create=function(e,t,n,r){return new ye(e,t,n,r)},e.is=function(e){var t=e;return!!(Ce.defined(t)&&Ce.string(t.uri)&&(Ce.undefined(t.languageId)||Ce.string(t.languageId))&&Ce.uinteger(t.lineCount)&&Ce.func(t.getText)&&Ce.func(t.positionAt)&&Ce.func(t.offsetAt))},e.applyEdits=function(e,n){for(var r=e.getText(),i=t(n,(function(e,t){var n=e.range.start.line-t.range.start.line;return 0===n?e.range.start.character-t.range.start.character:n})),o=r.length,a=i.length-1;a>=0;a--){var s=i[a],u=e.offsetAt(s.range.start),c=e.offsetAt(s.range.end);if(!(c<=o))throw new Error("Overlapping edit");r=r.substring(0,u)+s.newText+r.substring(c,r.length),o=u}return r}}(be||(be={}));var Ce,ye=function(){function e(e,t,n,r){this._uri=e,this._languageId=t,this._version=n,this._content=r,this._lineOffsets=void 0}return Object.defineProperty(e.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),e.prototype.getText=function(e){if(e){var t=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(t,n)}return this._content},e.prototype.update=function(e,t){this._content=e.text,this._version=t,this._lineOffsets=void 0},e.prototype.getLineOffsets=function(){if(void 0===this._lineOffsets){for(var e=[],t=this._content,n=!0,r=0;r<t.length;r++){n&&(e.push(r),n=!1);var i=t.charAt(r);n="\r"===i||"\n"===i,"\r"===i&&r+1<t.length&&"\n"===t.charAt(r+1)&&r++}n&&t.length>0&&e.push(t.length),this._lineOffsets=e}return this._lineOffsets},e.prototype.positionAt=function(e){e=Math.max(Math.min(e,this._content.length),0);var t=this.getLineOffsets(),n=0,r=t.length;if(0===r)return _.create(0,e);for(;n<r;){var i=Math.floor((n+r)/2);t[i]>e?r=i:n=i+1}var o=n-1;return _.create(o,e-t[o])},e.prototype.offsetAt=function(e){var t=this.getLineOffsets();if(e.line>=t.length)return this._content.length;if(e.line<0)return 0;var n=t[e.line],r=e.line+1<t.length?t[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,r),n)},Object.defineProperty(e.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),e}();!function(e){var t=Object.prototype.toString;e.defined=function(e){return typeof e<"u"},e.undefined=function(e){return typeof e>"u"},e.boolean=function(e){return!0===e||!1===e},e.string=function(e){return"[object String]"===t.call(e)},e.number=function(e){return"[object Number]"===t.call(e)},e.numberRange=function(e,n,r){return"[object Number]"===t.call(e)&&n<=e&&e<=r},e.integer=function(e){return"[object Number]"===t.call(e)&&-2147483648<=e&&e<=2147483647},e.uinteger=function(e){return"[object Number]"===t.call(e)&&0<=e&&e<=2147483647},e.func=function(e){return"[object Function]"===t.call(e)},e.objectLiteral=function(e){return null!==e&&"object"==typeof e},e.typedArray=function(e,t){return Array.isArray(e)&&e.every(t)}}(Ce||(Ce={}));var Ee=class{constructor(e,t,n){this._languageId=e,this._worker=t;let r=e=>{let t,n=e.getLanguageId();n===this._languageId&&(this._listener[e.uri.toString()]=e.onDidChangeContent((()=>{window.clearTimeout(t),t=window.setTimeout((()=>this._doValidate(e.uri,n)),500)})),this._doValidate(e.uri,n))},i=e=>{p.editor.setModelMarkers(e,this._languageId,[]);let t=e.uri.toString(),n=this._listener[t];n&&(n.dispose(),delete this._listener[t])};this._disposables.push(p.editor.onDidCreateModel(r)),this._disposables.push(p.editor.onWillDisposeModel(i)),this._disposables.push(p.editor.onDidChangeModelLanguage((e=>{i(e.model),r(e.model)}))),this._disposables.push(n((e=>{p.editor.getModels().forEach((e=>{e.getLanguageId()===this._languageId&&(i(e),r(e))}))}))),this._disposables.push({dispose:()=>{p.editor.getModels().forEach(i);for(let e in this._listener)this._listener[e].dispose()}}),p.editor.getModels().forEach(r)}_disposables=[];_listener=Object.create(null);dispose(){this._disposables.forEach((e=>e&&e.dispose())),this._disposables.length=0}_doValidate(e,t){this._worker(e).then((t=>t.doValidation(e.toString()))).then((n=>{let r=n.map((e=>function(e,t){let n="number"==typeof t.code?String(t.code):t.code;return{severity:Ae(t.severity),startLineNumber:t.range.start.line+1,startColumn:t.range.start.character+1,endLineNumber:t.range.end.line+1,endColumn:t.range.end.character+1,message:t.message,code:n,source:t.source}}(0,e))),i=p.editor.getModel(e);i&&i.getLanguageId()===t&&p.editor.setModelMarkers(i,t,r)})).then(void 0,(e=>{console.error(e)}))}};function Ae(e){switch(e){case S.Error:return p.MarkerSeverity.Error;case S.Warning:return p.MarkerSeverity.Warning;case S.Information:return p.MarkerSeverity.Info;case S.Hint:return p.MarkerSeverity.Hint;default:return p.MarkerSeverity.Info}}var xe=class{constructor(e,t){this._worker=e,this._triggerCharacters=t}get triggerCharacters(){return this._triggerCharacters}provideCompletionItems(e,t,n,r){let i=e.uri;return this._worker(i).then((e=>e.doComplete(i.toString(),Ie(t)))).then((n=>{if(!n)return;let r=e.getWordUntilPosition(t),i=new p.Range(t.lineNumber,r.startColumn,t.lineNumber,r.endColumn),o=n.items.map((e=>{let t={label:e.label,insertText:e.insertText||e.label,sortText:e.sortText,filterText:e.filterText,documentation:e.documentation,detail:e.detail,command:Me(e.command),range:i,kind:Re(e.kind)};return e.textEdit&&(function(e){return typeof e.insert<"u"&&typeof e.replace<"u"}(e.textEdit)?t.range={insert:Te(e.textEdit.insert),replace:Te(e.textEdit.replace)}:t.range=Te(e.textEdit.range),t.insertText=e.textEdit.newText),e.additionalTextEdits&&(t.additionalTextEdits=e.additionalTextEdits.map(De)),e.insertTextFormat===G.Snippet&&(t.insertTextRules=p.languages.CompletionItemInsertTextRule.InsertAsSnippet),t}));return{isIncomplete:n.isIncomplete,suggestions:o}}))}};function Ie(e){if(e)return{character:e.column-1,line:e.lineNumber-1}}function Se(e){if(e)return{start:{line:e.startLineNumber-1,character:e.startColumn-1},end:{line:e.endLineNumber-1,character:e.endColumn-1}}}function Te(e){if(e)return new p.Range(e.start.line+1,e.start.character+1,e.end.line+1,e.end.character+1)}function Re(e){let t=p.languages.CompletionItemKind;switch(e){case Q.Text:return t.Text;case Q.Method:return t.Method;case Q.Function:return t.Function;case Q.Constructor:return t.Constructor;case Q.Field:return t.Field;case Q.Variable:return t.Variable;case Q.Class:return t.Class;case Q.Interface:return t.Interface;case Q.Module:return t.Module;case Q.Property:return t.Property;case Q.Unit:return t.Unit;case Q.Value:return t.Value;case Q.Enum:return t.Enum;case Q.Keyword:return t.Keyword;case Q.Snippet:return t.Snippet;case Q.Color:return t.Color;case Q.File:return t.File;case Q.Reference:return t.Reference}return t.Property}function De(e){if(e)return{range:Te(e.range),text:e.newText}}function Me(e){return e&&"editor.action.triggerSuggest"===e.command?{id:e.command,title:e.title,arguments:e.arguments}:void 0}var Pe=class{constructor(e){this._worker=e}provideHover(e,t,n){let r=e.uri;return this._worker(r).then((e=>e.doHover(r.toString(),Ie(t)))).then((e=>{if(e)return{range:Te(e.range),contents:Le(e.contents)}}))}};function je(e){return"string"==typeof e?{value:e}:function(e){return e&&"object"==typeof e&&"string"==typeof e.kind}(e)?"plaintext"===e.kind?{value:e.value.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}:{value:e.value}:{value:"```"+e.language+"\n"+e.value+"\n```\n"}}function Le(e){if(e)return Array.isArray(e)?e.map(je):[je(e)]}var Fe=class{constructor(e){this._worker=e}provideDocumentHighlights(e,t,n){let r=e.uri;return this._worker(r).then((e=>e.findDocumentHighlights(r.toString(),Ie(t)))).then((e=>{if(e)return e.map((e=>({range:Te(e.range),kind:Oe(e.kind)})))}))}};function Oe(e){switch(e){case ae.Read:return p.languages.DocumentHighlightKind.Read;case ae.Write:return p.languages.DocumentHighlightKind.Write;case ae.Text:return p.languages.DocumentHighlightKind.Text}return p.languages.DocumentHighlightKind.Text}var We=class{constructor(e){this._worker=e}provideDefinition(e,t,n){let r=e.uri;return this._worker(r).then((e=>e.findDefinition(r.toString(),Ie(t)))).then((e=>{if(e)return[Ne(e)]}))}};function Ne(e){return{uri:p.Uri.parse(e.uri),range:Te(e.range)}}var Ue=class{constructor(e){this._worker=e}provideReferences(e,t,n,r){let i=e.uri;return this._worker(i).then((e=>e.findReferences(i.toString(),Ie(t)))).then((e=>{if(e)return e.map(Ne)}))}},Ve=class{constructor(e){this._worker=e}provideRenameEdits(e,t,n,r){let i=e.uri;return this._worker(i).then((e=>e.doRename(i.toString(),Ie(t),n))).then((e=>function(e){if(!e||!e.changes)return;let t=[];for(let n in e.changes){let r=p.Uri.parse(n);for(let i of e.changes[n])t.push({resource:r,edit:{range:Te(i.range),text:i.newText}})}return{edits:t}}(e)))}};var He=class{constructor(e){this._worker=e}provideDocumentSymbols(e,t){let n=e.uri;return this._worker(n).then((e=>e.findDocumentSymbols(n.toString()))).then((e=>{if(e)return e.map((e=>({name:e.name,detail:"",containerName:e.containerName,kind:Ke(e.kind),range:Te(e.location.range),selectionRange:Te(e.location.range),tags:[]})))}))}};function Ke(e){let t=p.languages.SymbolKind;switch(e){case ue.File:return t.Array;case ue.Module:return t.Module;case ue.Namespace:return t.Namespace;case ue.Package:return t.Package;case ue.Class:return t.Class;case ue.Method:return t.Method;case ue.Property:return t.Property;case ue.Field:return t.Field;case ue.Constructor:return t.Constructor;case ue.Enum:return t.Enum;case ue.Interface:return t.Interface;case ue.Function:return t.Function;case ue.Variable:return t.Variable;case ue.Constant:return t.Constant;case ue.String:return t.String;case ue.Number:return t.Number;case ue.Boolean:return t.Boolean;case ue.Array:return t.Array}return t.Function}var ze=class{constructor(e){this._worker=e}provideLinks(e,t){let n=e.uri;return this._worker(n).then((e=>e.findDocumentLinks(n.toString()))).then((e=>{if(e)return{links:e.map((e=>({range:Te(e.range),url:e.target})))}}))}},qe=class{constructor(e){this._worker=e}provideDocumentFormattingEdits(e,t,n){let r=e.uri;return this._worker(r).then((e=>e.format(r.toString(),null,Be(t)).then((e=>{if(e&&0!==e.length)return e.map(De)}))))}},Xe=class{constructor(e){this._worker=e}provideDocumentRangeFormattingEdits(e,t,n,r){let i=e.uri;return this._worker(i).then((e=>e.format(i.toString(),Se(t),Be(n)).then((e=>{if(e&&0!==e.length)return e.map(De)}))))}};function Be(e){return{tabSize:e.tabSize,insertSpaces:e.insertSpaces}}var $e=class{constructor(e){this._worker=e}provideDocumentColors(e,t){let n=e.uri;return this._worker(n).then((e=>e.findDocumentColors(n.toString()))).then((e=>{if(e)return e.map((e=>({color:e.color,range:Te(e.range)})))}))}provideColorPresentations(e,t,n){let r=e.uri;return this._worker(r).then((e=>e.getColorPresentations(r.toString(),t.color,Se(t.range)))).then((e=>{if(e)return e.map((e=>{let t={label:e.label};return e.textEdit&&(t.textEdit=De(e.textEdit)),e.additionalTextEdits&&(t.additionalTextEdits=e.additionalTextEdits.map(De)),t}))}))}},Qe=class{constructor(e){this._worker=e}provideFoldingRanges(e,t,n){let r=e.uri;return this._worker(r).then((e=>e.getFoldingRanges(r.toString(),t))).then((e=>{if(e)return e.map((e=>{let t={start:e.startLine+1,end:e.endLine+1};return typeof e.kind<"u"&&(t.kind=function(e){switch(e){case A.Comment:return p.languages.FoldingRangeKind.Comment;case A.Imports:return p.languages.FoldingRangeKind.Imports;case A.Region:return p.languages.FoldingRangeKind.Region}}(e.kind)),t}))}))}};var Ge,Je=class{constructor(e){this._worker=e}provideSelectionRanges(e,t,n){let r=e.uri;return this._worker(r).then((e=>e.getSelectionRanges(r.toString(),t.map(Ie)))).then((e=>{if(e)return e.map((e=>{let t=[];for(;e;)t.push({range:Te(e.range)}),e=e.parent;return t}))}))}};function Ye(e){return 32===e||9===e||11===e||12===e||160===e||5760===e||e>=8192&&e<=8203||8239===e||8287===e||12288===e||65279===e}function Ze(e){return 10===e||13===e||8232===e||8233===e}function et(e){return e>=48&&e<=57}!function(e){e.DEFAULT={allowTrailingComma:!1}}(Ge||(Ge={}));var tt=function(e,t){void 0===t&&(t=!1);var n=e.length,r=0,i="",o=0,a=16,s=0,u=0,c=0,d=0,l=0;function g(t,n){for(var i=0,o=0;i<t||!n;){var a=e.charCodeAt(r);if(a>=48&&a<=57)o=16*o+a-48;else if(a>=65&&a<=70)o=16*o+a-65+10;else{if(!(a>=97&&a<=102))break;o=16*o+a-97+10}r++,i++}return i<t&&(o=-1),o}function f(){if(i="",l=0,o=r,u=s,d=c,r>=n)return o=n,a=17;var t=e.charCodeAt(r);if(Ye(t)){do{r++,i+=String.fromCharCode(t),t=e.charCodeAt(r)}while(Ye(t));return a=15}if(Ze(t))return r++,i+=String.fromCharCode(t),13===t&&10===e.charCodeAt(r)&&(r++,i+="\n"),s++,c=r,a=14;switch(t){case 123:return r++,a=1;case 125:return r++,a=2;case 91:return r++,a=3;case 93:return r++,a=4;case 58:return r++,a=6;case 44:return r++,a=5;case 34:return r++,i=function(){for(var t="",i=r;;){if(r>=n){t+=e.substring(i,r),l=2;break}var o=e.charCodeAt(r);if(34===o){t+=e.substring(i,r),r++;break}if(92!==o){if(o>=0&&o<=31){if(Ze(o)){t+=e.substring(i,r),l=2;break}l=6}r++}else{if(t+=e.substring(i,r),++r>=n){l=2;break}switch(e.charCodeAt(r++)){case 34:t+='"';break;case 92:t+="\\";break;case 47:t+="/";break;case 98:t+="\b";break;case 102:t+="\f";break;case 110:t+="\n";break;case 114:t+="\r";break;case 116:t+="\t";break;case 117:var a=g(4,!0);a>=0?t+=String.fromCharCode(a):l=4;break;default:l=5}i=r}}return t}(),a=10;case 47:var f=r-1;if(47===e.charCodeAt(r+1)){for(r+=2;r<n&&!Ze(e.charCodeAt(r));)r++;return i=e.substring(f,r),a=12}if(42===e.charCodeAt(r+1)){r+=2;for(var p=n-1,m=!1;r<p;){var v=e.charCodeAt(r);if(42===v&&47===e.charCodeAt(r+1)){r+=2,m=!0;break}r++,Ze(v)&&(13===v&&10===e.charCodeAt(r)&&r++,s++,c=r)}return m||(r++,l=1),i=e.substring(f,r),a=13}return i+=String.fromCharCode(t),r++,a=16;case 45:if(i+=String.fromCharCode(t),++r===n||!et(e.charCodeAt(r)))return a=16;case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return i+=function(){var t=r;if(48===e.charCodeAt(r))r++;else for(r++;r<e.length&&et(e.charCodeAt(r));)r++;if(r<e.length&&46===e.charCodeAt(r)){if(!(++r<e.length&&et(e.charCodeAt(r))))return l=3,e.substring(t,r);for(r++;r<e.length&&et(e.charCodeAt(r));)r++}var n=r;if(r<e.length&&(69===e.charCodeAt(r)||101===e.charCodeAt(r)))if((++r<e.length&&43===e.charCodeAt(r)||45===e.charCodeAt(r))&&r++,r<e.length&&et(e.charCodeAt(r))){for(r++;r<e.length&&et(e.charCodeAt(r));)r++;n=r}else l=3;return e.substring(t,n)}(),a=11;default:for(;r<n&&h(t);)r++,t=e.charCodeAt(r);if(o!==r){switch(i=e.substring(o,r)){case"true":return a=8;case"false":return a=9;case"null":return a=7}return a=16}return i+=String.fromCharCode(t),r++,a=16}}function h(e){if(Ye(e)||Ze(e))return!1;switch(e){case 125:case 93:case 123:case 91:case 34:case 58:case 44:case 47:return!1}return!0}return{setPosition:function(e){r=e,i="",o=0,a=16,l=0},getPosition:function(){return r},scan:t?function(){var e;do{e=f()}while(e>=12&&e<=15);return e}:f,getToken:function(){return a},getTokenValue:function(){return i},getTokenOffset:function(){return o},getTokenLength:function(){return r-o},getTokenStartLine:function(){return u},getTokenStartCharacter:function(){return o-d},getTokenError:function(){return l}}};function nt(e){return{getInitialState:()=>new pt(null,null,!1,null),tokenize:(t,n)=>function(e,t,n,r=0){let i=0,o=!1;switch(n.scanError){case 2:t='"'+t,i=1;break;case 1:t="/*"+t,i=2}let a=tt(t),s=n.lastWasColon,u=n.parents,c={tokens:[],endState:n.clone()};for(;;){let d=r+a.getPosition(),l="",g=a.scan();if(17===g)break;if(d===r+a.getPosition())throw new Error("Scanner did not advance, next 3 characters are: "+t.substr(a.getPosition(),3));switch(o&&(d-=i),o=i>0,g){case 1:u=ht.push(u,0),l=rt,s=!1;break;case 2:u=ht.pop(u),l=rt,s=!1;break;case 3:u=ht.push(u,1),l=it,s=!1;break;case 4:u=ht.pop(u),l=it,s=!1;break;case 6:l=ot,s=!0;break;case 5:l=at,s=!1;break;case 8:case 9:l=st,s=!1;break;case 7:l=ut,s=!1;break;case 10:let e=1===(u?u.type:0);l=s||e?ct:lt,s=!1;break;case 11:l=dt,s=!1}if(e)switch(g){case 12:l=ft;break;case 13:l=gt}c.endState=new pt(n.getStateData(),a.getTokenError(),s,u),c.tokens.push({startIndex:d,scopes:l})}return c}(e,t,n)}}var rt="delimiter.bracket.json",it="delimiter.array.json",ot="delimiter.colon.json",at="delimiter.comma.json",st="keyword.json",ut="keyword.json",ct="string.value.json",dt="number.json",lt="string.key.json",gt="comment.block.json",ft="comment.line.json",ht=class{constructor(e,t){this.parent=e,this.type=t}static pop(e){return e?e.parent:null}static push(e,t){return new ht(e,t)}static equals(e,t){if(!e&&!t)return!0;if(!e||!t)return!1;for(;e&&t;){if(e===t)return!0;if(e.type!==t.type)return!1;e=e.parent,t=t.parent}return!0}},pt=class{_state;scanError;lastWasColon;parents;constructor(e,t,n,r){this._state=e,this.scanError=t,this.lastWasColon=n,this.parents=r}clone(){return new pt(this._state,this.scanError,this.lastWasColon,this.parents)}equals(e){return e===this||!!(e&&e instanceof pt)&&(this.scanError===e.scanError&&this.lastWasColon===e.lastWasColon&&ht.equals(this.parents,e.parents))}getStateData(){return this._state}setStateData(e){this._state=e}};var mt=class extends Ee{constructor(e,t,n){super(e,t,n.onDidChange),this._disposables.push(p.editor.onWillDisposeModel((e=>{this._resetSchema(e.uri)}))),this._disposables.push(p.editor.onDidChangeModelLanguage((e=>{this._resetSchema(e.model.uri)})))}_resetSchema(e){this._worker().then((t=>{t.resetSchema(e.toString())}))}};function vt(e){let t=[],n=[],r=new H(e);t.push(r);let i=(...e)=>r.getLanguageServiceWorker(...e);function o(){let{languageId:t,modeConfiguration:r}=e;bt(n),r.documentFormattingEdits&&n.push(p.languages.registerDocumentFormattingEditProvider(t,new qe(i))),r.documentRangeFormattingEdits&&n.push(p.languages.registerDocumentRangeFormattingEditProvider(t,new Xe(i))),r.completionItems&&n.push(p.languages.registerCompletionItemProvider(t,new xe(i,[" ",":",'"']))),r.hovers&&n.push(p.languages.registerHoverProvider(t,new Pe(i))),r.documentSymbols&&n.push(p.languages.registerDocumentSymbolProvider(t,new He(i))),r.tokens&&n.push(p.languages.setTokensProvider(t,nt(!0))),r.colors&&n.push(p.languages.registerColorProvider(t,new $e(i))),r.foldingRanges&&n.push(p.languages.registerFoldingRangeProvider(t,new Qe(i))),r.diagnostics&&n.push(new mt(t,i,e)),r.selectionRanges&&n.push(p.languages.registerSelectionRangeProvider(t,new Je(i)))}o(),t.push(p.languages.setLanguageConfiguration(e.languageId,kt));let a=e.modeConfiguration;return e.onDidChange((e=>{e.modeConfiguration!==a&&(a=e.modeConfiguration,o())})),t.push(_t(n)),_t(t)}function _t(e){return{dispose:()=>bt(e)}}function bt(e){for(;e.length;)e.pop().dispose()}var kt={wordPattern:/(-?\d*\.\d\w*)|([^\[\{\]\}\:\"\,\s]+)/g,comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"]],autoClosingPairs:[{open:"{",close:"}",notIn:["string"]},{open:"[",close:"]",notIn:["string"]},{open:'"',close:'"',notIn:["string"]}]};return g(h)})()));