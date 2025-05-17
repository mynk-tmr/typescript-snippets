//max of array
Math.max.apply(null, arr); 

//snake case to camel case
str.replace(/(-)(\w)/g, (full_match, ...groups) => groups[1].toUpperCase())

function partializer(original_func, ...bindUs) {
  return function(...args) {  
    return original_func.call(this, ...bindUs, ...args); 
  }
}

function curry(func) {
    return collector;
    function collector(...args) {
        if(args.length >= func.length)
            return func(...args);
        else
            return function(...more) {
                return collector(...args,...more);

function getDaysLeftinYear() {
	let end = new Date(2024, 0, 1)
	let left = (end.getTime() - Date.now()) / 86400_000;
	return Math.round(left)
}

function getWeekDay(date) {
	let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
	return days[date.getDay()]
}

function getSecondsFromDayStart() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

Function.prototype.bind = Function.prototype.bind || function(ctx, ...args){ 
	let fn = this;
	return (...more) => fn.apply(ctx, [...args, ...more] )
}

Function.prototype.curry = function(...args_outer) {
	let fn_outer = this;
	if (args_outer<1) return fn_outer
	return function(...args_inner) { 
		return fn_outer.apply(this, args_outer.concat(args_inner)) 
}}

function toArray(args) { return Array.prototype.slice.call(args); }

function withResolvers() {
	let resolve, reject;
	const promise = new Promise((res, rej) => {
	  resolve = res; reject = rej;
	});
	return {promise, resolve, reject}
}

function reduce(callback, initialValue) {
    if (typeof callback !== 'function') throw 'error'
    const array = this;
    let acc = initialValue ?? array[0];

    for (let i in array)
        acc = callback.call(undefined, acc, array[i], i, array);
    return acc;
}

function map(callback, thisArg) {
    const arr = this, result = []
    for(let i in arr) {
	    result[i] = callback.call(thisArg, arr[i], i, arr) 
    }
}

function filter(callback, thisArg) {
    const arr = this, result = []
    for(let i in arr) {
	    let val = arr[i]
	    let bool = callback.call(thisArg, val, i, arr);
	    if(bool) res.push(val)
    }
}

function find(cb) {
	const arr=this;
	for(let i in arr) if( cb(arr[i], i, arr) ) return i;
	return -1
} 

findLast <-- ulta loop

function flat(depth) {
    let res = [];
    flatten(this, 0);
    return res;

    function flatten(arr, currentDepth) {
      for (let val of arr) {
        if (Array.isArray(val) && currentDepth < depth)
	        flatten(val, currentDepth + 1);
        else
	        res.push(val);
      }
    }
}
