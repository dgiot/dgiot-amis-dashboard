/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define("vs/basic-languages/objective-c/objective-c",["require","require"],(e=>(()=>{var e,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,o=Object.getOwnPropertyNames,r=Object.prototype.hasOwnProperty,i=(e="undefined"!=typeof WeakMap?new WeakMap:0,(i,s)=>e&&e.get(i)||(s=((e,i,s,c)=>{if(i&&"object"==typeof i||"function"==typeof i)for(let a of o(i))!r.call(e,a)&&(s||"default"!==a)&&t(e,a,{get:()=>i[a],enumerable:!(c=n(i,a))||c.enumerable});return e})((e=>t(e,"__esModule",{value:!0}))({}),i,1),e&&e.set(i,s),s)),s={};((e,n)=>{for(var o in n)t(e,o,{get:n[o],enumerable:!0})})(s,{conf:()=>c,language:()=>a});var c={comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}]},a={defaultToken:"",tokenPostfix:".objective-c",keywords:["#import","#include","#define","#else","#endif","#if","#ifdef","#ifndef","#ident","#undef","@class","@defs","@dynamic","@encode","@end","@implementation","@interface","@package","@private","@protected","@property","@protocol","@public","@selector","@synthesize","__declspec","assign","auto","BOOL","break","bycopy","byref","case","char","Class","const","copy","continue","default","do","double","else","enum","extern","FALSE","false","float","for","goto","if","in","int","id","inout","IMP","long","nil","nonatomic","NULL","oneway","out","private","public","protected","readwrite","readonly","register","return","SEL","self","short","signed","sizeof","static","struct","super","switch","typedef","TRUE","true","union","unsigned","volatile","void","while"],decpart:/\d(_?\d)*/,decimal:/0|@decpart/,tokenizer:{root:[{include:"@comments"},{include:"@whitespace"},{include:"@numbers"},{include:"@strings"},[/[,:;]/,"delimiter"],[/[{}\[\]()<>]/,"@brackets"],[/[a-zA-Z@#]\w*/,{cases:{"@keywords":"keyword","@default":"identifier"}}],[/[<>=\\+\\-\\*\\/\\^\\|\\~,]|and\\b|or\\b|not\\b]/,"operator"]],whitespace:[[/\s+/,"white"]],comments:[["\\/\\*","comment","@comment"],["\\/\\/+.*","comment"]],comment:[["\\*\\/","comment","@pop"],[".","comment"]],numbers:[[/0[xX][0-9a-fA-F]*(_?[0-9a-fA-F])*/,"number.hex"],[/@decimal((\.@decpart)?([eE][\-+]?@decpart)?)[fF]*/,{cases:{"(\\d)*":"number",$0:"number.float"}}]],strings:[[/'$/,"string.escape","@popall"],[/'/,"string.escape","@stringBody"],[/"$/,"string.escape","@popall"],[/"/,"string.escape","@dblStringBody"]],stringBody:[[/[^\\']+$/,"string","@popall"],[/[^\\']+/,"string"],[/\\./,"string"],[/'/,"string.escape","@popall"],[/\\$/,"string"]],dblStringBody:[[/[^\\"]+$/,"string","@popall"],[/[^\\"]+/,"string"],[/\\./,"string"],[/"/,"string.escape","@popall"],[/\\$/,"string"]]}};return i(s)})()));