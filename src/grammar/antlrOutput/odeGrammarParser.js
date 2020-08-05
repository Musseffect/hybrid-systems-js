// Generated from e:\projects\SolversJS\src\grammar\odeGrammar.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');
var odeGrammarVisitor = require('./odeGrammarVisitor').odeGrammarVisitor;

var grammarFileName = "odeGrammar.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u00033\u013a\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014\t",
    "\u0014\u0004\u0015\t\u0015\u0003\u0002\u0007\u0002,\n\u0002\f\u0002",
    "\u000e\u0002/\u000b\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0005\u00036\n\u0003\u0003\u0004\u0007\u00049\n\u0004",
    "\f\u0004\u000e\u0004<\u000b\u0004\u0003\u0005\u0003\u0005\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0005\u0006",
    "F\n\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0007\u0007M\n\u0007\f\u0007\u000e\u0007P\u000b\u0007\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0007\bW\n\b\f\b\u000e\bZ\u000b\b\u0003\b",
    "\u0003\b\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\n\u0003\n\u0003\n\u0007\ni\n\n\f\n\u000e\nl\u000b\n\u0003\n",
    "\u0005\no\n\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0007\u000b\u007f\n\u000b",
    "\f\u000b\u000e\u000b\u0082\u000b\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0005\f\u008c",
    "\n\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\r\u0003\r\u0003\r",
    "\u0003\r\u0003\r\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0005\u000e\u00a4\n\u000e\u0003\u000f\u0003\u000f",
    "\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u0010\u0005\u0010",
    "\u00ad\n\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0007",
    "\u0010\u00b3\n\u0010\f\u0010\u000e\u0010\u00b6\u000b\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0007\u0010\u00bd\n",
    "\u0010\f\u0010\u000e\u0010\u00c0\u000b\u0010\u0003\u0011\u0003\u0011",
    "\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0012\u0003\u0012",
    "\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013",
    "\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013",
    "\u0003\u0013\u0003\u0013\u0003\u0013\u0005\u0013\u00d9\n\u0013\u0003",
    "\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0007",
    "\u0013\u00e1\n\u0013\f\u0013\u000e\u0013\u00e4\u000b\u0013\u0003\u0014",
    "\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014",
    "\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014",
    "\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014",
    "\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014",
    "\u0003\u0014\u0003\u0014\u0007\u0014\u0101\n\u0014\f\u0014\u000e\u0014",
    "\u0104\u000b\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003",
    "\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003",
    "\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003",
    "\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003",
    "\u0014\u0003\u0014\u0003\u0014\u0005\u0014\u011f\n\u0014\u0003\u0014",
    "\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014",
    "\u0003\u0014\u0003\u0014\u0007\u0014\u012a\n\u0014\f\u0014\u000e\u0014",
    "\u012d\u000b\u0014\u0003\u0015\u0003\u0015\u0003\u0015\u0007\u0015\u0132",
    "\n\u0015\f\u0015\u000e\u0015\u0135\u000b\u0015\u0003\u0015\u0005\u0015",
    "\u0138\n\u0015\u0003\u0015\u0002\u0004$&\u0016\u0002\u0004\u0006\b\n",
    "\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e \"$&(\u0002",
    "\b\u0003\u0002\u0013\u0014\u0004\u0002\u001b\u001b++\u0003\u0002\u0016",
    "\u0017\u0003\u0002\u001f\"\u0003\u0002#$\u0003\u0002\u0018\u0019\u0002",
    "\u0152\u0002-\u0003\u0002\u0002\u0002\u00045\u0003\u0002\u0002\u0002",
    "\u0006:\u0003\u0002\u0002\u0002\b=\u0003\u0002\u0002\u0002\nE\u0003",
    "\u0002\u0002\u0002\fG\u0003\u0002\u0002\u0002\u000eQ\u0003\u0002\u0002",
    "\u0002\u0010]\u0003\u0002\u0002\u0002\u0012n\u0003\u0002\u0002\u0002",
    "\u0014p\u0003\u0002\u0002\u0002\u0016\u008b\u0003\u0002\u0002\u0002",
    "\u0018\u0092\u0003\u0002\u0002\u0002\u001a\u00a3\u0003\u0002\u0002\u0002",
    "\u001c\u00a5\u0003\u0002\u0002\u0002\u001e\u00ac\u0003\u0002\u0002\u0002",
    " \u00c1\u0003\u0002\u0002\u0002\"\u00c7\u0003\u0002\u0002\u0002$\u00d8",
    "\u0003\u0002\u0002\u0002&\u011e\u0003\u0002\u0002\u0002(\u0137\u0003",
    "\u0002\u0002\u0002*,\u0005\u0004\u0003\u0002+*\u0003\u0002\u0002\u0002",
    ",/\u0003\u0002\u0002\u0002-+\u0003\u0002\u0002\u0002-.\u0003\u0002\u0002",
    "\u0002.\u0003\u0003\u0002\u0002\u0002/-\u0003\u0002\u0002\u000206\u0005",
    "\u0016\f\u000216\u0005\u001a\u000e\u000226\u0005\u001c\u000f\u00023",
    "6\u0005\u0010\t\u000246\u0005\u0014\u000b\u000250\u0003\u0002\u0002",
    "\u000251\u0003\u0002\u0002\u000252\u0003\u0002\u0002\u000253\u0003\u0002",
    "\u0002\u000254\u0003\u0002\u0002\u00026\u0005\u0003\u0002\u0002\u0002",
    "79\u0005\n\u0006\u000287\u0003\u0002\u0002\u00029<\u0003\u0002\u0002",
    "\u0002:8\u0003\u0002\u0002\u0002:;\u0003\u0002\u0002\u0002;\u0007\u0003",
    "\u0002\u0002\u0002<:\u0003\u0002\u0002\u0002=>\t\u0002\u0002\u0002>",
    "\t\u0003\u0002\u0002\u0002?F\u0005\u0016\f\u0002@F\u0005\u001a\u000e",
    "\u0002AF\u0005\u001c\u000f\u0002BF\u0005\u0010\t\u0002CF\u0005\u0014",
    "\u000b\u0002DF\u0005\u001e\u0010\u0002E?\u0003\u0002\u0002\u0002E@\u0003",
    "\u0002\u0002\u0002EA\u0003\u0002\u0002\u0002EB\u0003\u0002\u0002\u0002",
    "EC\u0003\u0002\u0002\u0002ED\u0003\u0002\u0002\u0002F\u000b\u0003\u0002",
    "\u0002\u0002GN\u0007\u0015\u0002\u0002HI\u0007*\u0002\u0002IJ\u0005",
    "&\u0014\u0002JK\u0007+\u0002\u0002KM\u0003\u0002\u0002\u0002LH\u0003",
    "\u0002\u0002\u0002MP\u0003\u0002\u0002\u0002NL\u0003\u0002\u0002\u0002",
    "NO\u0003\u0002\u0002\u0002O\r\u0003\u0002\u0002\u0002PN\u0003\u0002",
    "\u0002\u0002QX\u0007,\u0002\u0002RW\u0005\u0016\f\u0002SW\u0005\u001a",
    "\u000e\u0002TW\u0005\u001c\u000f\u0002UW\u0005\u0014\u000b\u0002VR\u0003",
    "\u0002\u0002\u0002VS\u0003\u0002\u0002\u0002VT\u0003\u0002\u0002\u0002",
    "VU\u0003\u0002\u0002\u0002WZ\u0003\u0002\u0002\u0002XV\u0003\u0002\u0002",
    "\u0002XY\u0003\u0002\u0002\u0002Y[\u0003\u0002\u0002\u0002ZX\u0003\u0002",
    "\u0002\u0002[\\\u0007-\u0002\u0002\\\u000f\u0003\u0002\u0002\u0002]",
    "^\u0007\f\u0002\u0002^_\u0007\u0015\u0002\u0002_`\u0007\u001a\u0002",
    "\u0002`a\u0005\u0012\n\u0002ab\u0007\u001b\u0002\u0002bc\u0005&\u0014",
    "\u0002cd\u0007(\u0002\u0002d\u0011\u0003\u0002\u0002\u0002ej\u0007\u0015",
    "\u0002\u0002fg\u0007\u001d\u0002\u0002gi\u0007\u0015\u0002\u0002hf\u0003",
    "\u0002\u0002\u0002il\u0003\u0002\u0002\u0002jh\u0003\u0002\u0002\u0002",
    "jk\u0003\u0002\u0002\u0002ko\u0003\u0002\u0002\u0002lj\u0003\u0002\u0002",
    "\u0002mo\u0003\u0002\u0002\u0002ne\u0003\u0002\u0002\u0002nm\u0003\u0002",
    "\u0002\u0002o\u0013\u0003\u0002\u0002\u0002pq\u0007\r\u0002\u0002qr",
    "\u0007\u001a\u0002\u0002rs\u0007\u0015\u0002\u0002st\u0007\u000e\u0002",
    "\u0002tu\u0007*\u0002\u0002uv\u0007\u0014\u0002\u0002vw\u0007)\u0002",
    "\u0002wx\u0007\u0014\u0002\u0002x\u0080\u0007+\u0002\u0002yz\u0007\u001d",
    "\u0002\u0002z{\u0007*\u0002\u0002{|\u0007\u0014\u0002\u0002|}\u0007",
    ")\u0002\u0002}\u007f\u0007\u0014\u0002\u0002~y\u0003\u0002\u0002\u0002",
    "\u007f\u0082\u0003\u0002\u0002\u0002\u0080~\u0003\u0002\u0002\u0002",
    "\u0080\u0081\u0003\u0002\u0002\u0002\u0081\u0083\u0003\u0002\u0002\u0002",
    "\u0082\u0080\u0003\u0002\u0002\u0002\u0083\u0084\u0005\u000e\b\u0002",
    "\u0084\u0085\u0007\u001d\u0002\u0002\u0085\u0086\u0005\u000e\b\u0002",
    "\u0086\u0087\t\u0003\u0002\u0002\u0087\u0088\u0007\u001b\u0002\u0002",
    "\u0088\u0015\u0003\u0002\u0002\u0002\u0089\u008a\u0007\u0015\u0002\u0002",
    "\u008a\u008c\u0007)\u0002\u0002\u008b\u0089\u0003\u0002\u0002\u0002",
    "\u008b\u008c\u0003\u0002\u0002\u0002\u008c\u008d\u0003\u0002\u0002\u0002",
    "\u008d\u008e\u0005&\u0014\u0002\u008e\u008f\u0007$\u0002\u0002\u008f",
    "\u0090\u0005&\u0014\u0002\u0090\u0091\u0007(\u0002\u0002\u0091\u0017",
    "\u0003\u0002\u0002\u0002\u0092\u0093\u0007\u0006\u0002\u0002\u0093\u0094",
    "\u0005\f\u0007\u0002\u0094\u0095\u0007$\u0002\u0002\u0095\u0096\u0005",
    "&\u0014\u0002\u0096\u0019\u0003\u0002\u0002\u0002\u0097\u0098\u0005",
    "\f\u0007\u0002\u0098\u0099\u0007\u0005\u0002\u0002\u0099\u009a\u0007",
    "$\u0002\u0002\u009a\u009b\u0005&\u0014\u0002\u009b\u009c\u0007(\u0002",
    "\u0002\u009c\u00a4\u0003\u0002\u0002\u0002\u009d\u009e\u0005\f\u0007",
    "\u0002\u009e\u009f\u0007\u0004\u0002\u0002\u009f\u00a0\u0007$\u0002",
    "\u0002\u00a0\u00a1\u0005&\u0014\u0002\u00a1\u00a2\u0007(\u0002\u0002",
    "\u00a2\u00a4\u0003\u0002\u0002\u0002\u00a3\u0097\u0003\u0002\u0002\u0002",
    "\u00a3\u009d\u0003\u0002\u0002\u0002\u00a4\u001b\u0003\u0002\u0002\u0002",
    "\u00a5\u00a6\u0007\u0012\u0002\u0002\u00a6\u00a7\u0005\f\u0007\u0002",
    "\u00a7\u00a8\u0007$\u0002\u0002\u00a8\u00a9\u0005&\u0014\u0002\u00a9",
    "\u00aa\u0007(\u0002\u0002\u00aa\u001d\u0003\u0002\u0002\u0002\u00ab",
    "\u00ad\u0007\n\u0002\u0002\u00ac\u00ab\u0003\u0002\u0002\u0002\u00ac",
    "\u00ad\u0003\u0002\u0002\u0002\u00ad\u00ae\u0003\u0002\u0002\u0002\u00ae",
    "\u00af\u0007\u0015\u0002\u0002\u00af\u00b4\u0007,\u0002\u0002\u00b0",
    "\u00b3\u0005\u0016\f\u0002\u00b1\u00b3\u0005\u0018\r\u0002\u00b2\u00b0",
    "\u0003\u0002\u0002\u0002\u00b2\u00b1\u0003\u0002\u0002\u0002\u00b3\u00b6",
    "\u0003\u0002\u0002\u0002\u00b4\u00b2\u0003\u0002\u0002\u0002\u00b4\u00b5",
    "\u0003\u0002\u0002\u0002\u00b5\u00b7\u0003\u0002\u0002\u0002\u00b6\u00b4",
    "\u0003\u0002\u0002\u0002\u00b7\u00b8\u0007-\u0002\u0002\u00b8\u00b9",
    "\u0007\b\u0002\u0002\u00b9\u00be\u0005 \u0011\u0002\u00ba\u00bb\u0007",
    "\u001d\u0002\u0002\u00bb\u00bd\u0005 \u0011\u0002\u00bc\u00ba\u0003",
    "\u0002\u0002\u0002\u00bd\u00c0\u0003\u0002\u0002\u0002\u00be\u00bc\u0003",
    "\u0002\u0002\u0002\u00be\u00bf\u0003\u0002\u0002\u0002\u00bf\u001f\u0003",
    "\u0002\u0002\u0002\u00c0\u00be\u0003\u0002\u0002\u0002\u00c1\u00c2\u0007",
    "\u0015\u0002\u0002\u00c2\u00c3\u0007\u0007\u0002\u0002\u00c3\u00c4\u0007",
    "\u001a\u0002\u0002\u00c4\u00c5\u0005$\u0013\u0002\u00c5\u00c6\u0007",
    "\u001b\u0002\u0002\u00c6!\u0003\u0002\u0002\u0002\u00c7\u00c8\t\u0004",
    "\u0002\u0002\u00c8#\u0003\u0002\u0002\u0002\u00c9\u00ca\b\u0013\u0001",
    "\u0002\u00ca\u00cb\u0007\u001a\u0002\u0002\u00cb\u00cc\u0005$\u0013",
    "\u0002\u00cc\u00cd\u0007\u001b\u0002\u0002\u00cd\u00d9\u0003\u0002\u0002",
    "\u0002\u00ce\u00cf\u0007\'\u0002\u0002\u00cf\u00d9\u0005$\u0013\u0007",
    "\u00d0\u00d1\u0005&\u0014\u0002\u00d1\u00d2\t\u0005\u0002\u0002\u00d2",
    "\u00d3\u0005&\u0014\u0002\u00d3\u00d9\u0003\u0002\u0002\u0002\u00d4",
    "\u00d5\u0005&\u0014\u0002\u00d5\u00d6\t\u0006\u0002\u0002\u00d6\u00d7",
    "\u0005&\u0014\u0002\u00d7\u00d9\u0003\u0002\u0002\u0002\u00d8\u00c9",
    "\u0003\u0002\u0002\u0002\u00d8\u00ce\u0003\u0002\u0002\u0002\u00d8\u00d0",
    "\u0003\u0002\u0002\u0002\u00d8\u00d4\u0003\u0002\u0002\u0002\u00d9\u00e2",
    "\u0003\u0002\u0002\u0002\u00da\u00db\f\u0004\u0002\u0002\u00db\u00dc",
    "\u0007&\u0002\u0002\u00dc\u00e1\u0005$\u0013\u0005\u00dd\u00de\f\u0003",
    "\u0002\u0002\u00de\u00df\u0007%\u0002\u0002\u00df\u00e1\u0005$\u0013",
    "\u0004\u00e0\u00da\u0003\u0002\u0002\u0002\u00e0\u00dd\u0003\u0002\u0002",
    "\u0002\u00e1\u00e4\u0003\u0002\u0002\u0002\u00e2\u00e0\u0003\u0002\u0002",
    "\u0002\u00e2\u00e3\u0003\u0002\u0002\u0002\u00e3%\u0003\u0002\u0002",
    "\u0002\u00e4\u00e2\u0003\u0002\u0002\u0002\u00e5\u00e6\b\u0014\u0001",
    "\u0002\u00e6\u00e7\u0007\u001a\u0002\u0002\u00e7\u00e8\u0005&\u0014",
    "\u0002\u00e8\u00e9\u0007\u001b\u0002\u0002\u00e9\u011f\u0003\u0002\u0002",
    "\u0002\u00ea\u00eb\u0007\t\u0002\u0002\u00eb\u00ec\u0007\u001a\u0002",
    "\u0002\u00ec\u00ed\u0005\f\u0007\u0002\u00ed\u00ee\u0007\u001b\u0002",
    "\u0002\u00ee\u011f\u0003\u0002\u0002\u0002\u00ef\u00f0\u0007\u0015\u0002",
    "\u0002\u00f0\u00f1\u0007\u001a\u0002\u0002\u00f1\u00f2\u0005(\u0015",
    "\u0002\u00f2\u00f3\u0007\u001b\u0002\u0002\u00f3\u011f\u0003\u0002\u0002",
    "\u0002\u00f4\u00f5\u0005\"\u0012\u0002\u00f5\u00f6\u0005&\u0014\u000b",
    "\u00f6\u011f\u0003\u0002\u0002\u0002\u00f7\u00f8\u0005\f\u0007\u0002",
    "\u00f8\u00f9\u0007.\u0002\u0002\u00f9\u011f\u0003\u0002\u0002\u0002",
    "\u00fa\u011f\u0005\f\u0007\u0002\u00fb\u011f\u0005\b\u0005\u0002\u00fc",
    "\u00fd\u0007\u0003\u0002\u0002\u00fd\u00fe\u0007\u0015\u0002\u0002\u00fe",
    "\u0102\u0007\u001a\u0002\u0002\u00ff\u0101\u0005&\u0014\u0002\u0100",
    "\u00ff\u0003\u0002\u0002\u0002\u0101\u0104\u0003\u0002\u0002\u0002\u0102",
    "\u0100\u0003\u0002\u0002\u0002\u0102\u0103\u0003\u0002\u0002\u0002\u0103",
    "\u0105\u0003\u0002\u0002\u0002\u0104\u0102\u0003\u0002\u0002\u0002\u0105",
    "\u011f\u0007\u001b\u0002\u0002\u0106\u0107\u0007\u000b\u0002\u0002\u0107",
    "\u0108\u0007*\u0002\u0002\u0108\u0109\u0007\u0015\u0002\u0002\u0109",
    "\u010a\u0007$\u0002\u0002\u010a\u010b\u0005&\u0014\u0002\u010b\u010c",
    "\u0007\u001d\u0002\u0002\u010c\u010d\u0005&\u0014\u0002\u010d\u010e",
    "\u0007+\u0002\u0002\u010e\u010f\u0007,\u0002\u0002\u010f\u0110\u0005",
    "&\u0014\u0002\u0110\u0111\u0007-\u0002\u0002\u0111\u011f\u0003\u0002",
    "\u0002\u0002\u0112\u0113\u0007,\u0002\u0002\u0113\u0114\u0005$\u0013",
    "\u0002\u0114\u0115\u0007-\u0002\u0002\u0115\u0116\u0007/\u0002\u0002",
    "\u0116\u0117\u0007,\u0002\u0002\u0117\u0118\u0005&\u0014\u0002\u0118",
    "\u0119\u0007-\u0002\u0002\u0119\u011a\u0007)\u0002\u0002\u011a\u011b",
    "\u0007,\u0002\u0002\u011b\u011c\u0005&\u0014\u0002\u011c\u011d\u0007",
    "-\u0002\u0002\u011d\u011f\u0003\u0002\u0002\u0002\u011e\u00e5\u0003",
    "\u0002\u0002\u0002\u011e\u00ea\u0003\u0002\u0002\u0002\u011e\u00ef\u0003",
    "\u0002\u0002\u0002\u011e\u00f4\u0003\u0002\u0002\u0002\u011e\u00f7\u0003",
    "\u0002\u0002\u0002\u011e\u00fa\u0003\u0002\u0002\u0002\u011e\u00fb\u0003",
    "\u0002\u0002\u0002\u011e\u00fc\u0003\u0002\u0002\u0002\u011e\u0106\u0003",
    "\u0002\u0002\u0002\u011e\u0112\u0003\u0002\u0002\u0002\u011f\u012b\u0003",
    "\u0002\u0002\u0002\u0120\u0121\f\f\u0002\u0002\u0121\u0122\u0007\u001e",
    "\u0002\u0002\u0122\u012a\u0005&\u0014\r\u0123\u0124\f\n\u0002\u0002",
    "\u0124\u0125\t\u0007\u0002\u0002\u0125\u012a\u0005&\u0014\u000b\u0126",
    "\u0127\f\t\u0002\u0002\u0127\u0128\t\u0004\u0002\u0002\u0128\u012a\u0005",
    "&\u0014\n\u0129\u0120\u0003\u0002\u0002\u0002\u0129\u0123\u0003\u0002",
    "\u0002\u0002\u0129\u0126\u0003\u0002\u0002\u0002\u012a\u012d\u0003\u0002",
    "\u0002\u0002\u012b\u0129\u0003\u0002\u0002\u0002\u012b\u012c\u0003\u0002",
    "\u0002\u0002\u012c\'\u0003\u0002\u0002\u0002\u012d\u012b\u0003\u0002",
    "\u0002\u0002\u012e\u0133\u0005&\u0014\u0002\u012f\u0130\u0007\u001d",
    "\u0002\u0002\u0130\u0132\u0005&\u0014\u0002\u0131\u012f\u0003\u0002",
    "\u0002\u0002\u0132\u0135\u0003\u0002\u0002\u0002\u0133\u0131\u0003\u0002",
    "\u0002\u0002\u0133\u0134\u0003\u0002\u0002\u0002\u0134\u0138\u0003\u0002",
    "\u0002\u0002\u0135\u0133\u0003\u0002\u0002\u0002\u0136\u0138\u0003\u0002",
    "\u0002\u0002\u0137\u012e\u0003\u0002\u0002\u0002\u0137\u0136\u0003\u0002",
    "\u0002\u0002\u0138)\u0003\u0002\u0002\u0002\u001b-5:ENVXjn\u0080\u008b",
    "\u00a3\u00ac\u00b2\u00b4\u00be\u00d8\u00e0\u00e2\u0102\u011e\u0129\u012b",
    "\u0133\u0137"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'#'", "'(t0)'", "'[0]'", "'set'", "'on'", "'from'", 
                     "'der'", "'terminal'", "'sum'", "'macro'", "'for'", 
                     "'in'", "'if'", "'else'", "'local'", "'constant'", 
                     null, null, null, "'+'", "'-'", "'*'", "'/'", "'('", 
                     "')'", "'.'", "','", "'^'", "'<'", "'>'", "'<='", "'>='", 
                     "'!='", "'='", null, null, null, "';'", "':'", "'['", 
                     "']'", "'{'", "'}'", "'''", "'?'" ];

