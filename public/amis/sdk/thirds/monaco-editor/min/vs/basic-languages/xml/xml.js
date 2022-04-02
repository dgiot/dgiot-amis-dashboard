/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define("vs/basic-languages/xml/xml",["require","require"],(e=>(()=>{var t,n=Object.create,o=Object.defineProperty,a=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,r=Object.getPrototypeOf,l=Object.prototype.hasOwnProperty,d=e=>o(e,"__esModule",{value:!0}),u=(t=function(t){if(void 0!==e)return e.apply(this,arguments);throw new Error('Dynamic require of "'+t+'" is not supported')},void 0!==e?e:"undefined"!=typeof Proxy?new Proxy(t,{get:(t,n)=>(void 0!==e?e:t)[n]}):t),m=(e,t,n,r)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let d of i(t))!l.call(e,d)&&(n||"default"!==d)&&o(e,d,{get:()=>t[d],enumerable:!(r=a(t,d))||r.enumerable});return e},c=(e,t)=>m(d(o(null!=e?n(r(e)):{},"default",!t&&e&&e.__esModule?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e),s=(e=>(t,n)=>e&&e.get(t)||(n=m(d({}),t,1),e&&e.set(t,n),n))("undefined"!=typeof WeakMap?new WeakMap:0),p=((e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports))(((e,t)=>{var n=c(u("vs/editor/editor.api"));t.exports=n})),f={};((e,t)=>{for(var n in t)o(e,n,{get:t[n],enumerable:!0})})(f,{conf:()=>x,language:()=>b});var g={};m(g,c(p()));var x={comments:{blockComment:["\x3c!--","--\x3e"]},brackets:[["<",">"]],autoClosingPairs:[{open:"<",close:">"},{open:"'",close:"'"},{open:'"',close:'"'}],surroundingPairs:[{open:"<",close:">"},{open:"'",close:"'"},{open:'"',close:'"'}],onEnterRules:[{beforeText:new RegExp("<([_:\\w][_:\\w-.\\d]*)([^/>]*(?!/)>)[^<]*$","i"),afterText:/^<\/([_:\w][_:\w-.\d]*)\s*>$/i,action:{indentAction:g.languages.IndentAction.IndentOutdent}},{beforeText:new RegExp("<(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$","i"),action:{indentAction:g.languages.IndentAction.Indent}}]},b={defaultToken:"",tokenPostfix:".xml",ignoreCase:!0,qualifiedName:/(?:[\w\.\-]+:)?[\w\.\-]+/,tokenizer:{root:[[/[^<&]+/,""],{include:"@whitespace"},[/(<)(@qualifiedName)/,[{token:"delimiter"},{token:"tag",next:"@tag"}]],[/(<\/)(@qualifiedName)(\s*)(>)/,[{token:"delimiter"},{token:"tag"},"",{token:"delimiter"}]],[/(<\?)(@qualifiedName)/,[{token:"delimiter"},{token:"metatag",next:"@tag"}]],[/(<\!)(@qualifiedName)/,[{token:"delimiter"},{token:"metatag",next:"@tag"}]],[/<\!\[CDATA\[/,{token:"delimiter.cdata",next:"@cdata"}],[/&\w+;/,"string.escape"]],cdata:[[/[^\]]+/,""],[/\]\]>/,{token:"delimiter.cdata",next:"@pop"}],[/\]/,""]],tag:[[/[ \t\r\n]+/,""],[/(@qualifiedName)(\s*=\s*)("[^"]*"|'[^']*')/,["attribute.name","","attribute.value"]],[/(@qualifiedName)(\s*=\s*)("[^">?\/]*|'[^'>?\/]*)(?=[\?\/]\>)/,["attribute.name","","attribute.value"]],[/(@qualifiedName)(\s*=\s*)("[^">]*|'[^'>]*)/,["attribute.name","","attribute.value"]],[/@qualifiedName/,"attribute.name"],[/\?>/,{token:"delimiter",next:"@pop"}],[/(\/)(>)/,[{token:"tag"},{token:"delimiter",next:"@pop"}]],[/>/,{token:"delimiter",next:"@pop"}]],whitespace:[[/[ \t\r\n]+/,""],[/<!--/,{token:"comment",next:"@comment"}]],comment:[[/[^<\-]+/,"comment.content"],[/-->/,{token:"comment",next:"@pop"}],[/<!--/,"comment.content.invalid"],[/[<\-]/,"comment.content"]]}};return s(f)})()));