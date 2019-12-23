const BaseParser = require('../common/base-parser').BaseParser;
const EntitiesParser = require('./entities-parser').EntitiesParser;
const PromiseEach = require('../util').PromiseEach

class BlocksParser extends BaseParser{
    constructor(data){
        super();
        this.data = data;
        this.result = {};
    }

    parse() {
        return new Promise((resolve, reject)=>{
            PromiseEach(this.data, (blockData)=>{
                let blockBuffer = {};
                return PromiseEach(blockData.block, (cursor)=>{
                    if(this.DxfSpec.Section.Blocks.hasOwnProperty(cursor.code)){
                        let spec = this.DxfSpec.Section.Blocks[cursor.code];
                        this.matchSpec(blockBuffer, spec, cursor);
                    }
                    return cursor;
                }).then(()=>{
                    this.result[blockBuffer.name] = blockBuffer;
                    return blockData.entities.length > 0 ?
                        new EntitiesParser(blockData.entities).parse().then((result)=>{
                            this.result[blockBuffer.name].entities = result;
                        }) : false;
                });
            }).then(()=>{
                resolve(this.result);
            })
        });
    }
}

exports.BlocksParser = BlocksParser;