import * as fs from 'fs';

var outro = `
Object.defineProperty( exports, 'AudioContext', {
	get: function () {
		return exports.getAudioContext();
	}
});`;

function glsl () {
	return {
		transform ( code, id ) {
			if ( !/\.glsl$/.test( id ) ) return;

			return 'export default ' + JSON.stringify(
				code
					.replace( /[ \t]*\/\/.*\n/g, '' )
					.replace( /[ \t]*\/\*[\s\S]*?\*\//g, '' )
					.replace( /\n{2,}/g, '\n' )
			) + ';';
		}
	};
}

export default {
	'input': 'src/third_party/three/Three.js',
	output: {
		file: 'build/three.js',
		name: 'THREE',
		format: 'umd',
		outro: outro },
	plugins: [
		glsl()
	],
};