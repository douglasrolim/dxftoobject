import {DxfParser} from './lib/dxf-parser.js'
const parser = new DxfParser();

export default function (text) {
	return parser.init(text)
}