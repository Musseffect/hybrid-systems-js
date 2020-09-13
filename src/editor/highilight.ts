
require("ace-builds/src-noconflict/mode-javascript")
var Ace = require('ace-builds/src-noconflict/ace');
var oop = Ace.require("ace/lib/oop");
var TextHighlightRules = Ace.require("ace/mode/text_highlight_rules").TextHighlightRules;

import {functionDictionary} from "../compiler/functions"

var HighilightRules = function(){

var keywords = (
    "for|sum|macro|const|state|on|set|from|in|terminal|t0|der"
);
var builtinFunctions = ("");
Object.keys(functionDictionary).forEach(function(item,index){
    if(index>0)
        builtinFunctions+="|"+item;
    else
        builtinFunctions+=item;
});
var builtinConstants = (
    "true|false|TRUE|FALSE"
);

var keywordOperators = (
    "and|or|not"
);

var keywordMapper = this.$keywords = this.createKeywordMapper(
    {
        "keyword.control" : keywords,
        "keyword.operator": keywordOperators,
        "constant.language" : builtinConstants,
        "support.function" : builtinFunctions
    },"identifier");

this.$rules = {
    "start" :[
        {
            token : "comment",
            regex : "//$",
            next : "start"
        },
        {
            token:"comment",
            regex:"\\/\\*",
            next:"comment"
        },
        {
            token : "comment",
            regex : "//",
            next : "singleLineComment"
        },
        {
            token : "constant.numeric", // float
            regex : "\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        },
        {
            token : "support.variable", // macro usage
            regex : "#[_A-Za-z]+[_A-Za-z0-9]*\\b"/*,
            next : "array"*/
        },
        {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*"
        },{
            token : "keyword.operator",
            regex : /-|\+|&&|\|\||\?:|[<>!]=?|=|\^|\/|\*/
        }, 
        {
            token : "punctuation.operator",
            regex : "\\?|\\:|\\,|\\;"
        }, {
            token : "paren.lparen",
            regex : "[[({]"
        }, {
            token : "paren.rparen",
            regex : "[\\])}]"
        } 
        
    ],
    "array":[
        {
          token:"keyword",
          regex: "(\\[.+\\])*",
          next:"start"
        }
    ],
    "comment" : [
        {
            token : "comment", // closing comment
            regex : "\\*\\/",
            next : "start"
        }, {
            defaultToken : "comment"
        }
    ],
    "singleLineComment" : [
        {
            token : "comment",
            regex : /\\$/,
            next : "singleLineComment"
        }, {
            token : "comment",
            regex : /$/,
            next : "start"
        }, {
            defaultToken: "comment"
        }
    ]

};

}

oop.inherits(HighilightRules, TextHighlightRules);

export default HighilightRules;