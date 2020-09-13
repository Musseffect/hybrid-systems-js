require("ace-builds/src-noconflict/mode-javascript")
var Ace = require('ace-builds/src-noconflict/ace');

var oop = Ace.require("ace/lib/oop");
var _Range = Ace.require("ace/range").Range;
var BaseFoldMode = Ace.require("ace/mode/folding/fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function() {};
oop.inherits(FoldMode, BaseFoldMode);
(function(){

    this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;


    this.getFoldWidgetRange = function(session:any, foldStyle:any, row:any) {
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if(match){
            var i = match.index;
            if(match[1])
                return this.openingBracketBlock(session, match[1], row, i);
            
            var range = session.getCommentFoldRange(row, i + match[0].length);
            range.end.column -= 2;
            return range;
            }
    };
}).call(FoldMode.prototype);

export default FoldMode;