var symbolicNames = [ null, null, "T0", "ZEROSQR", "SET", "ON", "FROM", 
                      "DER", "TERMINAL", "SUM", "MACRO", "FOR", "IN", "IF", 
                      "ELSE", "LOCAL", "CONSTANT", "FLOAT", "INT", "ID", 
                      "PLUS", "MINUS", "ASTERISK", "DIVISION", "LPAREN", 
                      "RPAREN", "DOT", "COMMA", "CARET", "L", "G", "LE", 
                      "GE", "NE", "E", "OR", "AND", "NOT", "SEMICOLON", 
                      "COLON", "LSQR", "RSQR", "LCRL", "RCRL", "APOSTROPHE", 
                      "QUESTIONMARK", "STRING", "NEWLINE", "WHITESPACE", 
                      "COMMENT" ];

var ruleNames =  [ "ode", "odeStatement", "hybrid", "number", "statement", 
                   "varIdentifier", "loopBody", "macroStatement", "macroArguments", 
                   "loop", "equation", "setter", "initialCondition", "constantStatement", 
                   "event", "stateTransition", "unaryOperator", "boolExpression", 
                   "expression", "functionArguments" ];

function odeGrammarParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

odeGrammarParser.prototype = Object.create(antlr4.Parser.prototype);
odeGrammarParser.prototype.constructor = odeGrammarParser;

