/*
* @author Lycelia.com
style guidelines: (under construction)
.mjs modules: {varName}
Do not use JS classes. -- or modules?
for html classes, PascalCase
variable type variable: v
result/output: _ //or {type}_ ex: o_ (object-out; returns object)
event: e
${var}: pointer
input: I // string input sI; array aI
//H: html string
h: height
T: text
string: s
function: f
default object variable: o
default array variable: a, a2
default number variable: n, n2
int: i
json: j
Common variables:
x, y, z locations
r radius, regexp
l length
w width
-- name descriptively if default is not appropriate.
m = generic element
forEach/otherarraymethods((m,i)) (2nd dimension: (m2,i2))
for (let i) (2nd: i2; 3rd: i3)
*/
M = Math
S = String //S(tring)
C = {} //C(onsole)
N = Number //N(umber)
O = Object //Object
A = Array
R = RegExp
{ //start Window/document/body
  if (typeof(window) !== 'undefined') {
    F = fetch //Move to global when nodejs v18+
    W=window, D=document
    let _$ = {
      assign:function(o,v){
        if (!isO(o)) o={[o]:v}
        rename(o,{h:"innerHTML",t:'innerText',s:'style',H:"outerHTML",T:"outerText",c:'className'})
        if (o.style) assign(this.style,o.style) //data? other objects?
        delete o.style
        return assign(this,o)
      },
      $:function(v,v2) {return $(this, ...arguments) },
      h:function(v,loc){
        if (v===undefined) return this.innerHTML
        if (typeof v=='function') v=v(this.innerHTML)
        if (!loc) this.innerHTML=v
        else if (loc==1) this.insertAdjacentHTML('beforeend',v)
        else if (loc==2) this.insertAdjacentHTML('afterend',v)
        else if (loc==-2) this.insertAdjacentHTML('beforebegin',v)
        else if (loc==-1) this.insertAdjacentHTML('afterbegin',v)
        return this
      },
      t:function(v,loc){
        if (v===undefined) return this.innerText
        if (typeof v=='function') v=v(this.innerText)
        if (!loc) this.innerText=v
        else if (loc==1) this.insertAdjacentText('beforeend',v)
        else if (loc==2) this.insertAdjacentText('afterend',v)
        else if (loc==-2) this.insertAdjacentText('beforebegin',v)
        else if (loc==-1) this.insertAdjacentText('afterbegin',v)
        return this
      },
      m:function(...a){
        let loc=1
        if (isN(a.at(-1))) loc=a.pop()
        /*if (A.isArray(v)) {
          let frag = document.createDocumentFragment()
          frag.append(...v)
          v=frag
        }*/
        let frag = document.createDocumentFragment()
        frag.append(...a)
        if (loc==1) this.append(frag)
        else if (loc==2) this.after(frag)
        else if (loc==-2) this.before(frag)
        else if (loc==-1) this.prepend(frag)
        else if (loc==0) {
          this.replaceWith(frag)
          return frag
        }
        /*a.forEach(v=>{
          if (loc==1) this.append(v)
          else if (loc==2) this.after(v)
          else if (loc==-2) this.before(v)
          else if (loc==-1) this.prepend(v)
          else if (loc==0) {
            this.replaceWith(v)
            return v
          }
        })*/
        return this
      },
      H:function(v){
        if (v===undefined) return this.outerHTML
        if (typeof v=='function') v=v(this.outerHTML)
        this.outerHTML=v
        return v
      },
      T:function(v){
        if (v===undefined) return this.outerText
        if (typeof v=='function') v=v(this.outerText)
        this.outerText=v
        return v//?
      },
      c: function(a) {//add object option?
        a=a.split(' ')
        a.forEach(m=>{
          if (m[0]==='!') this.classList.toggle(m.slice(1))
          else if (m[0]==='^') this.classList.remove(m.slice(1))
          else this.classList.add(m)
        })
        return this
      }
    }

    $= new Proxy(function (...a) {
      if (!(a[0] instanceof Element)) {
        if (typeof a[0]=='object') return $.ce(a[0])
        else a.unshift(document)
      } else {
        if (!a[1]) return assign(a[0],_$)
      }
      let [ele,s,fn]=a
      if (!fn) {
        let item=ele.querySelector(s)
        if (!item) return item
        return assign(item, _$)
      }
      if (fn===1)
        return [...ele.querySelectorAll(s)].map(m=>assign(m,_$))
      else ele.querySelectorAll(s).forEach((m,i,ar)=>{fn(assign(m,_$,i,ar))})
    }, {
      ce:function(o){//createElement:Enhanced
        if (Array.isArray(o)) {
          let frag=document.createDocumentFragment()
          for (let i=0;i<o.length;i++) frag.append($.ce(o[i]))
          return frag
        }
        let {m='div',a,...o2} = o //a (array||object) of child(ren)
        let m_ = document.createElement(m)
        for (let i in o2) {
          if (i=='h') m_.innerHTML=o2[i]
          else if (i=='H') m_.outerHTML=o2[i]
          else if (i=='T') m_.outerText=o2[i]
          else if (i=='t') m_.innerText=o2[i]
          else if (i=='c'||i=='className'||i=='class') m_.setAttribute("class",o2[i])
          else if (i=='s') m_.setAttribute("style",o2[i])
          else if (/^on/.test(i) && typeof o2[i]=='string') {
            m_.setAttribute(i, o2[i])
          }
          else m_[i]=o2[i]
        }
        if (a) m_.append($.ce(a))
        return assign(m_,_$)
      },
      get(target, v) {
        return document?.body?.[v]||document[v]||this[v]
      },
      set(base,target,v){//super problematic
        if (document?.body?.[target]) document.body[target]=v
        else if (document.body[target]) document.body[target]=v
        else this[target]=v
      }
    })
    escapeHTML=s=>s.replace('<','&lt;')//hmm....
  }
}
{
  Object.rename=function(v,o, includeU) {
    for (let x in o) {
      if (v[x]!==undefined) {
        v[o[x]]=v[x]
        delete v[x]
      }
    }
  }
}
{//start Array
  Array.shuffle =ar=>ar.sort(()=>M.random()-.5)
  Array.random = (ar)=>ar[M.floor(M.random()*ar.length)]
  /*Array.mv = function(v,o, deleteOld=true) {
    if (A.isArray(v)) {

    } else {
      for (let x in o) {
        v[o[x]]=v[x]
        if (deleteOld) delete v[x]
      }
    }
  }*/
  Array.some = function(arr, fn) {
    if (A.isArray(arr)) {
      for (let i=0;i<arr.length;i++) {
        let n = fn(arr[i],i,arr)
        if (n) return n
      }
    } else {
      for (let i in arr) {
        let n = fn(arr[i],i,arr)
        if (n) return n
      }
    }
  }
  Array.map=function(v,fn,filterU) {
    let v_=[]
    if (Array.isArray(v)) {
      for (let i=0;i<v.length;i++) v_[i] = fn(v[i],i,v)
      if (filterU) v=v.filter(m=>m!==U)
    } else {
      v_={}
      for (let x in v) v_[x]=fn(v[x],x,v)
      if (filterU)
        for (let x in v)
          if (v[x]===U) delete v[x]
    }
    return v_
  }
  Array.mut=function(v,fn) {
    if (A.isArray(v)) for (let i=0;i<v.length;i++) v[i]=fn(v[i],i,v)
    else for (let x in v) v[x]=fn(v[x],x,v)
    return v
  }
  Array.prototype.mut = function(fn) {
    for (let i=0;i<this.length;i++) this[i] = fn(this[i],i,this)
    return this
  }
  Array.each=function(a,fn) {
    if (isA(a))
      for (let i=0;i<a.length;i++) fn(a[i],i,a)
    else
      for (let x in a) fn(a[x],x,a)
    return a
  }
  sum=function(ar,fn=(n)=>n,v) {
    if (Array.isArray(ar)) {
      for (let i=0;i<ar.length;i++) {
        if (v) v+=fn(ar[i],i,ar)
        else v=fn(ar[i],i,ar)
      }
    } else {
      let i=0
      for (let x in ar) {
        if (v) v+=fn(ar[x],i++,ar)
        else v=fn(ar[x],i++,ar)
      }
    }
    return v
  }
  Array.prototype.sum = function(fn, v) {
    for (let i=0;i<this.length;i++) {
      if (v) v+=fn(this[i],i,this) //??0 ? ??default ||
      else v=fn(this[i],i,this)
    }
    return v
  }
  Array.prototype.toO=function(v=true) {
    let o = {}
    if (isF(v)) each(this,m=>o[m]=v(m))
    else each(this,m=>o[m]=v)
    return o
  }
  Array.rE=(ar, splice)=>{
    let n = M.floor(M.random()*ar.length)
    if (splice) return ar.splice(n,1)[0]
    else return ar[n]
  } //convert array-like objects?
}
{//Math start
  Math.rN=function(scale=1, offset=0) {
    return Math.random()*scale+offset
  }
  Math.add = function(v1,v2) {
    if (typeof(v1)=='undefined') {
      if (typeof(v2)=='number') v1=0
      else if (Array.isArray(v2)) v1=[]
      else if (typeof(v2)=='object') v1={}
      else v1=0
    }
    if (Array.isArray(v1)) {
      for (let i =1; i < arguments.length;i++) {
        let v2=arguments[i]
        for (let i2=0; i2<v2.length;i2++)
          v1[i2]=(v1[i2]??0)+v2[i2]
      }
    } else if (typeof(v1)=='number') {
      return Array.prototype.reduce.call(arguments,(a,b)=>(a||0)+(b||0))
    } else if (typeof(v1)=='object') {
      for (let i=1; i<arguments.length;i++) {
        for (let item in arguments[i]) {
          if (typeof(arguments[i][item])=='number')
            v1[item] = (v1[item]||0)+(arguments[i][item]||0)
          else if (typeof(v1[item])=='object' && typeof(arguments[i][item])=='object')
            add(v1[item],arguments[i][item])
          else //add recursion for objects here? perhaps,perhaps not. add vs replace confusion
            v1[item]=arguments[i][item]
        }
      }
    }
    return v1
  }
}

