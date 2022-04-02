/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define("vs/language/html/htmlMode",["require","require"],(e=>(()=>{var t,n=Object.create,r=Object.defineProperty,i=Object.getOwnPropertyDescriptor,o=Object.getOwnPropertyNames,a=Object.getPrototypeOf,s=Object.prototype.hasOwnProperty,u=e=>r(e,"__esModule",{value:!0}),c=(t=function(t){if(void 0!==e)return e.apply(this,arguments);throw new Error('Dynamic require of "'+t+'" is not supported')},void 0!==e?e:"undefined"!=typeof Proxy?new Proxy(t,{get:(t,n)=>(void 0!==e?e:t)[n]}):t),d=(e,t,n,a)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let u of o(t))!s.call(e,u)&&(n||"default"!==u)&&r(e,u,{get:()=>t[u],enumerable:!(a=i(t,u))||a.enumerable});return e},g=(e,t)=>d(u(r(null!=e?n(a(e)):{},"default",!t&&e&&e.__esModule?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e),l=(e=>(t,n)=>e&&e.get(t)||(n=d(u({}),t,1),e&&e.set(t,n),n))("undefined"!=typeof WeakMap?new WeakMap:0),f=((e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports))(((e,t)=>{var n=g(c("vs/editor/editor.api"));t.exports=n})),h={};((e,t)=>{for(var n in t)r(e,n,{get:t[n],enumerable:!0})})(h,{CompletionAdapter:()=>Ie,DefinitionAdapter:()=>Ne,DiagnosticsAdapter:()=>xe,DocumentColorAdapter:()=>$e,DocumentFormattingEditProvider:()=>Xe,DocumentHighlightAdapter:()=>je,DocumentLinkAdapter:()=>ze,DocumentRangeFormattingEditProvider:()=>qe,DocumentSymbolAdapter:()=>He,FoldingRangeAdapter:()=>Qe,HoverAdapter:()=>Me,ReferenceAdapter:()=>Ue,RenameAdapter:()=>Ve,SelectionRangeAdapter:()=>Ge,WorkerManager:()=>H,fromPosition:()=>Ae,fromRange:()=>Se,setupMode:()=>Ze,setupMode1:()=>Ye,toRange:()=>Re,toTextEdit:()=>Te});var p={};d(p,g(f()));var m,v,_,w,b,k,y,E,x,C,I,A,S,R,P,T,D,M,L,F,j,O,N,W,U,V,H=class{_defaults;_idleCheckInterval;_lastUsedTime;_configChangeListener;_worker;_client;constructor(e){this._defaults=e,this._worker=null,this._client=null,this._idleCheckInterval=window.setInterval((()=>this._checkIfIdle()),3e4),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange((()=>this._stopWorker()))}_stopWorker(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null}dispose(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()}_checkIfIdle(){this._worker&&Date.now()-this._lastUsedTime>12e4&&this._stopWorker()}_getClient(){return this._lastUsedTime=Date.now(),this._client||(this._worker=p.editor.createWebWorker({moduleId:"vs/language/html/htmlWorker",createData:{languageSettings:this._defaults.options,languageId:this._defaults.languageId},label:this._defaults.languageId}),this._client=this._worker.getProxy()),this._client}getLanguageServiceWorker(...e){let t;return this._getClient().then((e=>{t=e})).then((t=>{if(this._worker)return this._worker.withSyncedResources(e)})).then((e=>t))}};!function(e){e.MIN_VALUE=-2147483648,e.MAX_VALUE=2147483647}(m||(m={})),function(e){e.MIN_VALUE=0,e.MAX_VALUE=2147483647}(v||(v={})),function(e){e.create=function(e,t){return e===Number.MAX_VALUE&&(e=v.MAX_VALUE),t===Number.MAX_VALUE&&(t=v.MAX_VALUE),{line:e,character:t}},e.is=function(e){var t=e;return ye.objectLiteral(t)&&ye.uinteger(t.line)&&ye.uinteger(t.character)}}(_||(_={})),function(e){e.create=function(e,t,n,r){if(ye.uinteger(e)&&ye.uinteger(t)&&ye.uinteger(n)&&ye.uinteger(r))return{start:_.create(e,t),end:_.create(n,r)};if(_.is(e)&&_.is(t))return{start:e,end:t};throw new Error("Range#create called with invalid arguments["+e+", "+t+", "+n+", "+r+"]")},e.is=function(e){var t=e;return ye.objectLiteral(t)&&_.is(t.start)&&_.is(t.end)}}(w||(w={})),function(e){e.create=function(e,t){return{uri:e,range:t}},e.is=function(e){var t=e;return ye.defined(t)&&w.is(t.range)&&(ye.string(t.uri)||ye.undefined(t.uri))}}(b||(b={})),function(e){e.create=function(e,t,n,r){return{targetUri:e,targetRange:t,targetSelectionRange:n,originSelectionRange:r}},e.is=function(e){var t=e;return ye.defined(t)&&w.is(t.targetRange)&&ye.string(t.targetUri)&&(w.is(t.targetSelectionRange)||ye.undefined(t.targetSelectionRange))&&(w.is(t.originSelectionRange)||ye.undefined(t.originSelectionRange))}}(k||(k={})),function(e){e.create=function(e,t,n,r){return{red:e,green:t,blue:n,alpha:r}},e.is=function(e){var t=e;return ye.numberRange(t.red,0,1)&&ye.numberRange(t.green,0,1)&&ye.numberRange(t.blue,0,1)&&ye.numberRange(t.alpha,0,1)}}(y||(y={})),function(e){e.create=function(e,t){return{range:e,color:t}},e.is=function(e){var t=e;return w.is(t.range)&&y.is(t.color)}}(E||(E={})),function(e){e.create=function(e,t,n){return{label:e,textEdit:t,additionalTextEdits:n}},e.is=function(e){var t=e;return ye.string(t.label)&&(ye.undefined(t.textEdit)||M.is(t))&&(ye.undefined(t.additionalTextEdits)||ye.typedArray(t.additionalTextEdits,M.is))}}(x||(x={})),function(e){e.Comment="comment",e.Imports="imports",e.Region="region"}(C||(C={})),function(e){e.create=function(e,t,n,r,i){var o={startLine:e,endLine:t};return ye.defined(n)&&(o.startCharacter=n),ye.defined(r)&&(o.endCharacter=r),ye.defined(i)&&(o.kind=i),o},e.is=function(e){var t=e;return ye.uinteger(t.startLine)&&ye.uinteger(t.startLine)&&(ye.undefined(t.startCharacter)||ye.uinteger(t.startCharacter))&&(ye.undefined(t.endCharacter)||ye.uinteger(t.endCharacter))&&(ye.undefined(t.kind)||ye.string(t.kind))}}(I||(I={})),function(e){e.create=function(e,t){return{location:e,message:t}},e.is=function(e){var t=e;return ye.defined(t)&&b.is(t.location)&&ye.string(t.message)}}(A||(A={})),function(e){e.Error=1,e.Warning=2,e.Information=3,e.Hint=4}(S||(S={})),function(e){e.Unnecessary=1,e.Deprecated=2}(R||(R={})),function(e){e.is=function(e){var t=e;return null!=t&&ye.string(t.href)}}(P||(P={})),function(e){e.create=function(e,t,n,r,i,o){var a={range:e,message:t};return ye.defined(n)&&(a.severity=n),ye.defined(r)&&(a.code=r),ye.defined(i)&&(a.source=i),ye.defined(o)&&(a.relatedInformation=o),a},e.is=function(e){var t,n=e;return ye.defined(n)&&w.is(n.range)&&ye.string(n.message)&&(ye.number(n.severity)||ye.undefined(n.severity))&&(ye.integer(n.code)||ye.string(n.code)||ye.undefined(n.code))&&(ye.undefined(n.codeDescription)||ye.string(null===(t=n.codeDescription)||void 0===t?void 0:t.href))&&(ye.string(n.source)||ye.undefined(n.source))&&(ye.undefined(n.relatedInformation)||ye.typedArray(n.relatedInformation,A.is))}}(T||(T={})),function(e){e.create=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i={title:e,command:t};return ye.defined(n)&&n.length>0&&(i.arguments=n),i},e.is=function(e){var t=e;return ye.defined(t)&&ye.string(t.title)&&ye.string(t.command)}}(D||(D={})),function(e){e.replace=function(e,t){return{range:e,newText:t}},e.insert=function(e,t){return{range:{start:e,end:e},newText:t}},e.del=function(e){return{range:e,newText:""}},e.is=function(e){var t=e;return ye.objectLiteral(t)&&ye.string(t.newText)&&w.is(t.range)}}(M||(M={})),function(e){e.create=function(e,t,n){var r={label:e};return void 0!==t&&(r.needsConfirmation=t),void 0!==n&&(r.description=n),r},e.is=function(e){var t=e;return void 0!==t&&ye.objectLiteral(t)&&ye.string(t.label)&&(ye.boolean(t.needsConfirmation)||void 0===t.needsConfirmation)&&(ye.string(t.description)||void 0===t.description)}}(L||(L={})),function(e){e.is=function(e){return"string"==typeof e}}(F||(F={})),function(e){e.replace=function(e,t,n){return{range:e,newText:t,annotationId:n}},e.insert=function(e,t,n){return{range:{start:e,end:e},newText:t,annotationId:n}},e.del=function(e,t){return{range:e,newText:"",annotationId:t}},e.is=function(e){var t=e;return M.is(t)&&(L.is(t.annotationId)||F.is(t.annotationId))}}(j||(j={})),function(e){e.create=function(e,t){return{textDocument:e,edits:t}},e.is=function(e){var t=e;return ye.defined(t)&&X.is(t.textDocument)&&Array.isArray(t.edits)}}(O||(O={})),function(e){e.create=function(e,t,n){var r={kind:"create",uri:e};return void 0!==t&&(void 0!==t.overwrite||void 0!==t.ignoreIfExists)&&(r.options=t),void 0!==n&&(r.annotationId=n),r},e.is=function(e){var t=e;return t&&"create"===t.kind&&ye.string(t.uri)&&(void 0===t.options||(void 0===t.options.overwrite||ye.boolean(t.options.overwrite))&&(void 0===t.options.ignoreIfExists||ye.boolean(t.options.ignoreIfExists)))&&(void 0===t.annotationId||F.is(t.annotationId))}}(N||(N={})),function(e){e.create=function(e,t,n,r){var i={kind:"rename",oldUri:e,newUri:t};return void 0!==n&&(void 0!==n.overwrite||void 0!==n.ignoreIfExists)&&(i.options=n),void 0!==r&&(i.annotationId=r),i},e.is=function(e){var t=e;return t&&"rename"===t.kind&&ye.string(t.oldUri)&&ye.string(t.newUri)&&(void 0===t.options||(void 0===t.options.overwrite||ye.boolean(t.options.overwrite))&&(void 0===t.options.ignoreIfExists||ye.boolean(t.options.ignoreIfExists)))&&(void 0===t.annotationId||F.is(t.annotationId))}}(W||(W={})),function(e){e.create=function(e,t,n){var r={kind:"delete",uri:e};return void 0!==t&&(void 0!==t.recursive||void 0!==t.ignoreIfNotExists)&&(r.options=t),void 0!==n&&(r.annotationId=n),r},e.is=function(e){var t=e;return t&&"delete"===t.kind&&ye.string(t.uri)&&(void 0===t.options||(void 0===t.options.recursive||ye.boolean(t.options.recursive))&&(void 0===t.options.ignoreIfNotExists||ye.boolean(t.options.ignoreIfNotExists)))&&(void 0===t.annotationId||F.is(t.annotationId))}}(U||(U={})),function(e){e.is=function(e){var t=e;return t&&(void 0!==t.changes||void 0!==t.documentChanges)&&(void 0===t.documentChanges||t.documentChanges.every((function(e){return ye.string(e.kind)?N.is(e)||W.is(e)||U.is(e):O.is(e)})))}}(V||(V={}));var K,z,X,q,B,$,Q,G,J,Y,Z,ee,te,ne,re,ie,oe,ae,se,ue,ce,de,ge,le,fe,he,pe,me,ve,_e,we,be=function(){function e(e,t){this.edits=e,this.changeAnnotations=t}return e.prototype.insert=function(e,t,n){var r,i;if(void 0===n?r=M.insert(e,t):F.is(n)?(i=n,r=j.insert(e,t,n)):(this.assertChangeAnnotations(this.changeAnnotations),i=this.changeAnnotations.manage(n),r=j.insert(e,t,i)),this.edits.push(r),void 0!==i)return i},e.prototype.replace=function(e,t,n){var r,i;if(void 0===n?r=M.replace(e,t):F.is(n)?(i=n,r=j.replace(e,t,n)):(this.assertChangeAnnotations(this.changeAnnotations),i=this.changeAnnotations.manage(n),r=j.replace(e,t,i)),this.edits.push(r),void 0!==i)return i},e.prototype.delete=function(e,t){var n,r;if(void 0===t?n=M.del(e):F.is(t)?(r=t,n=j.del(e,t)):(this.assertChangeAnnotations(this.changeAnnotations),r=this.changeAnnotations.manage(t),n=j.del(e,r)),this.edits.push(n),void 0!==r)return r},e.prototype.add=function(e){this.edits.push(e)},e.prototype.all=function(){return this.edits},e.prototype.clear=function(){this.edits.splice(0,this.edits.length)},e.prototype.assertChangeAnnotations=function(e){if(void 0===e)throw new Error("Text edit change is not configured to manage change annotations.")},e}(),ke=function(){function e(e){this._annotations=void 0===e?Object.create(null):e,this._counter=0,this._size=0}return e.prototype.all=function(){return this._annotations},Object.defineProperty(e.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),e.prototype.manage=function(e,t){var n;if(F.is(e)?n=e:(n=this.nextId(),t=e),void 0!==this._annotations[n])throw new Error("Id "+n+" is already in use.");if(void 0===t)throw new Error("No annotation provided for id "+n);return this._annotations[n]=t,this._size++,n},e.prototype.nextId=function(){return this._counter++,this._counter.toString()},e}();!function(){function e(e){var t=this;this._textEditChanges=Object.create(null),void 0!==e?(this._workspaceEdit=e,e.documentChanges?(this._changeAnnotations=new ke(e.changeAnnotations),e.changeAnnotations=this._changeAnnotations.all(),e.documentChanges.forEach((function(e){if(O.is(e)){var n=new be(e.edits,t._changeAnnotations);t._textEditChanges[e.textDocument.uri]=n}}))):e.changes&&Object.keys(e.changes).forEach((function(n){var r=new be(e.changes[n]);t._textEditChanges[n]=r}))):this._workspaceEdit={}}Object.defineProperty(e.prototype,"edit",{get:function(){return this.initDocumentChanges(),void 0!==this._changeAnnotations&&(0===this._changeAnnotations.size?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),e.prototype.getTextEditChange=function(e){if(X.is(e)){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var t={uri:e.uri,version:e.version};if(!(r=this._textEditChanges[t.uri])){var n={textDocument:t,edits:i=[]};this._workspaceEdit.documentChanges.push(n),r=new be(i,this._changeAnnotations),this._textEditChanges[t.uri]=r}return r}if(this.initChanges(),void 0===this._workspaceEdit.changes)throw new Error("Workspace edit is not configured for normal text edit changes.");var r;if(!(r=this._textEditChanges[e])){var i=[];this._workspaceEdit.changes[e]=i,r=new be(i),this._textEditChanges[e]=r}return r},e.prototype.initDocumentChanges=function(){void 0===this._workspaceEdit.documentChanges&&void 0===this._workspaceEdit.changes&&(this._changeAnnotations=new ke,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},e.prototype.initChanges=function(){void 0===this._workspaceEdit.documentChanges&&void 0===this._workspaceEdit.changes&&(this._workspaceEdit.changes=Object.create(null))},e.prototype.createFile=function(e,t,n){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var r,i,o;if(L.is(t)||F.is(t)?r=t:n=t,void 0===r?i=N.create(e,n):(o=F.is(r)?r:this._changeAnnotations.manage(r),i=N.create(e,n,o)),this._workspaceEdit.documentChanges.push(i),void 0!==o)return o},e.prototype.renameFile=function(e,t,n,r){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var i,o,a;if(L.is(n)||F.is(n)?i=n:r=n,void 0===i?o=W.create(e,t,r):(a=F.is(i)?i:this._changeAnnotations.manage(i),o=W.create(e,t,r,a)),this._workspaceEdit.documentChanges.push(o),void 0!==a)return a},e.prototype.deleteFile=function(e,t,n){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var r,i,o;if(L.is(t)||F.is(t)?r=t:n=t,void 0===r?i=U.create(e,n):(o=F.is(r)?r:this._changeAnnotations.manage(r),i=U.create(e,n,o)),this._workspaceEdit.documentChanges.push(i),void 0!==o)return o}}();!function(e){e.create=function(e){return{uri:e}},e.is=function(e){var t=e;return ye.defined(t)&&ye.string(t.uri)}}(K||(K={})),function(e){e.create=function(e,t){return{uri:e,version:t}},e.is=function(e){var t=e;return ye.defined(t)&&ye.string(t.uri)&&ye.integer(t.version)}}(z||(z={})),function(e){e.create=function(e,t){return{uri:e,version:t}},e.is=function(e){var t=e;return ye.defined(t)&&ye.string(t.uri)&&(null===t.version||ye.integer(t.version))}}(X||(X={})),function(e){e.create=function(e,t,n,r){return{uri:e,languageId:t,version:n,text:r}},e.is=function(e){var t=e;return ye.defined(t)&&ye.string(t.uri)&&ye.string(t.languageId)&&ye.integer(t.version)&&ye.string(t.text)}}(q||(q={})),function(e){e.PlainText="plaintext",e.Markdown="markdown"}(B||(B={})),function(e){e.is=function(t){var n=t;return n===e.PlainText||n===e.Markdown}}(B||(B={})),function(e){e.is=function(e){var t=e;return ye.objectLiteral(e)&&B.is(t.kind)&&ye.string(t.value)}}($||($={})),function(e){e.Text=1,e.Method=2,e.Function=3,e.Constructor=4,e.Field=5,e.Variable=6,e.Class=7,e.Interface=8,e.Module=9,e.Property=10,e.Unit=11,e.Value=12,e.Enum=13,e.Keyword=14,e.Snippet=15,e.Color=16,e.File=17,e.Reference=18,e.Folder=19,e.EnumMember=20,e.Constant=21,e.Struct=22,e.Event=23,e.Operator=24,e.TypeParameter=25}(Q||(Q={})),function(e){e.PlainText=1,e.Snippet=2}(G||(G={})),function(e){e.Deprecated=1}(J||(J={})),function(e){e.create=function(e,t,n){return{newText:e,insert:t,replace:n}},e.is=function(e){var t=e;return t&&ye.string(t.newText)&&w.is(t.insert)&&w.is(t.replace)}}(Y||(Y={})),function(e){e.asIs=1,e.adjustIndentation=2}(Z||(Z={})),function(e){e.create=function(e){return{label:e}}}(ee||(ee={})),function(e){e.create=function(e,t){return{items:e||[],isIncomplete:!!t}}}(te||(te={})),function(e){e.fromPlainText=function(e){return e.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")},e.is=function(e){var t=e;return ye.string(t)||ye.objectLiteral(t)&&ye.string(t.language)&&ye.string(t.value)}}(ne||(ne={})),function(e){e.is=function(e){var t=e;return!!t&&ye.objectLiteral(t)&&($.is(t.contents)||ne.is(t.contents)||ye.typedArray(t.contents,ne.is))&&(void 0===e.range||w.is(e.range))}}(re||(re={})),function(e){e.create=function(e,t){return t?{label:e,documentation:t}:{label:e}}}(ie||(ie={})),function(e){e.create=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i={label:e};return ye.defined(t)&&(i.documentation=t),ye.defined(n)?i.parameters=n:i.parameters=[],i}}(oe||(oe={})),function(e){e.Text=1,e.Read=2,e.Write=3}(ae||(ae={})),function(e){e.create=function(e,t){var n={range:e};return ye.number(t)&&(n.kind=t),n}}(se||(se={})),function(e){e.File=1,e.Module=2,e.Namespace=3,e.Package=4,e.Class=5,e.Method=6,e.Property=7,e.Field=8,e.Constructor=9,e.Enum=10,e.Interface=11,e.Function=12,e.Variable=13,e.Constant=14,e.String=15,e.Number=16,e.Boolean=17,e.Array=18,e.Object=19,e.Key=20,e.Null=21,e.EnumMember=22,e.Struct=23,e.Event=24,e.Operator=25,e.TypeParameter=26}(ue||(ue={})),function(e){e.Deprecated=1}(ce||(ce={})),function(e){e.create=function(e,t,n,r,i){var o={name:e,kind:t,location:{uri:r,range:n}};return i&&(o.containerName=i),o}}(de||(de={})),function(e){e.create=function(e,t,n,r,i,o){var a={name:e,detail:t,kind:n,range:r,selectionRange:i};return void 0!==o&&(a.children=o),a},e.is=function(e){var t=e;return t&&ye.string(t.name)&&ye.number(t.kind)&&w.is(t.range)&&w.is(t.selectionRange)&&(void 0===t.detail||ye.string(t.detail))&&(void 0===t.deprecated||ye.boolean(t.deprecated))&&(void 0===t.children||Array.isArray(t.children))&&(void 0===t.tags||Array.isArray(t.tags))}}(ge||(ge={})),function(e){e.Empty="",e.QuickFix="quickfix",e.Refactor="refactor",e.RefactorExtract="refactor.extract",e.RefactorInline="refactor.inline",e.RefactorRewrite="refactor.rewrite",e.Source="source",e.SourceOrganizeImports="source.organizeImports",e.SourceFixAll="source.fixAll"}(le||(le={})),function(e){e.create=function(e,t){var n={diagnostics:e};return null!=t&&(n.only=t),n},e.is=function(e){var t=e;return ye.defined(t)&&ye.typedArray(t.diagnostics,T.is)&&(void 0===t.only||ye.typedArray(t.only,ye.string))}}(fe||(fe={})),function(e){e.create=function(e,t,n){var r={title:e},i=!0;return"string"==typeof t?(i=!1,r.kind=t):D.is(t)?r.command=t:r.edit=t,i&&void 0!==n&&(r.kind=n),r},e.is=function(e){var t=e;return t&&ye.string(t.title)&&(void 0===t.diagnostics||ye.typedArray(t.diagnostics,T.is))&&(void 0===t.kind||ye.string(t.kind))&&(void 0!==t.edit||void 0!==t.command)&&(void 0===t.command||D.is(t.command))&&(void 0===t.isPreferred||ye.boolean(t.isPreferred))&&(void 0===t.edit||V.is(t.edit))}}(he||(he={})),function(e){e.create=function(e,t){var n={range:e};return ye.defined(t)&&(n.data=t),n},e.is=function(e){var t=e;return ye.defined(t)&&w.is(t.range)&&(ye.undefined(t.command)||D.is(t.command))}}(pe||(pe={})),function(e){e.create=function(e,t){return{tabSize:e,insertSpaces:t}},e.is=function(e){var t=e;return ye.defined(t)&&ye.uinteger(t.tabSize)&&ye.boolean(t.insertSpaces)}}(me||(me={})),function(e){e.create=function(e,t,n){return{range:e,target:t,data:n}},e.is=function(e){var t=e;return ye.defined(t)&&w.is(t.range)&&(ye.undefined(t.target)||ye.string(t.target))}}(ve||(ve={})),function(e){e.create=function(e,t){return{range:e,parent:t}},e.is=function(t){var n=t;return void 0!==n&&w.is(n.range)&&(void 0===n.parent||e.is(n.parent))}}(_e||(_e={})),function(e){function t(e,n){if(e.length<=1)return e;var r=e.length/2|0,i=e.slice(0,r),o=e.slice(r);t(i,n),t(o,n);for(var a=0,s=0,u=0;a<i.length&&s<o.length;){var c=n(i[a],o[s]);e[u++]=c<=0?i[a++]:o[s++]}for(;a<i.length;)e[u++]=i[a++];for(;s<o.length;)e[u++]=o[s++];return e}e.create=function(e,t,n,r){return new Ee(e,t,n,r)},e.is=function(e){var t=e;return!!(ye.defined(t)&&ye.string(t.uri)&&(ye.undefined(t.languageId)||ye.string(t.languageId))&&ye.uinteger(t.lineCount)&&ye.func(t.getText)&&ye.func(t.positionAt)&&ye.func(t.offsetAt))},e.applyEdits=function(e,n){for(var r=e.getText(),i=t(n,(function(e,t){var n=e.range.start.line-t.range.start.line;return 0===n?e.range.start.character-t.range.start.character:n})),o=r.length,a=i.length-1;a>=0;a--){var s=i[a],u=e.offsetAt(s.range.start),c=e.offsetAt(s.range.end);if(!(c<=o))throw new Error("Overlapping edit");r=r.substring(0,u)+s.newText+r.substring(c,r.length),o=u}return r}}(we||(we={}));var ye,Ee=function(){function e(e,t,n,r){this._uri=e,this._languageId=t,this._version=n,this._content=r,this._lineOffsets=void 0}return Object.defineProperty(e.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),e.prototype.getText=function(e){if(e){var t=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(t,n)}return this._content},e.prototype.update=function(e,t){this._content=e.text,this._version=t,this._lineOffsets=void 0},e.prototype.getLineOffsets=function(){if(void 0===this._lineOffsets){for(var e=[],t=this._content,n=!0,r=0;r<t.length;r++){n&&(e.push(r),n=!1);var i=t.charAt(r);n="\r"===i||"\n"===i,"\r"===i&&r+1<t.length&&"\n"===t.charAt(r+1)&&r++}n&&t.length>0&&e.push(t.length),this._lineOffsets=e}return this._lineOffsets},e.prototype.positionAt=function(e){e=Math.max(Math.min(e,this._content.length),0);var t=this.getLineOffsets(),n=0,r=t.length;if(0===r)return _.create(0,e);for(;n<r;){var i=Math.floor((n+r)/2);t[i]>e?r=i:n=i+1}var o=n-1;return _.create(o,e-t[o])},e.prototype.offsetAt=function(e){var t=this.getLineOffsets();if(e.line>=t.length)return this._content.length;if(e.line<0)return 0;var n=t[e.line],r=e.line+1<t.length?t[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,r),n)},Object.defineProperty(e.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),e}();!function(e){var t=Object.prototype.toString;e.defined=function(e){return typeof e<"u"},e.undefined=function(e){return typeof e>"u"},e.boolean=function(e){return!0===e||!1===e},e.string=function(e){return"[object String]"===t.call(e)},e.number=function(e){return"[object Number]"===t.call(e)},e.numberRange=function(e,n,r){return"[object Number]"===t.call(e)&&n<=e&&e<=r},e.integer=function(e){return"[object Number]"===t.call(e)&&-2147483648<=e&&e<=2147483647},e.uinteger=function(e){return"[object Number]"===t.call(e)&&0<=e&&e<=2147483647},e.func=function(e){return"[object Function]"===t.call(e)},e.objectLiteral=function(e){return null!==e&&"object"==typeof e},e.typedArray=function(e,t){return Array.isArray(e)&&e.every(t)}}(ye||(ye={}));var xe=class{constructor(e,t,n){this._languageId=e,this._worker=t;let r=e=>{let t,n=e.getLanguageId();n===this._languageId&&(this._listener[e.uri.toString()]=e.onDidChangeContent((()=>{window.clearTimeout(t),t=window.setTimeout((()=>this._doValidate(e.uri,n)),500)})),this._doValidate(e.uri,n))},i=e=>{p.editor.setModelMarkers(e,this._languageId,[]);let t=e.uri.toString(),n=this._listener[t];n&&(n.dispose(),delete this._listener[t])};this._disposables.push(p.editor.onDidCreateModel(r)),this._disposables.push(p.editor.onWillDisposeModel(i)),this._disposables.push(p.editor.onDidChangeModelLanguage((e=>{i(e.model),r(e.model)}))),this._disposables.push(n((e=>{p.editor.getModels().forEach((e=>{e.getLanguageId()===this._languageId&&(i(e),r(e))}))}))),this._disposables.push({dispose:()=>{p.editor.getModels().forEach(i);for(let e in this._listener)this._listener[e].dispose()}}),p.editor.getModels().forEach(r)}_disposables=[];_listener=Object.create(null);dispose(){this._disposables.forEach((e=>e&&e.dispose())),this._disposables.length=0}_doValidate(e,t){this._worker(e).then((t=>t.doValidation(e.toString()))).then((n=>{let r=n.map((e=>function(e,t){let n="number"==typeof t.code?String(t.code):t.code;return{severity:Ce(t.severity),startLineNumber:t.range.start.line+1,startColumn:t.range.start.character+1,endLineNumber:t.range.end.line+1,endColumn:t.range.end.character+1,message:t.message,code:n,source:t.source}}(0,e))),i=p.editor.getModel(e);i&&i.getLanguageId()===t&&p.editor.setModelMarkers(i,t,r)})).then(void 0,(e=>{console.error(e)}))}};function Ce(e){switch(e){case S.Error:return p.MarkerSeverity.Error;case S.Warning:return p.MarkerSeverity.Warning;case S.Information:return p.MarkerSeverity.Info;case S.Hint:return p.MarkerSeverity.Hint;default:return p.MarkerSeverity.Info}}var Ie=class{constructor(e,t){this._worker=e,this._triggerCharacters=t}get triggerCharacters(){return this._triggerCharacters}provideCompletionItems(e,t,n,r){let i=e.uri;return this._worker(i).then((e=>e.doComplete(i.toString(),Ae(t)))).then((n=>{if(!n)return;let r=e.getWordUntilPosition(t),i=new p.Range(t.lineNumber,r.startColumn,t.lineNumber,r.endColumn),o=n.items.map((e=>{let t={label:e.label,insertText:e.insertText||e.label,sortText:e.sortText,filterText:e.filterText,documentation:e.documentation,detail:e.detail,command:De(e.command),range:i,kind:Pe(e.kind)};return e.textEdit&&(function(e){return typeof e.insert<"u"&&typeof e.replace<"u"}(e.textEdit)?t.range={insert:Re(e.textEdit.insert),replace:Re(e.textEdit.replace)}:t.range=Re(e.textEdit.range),t.insertText=e.textEdit.newText),e.additionalTextEdits&&(t.additionalTextEdits=e.additionalTextEdits.map(Te)),e.insertTextFormat===G.Snippet&&(t.insertTextRules=p.languages.CompletionItemInsertTextRule.InsertAsSnippet),t}));return{isIncomplete:n.isIncomplete,suggestions:o}}))}};function Ae(e){if(e)return{character:e.column-1,line:e.lineNumber-1}}function Se(e){if(e)return{start:{line:e.startLineNumber-1,character:e.startColumn-1},end:{line:e.endLineNumber-1,character:e.endColumn-1}}}function Re(e){if(e)return new p.Range(e.start.line+1,e.start.character+1,e.end.line+1,e.end.character+1)}function Pe(e){let t=p.languages.CompletionItemKind;switch(e){case Q.Text:return t.Text;case Q.Method:return t.Method;case Q.Function:return t.Function;case Q.Constructor:return t.Constructor;case Q.Field:return t.Field;case Q.Variable:return t.Variable;case Q.Class:return t.Class;case Q.Interface:return t.Interface;case Q.Module:return t.Module;case Q.Property:return t.Property;case Q.Unit:return t.Unit;case Q.Value:return t.Value;case Q.Enum:return t.Enum;case Q.Keyword:return t.Keyword;case Q.Snippet:return t.Snippet;case Q.Color:return t.Color;case Q.File:return t.File;case Q.Reference:return t.Reference}return t.Property}function Te(e){if(e)return{range:Re(e.range),text:e.newText}}function De(e){return e&&"editor.action.triggerSuggest"===e.command?{id:e.command,title:e.title,arguments:e.arguments}:void 0}var Me=class{constructor(e){this._worker=e}provideHover(e,t,n){let r=e.uri;return this._worker(r).then((e=>e.doHover(r.toString(),Ae(t)))).then((e=>{if(e)return{range:Re(e.range),contents:Fe(e.contents)}}))}};function Le(e){return"string"==typeof e?{value:e}:function(e){return e&&"object"==typeof e&&"string"==typeof e.kind}(e)?"plaintext"===e.kind?{value:e.value.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}:{value:e.value}:{value:"```"+e.language+"\n"+e.value+"\n```\n"}}function Fe(e){if(e)return Array.isArray(e)?e.map(Le):[Le(e)]}var je=class{constructor(e){this._worker=e}provideDocumentHighlights(e,t,n){let r=e.uri;return this._worker(r).then((e=>e.findDocumentHighlights(r.toString(),Ae(t)))).then((e=>{if(e)return e.map((e=>({range:Re(e.range),kind:Oe(e.kind)})))}))}};function Oe(e){switch(e){case ae.Read:return p.languages.DocumentHighlightKind.Read;case ae.Write:return p.languages.DocumentHighlightKind.Write;case ae.Text:return p.languages.DocumentHighlightKind.Text}return p.languages.DocumentHighlightKind.Text}var Ne=class{constructor(e){this._worker=e}provideDefinition(e,t,n){let r=e.uri;return this._worker(r).then((e=>e.findDefinition(r.toString(),Ae(t)))).then((e=>{if(e)return[We(e)]}))}};function We(e){return{uri:p.Uri.parse(e.uri),range:Re(e.range)}}var Ue=class{constructor(e){this._worker=e}provideReferences(e,t,n,r){let i=e.uri;return this._worker(i).then((e=>e.findReferences(i.toString(),Ae(t)))).then((e=>{if(e)return e.map(We)}))}},Ve=class{constructor(e){this._worker=e}provideRenameEdits(e,t,n,r){let i=e.uri;return this._worker(i).then((e=>e.doRename(i.toString(),Ae(t),n))).then((e=>function(e){if(!e||!e.changes)return;let t=[];for(let n in e.changes){let r=p.Uri.parse(n);for(let i of e.changes[n])t.push({resource:r,edit:{range:Re(i.range),text:i.newText}})}return{edits:t}}(e)))}};var He=class{constructor(e){this._worker=e}provideDocumentSymbols(e,t){let n=e.uri;return this._worker(n).then((e=>e.findDocumentSymbols(n.toString()))).then((e=>{if(e)return e.map((e=>({name:e.name,detail:"",containerName:e.containerName,kind:Ke(e.kind),range:Re(e.location.range),selectionRange:Re(e.location.range),tags:[]})))}))}};function Ke(e){let t=p.languages.SymbolKind;switch(e){case ue.File:return t.Array;case ue.Module:return t.Module;case ue.Namespace:return t.Namespace;case ue.Package:return t.Package;case ue.Class:return t.Class;case ue.Method:return t.Method;case ue.Property:return t.Property;case ue.Field:return t.Field;case ue.Constructor:return t.Constructor;case ue.Enum:return t.Enum;case ue.Interface:return t.Interface;case ue.Function:return t.Function;case ue.Variable:return t.Variable;case ue.Constant:return t.Constant;case ue.String:return t.String;case ue.Number:return t.Number;case ue.Boolean:return t.Boolean;case ue.Array:return t.Array}return t.Function}var ze=class{constructor(e){this._worker=e}provideLinks(e,t){let n=e.uri;return this._worker(n).then((e=>e.findDocumentLinks(n.toString()))).then((e=>{if(e)return{links:e.map((e=>({range:Re(e.range),url:e.target})))}}))}},Xe=class{constructor(e){this._worker=e}provideDocumentFormattingEdits(e,t,n){let r=e.uri;return this._worker(r).then((e=>e.format(r.toString(),null,Be(t)).then((e=>{if(e&&0!==e.length)return e.map(Te)}))))}},qe=class{constructor(e){this._worker=e}provideDocumentRangeFormattingEdits(e,t,n,r){let i=e.uri;return this._worker(i).then((e=>e.format(i.toString(),Se(t),Be(n)).then((e=>{if(e&&0!==e.length)return e.map(Te)}))))}};function Be(e){return{tabSize:e.tabSize,insertSpaces:e.insertSpaces}}var $e=class{constructor(e){this._worker=e}provideDocumentColors(e,t){let n=e.uri;return this._worker(n).then((e=>e.findDocumentColors(n.toString()))).then((e=>{if(e)return e.map((e=>({color:e.color,range:Re(e.range)})))}))}provideColorPresentations(e,t,n){let r=e.uri;return this._worker(r).then((e=>e.getColorPresentations(r.toString(),t.color,Se(t.range)))).then((e=>{if(e)return e.map((e=>{let t={label:e.label};return e.textEdit&&(t.textEdit=Te(e.textEdit)),e.additionalTextEdits&&(t.additionalTextEdits=e.additionalTextEdits.map(Te)),t}))}))}},Qe=class{constructor(e){this._worker=e}provideFoldingRanges(e,t,n){let r=e.uri;return this._worker(r).then((e=>e.getFoldingRanges(r.toString(),t))).then((e=>{if(e)return e.map((e=>{let t={start:e.startLine+1,end:e.endLine+1};return typeof e.kind<"u"&&(t.kind=function(e){switch(e){case C.Comment:return p.languages.FoldingRangeKind.Comment;case C.Imports:return p.languages.FoldingRangeKind.Imports;case C.Region:return p.languages.FoldingRangeKind.Region}}(e.kind)),t}))}))}};var Ge=class{constructor(e){this._worker=e}provideSelectionRanges(e,t,n){let r=e.uri;return this._worker(r).then((e=>e.getSelectionRanges(r.toString(),t.map(Ae)))).then((e=>{if(e)return e.map((e=>{let t=[];for(;e;)t.push({range:Re(e.range)}),e=e.parent;return t}))}))}},Je=class extends Ie{constructor(e){super(e,[".",":","<",'"',"=","/"])}};function Ye(e){let t=new H(e),n=(...e)=>t.getLanguageServiceWorker(...e),r=e.languageId;p.languages.registerCompletionItemProvider(r,new Je(n)),p.languages.registerHoverProvider(r,new Me(n)),p.languages.registerDocumentHighlightProvider(r,new je(n)),p.languages.registerLinkProvider(r,new ze(n)),p.languages.registerFoldingRangeProvider(r,new Qe(n)),p.languages.registerDocumentSymbolProvider(r,new He(n)),p.languages.registerSelectionRangeProvider(r,new Ge(n)),p.languages.registerRenameProvider(r,new Ve(n)),"html"===r&&(p.languages.registerDocumentFormattingEditProvider(r,new Xe(n)),p.languages.registerDocumentRangeFormattingEditProvider(r,new qe(n)))}function Ze(e){let t=[],n=[],r=new H(e);t.push(r);let i=(...e)=>r.getLanguageServiceWorker(...e);return function(){let{languageId:t,modeConfiguration:r}=e;tt(n),r.completionItems&&n.push(p.languages.registerCompletionItemProvider(t,new Je(i))),r.hovers&&n.push(p.languages.registerHoverProvider(t,new Me(i))),r.documentHighlights&&n.push(p.languages.registerDocumentHighlightProvider(t,new je(i))),r.links&&n.push(p.languages.registerLinkProvider(t,new ze(i))),r.documentSymbols&&n.push(p.languages.registerDocumentSymbolProvider(t,new He(i))),r.rename&&n.push(p.languages.registerRenameProvider(t,new Ve(i))),r.foldingRanges&&n.push(p.languages.registerFoldingRangeProvider(t,new Qe(i))),r.selectionRanges&&n.push(p.languages.registerSelectionRangeProvider(t,new Ge(i))),r.documentFormattingEdits&&n.push(p.languages.registerDocumentFormattingEditProvider(t,new Xe(i))),r.documentRangeFormattingEdits&&n.push(p.languages.registerDocumentRangeFormattingEditProvider(t,new qe(i)))}(),t.push(et(n)),et(t)}function et(e){return{dispose:()=>tt(e)}}function tt(e){for(;e.length;)e.pop().dispose()}return l(h)})()));