Object.defineProperty(odeGrammarParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

odeGrammarParser.EOF = antlr4.Token.EOF;
odeGrammarParser.T__0 = 1;
odeGrammarParser.T0 = 2;
odeGrammarParser.ZEROSQR = 3;
odeGrammarParser.SET = 4;
odeGrammarParser.ON = 5;
odeGrammarParser.FROM = 6;
odeGrammarParser.DER = 7;
odeGrammarParser.TERMINAL = 8;
odeGrammarParser.SUM = 9;
odeGrammarParser.MACRO = 10;
odeGrammarParser.FOR = 11;
odeGrammarParser.IN = 12;
odeGrammarParser.IF = 13;
odeGrammarParser.ELSE = 14;
odeGrammarParser.LOCAL = 15;
odeGrammarParser.CONSTANT = 16;
odeGrammarParser.FLOAT = 17;
odeGrammarParser.INT = 18;
odeGrammarParser.ID = 19;
odeGrammarParser.PLUS = 20;
odeGrammarParser.MINUS = 21;
odeGrammarParser.ASTERISK = 22;
odeGrammarParser.DIVISION = 23;
odeGrammarParser.LPAREN = 24;
odeGrammarParser.RPAREN = 25;
odeGrammarParser.DOT = 26;
odeGrammarParser.COMMA = 27;
odeGrammarParser.CARET = 28;
odeGrammarParser.L = 29;
odeGrammarParser.G = 30;
odeGrammarParser.LE = 31;
odeGrammarParser.GE = 32;
odeGrammarParser.NE = 33;
odeGrammarParser.E = 34;
odeGrammarParser.OR = 35;
odeGrammarParser.AND = 36;
odeGrammarParser.NOT = 37;
odeGrammarParser.SEMICOLON = 38;
odeGrammarParser.COLON = 39;
odeGrammarParser.LSQR = 40;
odeGrammarParser.RSQR = 41;
odeGrammarParser.LCRL = 42;
odeGrammarParser.RCRL = 43;
odeGrammarParser.APOSTROPHE = 44;
odeGrammarParser.QUESTIONMARK = 45;
odeGrammarParser.STRING = 46;
odeGrammarParser.NEWLINE = 47;
odeGrammarParser.WHITESPACE = 48;
odeGrammarParser.COMMENT = 49;

odeGrammarParser.RULE_ode = 0;
odeGrammarParser.RULE_odeStatement = 1;
odeGrammarParser.RULE_hybrid = 2;
odeGrammarParser.RULE_number = 3;
odeGrammarParser.RULE_statement = 4;
odeGrammarParser.RULE_varIdentifier = 5;
odeGrammarParser.RULE_loopBody = 6;
odeGrammarParser.RULE_macroStatement = 7;
odeGrammarParser.RULE_macroArguments = 8;
odeGrammarParser.RULE_loop = 9;
odeGrammarParser.RULE_equation = 10;
odeGrammarParser.RULE_setter = 11;
odeGrammarParser.RULE_initialCondition = 12;
odeGrammarParser.RULE_constantStatement = 13;
odeGrammarParser.RULE_event = 14;
odeGrammarParser.RULE_stateTransition = 15;
odeGrammarParser.RULE_unaryOperator = 16;
odeGrammarParser.RULE_boolExpression = 17;
odeGrammarParser.RULE_expression = 18;
odeGrammarParser.RULE_functionArguments = 19;


function OdeContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_ode;
    return this;
}

OdeContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OdeContext.prototype.constructor = OdeContext;

OdeContext.prototype.odeStatement = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(OdeStatementContext);
    } else {
        return this.getTypedRuleContext(OdeStatementContext,i);
    }
};

OdeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitOde(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.OdeContext = OdeContext;

odeGrammarParser.prototype.ode = function() {

    var localctx = new OdeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, odeGrammarParser.RULE_ode);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 43;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << odeGrammarParser.T__0) | (1 << odeGrammarParser.DER) | (1 << odeGrammarParser.SUM) | (1 << odeGrammarParser.MACRO) | (1 << odeGrammarParser.FOR) | (1 << odeGrammarParser.CONSTANT) | (1 << odeGrammarParser.FLOAT) | (1 << odeGrammarParser.INT) | (1 << odeGrammarParser.ID) | (1 << odeGrammarParser.PLUS) | (1 << odeGrammarParser.MINUS) | (1 << odeGrammarParser.LPAREN))) !== 0) || _la===odeGrammarParser.LCRL) {
            this.state = 40;
            this.odeStatement();
            this.state = 45;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function OdeStatementContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_odeStatement;
    return this;
}

OdeStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OdeStatementContext.prototype.constructor = OdeStatementContext;