{ //start JSON
  JSON.clone = function(obj, deep) {
    if (deep) { }//mm?
    return JSON.parse(JSON.stringify(obj))
  }
  J = function(item) { //difficult to tell what direction it's going. harmful?
    if (typeof(item) == "object") {
      return JSON.stringify(...arguments)
    } else {
      try {// add deep for functions?
        return JSON.parse(item)
      } catch(err) {/*console.log(err);*/ return item}
    }
  }
  Object.getOwnPropertyNames(JSON).forEach(m=> J[m]=JSON[m])
  J.s=J.stringify
  J.p=J.parse
  J.c=J.clone
}
Object.getOwnPropertyNames(console).forEach(m=> C[m]=console[m])
C.echo = C.log
Object.getOwnPropertyNames(String).forEach(m=> S[m]=String[m])
Object.getOwnPropertyNames(Object).forEach(m=> O[m]=Object[m])
Object.getOwnPropertyNames(Number).forEach(m=> N[m]=Number[m])
Object.getOwnPropertyNames(Array).forEach(m=> A[m]=Array[m])
_setFinal = function(o) {
  let objs = [C,S,O,M,A,J]
  objs.forEach(obj=>{
    Object.getOwnPropertyNames(obj).forEach(m=> o[m]=obj[m])
  })
  o.T=function(v) {
    v=typeof(v)
    if (v =='undefined') return
    else return v
  }
  o.U=undefined
  o.random = function(r=1) { //deprecated?
    if (A.isArray(r)) return A.random(r)
    else  return M.random()*r
  }
}
isN=n=>typeof n == 'number'
isU=v=>typeof v == 'undefined' //does not avoid fatal error ); => must input o[v]
isO=v=>typeof v == 'object'
isS=v=>typeof v == 'string'
isA=v=>A.isArray(v)
isF=v=>typeof v == 'function'
if (typeof W != 'undefined') _setFinal(window)
if (typeof global != 'undefined') _setFinal(global)
