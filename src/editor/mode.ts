require("ace-builds/src-noconflict/mode-javascript")
var Ace = require('ace-builds/src-noconflict/ace');
    
var oop = Ace.require("ace/lib/oop");
    // defines the parent mode
var TextMode = Ace.require("ace/mode/text").Mode;
var Tokenizer = Ace.require("ace/tokenizer").Tokenizer;
var MatchingBraceOutdent = Ace.require("ace/mode/matching_brace_outdent").MatchingBraceOutdent;
var WorkerClient = Ace.require("ace/worker/worker_client").WorkerClient;

import HighilightRules from "./highilight"
import FoldMode from "./fold"
    
var Mode = function() {
    this.HighlightRules = HighilightRules;
    this.$outdent = new MatchingBraceOutdent();
    //@ts-ignore
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);
    
(function() {
    // configure comment start/end characters
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};
    
    // special logic for indent/outdent. 
    // By default ace keeps indentation of previous line
    this.getNextLineIndent = function(state:any, line:any, tab:any) {
        var indent = this.$getIndent(line);
        return indent;
    };

    this.checkOutdent = function(state:any, line:any, input:any) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state:any, doc:any, row:any) {
        this.$outdent.autoOutdent(doc, row);
    };
    
}).call(Mode.prototype);
    
exports.Mode = Mode;