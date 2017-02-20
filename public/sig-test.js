"use strict";

var modules = [
	jsfx.Module.Frequency,
	jsfx.Module.Vibrato,
	jsfx.Module.Guitar,
	jsfx.Module.Volume
];

var fq_C1 = Math.floor(Math.random() * (18000 - 17000 + 1)) + 17000;
var fq_C2 = Math.floor(Math.random() * (19000 - 18000 + 1)) + 18000;
var fq_C3 = Math.floor(Math.random() * (20000 - 19000 + 1)) + 19000;
var fq_C4 = Math.floor(Math.random() * (21000 - 20000 + 1)) + 20000;

var lib = {
	"dynamic": function(){
		return {
			"Frequency": { "Start": fq_C4 },
		};
	}
};

var lib2 = {
	"dynamic": function(){
		return {
			"Frequency": { "Start": 1000 },
		};
	}
};

var lib3 = {
	"dynamic": function(){
		return {
			"Frequency": { "Start": 2000 },
		};
	}
};

var sound = jsfx.Sound(lib, modules);
var sound2 = jsfx.Sound(lib2, modules);
var sound3 = jsfx.Sound(lib3, modules);

console.log(sound.src);
console.log(sound2.src);
console.log(sound3.src);

window.sfx = jsfx.Live(lib, modules);