OdeStatementContext.prototype.equation = function() {
    return this.getTypedRuleContext(EquationContext,0);
};

OdeStatementContext.prototype.initialCondition = function() {
    return this.getTypedRuleContext(InitialConditionContext,0);
};

OdeStatementContext.prototype.constantStatement = function() {
    return this.getTypedRuleContext(ConstantStatementContext,0);
};

OdeStatementContext.prototype.macroStatement = function() {
    return this.getTypedRuleContext(MacroStatementContext,0);
};

OdeStatementContext.prototype.loop = function() {
    return this.getTypedRuleContext(LoopContext,0);
};

OdeStatementContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitOdeStatement(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.OdeStatementContext = OdeStatementContext;

odeGrammarParser.prototype.odeStatement = function() {

    var localctx = new OdeStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, odeGrammarParser.RULE_odeStatement);
    try {
        this.state = 51;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 46;
            this.equation();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 47;
            this.initialCondition();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 48;
            this.constantStatement();
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 49;
            this.macroStatement();
            break;

        case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 50;
            this.loop();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function HybridContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_hybrid;
    return this;
}

HybridContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HybridContext.prototype.constructor = HybridContext;

HybridContext.prototype.statement = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(StatementContext);
    } else {
        return this.getTypedRuleContext(StatementContext,i);
    }
};

HybridContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitHybrid(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.HybridContext = HybridContext;

odeGrammarParser.prototype.hybrid = function() {

    var localctx = new HybridContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, odeGrammarParser.RULE_hybrid);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 56;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << odeGrammarParser.T__0) | (1 << odeGrammarParser.DER) | (1 << odeGrammarParser.TERMINAL) | (1 << odeGrammarParser.SUM) | (1 << odeGrammarParser.MACRO) | (1 << odeGrammarParser.FOR) | (1 << odeGrammarParser.CONSTANT) | (1 << odeGrammarParser.FLOAT) | (1 << odeGrammarParser.INT) | (1 << odeGrammarParser.ID) | (1 << odeGrammarParser.PLUS) | (1 << odeGrammarParser.MINUS) | (1 << odeGrammarParser.LPAREN))) !== 0) || _la===odeGrammarParser.LCRL) {
            this.state = 53;
            this.statement();
            this.state = 58;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function NumberContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_number;
    this.value = null; // Token
    return this;
}

NumberContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NumberContext.prototype.constructor = NumberContext;

NumberContext.prototype.FLOAT = function() {
    return this.getToken(odeGrammarParser.FLOAT, 0);
};

NumberContext.prototype.INT = function() {
    return this.getToken(odeGrammarParser.INT, 0);
};

NumberContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitNumber(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.NumberContext = NumberContext;

odeGrammarParser.prototype.number = function() {

    var localctx = new NumberContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, odeGrammarParser.RULE_number);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 59;
        localctx.value = this._input.LT(1);
        _la = this._input.LA(1);
        if(!(_la===odeGrammarParser.FLOAT || _la===odeGrammarParser.INT)) {
            localctx.value = this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function StatementContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_statement;
    return this;
}

StatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatementContext.prototype.constructor = StatementContext;

StatementContext.prototype.equation = function() {
    return this.getTypedRuleContext(EquationContext,0);
};

StatementContext.prototype.initialCondition = function() {
    return this.getTypedRuleContext(InitialConditionContext,0);
};

StatementContext.prototype.constantStatement = function() {
    return this.getTypedRuleContext(ConstantStatementContext,0);
};

StatementContext.prototype.macroStatement = function() {
    return this.getTypedRuleContext(MacroStatementContext,0);
};

StatementContext.prototype.loop = function() {
    return this.getTypedRuleContext(LoopContext,0);
};

StatementContext.prototype.event = function() {
    return this.getTypedRuleContext(EventContext,0);
};

StatementContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitStatement(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.StatementContext = StatementContext;

odeGrammarParser.prototype.statement = function() {

    var localctx = new StatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, odeGrammarParser.RULE_statement);
    try {
        this.state = 67;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 61;
            this.equation();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 62;
            this.initialCondition();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 63;
            this.constantStatement();
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 64;
            this.macroStatement();
            break;

        case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 65;
            this.loop();
            break;

        case 6:
            this.enterOuterAlt(localctx, 6);
            this.state = 66;
            this.event();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function VarIdentifierContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_varIdentifier;
    this.index = null; // ExpressionContext
    return this;
}

VarIdentifierContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
VarIdentifierContext.prototype.constructor = VarIdentifierContext;

VarIdentifierContext.prototype.ID = function() {
    return this.getToken(odeGrammarParser.ID, 0);
};

VarIdentifierContext.prototype.LSQR = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.LSQR);
    } else {
        return this.getToken(odeGrammarParser.LSQR, i);
    }
};


VarIdentifierContext.prototype.RSQR = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.RSQR);
    } else {
        return this.getToken(odeGrammarParser.RSQR, i);
    }
};


VarIdentifierContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

VarIdentifierContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitVarIdentifier(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.VarIdentifierContext = VarIdentifierContext;

odeGrammarParser.prototype.varIdentifier = function() {

    var localctx = new VarIdentifierContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, odeGrammarParser.RULE_varIdentifier);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 69;
        this.match(odeGrammarParser.ID);
        this.state = 76;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,4,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 70;
                this.match(odeGrammarParser.LSQR);
                this.state = 71;
                localctx.index = this.expression(0);
                this.state = 72;
                this.match(odeGrammarParser.RSQR); 
            }
            this.state = 78;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,4,this._ctx);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function LoopBodyContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_loopBody;
    return this;
}

LoopBodyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LoopBodyContext.prototype.constructor = LoopBodyContext;

LoopBodyContext.prototype.LCRL = function() {
    return this.getToken(odeGrammarParser.LCRL, 0);
};

LoopBodyContext.prototype.RCRL = function() {
    return this.getToken(odeGrammarParser.RCRL, 0);
};

LoopBodyContext.prototype.equation = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(EquationContext);
    } else {
        return this.getTypedRuleContext(EquationContext,i);
    }
};

LoopBodyContext.prototype.initialCondition = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(InitialConditionContext);
    } else {
        return this.getTypedRuleContext(InitialConditionContext,i);
    }
};

LoopBodyContext.prototype.constantStatement = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ConstantStatementContext);
    } else {
        return this.getTypedRuleContext(ConstantStatementContext,i);
    }
};

LoopBodyContext.prototype.loop = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(LoopContext);
    } else {
        return this.getTypedRuleContext(LoopContext,i);
    }
};

LoopBodyContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitLoopBody(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.LoopBodyContext = LoopBodyContext;

odeGrammarParser.prototype.loopBody = function() {

    var localctx = new LoopBodyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, odeGrammarParser.RULE_loopBody);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 79;
        this.match(odeGrammarParser.LCRL);
        this.state = 86;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << odeGrammarParser.T__0) | (1 << odeGrammarParser.DER) | (1 << odeGrammarParser.SUM) | (1 << odeGrammarParser.FOR) | (1 << odeGrammarParser.CONSTANT) | (1 << odeGrammarParser.FLOAT) | (1 << odeGrammarParser.INT) | (1 << odeGrammarParser.ID) | (1 << odeGrammarParser.PLUS) | (1 << odeGrammarParser.MINUS) | (1 << odeGrammarParser.LPAREN))) !== 0) || _la===odeGrammarParser.LCRL) {
            this.state = 84;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
            switch(la_) {
            case 1:
                this.state = 80;
                this.equation();
                break;

            case 2:
                this.state = 81;
                this.initialCondition();
                break;

            case 3:
                this.state = 82;
                this.constantStatement();
                break;

            case 4:
                this.state = 83;
                this.loop();
                break;

            }
            this.state = 88;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 89;
        this.match(odeGrammarParser.RCRL);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function MacroStatementContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_macroStatement;
    this.name = null; // Token
    this.exp = null; // ExpressionContext
    return this;
}

MacroStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
MacroStatementContext.prototype.constructor = MacroStatementContext;

MacroStatementContext.prototype.MACRO = function() {
    return this.getToken(odeGrammarParser.MACRO, 0);
};

MacroStatementContext.prototype.LPAREN = function() {
    return this.getToken(odeGrammarParser.LPAREN, 0);
};

MacroStatementContext.prototype.macroArguments = function() {
    return this.getTypedRuleContext(MacroArgumentsContext,0);
};

MacroStatementContext.prototype.RPAREN = function() {
    return this.getToken(odeGrammarParser.RPAREN, 0);
};

MacroStatementContext.prototype.SEMICOLON = function() {
    return this.getToken(odeGrammarParser.SEMICOLON, 0);
};

MacroStatementContext.prototype.ID = function() {
    return this.getToken(odeGrammarParser.ID, 0);
};

MacroStatementContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

MacroStatementContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitMacroStatement(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.MacroStatementContext = MacroStatementContext;

odeGrammarParser.prototype.macroStatement = function() {

    var localctx = new MacroStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, odeGrammarParser.RULE_macroStatement);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 91;
        this.match(odeGrammarParser.MACRO);
        this.state = 92;
        localctx.name = this.match(odeGrammarParser.ID);
        this.state = 93;
        this.match(odeGrammarParser.LPAREN);
        this.state = 94;
        this.macroArguments();
        this.state = 95;
        this.match(odeGrammarParser.RPAREN);
        this.state = 96;
        localctx.exp = this.expression(0);
        this.state = 97;
        this.match(odeGrammarParser.SEMICOLON);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function MacroArgumentsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_macroArguments;
    return this;
}

MacroArgumentsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
MacroArgumentsContext.prototype.constructor = MacroArgumentsContext;

MacroArgumentsContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.ID);
    } else {
        return this.getToken(odeGrammarParser.ID, i);
    }
};


MacroArgumentsContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.COMMA);
    } else {
        return this.getToken(odeGrammarParser.COMMA, i);
    }
};


MacroArgumentsContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitMacroArguments(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.MacroArgumentsContext = MacroArgumentsContext;

odeGrammarParser.prototype.macroArguments = function() {

    var localctx = new MacroArgumentsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, odeGrammarParser.RULE_macroArguments);
    var _la = 0; // Token type
    try {
        this.state = 108;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case odeGrammarParser.ID:
            this.enterOuterAlt(localctx, 1);
            this.state = 99;
            this.match(odeGrammarParser.ID);
            this.state = 104;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===odeGrammarParser.COMMA) {
                this.state = 100;
                this.match(odeGrammarParser.COMMA);
                this.state = 101;
                this.match(odeGrammarParser.ID);
                this.state = 106;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            break;
        case odeGrammarParser.RPAREN:
            this.enterOuterAlt(localctx, 2);

            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function LoopContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_loop;
    this.index = null; // Token
    this.lbound = null; // Token
    this.rbound = null; // Token
    return this;
}

LoopContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LoopContext.prototype.constructor = LoopContext;

LoopContext.prototype.FOR = function() {
    return this.getToken(odeGrammarParser.FOR, 0);
};

LoopContext.prototype.LPAREN = function() {
    return this.getToken(odeGrammarParser.LPAREN, 0);
};

LoopContext.prototype.IN = function() {
    return this.getToken(odeGrammarParser.IN, 0);
};

LoopContext.prototype.LSQR = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.LSQR);
    } else {
        return this.getToken(odeGrammarParser.LSQR, i);
    }
};


LoopContext.prototype.COLON = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.COLON);
    } else {
        return this.getToken(odeGrammarParser.COLON, i);
    }
};


LoopContext.prototype.RSQR = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.RSQR);
    } else {
        return this.getToken(odeGrammarParser.RSQR, i);
    }
};


LoopContext.prototype.loopBody = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(LoopBodyContext);
    } else {
        return this.getTypedRuleContext(LoopBodyContext,i);
    }
};

LoopContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.COMMA);
    } else {
        return this.getToken(odeGrammarParser.COMMA, i);
    }
};


LoopContext.prototype.RPAREN = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.RPAREN);
    } else {
        return this.getToken(odeGrammarParser.RPAREN, i);
    }
};


LoopContext.prototype.ID = function() {
    return this.getToken(odeGrammarParser.ID, 0);
};

LoopContext.prototype.INT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.INT);
    } else {
        return this.getToken(odeGrammarParser.INT, i);
    }
};


LoopContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitLoop(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.LoopContext = LoopContext;

odeGrammarParser.prototype.loop = function() {

    var localctx = new LoopContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, odeGrammarParser.RULE_loop);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 110;
        this.match(odeGrammarParser.FOR);
        this.state = 111;
        this.match(odeGrammarParser.LPAREN);
        this.state = 112;
        localctx.index = this.match(odeGrammarParser.ID);
        this.state = 113;
        this.match(odeGrammarParser.IN);
        this.state = 114;
        this.match(odeGrammarParser.LSQR);
        this.state = 115;
        localctx.lbound = this.match(odeGrammarParser.INT);
        this.state = 116;
        this.match(odeGrammarParser.COLON);
        this.state = 117;
        localctx.rbound = this.match(odeGrammarParser.INT);
        this.state = 118;
        this.match(odeGrammarParser.RSQR);
        this.state = 126;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===odeGrammarParser.COMMA) {
            this.state = 119;
            this.match(odeGrammarParser.COMMA);
            this.state = 120;
            this.match(odeGrammarParser.LSQR);
            this.state = 121;
            localctx.lbound = this.match(odeGrammarParser.INT);
            this.state = 122;
            this.match(odeGrammarParser.COLON);
            this.state = 123;
            localctx.rbound = this.match(odeGrammarParser.INT);
            this.state = 128;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 129;
        this.loopBody();
        this.state = 130;
        this.match(odeGrammarParser.COMMA);
        this.state = 131;
        this.loopBody();
        this.state = 132;
        _la = this._input.LA(1);
        if(!(_la===odeGrammarParser.RPAREN || _la===odeGrammarParser.RSQR)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
        this.state = 133;
        this.match(odeGrammarParser.RPAREN);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function EquationContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_equation;
    this.label = null; // Token
    this.left = null; // ExpressionContext
    this.right = null; // ExpressionContext
    return this;
}

EquationContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EquationContext.prototype.constructor = EquationContext;

EquationContext.prototype.E = function() {
    return this.getToken(odeGrammarParser.E, 0);
};

EquationContext.prototype.SEMICOLON = function() {
    return this.getToken(odeGrammarParser.SEMICOLON, 0);
};

EquationContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

EquationContext.prototype.COLON = function() {
    return this.getToken(odeGrammarParser.COLON, 0);
};

EquationContext.prototype.ID = function() {
    return this.getToken(odeGrammarParser.ID, 0);
};

EquationContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitEquation(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.EquationContext = EquationContext;

odeGrammarParser.prototype.equation = function() {

    var localctx = new EquationContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, odeGrammarParser.RULE_equation);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 137;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
        if(la_===1) {
            this.state = 135;
            localctx.label = this.match(odeGrammarParser.ID);
            this.state = 136;
            this.match(odeGrammarParser.COLON);

        }
        this.state = 139;
        localctx.left = this.expression(0);
        this.state = 140;
        this.match(odeGrammarParser.E);
        this.state = 141;
        localctx.right = this.expression(0);
        this.state = 142;
        this.match(odeGrammarParser.SEMICOLON);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function SetterContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_setter;
    this.variable = null; // VarIdentifierContext
    this.right = null; // ExpressionContext
    return this;
}

SetterContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SetterContext.prototype.constructor = SetterContext;

SetterContext.prototype.SET = function() {
    return this.getToken(odeGrammarParser.SET, 0);
};

SetterContext.prototype.E = function() {
    return this.getToken(odeGrammarParser.E, 0);
};

SetterContext.prototype.varIdentifier = function() {
    return this.getTypedRuleContext(VarIdentifierContext,0);
};

SetterContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

SetterContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitSetter(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.SetterContext = SetterContext;

odeGrammarParser.prototype.setter = function() {

    var localctx = new SetterContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, odeGrammarParser.RULE_setter);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 144;
        this.match(odeGrammarParser.SET);
        this.state = 145;
        localctx.variable = this.varIdentifier();
        this.state = 146;
        this.match(odeGrammarParser.E);
        this.state = 147;
        localctx.right = this.expression(0);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function InitialConditionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_initialCondition;
    return this;
}

InitialConditionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
InitialConditionContext.prototype.constructor = InitialConditionContext;


 
InitialConditionContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function DifferentialConditionContext(parser, ctx) {
	InitialConditionContext.call(this, parser);
    this.variable = null; // VarIdentifierContext;
    this.exp = null; // ExpressionContext;
    InitialConditionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

DifferentialConditionContext.prototype = Object.create(InitialConditionContext.prototype);
DifferentialConditionContext.prototype.constructor = DifferentialConditionContext;

odeGrammarParser.DifferentialConditionContext = DifferentialConditionContext;

DifferentialConditionContext.prototype.T0 = function() {
    return this.getToken(odeGrammarParser.T0, 0);
};

DifferentialConditionContext.prototype.E = function() {
    return this.getToken(odeGrammarParser.E, 0);
};

DifferentialConditionContext.prototype.SEMICOLON = function() {
    return this.getToken(odeGrammarParser.SEMICOLON, 0);
};

DifferentialConditionContext.prototype.varIdentifier = function() {
    return this.getTypedRuleContext(VarIdentifierContext,0);
};

DifferentialConditionContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};
DifferentialConditionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitDifferentialCondition(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function AlgebraicConditionContext(parser, ctx) {
	InitialConditionContext.call(this, parser);
    this.variable = null; // VarIdentifierContext;
    this.exp = null; // ExpressionContext;
    InitialConditionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

AlgebraicConditionContext.prototype = Object.create(InitialConditionContext.prototype);
AlgebraicConditionContext.prototype.constructor = AlgebraicConditionContext;

odeGrammarParser.AlgebraicConditionContext = AlgebraicConditionContext;

AlgebraicConditionContext.prototype.ZEROSQR = function() {
    return this.getToken(odeGrammarParser.ZEROSQR, 0);
};

AlgebraicConditionContext.prototype.E = function() {
    return this.getToken(odeGrammarParser.E, 0);
};

AlgebraicConditionContext.prototype.SEMICOLON = function() {
    return this.getToken(odeGrammarParser.SEMICOLON, 0);
};

AlgebraicConditionContext.prototype.varIdentifier = function() {
    return this.getTypedRuleContext(VarIdentifierContext,0);
};

AlgebraicConditionContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};
AlgebraicConditionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitAlgebraicCondition(this);
    } else {
        return visitor.visitChildren(this);
    }
};



odeGrammarParser.InitialConditionContext = InitialConditionContext;

