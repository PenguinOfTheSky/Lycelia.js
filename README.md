# Lycelia.js (ljs) vA.19
Library is currently in Alpha (more features are being added, and current features may be subject to change.)
## A few teaser code examples
* $('button',(m)=>m.c('btn !hidden')) // applies btn class to all buttons and toggles 'hidden' class
* if (isN(n)) n=floor(n) // if n is a number n = Math.floor(n)
* C.log('woof')  // C(onsole).log

## Using ljs
Math, Array, Object methods are available in global scope.
If used in browser, has $() for various html operations.
Adds various additional methods to math,array,etc.

## style guidelines: (under construction)
Do not use JS classes. -- or modules?
//for html classes, PascalCase
variable type variable: v
result/output: _ //or {type}_ ex: o_ (object-out; returns object)
event: e
${var}: pointer
input: I // string input sI; array aI //conflicts w/Index, generally unecessary
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

## License
Free for use/modification. Just keep the @author Lycelia comment in the main file.