odeGrammarParser.prototype.initialCondition = function() {

    var localctx = new InitialConditionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, odeGrammarParser.RULE_initialCondition);
    try {
        this.state = 161;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
        switch(la_) {
        case 1:
            localctx = new AlgebraicConditionContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 149;
            localctx.variable = this.varIdentifier();
            this.state = 150;
            this.match(odeGrammarParser.ZEROSQR);
            this.state = 151;
            this.match(odeGrammarParser.E);
            this.state = 152;
            localctx.exp = this.expression(0);
            this.state = 153;
            this.match(odeGrammarParser.SEMICOLON);
            break;

        case 2:
            localctx = new DifferentialConditionContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 155;
            localctx.variable = this.varIdentifier();
            this.state = 156;
            this.match(odeGrammarParser.T0);
            this.state = 157;
            this.match(odeGrammarParser.E);
            this.state = 158;
            localctx.exp = this.expression(0);
            this.state = 159;
            this.match(odeGrammarParser.SEMICOLON);
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ConstantStatementContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_constantStatement;
    this.constant = null; // VarIdentifierContext
    this.exp = null; // ExpressionContext
    return this;
}

ConstantStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ConstantStatementContext.prototype.constructor = ConstantStatementContext;

ConstantStatementContext.prototype.CONSTANT = function() {
    return this.getToken(odeGrammarParser.CONSTANT, 0);
};

ConstantStatementContext.prototype.E = function() {
    return this.getToken(odeGrammarParser.E, 0);
};

ConstantStatementContext.prototype.SEMICOLON = function() {
    return this.getToken(odeGrammarParser.SEMICOLON, 0);
};

ConstantStatementContext.prototype.varIdentifier = function() {
    return this.getTypedRuleContext(VarIdentifierContext,0);
};

ConstantStatementContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

ConstantStatementContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitConstantStatement(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.ConstantStatementContext = ConstantStatementContext;

odeGrammarParser.prototype.constantStatement = function() {

    var localctx = new ConstantStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, odeGrammarParser.RULE_constantStatement);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 163;
        this.match(odeGrammarParser.CONSTANT);
        this.state = 164;
        localctx.constant = this.varIdentifier();
        this.state = 165;
        this.match(odeGrammarParser.E);
        this.state = 166;
        localctx.exp = this.expression(0);
        this.state = 167;
        this.match(odeGrammarParser.SEMICOLON);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function EventContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_event;
    this.name = null; // Token
    this.transition = null; // StateTransitionContext
    return this;
}

EventContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EventContext.prototype.constructor = EventContext;

EventContext.prototype.LCRL = function() {
    return this.getToken(odeGrammarParser.LCRL, 0);
};

EventContext.prototype.RCRL = function() {
    return this.getToken(odeGrammarParser.RCRL, 0);
};

EventContext.prototype.FROM = function() {
    return this.getToken(odeGrammarParser.FROM, 0);
};

EventContext.prototype.ID = function() {
    return this.getToken(odeGrammarParser.ID, 0);
};

EventContext.prototype.stateTransition = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(StateTransitionContext);
    } else {
        return this.getTypedRuleContext(StateTransitionContext,i);
    }
};

EventContext.prototype.TERMINAL = function() {
    return this.getToken(odeGrammarParser.TERMINAL, 0);
};

EventContext.prototype.equation = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(EquationContext);
    } else {
        return this.getTypedRuleContext(EquationContext,i);
    }
};

EventContext.prototype.setter = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(SetterContext);
    } else {
        return this.getTypedRuleContext(SetterContext,i);
    }
};

EventContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.COMMA);
    } else {
        return this.getToken(odeGrammarParser.COMMA, i);
    }
};


EventContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitEvent(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.EventContext = EventContext;

odeGrammarParser.prototype.event = function() {

    var localctx = new EventContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, odeGrammarParser.RULE_event);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 170;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===odeGrammarParser.TERMINAL) {
            this.state = 169;
            this.match(odeGrammarParser.TERMINAL);
        }

        this.state = 172;
        localctx.name = this.match(odeGrammarParser.ID);
        this.state = 173;
        this.match(odeGrammarParser.LCRL);
        this.state = 178;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << odeGrammarParser.T__0) | (1 << odeGrammarParser.SET) | (1 << odeGrammarParser.DER) | (1 << odeGrammarParser.SUM) | (1 << odeGrammarParser.FLOAT) | (1 << odeGrammarParser.INT) | (1 << odeGrammarParser.ID) | (1 << odeGrammarParser.PLUS) | (1 << odeGrammarParser.MINUS) | (1 << odeGrammarParser.LPAREN))) !== 0) || _la===odeGrammarParser.LCRL) {
            this.state = 176;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case odeGrammarParser.T__0:
            case odeGrammarParser.DER:
            case odeGrammarParser.SUM:
            case odeGrammarParser.FLOAT:
            case odeGrammarParser.INT:
            case odeGrammarParser.ID:
            case odeGrammarParser.PLUS:
            case odeGrammarParser.MINUS:
            case odeGrammarParser.LPAREN:
            case odeGrammarParser.LCRL:
                this.state = 174;
                this.equation();
                break;
            case odeGrammarParser.SET:
                this.state = 175;
                this.setter();
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 180;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 181;
        this.match(odeGrammarParser.RCRL);
        this.state = 182;
        this.match(odeGrammarParser.FROM);
        this.state = 183;
        localctx.transition = this.stateTransition();
        this.state = 188;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===odeGrammarParser.COMMA) {
            this.state = 184;
            this.match(odeGrammarParser.COMMA);
            this.state = 185;
            localctx.transition = this.stateTransition();
            this.state = 190;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function StateTransitionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_stateTransition;
    this.prevState = null; // Token
    this.condition = null; // BoolExpressionContext
    return this;
}

StateTransitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StateTransitionContext.prototype.constructor = StateTransitionContext;

StateTransitionContext.prototype.ON = function() {
    return this.getToken(odeGrammarParser.ON, 0);
};

StateTransitionContext.prototype.LPAREN = function() {
    return this.getToken(odeGrammarParser.LPAREN, 0);
};

StateTransitionContext.prototype.RPAREN = function() {
    return this.getToken(odeGrammarParser.RPAREN, 0);
};

StateTransitionContext.prototype.ID = function() {
    return this.getToken(odeGrammarParser.ID, 0);
};

StateTransitionContext.prototype.boolExpression = function() {
    return this.getTypedRuleContext(BoolExpressionContext,0);
};

StateTransitionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitStateTransition(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.StateTransitionContext = StateTransitionContext;

odeGrammarParser.prototype.stateTransition = function() {

    var localctx = new StateTransitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, odeGrammarParser.RULE_stateTransition);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 191;
        localctx.prevState = this.match(odeGrammarParser.ID);
        this.state = 192;
        this.match(odeGrammarParser.ON);
        this.state = 193;
        this.match(odeGrammarParser.LPAREN);
        this.state = 194;
        localctx.condition = this.boolExpression(0);
        this.state = 195;
        this.match(odeGrammarParser.RPAREN);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function UnaryOperatorContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_unaryOperator;
    this.op = null; // Token
    return this;
}

UnaryOperatorContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
UnaryOperatorContext.prototype.constructor = UnaryOperatorContext;

UnaryOperatorContext.prototype.PLUS = function() {
    return this.getToken(odeGrammarParser.PLUS, 0);
};

UnaryOperatorContext.prototype.MINUS = function() {
    return this.getToken(odeGrammarParser.MINUS, 0);
};

UnaryOperatorContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitUnaryOperator(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.UnaryOperatorContext = UnaryOperatorContext;

odeGrammarParser.prototype.unaryOperator = function() {

    var localctx = new UnaryOperatorContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, odeGrammarParser.RULE_unaryOperator);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 197;
        localctx.op = this._input.LT(1);
        _la = this._input.LA(1);
        if(!(_la===odeGrammarParser.PLUS || _la===odeGrammarParser.MINUS)) {
            localctx.op = this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function BoolExpressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_boolExpression;
    return this;
}

BoolExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
BoolExpressionContext.prototype.constructor = BoolExpressionContext;


 
BoolExpressionContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function BoolBinaryOperatorContext(parser, ctx) {
	BoolExpressionContext.call(this, parser);
    this.left = null; // BoolExpressionContext;
    this.op = null; // Token;
    this.leftexp = null; // ExpressionContext;
    this.rightexp = null; // ExpressionContext;
    this.right = null; // BoolExpressionContext;
    BoolExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

BoolBinaryOperatorContext.prototype = Object.create(BoolExpressionContext.prototype);
BoolBinaryOperatorContext.prototype.constructor = BoolBinaryOperatorContext;

odeGrammarParser.BoolBinaryOperatorContext = BoolBinaryOperatorContext;

BoolBinaryOperatorContext.prototype.boolExpression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(BoolExpressionContext);
    } else {
        return this.getTypedRuleContext(BoolExpressionContext,i);
    }
};

BoolBinaryOperatorContext.prototype.NOT = function() {
    return this.getToken(odeGrammarParser.NOT, 0);
};

BoolBinaryOperatorContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

BoolBinaryOperatorContext.prototype.L = function() {
    return this.getToken(odeGrammarParser.L, 0);
};

BoolBinaryOperatorContext.prototype.LE = function() {
    return this.getToken(odeGrammarParser.LE, 0);
};

BoolBinaryOperatorContext.prototype.G = function() {
    return this.getToken(odeGrammarParser.G, 0);
};

BoolBinaryOperatorContext.prototype.GE = function() {
    return this.getToken(odeGrammarParser.GE, 0);
};

BoolBinaryOperatorContext.prototype.E = function() {
    return this.getToken(odeGrammarParser.E, 0);
};

BoolBinaryOperatorContext.prototype.NE = function() {
    return this.getToken(odeGrammarParser.NE, 0);
};

BoolBinaryOperatorContext.prototype.AND = function() {
    return this.getToken(odeGrammarParser.AND, 0);
};

BoolBinaryOperatorContext.prototype.OR = function() {
    return this.getToken(odeGrammarParser.OR, 0);
};
BoolBinaryOperatorContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitBoolBinaryOperator(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function BracketBoolExpressionContext(parser, ctx) {
	BoolExpressionContext.call(this, parser);
    BoolExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

BracketBoolExpressionContext.prototype = Object.create(BoolExpressionContext.prototype);
BracketBoolExpressionContext.prototype.constructor = BracketBoolExpressionContext;

odeGrammarParser.BracketBoolExpressionContext = BracketBoolExpressionContext;

BracketBoolExpressionContext.prototype.LPAREN = function() {
    return this.getToken(odeGrammarParser.LPAREN, 0);
};

BracketBoolExpressionContext.prototype.boolExpression = function() {
    return this.getTypedRuleContext(BoolExpressionContext,0);
};

BracketBoolExpressionContext.prototype.RPAREN = function() {
    return this.getToken(odeGrammarParser.RPAREN, 0);
};
BracketBoolExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitBracketBoolExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};



odeGrammarParser.prototype.boolExpression = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new BoolExpressionContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 34;
    this.enterRecursionRule(localctx, 34, odeGrammarParser.RULE_boolExpression, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 214;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,16,this._ctx);
        switch(la_) {
        case 1:
            localctx = new BracketBoolExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 200;
            this.match(odeGrammarParser.LPAREN);
            this.state = 201;
            this.boolExpression(0);
            this.state = 202;
            this.match(odeGrammarParser.RPAREN);
            break;

        case 2:
            localctx = new BoolBinaryOperatorContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 204;
            localctx.op = this.match(odeGrammarParser.NOT);
            this.state = 205;
            this.boolExpression(5);
            break;

        case 3:
            localctx = new BoolBinaryOperatorContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 206;
            localctx.leftexp = this.expression(0);
            this.state = 207;
            localctx.op = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(((((_la - 29)) & ~0x1f) == 0 && ((1 << (_la - 29)) & ((1 << (odeGrammarParser.L - 29)) | (1 << (odeGrammarParser.G - 29)) | (1 << (odeGrammarParser.LE - 29)) | (1 << (odeGrammarParser.GE - 29)))) !== 0))) {
                localctx.op = this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 208;
            localctx.rightexp = this.expression(0);
            break;

        case 4:
            localctx = new BoolBinaryOperatorContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 210;
            localctx.leftexp = this.expression(0);
            this.state = 211;
            localctx.op = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(_la===odeGrammarParser.NE || _la===odeGrammarParser.E)) {
                localctx.op = this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 212;
            localctx.rightexp = this.expression(0);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 224;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,18,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 222;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new BoolBinaryOperatorContext(this, new BoolExpressionContext(this, _parentctx, _parentState));
                    localctx.left = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, odeGrammarParser.RULE_boolExpression);
                    this.state = 216;
                    if (!( this.precpred(this._ctx, 2))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                    }
                    this.state = 217;
                    localctx.op = this.match(odeGrammarParser.AND);
                    this.state = 218;
                    localctx.right = this.boolExpression(3);
                    break;

                case 2:
                    localctx = new BoolBinaryOperatorContext(this, new BoolExpressionContext(this, _parentctx, _parentState));
                    localctx.left = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, odeGrammarParser.RULE_boolExpression);
                    this.state = 219;
                    if (!( this.precpred(this._ctx, 1))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                    }
                    this.state = 220;
                    localctx.op = this.match(odeGrammarParser.OR);
                    this.state = 221;
                    localctx.right = this.boolExpression(2);
                    break;

                } 
            }
            this.state = 226;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,18,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};


function ExpressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_expression;
    return this;
}

ExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionContext.prototype.constructor = ExpressionContext;


 
ExpressionContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function BracketExpressionContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

BracketExpressionContext.prototype = Object.create(ExpressionContext.prototype);
BracketExpressionContext.prototype.constructor = BracketExpressionContext;

odeGrammarParser.BracketExpressionContext = BracketExpressionContext;

BracketExpressionContext.prototype.LPAREN = function() {
    return this.getToken(odeGrammarParser.LPAREN, 0);
};

BracketExpressionContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

BracketExpressionContext.prototype.RPAREN = function() {
    return this.getToken(odeGrammarParser.RPAREN, 0);
};
BracketExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitBracketExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function DerivativeExpressionContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    this.id = null; // VarIdentifierContext;
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

DerivativeExpressionContext.prototype = Object.create(ExpressionContext.prototype);
DerivativeExpressionContext.prototype.constructor = DerivativeExpressionContext;

odeGrammarParser.DerivativeExpressionContext = DerivativeExpressionContext;

DerivativeExpressionContext.prototype.APOSTROPHE = function() {
    return this.getToken(odeGrammarParser.APOSTROPHE, 0);
};

DerivativeExpressionContext.prototype.varIdentifier = function() {
    return this.getTypedRuleContext(VarIdentifierContext,0);
};
DerivativeExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitDerivativeExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function MacroExpressionContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    this.id = null; // Token;
    this.exp = null; // ExpressionContext;
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

MacroExpressionContext.prototype = Object.create(ExpressionContext.prototype);
MacroExpressionContext.prototype.constructor = MacroExpressionContext;

odeGrammarParser.MacroExpressionContext = MacroExpressionContext;

MacroExpressionContext.prototype.LPAREN = function() {
    return this.getToken(odeGrammarParser.LPAREN, 0);
};

MacroExpressionContext.prototype.RPAREN = function() {
    return this.getToken(odeGrammarParser.RPAREN, 0);
};

MacroExpressionContext.prototype.ID = function() {
    return this.getToken(odeGrammarParser.ID, 0);
};

MacroExpressionContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};
MacroExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitMacroExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function BinaryOperatorExpressionContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    this.left = null; // ExpressionContext;
    this.op = null; // Token;
    this.right = null; // ExpressionContext;
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

BinaryOperatorExpressionContext.prototype = Object.create(ExpressionContext.prototype);
BinaryOperatorExpressionContext.prototype.constructor = BinaryOperatorExpressionContext;

odeGrammarParser.BinaryOperatorExpressionContext = BinaryOperatorExpressionContext;

BinaryOperatorExpressionContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

BinaryOperatorExpressionContext.prototype.CARET = function() {
    return this.getToken(odeGrammarParser.CARET, 0);
};

BinaryOperatorExpressionContext.prototype.DIVISION = function() {
    return this.getToken(odeGrammarParser.DIVISION, 0);
};

BinaryOperatorExpressionContext.prototype.ASTERISK = function() {
    return this.getToken(odeGrammarParser.ASTERISK, 0);
};

BinaryOperatorExpressionContext.prototype.PLUS = function() {
    return this.getToken(odeGrammarParser.PLUS, 0);
};

BinaryOperatorExpressionContext.prototype.MINUS = function() {
    return this.getToken(odeGrammarParser.MINUS, 0);
};
BinaryOperatorExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitBinaryOperatorExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function FunctionExpressionContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    this.func = null; // Token;
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FunctionExpressionContext.prototype = Object.create(ExpressionContext.prototype);
FunctionExpressionContext.prototype.constructor = FunctionExpressionContext;

odeGrammarParser.FunctionExpressionContext = FunctionExpressionContext;

FunctionExpressionContext.prototype.LPAREN = function() {
    return this.getToken(odeGrammarParser.LPAREN, 0);
};

FunctionExpressionContext.prototype.functionArguments = function() {
    return this.getTypedRuleContext(FunctionArgumentsContext,0);
};

FunctionExpressionContext.prototype.RPAREN = function() {
    return this.getToken(odeGrammarParser.RPAREN, 0);
};

FunctionExpressionContext.prototype.ID = function() {
    return this.getToken(odeGrammarParser.ID, 0);
};
FunctionExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitFunctionExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function UnaryOperatorExpressionContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    this.op = null; // UnaryOperatorContext;
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

UnaryOperatorExpressionContext.prototype = Object.create(ExpressionContext.prototype);
UnaryOperatorExpressionContext.prototype.constructor = UnaryOperatorExpressionContext;

odeGrammarParser.UnaryOperatorExpressionContext = UnaryOperatorExpressionContext;

UnaryOperatorExpressionContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

UnaryOperatorExpressionContext.prototype.unaryOperator = function() {
    return this.getTypedRuleContext(UnaryOperatorContext,0);
};
UnaryOperatorExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitUnaryOperatorExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ConstantExpressionContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    this.value = null; // NumberContext;
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ConstantExpressionContext.prototype = Object.create(ExpressionContext.prototype);
ConstantExpressionContext.prototype.constructor = ConstantExpressionContext;

odeGrammarParser.ConstantExpressionContext = ConstantExpressionContext;

ConstantExpressionContext.prototype.number = function() {
    return this.getTypedRuleContext(NumberContext,0);
};
ConstantExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitConstantExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function SummationExpressionContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    this.index = null; // Token;
    this.lbound = null; // ExpressionContext;
    this.rbound = null; // ExpressionContext;
    this.summationExp = null; // ExpressionContext;
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SummationExpressionContext.prototype = Object.create(ExpressionContext.prototype);
SummationExpressionContext.prototype.constructor = SummationExpressionContext;

odeGrammarParser.SummationExpressionContext = SummationExpressionContext;

SummationExpressionContext.prototype.SUM = function() {
    return this.getToken(odeGrammarParser.SUM, 0);
};

SummationExpressionContext.prototype.LSQR = function() {
    return this.getToken(odeGrammarParser.LSQR, 0);
};

SummationExpressionContext.prototype.E = function() {
    return this.getToken(odeGrammarParser.E, 0);
};

SummationExpressionContext.prototype.COMMA = function() {
    return this.getToken(odeGrammarParser.COMMA, 0);
};

SummationExpressionContext.prototype.RSQR = function() {
    return this.getToken(odeGrammarParser.RSQR, 0);
};

SummationExpressionContext.prototype.LCRL = function() {
    return this.getToken(odeGrammarParser.LCRL, 0);
};

SummationExpressionContext.prototype.RCRL = function() {
    return this.getToken(odeGrammarParser.RCRL, 0);
};

SummationExpressionContext.prototype.ID = function() {
    return this.getToken(odeGrammarParser.ID, 0);
};

SummationExpressionContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};
SummationExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitSummationExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function FunctionDerivativeContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    this.id = null; // VarIdentifierContext;
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FunctionDerivativeContext.prototype = Object.create(ExpressionContext.prototype);
FunctionDerivativeContext.prototype.constructor = FunctionDerivativeContext;

odeGrammarParser.FunctionDerivativeContext = FunctionDerivativeContext;

FunctionDerivativeContext.prototype.DER = function() {
    return this.getToken(odeGrammarParser.DER, 0);
};

FunctionDerivativeContext.prototype.LPAREN = function() {
    return this.getToken(odeGrammarParser.LPAREN, 0);
};

FunctionDerivativeContext.prototype.RPAREN = function() {
    return this.getToken(odeGrammarParser.RPAREN, 0);
};

FunctionDerivativeContext.prototype.varIdentifier = function() {
    return this.getTypedRuleContext(VarIdentifierContext,0);
};
FunctionDerivativeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitFunctionDerivative(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function VariableExpressionContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    this.id = null; // VarIdentifierContext;
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

VariableExpressionContext.prototype = Object.create(ExpressionContext.prototype);
VariableExpressionContext.prototype.constructor = VariableExpressionContext;

odeGrammarParser.VariableExpressionContext = VariableExpressionContext;

VariableExpressionContext.prototype.varIdentifier = function() {
    return this.getTypedRuleContext(VarIdentifierContext,0);
};
VariableExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitVariableExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function TernaryOperatorExpressionContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    this.condition = null; // BoolExpressionContext;
    this.first = null; // ExpressionContext;
    this.second = null; // ExpressionContext;
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

TernaryOperatorExpressionContext.prototype = Object.create(ExpressionContext.prototype);
TernaryOperatorExpressionContext.prototype.constructor = TernaryOperatorExpressionContext;

odeGrammarParser.TernaryOperatorExpressionContext = TernaryOperatorExpressionContext;

TernaryOperatorExpressionContext.prototype.LCRL = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.LCRL);
    } else {
        return this.getToken(odeGrammarParser.LCRL, i);
    }
};


TernaryOperatorExpressionContext.prototype.RCRL = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.RCRL);
    } else {
        return this.getToken(odeGrammarParser.RCRL, i);
    }
};


TernaryOperatorExpressionContext.prototype.QUESTIONMARK = function() {
    return this.getToken(odeGrammarParser.QUESTIONMARK, 0);
};

TernaryOperatorExpressionContext.prototype.COLON = function() {
    return this.getToken(odeGrammarParser.COLON, 0);
};

TernaryOperatorExpressionContext.prototype.boolExpression = function() {
    return this.getTypedRuleContext(BoolExpressionContext,0);
};

TernaryOperatorExpressionContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};
TernaryOperatorExpressionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitTernaryOperatorExpression(this);
    } else {
        return visitor.visitChildren(this);
    }
};



odeGrammarParser.prototype.expression = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new ExpressionContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 36;
    this.enterRecursionRule(localctx, 36, odeGrammarParser.RULE_expression, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 284;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
        switch(la_) {
        case 1:
            localctx = new BracketExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 228;
            this.match(odeGrammarParser.LPAREN);
            this.state = 229;
            this.expression(0);
            this.state = 230;
            this.match(odeGrammarParser.RPAREN);
            break;

        case 2:
            localctx = new FunctionDerivativeContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 232;
            this.match(odeGrammarParser.DER);
            this.state = 233;
            this.match(odeGrammarParser.LPAREN);
            this.state = 234;
            localctx.id = this.varIdentifier();
            this.state = 235;
            this.match(odeGrammarParser.RPAREN);
            break;

        case 3:
            localctx = new FunctionExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 237;
            localctx.func = this.match(odeGrammarParser.ID);
            this.state = 238;
            this.match(odeGrammarParser.LPAREN);
            this.state = 239;
            this.functionArguments();
            this.state = 240;
            this.match(odeGrammarParser.RPAREN);
            break;

        case 4:
            localctx = new UnaryOperatorExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 242;
            localctx.op = this.unaryOperator();
            this.state = 243;
            this.expression(9);
            break;

        case 5:
            localctx = new DerivativeExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 245;
            localctx.id = this.varIdentifier();
            this.state = 246;
            this.match(odeGrammarParser.APOSTROPHE);
            break;

        case 6:
            localctx = new VariableExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 248;
            localctx.id = this.varIdentifier();
            break;

        case 7:
            localctx = new ConstantExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 249;
            localctx.value = this.number();
            break;

        case 8:
            localctx = new MacroExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 250;
            this.match(odeGrammarParser.T__0);
            this.state = 251;
            localctx.id = this.match(odeGrammarParser.ID);
            this.state = 252;
            this.match(odeGrammarParser.LPAREN);
            this.state = 256;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << odeGrammarParser.T__0) | (1 << odeGrammarParser.DER) | (1 << odeGrammarParser.SUM) | (1 << odeGrammarParser.FLOAT) | (1 << odeGrammarParser.INT) | (1 << odeGrammarParser.ID) | (1 << odeGrammarParser.PLUS) | (1 << odeGrammarParser.MINUS) | (1 << odeGrammarParser.LPAREN))) !== 0) || _la===odeGrammarParser.LCRL) {
                this.state = 253;
                localctx.exp = this.expression(0);
                this.state = 258;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 259;
            this.match(odeGrammarParser.RPAREN);
            break;

        case 9:
            localctx = new SummationExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 260;
            this.match(odeGrammarParser.SUM);
            this.state = 261;
            this.match(odeGrammarParser.LSQR);
            this.state = 262;
            localctx.index = this.match(odeGrammarParser.ID);
            this.state = 263;
            this.match(odeGrammarParser.E);
            this.state = 264;
            localctx.lbound = this.expression(0);
            this.state = 265;
            this.match(odeGrammarParser.COMMA);
            this.state = 266;
            localctx.rbound = this.expression(0);
            this.state = 267;
            this.match(odeGrammarParser.RSQR);
            this.state = 268;
            this.match(odeGrammarParser.LCRL);
            this.state = 269;
            localctx.summationExp = this.expression(0);
            this.state = 270;
            this.match(odeGrammarParser.RCRL);
            break;

        case 10:
            localctx = new TernaryOperatorExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 272;
            this.match(odeGrammarParser.LCRL);
            this.state = 273;
            localctx.condition = this.boolExpression(0);
            this.state = 274;
            this.match(odeGrammarParser.RCRL);
            this.state = 275;
            this.match(odeGrammarParser.QUESTIONMARK);
            this.state = 276;
            this.match(odeGrammarParser.LCRL);
            this.state = 277;
            localctx.first = this.expression(0);
            this.state = 278;
            this.match(odeGrammarParser.RCRL);
            this.state = 279;
            this.match(odeGrammarParser.COLON);
            this.state = 280;
            this.match(odeGrammarParser.LCRL);
            this.state = 281;
            localctx.second = this.expression(0);
            this.state = 282;
            this.match(odeGrammarParser.RCRL);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 297;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,22,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 295;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,21,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new BinaryOperatorExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    localctx.left = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, odeGrammarParser.RULE_expression);
                    this.state = 286;
                    if (!( this.precpred(this._ctx, 10))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
                    }
                    this.state = 287;
                    localctx.op = this.match(odeGrammarParser.CARET);
                    this.state = 288;
                    localctx.right = this.expression(11);
                    break;

                case 2:
                    localctx = new BinaryOperatorExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    localctx.left = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, odeGrammarParser.RULE_expression);
                    this.state = 289;
                    if (!( this.precpred(this._ctx, 8))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
                    }
                    this.state = 290;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===odeGrammarParser.ASTERISK || _la===odeGrammarParser.DIVISION)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 291;
                    localctx.right = this.expression(9);
                    break;

                case 3:
                    localctx = new BinaryOperatorExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    localctx.left = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, odeGrammarParser.RULE_expression);
                    this.state = 292;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 293;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===odeGrammarParser.PLUS || _la===odeGrammarParser.MINUS)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 294;
                    localctx.right = this.expression(8);
                    break;

                } 
            }
            this.state = 299;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,22,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};


function FunctionArgumentsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_functionArguments;
    return this;
}

FunctionArgumentsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FunctionArgumentsContext.prototype.constructor = FunctionArgumentsContext;

FunctionArgumentsContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

FunctionArgumentsContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.COMMA);
    } else {
        return this.getToken(odeGrammarParser.COMMA, i);
    }
};


FunctionArgumentsContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitFunctionArguments(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.FunctionArgumentsContext = FunctionArgumentsContext;

odeGrammarParser.prototype.functionArguments = function() {

    var localctx = new FunctionArgumentsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, odeGrammarParser.RULE_functionArguments);
    var _la = 0; // Token type
    try {
        this.state = 309;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case odeGrammarParser.T__0:
        case odeGrammarParser.DER:
        case odeGrammarParser.SUM:
        case odeGrammarParser.FLOAT:
        case odeGrammarParser.INT:
        case odeGrammarParser.ID:
        case odeGrammarParser.PLUS:
        case odeGrammarParser.MINUS:
        case odeGrammarParser.LPAREN:
        case odeGrammarParser.LCRL:
            this.enterOuterAlt(localctx, 1);
            this.state = 300;
            this.expression(0);
            this.state = 305;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===odeGrammarParser.COMMA) {
                this.state = 301;
                this.match(odeGrammarParser.COMMA);
                this.state = 302;
                this.expression(0);
                this.state = 307;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            break;
        case odeGrammarParser.RPAREN:
            this.enterOuterAlt(localctx, 2);

            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


odeGrammarParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 17:
			return this.boolExpression_sempred(localctx, predIndex);
	case 18:
			return this.expression_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

odeGrammarParser.prototype.boolExpression_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 2);
		case 1:
			return this.precpred(this._ctx, 1);
		default:
			throw "No predicate with index:" + predIndex;
	}
};

odeGrammarParser.prototype.expression_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 2:
			return this.precpred(this._ctx, 10);
		case 3:
			return this.precpred(this._ctx, 8);
		case 4:
			return this.precpred(this._ctx, 7);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.odeGrammarParser = odeGrammarParser;
