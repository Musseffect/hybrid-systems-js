// Generated from e:\projects\SolversJS\src\grammar\odeGrammar.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');
var odeGrammarVisitor = require('./odeGrammarVisitor').odeGrammarVisitor;

var grammarFileName = "odeGrammar.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u00034\u0148\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014\t",
    "\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017\u0004",
    "\u0018\t\u0018\u0003\u0002\u0007\u00022\n\u0002\f\u0002\u000e\u0002",
    "5\u000b\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0005\u0003<\n\u0003\u0003\u0004\u0007\u0004?\n\u0004\f\u0004",
    "\u000e\u0004B\u000b\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0005\u0006L",
    "\n\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003",
    "\b\u0007\bT\n\b\f\b\u000e\bW\u000b\b\u0003\t\u0003\t\u0003\t\u0003\t",
    "\u0003\t\u0003\t\u0005\t_\n\t\u0003\n\u0003\n\u0007\nc\n\n\f\n\u000e",
    "\nf\u000b\n\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0005\u000bp\n\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\f\u0003\f\u0003\f\u0007\fx\n\f\f\f\u000e\f",
    "{\u000b\f\u0003\f\u0005\f~\n\f\u0003\r\u0003\r\u0003\r\u0003\r\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0006",
    "\u000e\u008a\n\u000e\r\u000e\u000e\u000e\u008b\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000f\u0003\u000f\u0003\u000f\u0005\u000f",
    "\u0095\n\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003",
    "\u000f\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003",
    "\u0010\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003",
    "\u0011\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0003",
    "\u0012\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0005",
    "\u0013\u00b3\n\u0013\u0003\u0014\u0005\u0014\u00b6\n\u0014\u0003\u0014",
    "\u0003\u0014\u0003\u0014\u0003\u0014\u0007\u0014\u00bc\n\u0014\f\u0014",
    "\u000e\u0014\u00bf\u000b\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003",
    "\u0014\u0003\u0014\u0007\u0014\u00c6\n\u0014\f\u0014\u000e\u0014\u00c9",
    "\u000b\u0014\u0003\u0014\u0003\u0014\u0003\u0015\u0003\u0015\u0003\u0015",
    "\u0007\u0015\u00d0\n\u0015\f\u0015\u000e\u0015\u00d3\u000b\u0015\u0003",
    "\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0016\u0003",
    "\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003",
    "\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003",
    "\u0016\u0003\u0016\u0003\u0016\u0005\u0016\u00ea\n\u0016\u0003\u0016",
    "\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0007\u0016",
    "\u00f2\n\u0016\f\u0016\u000e\u0016\u00f5\u000b\u0016\u0003\u0017\u0003",
    "\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003",
    "\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003",
    "\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0005",
    "\u0017\u010a\n\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017",
    "\u0003\u0017\u0007\u0017\u0111\n\u0017\f\u0017\u000e\u0017\u0114\u000b",
    "\u0017\u0003\u0017\u0005\u0017\u0117\n\u0017\u0003\u0017\u0003\u0017",
    "\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017",
    "\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017",
    "\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017",
    "\u0005\u0017\u012d\n\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003",
    "\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0007",
    "\u0017\u0138\n\u0017\f\u0017\u000e\u0017\u013b\u000b\u0017\u0003\u0018",
    "\u0003\u0018\u0003\u0018\u0007\u0018\u0140\n\u0018\f\u0018\u000e\u0018",
    "\u0143\u000b\u0018\u0003\u0018\u0005\u0018\u0146\n\u0018\u0003\u0018",
    "\u0002\u0004*,\u0019\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014",
    "\u0016\u0018\u001a\u001c\u001e \"$&(*,.\u0002\b\u0003\u0002\u001a\u001b",
    "\u0003\u0002&)\u0003\u0002*+\u0003\u0002\n\u000b\u0003\u0002\u001d\u001e",
    "\u0003\u0002\u001f \u0002\u0165\u00023\u0003\u0002\u0002\u0002\u0004",
    ";\u0003\u0002\u0002\u0002\u0006@\u0003\u0002\u0002\u0002\bC\u0003\u0002",
    "\u0002\u0002\nK\u0003\u0002\u0002\u0002\fM\u0003\u0002\u0002\u0002\u000e",
    "Q\u0003\u0002\u0002\u0002\u0010^\u0003\u0002\u0002\u0002\u0012`\u0003",
    "\u0002\u0002\u0002\u0014i\u0003\u0002\u0002\u0002\u0016}\u0003\u0002",
    "\u0002\u0002\u0018\u007f\u0003\u0002\u0002\u0002\u001a\u0083\u0003\u0002",
    "\u0002\u0002\u001c\u0094\u0003\u0002\u0002\u0002\u001e\u009b\u0003\u0002",
    "\u0002\u0002 \u00a1\u0003\u0002\u0002\u0002\"\u00a7\u0003\u0002\u0002",
    "\u0002$\u00b2\u0003\u0002\u0002\u0002&\u00b5\u0003\u0002\u0002\u0002",
    "(\u00cc\u0003\u0002\u0002\u0002*\u00e9\u0003\u0002\u0002\u0002,\u012c",
    "\u0003\u0002\u0002\u0002.\u0145\u0003\u0002\u0002\u000202\u0005\u0004",
    "\u0003\u000210\u0003\u0002\u0002\u000225\u0003\u0002\u0002\u000231\u0003",
    "\u0002\u0002\u000234\u0003\u0002\u0002\u00024\u0003\u0003\u0002\u0002",
    "\u000253\u0003\u0002\u0002\u00026<\u0005\u001c\u000f\u00027<\u0005 ",
    "\u0011\u00028<\u0005\"\u0012\u00029<\u0005\u0014\u000b\u0002:<\u0005",
    "\u001a\u000e\u0002;6\u0003\u0002\u0002\u0002;7\u0003\u0002\u0002\u0002",
    ";8\u0003\u0002\u0002\u0002;9\u0003\u0002\u0002\u0002;:\u0003\u0002\u0002",
    "\u0002<\u0005\u0003\u0002\u0002\u0002=?\u0005\n\u0006\u0002>=\u0003",
    "\u0002\u0002\u0002?B\u0003\u0002\u0002\u0002@>\u0003\u0002\u0002\u0002",
    "@A\u0003\u0002\u0002\u0002A\u0007\u0003\u0002\u0002\u0002B@\u0003\u0002",
    "\u0002\u0002CD\t\u0002\u0002\u0002D\t\u0003\u0002\u0002\u0002EL\u0005",
    "\u001c\u000f\u0002FL\u0005 \u0011\u0002GL\u0005\"\u0012\u0002HL\u0005",
    "\u0014\u000b\u0002IL\u0005\u001a\u000e\u0002JL\u0005&\u0014\u0002KE",
    "\u0003\u0002\u0002\u0002KF\u0003\u0002\u0002\u0002KG\u0003\u0002\u0002",
    "\u0002KH\u0003\u0002\u0002\u0002KI\u0003\u0002\u0002\u0002KJ\u0003\u0002",
    "\u0002\u0002L\u000b\u0003\u0002\u0002\u0002MN\u0007\u0018\u0002\u0002",
    "NO\u0005,\u0017\u0002OP\u0007\u0019\u0002\u0002P\r\u0003\u0002\u0002",
    "\u0002QU\u0007\u001c\u0002\u0002RT\u0005\f\u0007\u0002SR\u0003\u0002",
    "\u0002\u0002TW\u0003\u0002\u0002\u0002US\u0003\u0002\u0002\u0002UV\u0003",
    "\u0002\u0002\u0002V\u000f\u0003\u0002\u0002\u0002WU\u0003\u0002\u0002",
    "\u0002X_\u0005\u001c\u000f\u0002Y_\u0005 \u0011\u0002Z_\u0005\u0014",
    "\u000b\u0002[_\u0005\"\u0012\u0002\\_\u0005\u001e\u0010\u0002]_\u0005",
    "\u001a\u000e\u0002^X\u0003\u0002\u0002\u0002^Y\u0003\u0002\u0002\u0002",
    "^Z\u0003\u0002\u0002\u0002^[\u0003\u0002\u0002\u0002^\\\u0003\u0002",
    "\u0002\u0002^]\u0003\u0002\u0002\u0002_\u0011\u0003\u0002\u0002\u0002",
    "`d\u0007.\u0002\u0002ac\u0005\u0010\t\u0002ba\u0003\u0002\u0002\u0002",
    "cf\u0003\u0002\u0002\u0002db\u0003\u0002\u0002\u0002de\u0003\u0002\u0002",
    "\u0002eg\u0003\u0002\u0002\u0002fd\u0003\u0002\u0002\u0002gh\u0007/",
    "\u0002\u0002h\u0013\u0003\u0002\u0002\u0002ij\u0007\r\u0002\u0002jo",
    "\u0005\u000e\b\u0002kl\u0007!\u0002\u0002lm\u0005\u0016\f\u0002mn\u0007",
    "\"\u0002\u0002np\u0003\u0002\u0002\u0002ok\u0003\u0002\u0002\u0002o",
    "p\u0003\u0002\u0002\u0002pq\u0003\u0002\u0002\u0002qr\u0005,\u0017\u0002",
    "rs\u0007,\u0002\u0002s\u0015\u0003\u0002\u0002\u0002ty\u0007\u001c\u0002",
    "\u0002uv\u0007$\u0002\u0002vx\u0007\u001c\u0002\u0002wu\u0003\u0002",
    "\u0002\u0002x{\u0003\u0002\u0002\u0002yw\u0003\u0002\u0002\u0002yz\u0003",
    "\u0002\u0002\u0002z~\u0003\u0002\u0002\u0002{y\u0003\u0002\u0002\u0002",
    "|~\u0003\u0002\u0002\u0002}t\u0003\u0002\u0002\u0002}|\u0003\u0002\u0002",
    "\u0002~\u0017\u0003\u0002\u0002\u0002\u007f\u0080\u0007\u001b\u0002",
    "\u0002\u0080\u0081\u0007-\u0002\u0002\u0081\u0082\u0007\u001b\u0002",
    "\u0002\u0082\u0019\u0003\u0002\u0002\u0002\u0083\u0084\u0007\u000f\u0002",
    "\u0002\u0084\u0085\u0007!\u0002\u0002\u0085\u0086\u0007\u001c\u0002",
    "\u0002\u0086\u0087\u0007\u0010\u0002\u0002\u0087\u0089\u0007\u0018\u0002",
    "\u0002\u0088\u008a\u0005\u0018\r\u0002\u0089\u0088\u0003\u0002\u0002",
    "\u0002\u008a\u008b\u0003\u0002\u0002\u0002\u008b\u0089\u0003\u0002\u0002",
    "\u0002\u008b\u008c\u0003\u0002\u0002\u0002\u008c\u008d\u0003\u0002\u0002",
    "\u0002\u008d\u008e\u0007\u0019\u0002\u0002\u008e\u008f\u0007\"\u0002",
    "\u0002\u008f\u0090\u0005\u0012\n\u0002\u0090\u001b\u0003\u0002\u0002",
    "\u0002\u0091\u0092\u0005\u000e\b\u0002\u0092\u0093\u0007-\u0002\u0002",
    "\u0093\u0095\u0003\u0002\u0002\u0002\u0094\u0091\u0003\u0002\u0002\u0002",
    "\u0094\u0095\u0003\u0002\u0002\u0002\u0095\u0096\u0003\u0002\u0002\u0002",
    "\u0096\u0097\u0005,\u0017\u0002\u0097\u0098\u0007+\u0002\u0002\u0098",
    "\u0099\u0005,\u0017\u0002\u0099\u009a\u0007,\u0002\u0002\u009a\u001d",
    "\u0003\u0002\u0002\u0002\u009b\u009c\u0007\u0005\u0002\u0002\u009c\u009d",
    "\u0005\u000e\b\u0002\u009d\u009e\u0007+\u0002\u0002\u009e\u009f\u0005",
    ",\u0017\u0002\u009f\u00a0\u0007,\u0002\u0002\u00a0\u001f\u0003\u0002",
    "\u0002\u0002\u00a1\u00a2\u0005\u000e\b\u0002\u00a2\u00a3\u0007\u0004",
    "\u0002\u0002\u00a3\u00a4\u0007+\u0002\u0002\u00a4\u00a5\u0005,\u0017",
    "\u0002\u00a5\u00a6\u0007,\u0002\u0002\u00a6!\u0003\u0002\u0002\u0002",
    "\u00a7\u00a8\u0007\u0014\u0002\u0002\u00a8\u00a9\u0005\u000e\b\u0002",
    "\u00a9\u00aa\u0007+\u0002\u0002\u00aa\u00ab\u0005,\u0017\u0002\u00ab",
    "\u00ac\u0007,\u0002\u0002\u00ac#\u0003\u0002\u0002\u0002\u00ad\u00b3",
    "\u0005\u001c\u000f\u0002\u00ae\u00b3\u0005\u001e\u0010\u0002\u00af\u00b3",
    "\u0005\u001a\u000e\u0002\u00b0\u00b3\u0005\u0014\u000b\u0002\u00b1\u00b3",
    "\u0005\"\u0012\u0002\u00b2\u00ad\u0003\u0002\u0002\u0002\u00b2\u00ae",
    "\u0003\u0002\u0002\u0002\u00b2\u00af\u0003\u0002\u0002\u0002\u00b2\u00b0",
    "\u0003\u0002\u0002\u0002\u00b2\u00b1\u0003\u0002\u0002\u0002\u00b3%",
    "\u0003\u0002\u0002\u0002\u00b4\u00b6\u0007\t\u0002\u0002\u00b5\u00b4",
    "\u0003\u0002\u0002\u0002\u00b5\u00b6\u0003\u0002\u0002\u0002\u00b6\u00b7",
    "\u0003\u0002\u0002\u0002\u00b7\u00b8\u0007\u000e\u0002\u0002\u00b8\u00b9",
    "\u0007\u001c\u0002\u0002\u00b9\u00bd\u0007.\u0002\u0002\u00ba\u00bc",
    "\u0005$\u0013\u0002\u00bb\u00ba\u0003\u0002\u0002\u0002\u00bc\u00bf",
    "\u0003\u0002\u0002\u0002\u00bd\u00bb\u0003\u0002\u0002\u0002\u00bd\u00be",
    "\u0003\u0002\u0002\u0002\u00be\u00c0\u0003\u0002\u0002\u0002\u00bf\u00bd",
    "\u0003\u0002\u0002\u0002\u00c0\u00c1\u0007/\u0002\u0002\u00c1\u00c2",
    "\u0007\u0007\u0002\u0002\u00c2\u00c7\u0005(\u0015\u0002\u00c3\u00c4",
    "\u0007$\u0002\u0002\u00c4\u00c6\u0005(\u0015\u0002\u00c5\u00c3\u0003",
    "\u0002\u0002\u0002\u00c6\u00c9\u0003\u0002\u0002\u0002\u00c7\u00c5\u0003",
    "\u0002\u0002\u0002\u00c7\u00c8\u0003\u0002\u0002\u0002\u00c8\u00ca\u0003",
    "\u0002\u0002\u0002\u00c9\u00c7\u0003\u0002\u0002\u0002\u00ca\u00cb\u0007",
    ",\u0002\u0002\u00cb\'\u0003\u0002\u0002\u0002\u00cc\u00d1\u0007\u001c",
    "\u0002\u0002\u00cd\u00ce\u0007$\u0002\u0002\u00ce\u00d0\u0007\u001c",
    "\u0002\u0002\u00cf\u00cd\u0003\u0002\u0002\u0002\u00d0\u00d3\u0003\u0002",
    "\u0002\u0002\u00d1\u00cf\u0003\u0002\u0002\u0002\u00d1\u00d2\u0003\u0002",
    "\u0002\u0002\u00d2\u00d4\u0003\u0002\u0002\u0002\u00d3\u00d1\u0003\u0002",
    "\u0002\u0002\u00d4\u00d5\u0007\u0006\u0002\u0002\u00d5\u00d6\u0007!",
    "\u0002\u0002\u00d6\u00d7\u0005*\u0016\u0002\u00d7\u00d8\u0007\"\u0002",
    "\u0002\u00d8)\u0003\u0002\u0002\u0002\u00d9\u00da\b\u0016\u0001\u0002",
    "\u00da\u00db\u0007!\u0002\u0002\u00db\u00dc\u0005*\u0016\u0002\u00dc",
    "\u00dd\u0007\"\u0002\u0002\u00dd\u00ea\u0003\u0002\u0002\u0002\u00de",
    "\u00df\u0007\u0017\u0002\u0002\u00df\u00ea\u0005*\u0016\b\u00e0\u00e1",
    "\u0005,\u0017\u0002\u00e1\u00e2\t\u0003\u0002\u0002\u00e2\u00e3\u0005",
    ",\u0017\u0002\u00e3\u00ea\u0003\u0002\u0002\u0002\u00e4\u00e5\u0005",
    ",\u0017\u0002\u00e5\u00e6\t\u0004\u0002\u0002\u00e6\u00e7\u0005,\u0017",
    "\u0002\u00e7\u00ea\u0003\u0002\u0002\u0002\u00e8\u00ea\t\u0005\u0002",
    "\u0002\u00e9\u00d9\u0003\u0002\u0002\u0002\u00e9\u00de\u0003\u0002\u0002",
    "\u0002\u00e9\u00e0\u0003\u0002\u0002\u0002\u00e9\u00e4\u0003\u0002\u0002",
    "\u0002\u00e9\u00e8\u0003\u0002\u0002\u0002\u00ea\u00f3\u0003\u0002\u0002",
    "\u0002\u00eb\u00ec\f\u0005\u0002\u0002\u00ec\u00ed\u0007\u0016\u0002",
    "\u0002\u00ed\u00f2\u0005*\u0016\u0006\u00ee\u00ef\f\u0004\u0002\u0002",
    "\u00ef\u00f0\u0007\u0015\u0002\u0002\u00f0\u00f2\u0005*\u0016\u0005",
    "\u00f1\u00eb\u0003\u0002\u0002\u0002\u00f1\u00ee\u0003\u0002\u0002\u0002",
    "\u00f2\u00f5\u0003\u0002\u0002\u0002\u00f3\u00f1\u0003\u0002\u0002\u0002",
    "\u00f3\u00f4\u0003\u0002\u0002\u0002\u00f4+\u0003\u0002\u0002\u0002",
    "\u00f5\u00f3\u0003\u0002\u0002\u0002\u00f6\u00f7\b\u0017\u0001\u0002",
    "\u00f7\u00f8\u0007!\u0002\u0002\u00f8\u00f9\u0005,\u0017\u0002\u00f9",
    "\u00fa\u0007\"\u0002\u0002\u00fa\u012d\u0003\u0002\u0002\u0002\u00fb",
    "\u00fc\u0007\b\u0002\u0002\u00fc\u00fd\u0007!\u0002\u0002\u00fd\u00fe",
    "\u0005\u000e\b\u0002\u00fe\u00ff\u0007\"\u0002\u0002\u00ff\u012d\u0003",
    "\u0002\u0002\u0002\u0100\u0101\u0007\u001c\u0002\u0002\u0101\u0102\u0007",
    "!\u0002\u0002\u0102\u0103\u0005.\u0018\u0002\u0103\u0104\u0007\"\u0002",
    "\u0002\u0104\u012d\u0003\u0002\u0002\u0002\u0105\u0106\t\u0006\u0002",
    "\u0002\u0106\u012d\u0005,\u0017\n\u0107\u0109\u0005\u000e\b\u0002\u0108",
    "\u010a\u00070\u0002\u0002\u0109\u0108\u0003\u0002\u0002\u0002\u0109",
    "\u010a\u0003\u0002\u0002\u0002\u010a\u012d\u0003\u0002\u0002\u0002\u010b",
    "\u012d\u0005\b\u0005\u0002\u010c\u010d\u0007\u0003\u0002\u0002\u010d",
    "\u0116\u0005\u000e\b\u0002\u010e\u0112\u0007!\u0002\u0002\u010f\u0111",
    "\u0005,\u0017\u0002\u0110\u010f\u0003\u0002\u0002\u0002\u0111\u0114",
    "\u0003\u0002\u0002\u0002\u0112\u0110\u0003\u0002\u0002\u0002\u0112\u0113",
    "\u0003\u0002\u0002\u0002\u0113\u0115\u0003\u0002\u0002\u0002\u0114\u0112",
    "\u0003\u0002\u0002\u0002\u0115\u0117\u0007\"\u0002\u0002\u0116\u010e",
    "\u0003\u0002\u0002\u0002\u0116\u0117\u0003\u0002\u0002\u0002\u0117\u012d",
    "\u0003\u0002\u0002\u0002\u0118\u0119\u0007\f\u0002\u0002\u0119\u011a",
    "\u0007!\u0002\u0002\u011a\u011b\u0007\u001c\u0002\u0002\u011b\u011c",
    "\u0007\u0010\u0002\u0002\u011c\u011d\u0007\u0018\u0002\u0002\u011d\u011e",
    "\u0005\u0018\r\u0002\u011e\u011f\u0007\u0019\u0002\u0002\u011f\u0120",
    "\u0007\"\u0002\u0002\u0120\u0121\u0007.\u0002\u0002\u0121\u0122\u0005",
    ",\u0017\u0002\u0122\u0123\u0007/\u0002\u0002\u0123\u012d\u0003\u0002",
    "\u0002\u0002\u0124\u0125\u0007.\u0002\u0002\u0125\u0126\u0005*\u0016",
    "\u0002\u0126\u0127\u00071\u0002\u0002\u0127\u0128\u0005,\u0017\u0002",
    "\u0128\u0129\u0007-\u0002\u0002\u0129\u012a\u0005,\u0017\u0002\u012a",
    "\u012b\u0007/\u0002\u0002\u012b\u012d\u0003\u0002\u0002\u0002\u012c",
    "\u00f6\u0003\u0002\u0002\u0002\u012c\u00fb\u0003\u0002\u0002\u0002\u012c",
    "\u0100\u0003\u0002\u0002\u0002\u012c\u0105\u0003\u0002\u0002\u0002\u012c",
    "\u0107\u0003\u0002\u0002\u0002\u012c\u010b\u0003\u0002\u0002\u0002\u012c",
    "\u010c\u0003\u0002\u0002\u0002\u012c\u0118\u0003\u0002\u0002\u0002\u012c",
    "\u0124\u0003\u0002\u0002\u0002\u012d\u0139\u0003\u0002\u0002\u0002\u012e",
    "\u012f\f\u000b\u0002\u0002\u012f\u0130\u0007%\u0002\u0002\u0130\u0138",
    "\u0005,\u0017\u000b\u0131\u0132\f\t\u0002\u0002\u0132\u0133\t\u0007",
    "\u0002\u0002\u0133\u0138\u0005,\u0017\n\u0134\u0135\f\b\u0002\u0002",
    "\u0135\u0136\t\u0006\u0002\u0002\u0136\u0138\u0005,\u0017\t\u0137\u012e",
    "\u0003\u0002\u0002\u0002\u0137\u0131\u0003\u0002\u0002\u0002\u0137\u0134",
    "\u0003\u0002\u0002\u0002\u0138\u013b\u0003\u0002\u0002\u0002\u0139\u0137",
    "\u0003\u0002\u0002\u0002\u0139\u013a\u0003\u0002\u0002\u0002\u013a-",
    "\u0003\u0002\u0002\u0002\u013b\u0139\u0003\u0002\u0002\u0002\u013c\u0141",
    "\u0005,\u0017\u0002\u013d\u013e\u0007$\u0002\u0002\u013e\u0140\u0005",
    ",\u0017\u0002\u013f\u013d\u0003\u0002\u0002\u0002\u0140\u0143\u0003",
    "\u0002\u0002\u0002\u0141\u013f\u0003\u0002\u0002\u0002\u0141\u0142\u0003",
    "\u0002\u0002\u0002\u0142\u0146\u0003\u0002\u0002\u0002\u0143\u0141\u0003",
    "\u0002\u0002\u0002\u0144\u0146\u0003\u0002\u0002\u0002\u0145\u013c\u0003",
    "\u0002\u0002\u0002\u0145\u0144\u0003\u0002\u0002\u0002\u0146/\u0003",
    "\u0002\u0002\u0002\u001e3;@KU^doy}\u008b\u0094\u00b2\u00b5\u00bd\u00c7",
    "\u00d1\u00e9\u00f1\u00f3\u0109\u0112\u0116\u012c\u0137\u0139\u0141\u0145"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'#'", "'(t0)'", "'set'", "'on'", "'from'", "'der'", 
                     "'terminal'", "'true'", "'false'", "'sum'", "'macro'", 
                     "'state'", "'for'", "'in'", "'if'", "'else'", "'local'", 
                     "'const'", null, null, null, "'['", "']'", null, null, 
                     null, "'+'", "'-'", "'*'", "'/'", "'('", "')'", "'.'", 
                     "','", "'^'", "'<'", "'>'", "'<='", "'>='", "'!='", 
                     "'='", "';'", "':'", "'{'", "'}'", "'''", "'?'" ];

var symbolicNames = [ null, null, "T0", "SET", "ON", "FROM", "DER", "TERMINAL", 
                      "TRUE", "FALSE", "SUM", "MACRO", "STATE", "FOR", "IN", 
                      "IF", "ELSE", "LOCAL", "CONSTANT", "OR", "AND", "NOT", 
                      "LSQR", "RSQR", "FLOAT", "INT", "ID", "PLUS", "MINUS", 
                      "ASTERISK", "DIVISION", "LPAREN", "RPAREN", "DOT", 
                      "COMMA", "CARET", "L", "G", "LE", "GE", "NE", "E", 
                      "SEMICOLON", "COLON", "LCRL", "RCRL", "APOSTROPHE", 
                      "QUESTIONMARK", "NEWLINE", "WHITESPACE", "COMMENT" ];

var ruleNames =  [ "dae", "daeStatement", "hybrid", "number", "hybridStatement", 
                   "index", "varIdentifier", "loopStatement", "loopBody", 
                   "macroStatement", "macroArguments", "loopBounds", "loop", 
                   "equation", "setter", "initialCondition", "constantStatement", 
                   "stateStatement", "stateDef", "stateTransition", "boolExpression", 
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
odeGrammarParser.SET = 3;
odeGrammarParser.ON = 4;
odeGrammarParser.FROM = 5;
odeGrammarParser.DER = 6;
odeGrammarParser.TERMINAL = 7;
odeGrammarParser.TRUE = 8;
odeGrammarParser.FALSE = 9;
odeGrammarParser.SUM = 10;
odeGrammarParser.MACRO = 11;
odeGrammarParser.STATE = 12;
odeGrammarParser.FOR = 13;
odeGrammarParser.IN = 14;
odeGrammarParser.IF = 15;
odeGrammarParser.ELSE = 16;
odeGrammarParser.LOCAL = 17;
odeGrammarParser.CONSTANT = 18;
odeGrammarParser.OR = 19;
odeGrammarParser.AND = 20;
odeGrammarParser.NOT = 21;
odeGrammarParser.LSQR = 22;
odeGrammarParser.RSQR = 23;
odeGrammarParser.FLOAT = 24;
odeGrammarParser.INT = 25;
odeGrammarParser.ID = 26;
odeGrammarParser.PLUS = 27;
odeGrammarParser.MINUS = 28;
odeGrammarParser.ASTERISK = 29;
odeGrammarParser.DIVISION = 30;
odeGrammarParser.LPAREN = 31;
odeGrammarParser.RPAREN = 32;
odeGrammarParser.DOT = 33;
odeGrammarParser.COMMA = 34;
odeGrammarParser.CARET = 35;
odeGrammarParser.L = 36;
odeGrammarParser.G = 37;
odeGrammarParser.LE = 38;
odeGrammarParser.GE = 39;
odeGrammarParser.NE = 40;
odeGrammarParser.E = 41;
odeGrammarParser.SEMICOLON = 42;
odeGrammarParser.COLON = 43;
odeGrammarParser.LCRL = 44;
odeGrammarParser.RCRL = 45;
odeGrammarParser.APOSTROPHE = 46;
odeGrammarParser.QUESTIONMARK = 47;
odeGrammarParser.NEWLINE = 48;
odeGrammarParser.WHITESPACE = 49;
odeGrammarParser.COMMENT = 50;

odeGrammarParser.RULE_dae = 0;
odeGrammarParser.RULE_daeStatement = 1;
odeGrammarParser.RULE_hybrid = 2;
odeGrammarParser.RULE_number = 3;
odeGrammarParser.RULE_hybridStatement = 4;
odeGrammarParser.RULE_index = 5;
odeGrammarParser.RULE_varIdentifier = 6;
odeGrammarParser.RULE_loopStatement = 7;
odeGrammarParser.RULE_loopBody = 8;
odeGrammarParser.RULE_macroStatement = 9;
odeGrammarParser.RULE_macroArguments = 10;
odeGrammarParser.RULE_loopBounds = 11;
odeGrammarParser.RULE_loop = 12;
odeGrammarParser.RULE_equation = 13;
odeGrammarParser.RULE_setter = 14;
odeGrammarParser.RULE_initialCondition = 15;
odeGrammarParser.RULE_constantStatement = 16;
odeGrammarParser.RULE_stateStatement = 17;
odeGrammarParser.RULE_stateDef = 18;
odeGrammarParser.RULE_stateTransition = 19;
odeGrammarParser.RULE_boolExpression = 20;
odeGrammarParser.RULE_expression = 21;
odeGrammarParser.RULE_functionArguments = 22;


function DaeContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_dae;
    return this;
}

DaeContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DaeContext.prototype.constructor = DaeContext;

DaeContext.prototype.daeStatement = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(DaeStatementContext);
    } else {
        return this.getTypedRuleContext(DaeStatementContext,i);
    }
};

DaeContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitDae(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.DaeContext = DaeContext;

odeGrammarParser.prototype.dae = function() {

    var localctx = new DaeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, odeGrammarParser.RULE_dae);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 49;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << odeGrammarParser.T__0) | (1 << odeGrammarParser.DER) | (1 << odeGrammarParser.SUM) | (1 << odeGrammarParser.MACRO) | (1 << odeGrammarParser.FOR) | (1 << odeGrammarParser.CONSTANT) | (1 << odeGrammarParser.FLOAT) | (1 << odeGrammarParser.INT) | (1 << odeGrammarParser.ID) | (1 << odeGrammarParser.PLUS) | (1 << odeGrammarParser.MINUS) | (1 << odeGrammarParser.LPAREN))) !== 0) || _la===odeGrammarParser.LCRL) {
            this.state = 46;
            this.daeStatement();
            this.state = 51;
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


function DaeStatementContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_daeStatement;
    return this;
}

DaeStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DaeStatementContext.prototype.constructor = DaeStatementContext;

DaeStatementContext.prototype.equation = function() {
    return this.getTypedRuleContext(EquationContext,0);
};

DaeStatementContext.prototype.initialCondition = function() {
    return this.getTypedRuleContext(InitialConditionContext,0);
};

DaeStatementContext.prototype.constantStatement = function() {
    return this.getTypedRuleContext(ConstantStatementContext,0);
};

DaeStatementContext.prototype.macroStatement = function() {
    return this.getTypedRuleContext(MacroStatementContext,0);
};

DaeStatementContext.prototype.loop = function() {
    return this.getTypedRuleContext(LoopContext,0);
};

DaeStatementContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitDaeStatement(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.DaeStatementContext = DaeStatementContext;

odeGrammarParser.prototype.daeStatement = function() {

    var localctx = new DaeStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, odeGrammarParser.RULE_daeStatement);
    try {
        this.state = 57;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 52;
            this.equation();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 53;
            this.initialCondition();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 54;
            this.constantStatement();
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 55;
            this.macroStatement();
            break;

        case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 56;
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

HybridContext.prototype.hybridStatement = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(HybridStatementContext);
    } else {
        return this.getTypedRuleContext(HybridStatementContext,i);
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
        this.state = 62;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << odeGrammarParser.T__0) | (1 << odeGrammarParser.DER) | (1 << odeGrammarParser.TERMINAL) | (1 << odeGrammarParser.SUM) | (1 << odeGrammarParser.MACRO) | (1 << odeGrammarParser.STATE) | (1 << odeGrammarParser.FOR) | (1 << odeGrammarParser.CONSTANT) | (1 << odeGrammarParser.FLOAT) | (1 << odeGrammarParser.INT) | (1 << odeGrammarParser.ID) | (1 << odeGrammarParser.PLUS) | (1 << odeGrammarParser.MINUS) | (1 << odeGrammarParser.LPAREN))) !== 0) || _la===odeGrammarParser.LCRL) {
            this.state = 59;
            this.hybridStatement();
            this.state = 64;
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
        this.state = 65;
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


function HybridStatementContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_hybridStatement;
    return this;
}

HybridStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HybridStatementContext.prototype.constructor = HybridStatementContext;

HybridStatementContext.prototype.equation = function() {
    return this.getTypedRuleContext(EquationContext,0);
};

HybridStatementContext.prototype.initialCondition = function() {
    return this.getTypedRuleContext(InitialConditionContext,0);
};

HybridStatementContext.prototype.constantStatement = function() {
    return this.getTypedRuleContext(ConstantStatementContext,0);
};

HybridStatementContext.prototype.macroStatement = function() {
    return this.getTypedRuleContext(MacroStatementContext,0);
};

HybridStatementContext.prototype.loop = function() {
    return this.getTypedRuleContext(LoopContext,0);
};

HybridStatementContext.prototype.stateDef = function() {
    return this.getTypedRuleContext(StateDefContext,0);
};

HybridStatementContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitHybridStatement(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.HybridStatementContext = HybridStatementContext;

odeGrammarParser.prototype.hybridStatement = function() {

    var localctx = new HybridStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, odeGrammarParser.RULE_hybridStatement);
    try {
        this.state = 73;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 67;
            this.equation();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 68;
            this.initialCondition();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 69;
            this.constantStatement();
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 70;
            this.macroStatement();
            break;

        case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 71;
            this.loop();
            break;

        case 6:
            this.enterOuterAlt(localctx, 6);
            this.state = 72;
            this.stateDef();
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


function IndexContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_index;
    this.exp = null; // ExpressionContext
    return this;
}

IndexContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IndexContext.prototype.constructor = IndexContext;

IndexContext.prototype.LSQR = function() {
    return this.getToken(odeGrammarParser.LSQR, 0);
};

IndexContext.prototype.RSQR = function() {
    return this.getToken(odeGrammarParser.RSQR, 0);
};

IndexContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

IndexContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitIndex(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.IndexContext = IndexContext;

odeGrammarParser.prototype.index = function() {

    var localctx = new IndexContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, odeGrammarParser.RULE_index);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 75;
        this.match(odeGrammarParser.LSQR);
        this.state = 76;
        localctx.exp = this.expression(0);
        this.state = 77;
        this.match(odeGrammarParser.RSQR);
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
    this.id = null; // Token
    return this;
}

VarIdentifierContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
VarIdentifierContext.prototype.constructor = VarIdentifierContext;

VarIdentifierContext.prototype.ID = function() {
    return this.getToken(odeGrammarParser.ID, 0);
};

VarIdentifierContext.prototype.index = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(IndexContext);
    } else {
        return this.getTypedRuleContext(IndexContext,i);
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
    this.enterRule(localctx, 12, odeGrammarParser.RULE_varIdentifier);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 79;
        localctx.id = this.match(odeGrammarParser.ID);
        this.state = 83;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,4,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 80;
                this.index(); 
            }
            this.state = 85;
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


function LoopStatementContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_loopStatement;
    return this;
}

LoopStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LoopStatementContext.prototype.constructor = LoopStatementContext;

LoopStatementContext.prototype.equation = function() {
    return this.getTypedRuleContext(EquationContext,0);
};

LoopStatementContext.prototype.initialCondition = function() {
    return this.getTypedRuleContext(InitialConditionContext,0);
};

LoopStatementContext.prototype.macroStatement = function() {
    return this.getTypedRuleContext(MacroStatementContext,0);
};

LoopStatementContext.prototype.constantStatement = function() {
    return this.getTypedRuleContext(ConstantStatementContext,0);
};

LoopStatementContext.prototype.setter = function() {
    return this.getTypedRuleContext(SetterContext,0);
};

LoopStatementContext.prototype.loop = function() {
    return this.getTypedRuleContext(LoopContext,0);
};

LoopStatementContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitLoopStatement(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.LoopStatementContext = LoopStatementContext;

odeGrammarParser.prototype.loopStatement = function() {

    var localctx = new LoopStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, odeGrammarParser.RULE_loopStatement);
    try {
        this.state = 92;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 86;
            this.equation();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 87;
            this.initialCondition();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 88;
            this.macroStatement();
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 89;
            this.constantStatement();
            break;

        case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 90;
            this.setter();
            break;

        case 6:
            this.enterOuterAlt(localctx, 6);
            this.state = 91;
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

LoopBodyContext.prototype.loopStatement = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(LoopStatementContext);
    } else {
        return this.getTypedRuleContext(LoopStatementContext,i);
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
    this.enterRule(localctx, 16, odeGrammarParser.RULE_loopBody);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 94;
        this.match(odeGrammarParser.LCRL);
        this.state = 98;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << odeGrammarParser.T__0) | (1 << odeGrammarParser.SET) | (1 << odeGrammarParser.DER) | (1 << odeGrammarParser.SUM) | (1 << odeGrammarParser.MACRO) | (1 << odeGrammarParser.FOR) | (1 << odeGrammarParser.CONSTANT) | (1 << odeGrammarParser.FLOAT) | (1 << odeGrammarParser.INT) | (1 << odeGrammarParser.ID) | (1 << odeGrammarParser.PLUS) | (1 << odeGrammarParser.MINUS) | (1 << odeGrammarParser.LPAREN))) !== 0) || _la===odeGrammarParser.LCRL) {
            this.state = 95;
            this.loopStatement();
            this.state = 100;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 101;
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
    this.id = null; // VarIdentifierContext
    this.exp = null; // ExpressionContext
    return this;
}

MacroStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
MacroStatementContext.prototype.constructor = MacroStatementContext;

MacroStatementContext.prototype.MACRO = function() {
    return this.getToken(odeGrammarParser.MACRO, 0);
};

MacroStatementContext.prototype.SEMICOLON = function() {
    return this.getToken(odeGrammarParser.SEMICOLON, 0);
};

MacroStatementContext.prototype.varIdentifier = function() {
    return this.getTypedRuleContext(VarIdentifierContext,0);
};

MacroStatementContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
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
    this.enterRule(localctx, 18, odeGrammarParser.RULE_macroStatement);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 103;
        this.match(odeGrammarParser.MACRO);
        this.state = 104;
        localctx.id = this.varIdentifier();
        this.state = 109;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
        if(la_===1) {
            this.state = 105;
            this.match(odeGrammarParser.LPAREN);
            this.state = 106;
            this.macroArguments();
            this.state = 107;
            this.match(odeGrammarParser.RPAREN);

        }
        this.state = 111;
        localctx.exp = this.expression(0);
        this.state = 112;
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
    this.enterRule(localctx, 20, odeGrammarParser.RULE_macroArguments);
    var _la = 0; // Token type
    try {
        this.state = 123;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case odeGrammarParser.ID:
            this.enterOuterAlt(localctx, 1);
            this.state = 114;
            this.match(odeGrammarParser.ID);
            this.state = 119;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===odeGrammarParser.COMMA) {
                this.state = 115;
                this.match(odeGrammarParser.COMMA);
                this.state = 116;
                this.match(odeGrammarParser.ID);
                this.state = 121;
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


function LoopBoundsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_loopBounds;
    this.lbound = null; // Token
    this.rbound = null; // Token
    return this;
}

LoopBoundsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LoopBoundsContext.prototype.constructor = LoopBoundsContext;

LoopBoundsContext.prototype.COLON = function() {
    return this.getToken(odeGrammarParser.COLON, 0);
};

LoopBoundsContext.prototype.INT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.INT);
    } else {
        return this.getToken(odeGrammarParser.INT, i);
    }
};


LoopBoundsContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitLoopBounds(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.LoopBoundsContext = LoopBoundsContext;

odeGrammarParser.prototype.loopBounds = function() {

    var localctx = new LoopBoundsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, odeGrammarParser.RULE_loopBounds);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 125;
        localctx.lbound = this.match(odeGrammarParser.INT);
        this.state = 126;
        this.match(odeGrammarParser.COLON);
        this.state = 127;
        localctx.rbound = this.match(odeGrammarParser.INT);
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
    this.iterator = null; // Token
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

LoopContext.prototype.LSQR = function() {
    return this.getToken(odeGrammarParser.LSQR, 0);
};

LoopContext.prototype.RSQR = function() {
    return this.getToken(odeGrammarParser.RSQR, 0);
};

LoopContext.prototype.RPAREN = function() {
    return this.getToken(odeGrammarParser.RPAREN, 0);
};

LoopContext.prototype.loopBody = function() {
    return this.getTypedRuleContext(LoopBodyContext,0);
};

LoopContext.prototype.ID = function() {
    return this.getToken(odeGrammarParser.ID, 0);
};

LoopContext.prototype.loopBounds = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(LoopBoundsContext);
    } else {
        return this.getTypedRuleContext(LoopBoundsContext,i);
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
    this.enterRule(localctx, 24, odeGrammarParser.RULE_loop);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 129;
        this.match(odeGrammarParser.FOR);
        this.state = 130;
        this.match(odeGrammarParser.LPAREN);
        this.state = 131;
        localctx.iterator = this.match(odeGrammarParser.ID);
        this.state = 132;
        this.match(odeGrammarParser.IN);
        this.state = 133;
        this.match(odeGrammarParser.LSQR);
        this.state = 135; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 134;
            this.loopBounds();
            this.state = 137; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===odeGrammarParser.INT);
        this.state = 139;
        this.match(odeGrammarParser.RSQR);
        this.state = 140;
        this.match(odeGrammarParser.RPAREN);
        this.state = 141;
        this.loopBody();
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
    this.label = null; // VarIdentifierContext
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

EquationContext.prototype.varIdentifier = function() {
    return this.getTypedRuleContext(VarIdentifierContext,0);
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
    this.enterRule(localctx, 26, odeGrammarParser.RULE_equation);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 146;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
        if(la_===1) {
            this.state = 143;
            localctx.label = this.varIdentifier();
            this.state = 144;
            this.match(odeGrammarParser.COLON);

        }
        this.state = 148;
        localctx.left = this.expression(0);
        this.state = 149;
        this.match(odeGrammarParser.E);
        this.state = 150;
        localctx.right = this.expression(0);
        this.state = 151;
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
    this.exp = null; // ExpressionContext
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

SetterContext.prototype.SEMICOLON = function() {
    return this.getToken(odeGrammarParser.SEMICOLON, 0);
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
    this.enterRule(localctx, 28, odeGrammarParser.RULE_setter);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 153;
        this.match(odeGrammarParser.SET);
        this.state = 154;
        localctx.variable = this.varIdentifier();
        this.state = 155;
        this.match(odeGrammarParser.E);
        this.state = 156;
        localctx.exp = this.expression(0);
        this.state = 157;
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
    this.variable = null; // VarIdentifierContext
    this.exp = null; // ExpressionContext
    return this;
}

InitialConditionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
InitialConditionContext.prototype.constructor = InitialConditionContext;

InitialConditionContext.prototype.T0 = function() {
    return this.getToken(odeGrammarParser.T0, 0);
};

InitialConditionContext.prototype.E = function() {
    return this.getToken(odeGrammarParser.E, 0);
};

InitialConditionContext.prototype.SEMICOLON = function() {
    return this.getToken(odeGrammarParser.SEMICOLON, 0);
};

InitialConditionContext.prototype.varIdentifier = function() {
    return this.getTypedRuleContext(VarIdentifierContext,0);
};

InitialConditionContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

InitialConditionContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitInitialCondition(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.InitialConditionContext = InitialConditionContext;

odeGrammarParser.prototype.initialCondition = function() {

    var localctx = new InitialConditionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, odeGrammarParser.RULE_initialCondition);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 159;
        localctx.variable = this.varIdentifier();
        this.state = 160;
        this.match(odeGrammarParser.T0);
        this.state = 161;
        this.match(odeGrammarParser.E);
        this.state = 162;
        localctx.exp = this.expression(0);
        this.state = 163;
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
    this.enterRule(localctx, 32, odeGrammarParser.RULE_constantStatement);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 165;
        this.match(odeGrammarParser.CONSTANT);
        this.state = 166;
        localctx.constant = this.varIdentifier();
        this.state = 167;
        this.match(odeGrammarParser.E);
        this.state = 168;
        localctx.exp = this.expression(0);
        this.state = 169;
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


function StateStatementContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_stateStatement;
    return this;
}

StateStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StateStatementContext.prototype.constructor = StateStatementContext;

StateStatementContext.prototype.equation = function() {
    return this.getTypedRuleContext(EquationContext,0);
};

StateStatementContext.prototype.setter = function() {
    return this.getTypedRuleContext(SetterContext,0);
};

StateStatementContext.prototype.loop = function() {
    return this.getTypedRuleContext(LoopContext,0);
};

StateStatementContext.prototype.macroStatement = function() {
    return this.getTypedRuleContext(MacroStatementContext,0);
};

StateStatementContext.prototype.constantStatement = function() {
    return this.getTypedRuleContext(ConstantStatementContext,0);
};

StateStatementContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitStateStatement(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.StateStatementContext = StateStatementContext;

odeGrammarParser.prototype.stateStatement = function() {

    var localctx = new StateStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, odeGrammarParser.RULE_stateStatement);
    try {
        this.enterOuterAlt(localctx, 1);
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
            this.state = 171;
            this.equation();
            break;
        case odeGrammarParser.SET:
            this.state = 172;
            this.setter();
            break;
        case odeGrammarParser.FOR:
            this.state = 173;
            this.loop();
            break;
        case odeGrammarParser.MACRO:
            this.state = 174;
            this.macroStatement();
            break;
        case odeGrammarParser.CONSTANT:
            this.state = 175;
            this.constantStatement();
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


function StateDefContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = odeGrammarParser.RULE_stateDef;
    this.name = null; // Token
    return this;
}

StateDefContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StateDefContext.prototype.constructor = StateDefContext;

StateDefContext.prototype.STATE = function() {
    return this.getToken(odeGrammarParser.STATE, 0);
};

StateDefContext.prototype.LCRL = function() {
    return this.getToken(odeGrammarParser.LCRL, 0);
};

StateDefContext.prototype.RCRL = function() {
    return this.getToken(odeGrammarParser.RCRL, 0);
};

StateDefContext.prototype.FROM = function() {
    return this.getToken(odeGrammarParser.FROM, 0);
};

StateDefContext.prototype.stateTransition = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(StateTransitionContext);
    } else {
        return this.getTypedRuleContext(StateTransitionContext,i);
    }
};

StateDefContext.prototype.SEMICOLON = function() {
    return this.getToken(odeGrammarParser.SEMICOLON, 0);
};

StateDefContext.prototype.ID = function() {
    return this.getToken(odeGrammarParser.ID, 0);
};

StateDefContext.prototype.TERMINAL = function() {
    return this.getToken(odeGrammarParser.TERMINAL, 0);
};

StateDefContext.prototype.stateStatement = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(StateStatementContext);
    } else {
        return this.getTypedRuleContext(StateStatementContext,i);
    }
};

StateDefContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.COMMA);
    } else {
        return this.getToken(odeGrammarParser.COMMA, i);
    }
};


StateDefContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitStateDef(this);
    } else {
        return visitor.visitChildren(this);
    }
};




odeGrammarParser.StateDefContext = StateDefContext;

odeGrammarParser.prototype.stateDef = function() {

    var localctx = new StateDefContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, odeGrammarParser.RULE_stateDef);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 179;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===odeGrammarParser.TERMINAL) {
            this.state = 178;
            this.match(odeGrammarParser.TERMINAL);
        }

        this.state = 181;
        this.match(odeGrammarParser.STATE);
        this.state = 182;
        localctx.name = this.match(odeGrammarParser.ID);
        this.state = 183;
        this.match(odeGrammarParser.LCRL);
        this.state = 187;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << odeGrammarParser.T__0) | (1 << odeGrammarParser.SET) | (1 << odeGrammarParser.DER) | (1 << odeGrammarParser.SUM) | (1 << odeGrammarParser.MACRO) | (1 << odeGrammarParser.FOR) | (1 << odeGrammarParser.CONSTANT) | (1 << odeGrammarParser.FLOAT) | (1 << odeGrammarParser.INT) | (1 << odeGrammarParser.ID) | (1 << odeGrammarParser.PLUS) | (1 << odeGrammarParser.MINUS) | (1 << odeGrammarParser.LPAREN))) !== 0) || _la===odeGrammarParser.LCRL) {
            this.state = 184;
            this.stateStatement();
            this.state = 189;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 190;
        this.match(odeGrammarParser.RCRL);
        this.state = 191;
        this.match(odeGrammarParser.FROM);
        this.state = 192;
        this.stateTransition();
        this.state = 197;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===odeGrammarParser.COMMA) {
            this.state = 193;
            this.match(odeGrammarParser.COMMA);
            this.state = 194;
            this.stateTransition();
            this.state = 199;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 200;
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
    this.condition = null; // BoolExpressionContext
    return this;
}

StateTransitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StateTransitionContext.prototype.constructor = StateTransitionContext;

StateTransitionContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.ID);
    } else {
        return this.getToken(odeGrammarParser.ID, i);
    }
};


StateTransitionContext.prototype.ON = function() {
    return this.getToken(odeGrammarParser.ON, 0);
};

StateTransitionContext.prototype.LPAREN = function() {
    return this.getToken(odeGrammarParser.LPAREN, 0);
};

StateTransitionContext.prototype.RPAREN = function() {
    return this.getToken(odeGrammarParser.RPAREN, 0);
};

StateTransitionContext.prototype.boolExpression = function() {
    return this.getTypedRuleContext(BoolExpressionContext,0);
};

StateTransitionContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(odeGrammarParser.COMMA);
    } else {
        return this.getToken(odeGrammarParser.COMMA, i);
    }
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
    this.enterRule(localctx, 38, odeGrammarParser.RULE_stateTransition);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 202;
        this.match(odeGrammarParser.ID);
        this.state = 207;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===odeGrammarParser.COMMA) {
            this.state = 203;
            this.match(odeGrammarParser.COMMA);
            this.state = 204;
            this.match(odeGrammarParser.ID);
            this.state = 209;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 210;
        this.match(odeGrammarParser.ON);
        this.state = 211;
        this.match(odeGrammarParser.LPAREN);
        this.state = 212;
        localctx.condition = this.boolExpression(0);
        this.state = 213;
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

function BoolConstantContext(parser, ctx) {
	BoolExpressionContext.call(this, parser);
    this.value = null; // Token;
    BoolExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

BoolConstantContext.prototype = Object.create(BoolExpressionContext.prototype);
BoolConstantContext.prototype.constructor = BoolConstantContext;

odeGrammarParser.BoolConstantContext = BoolConstantContext;

BoolConstantContext.prototype.TRUE = function() {
    return this.getToken(odeGrammarParser.TRUE, 0);
};

BoolConstantContext.prototype.FALSE = function() {
    return this.getToken(odeGrammarParser.FALSE, 0);
};
BoolConstantContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitBoolConstant(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function BoolUnaryOperatorContext(parser, ctx) {
	BoolExpressionContext.call(this, parser);
    this.op = null; // Token;
    BoolExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

BoolUnaryOperatorContext.prototype = Object.create(BoolExpressionContext.prototype);
BoolUnaryOperatorContext.prototype.constructor = BoolUnaryOperatorContext;

odeGrammarParser.BoolUnaryOperatorContext = BoolUnaryOperatorContext;

BoolUnaryOperatorContext.prototype.boolExpression = function() {
    return this.getTypedRuleContext(BoolExpressionContext,0);
};

BoolUnaryOperatorContext.prototype.NOT = function() {
    return this.getToken(odeGrammarParser.NOT, 0);
};
BoolUnaryOperatorContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitBoolUnaryOperator(this);
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


function BBoolBinaryOperatorContext(parser, ctx) {
	BoolExpressionContext.call(this, parser);
    this.left = null; // BoolExpressionContext;
    this.op = null; // Token;
    this.right = null; // BoolExpressionContext;
    BoolExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

BBoolBinaryOperatorContext.prototype = Object.create(BoolExpressionContext.prototype);
BBoolBinaryOperatorContext.prototype.constructor = BBoolBinaryOperatorContext;

odeGrammarParser.BBoolBinaryOperatorContext = BBoolBinaryOperatorContext;

BBoolBinaryOperatorContext.prototype.boolExpression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(BoolExpressionContext);
    } else {
        return this.getTypedRuleContext(BoolExpressionContext,i);
    }
};

BBoolBinaryOperatorContext.prototype.AND = function() {
    return this.getToken(odeGrammarParser.AND, 0);
};

BBoolBinaryOperatorContext.prototype.OR = function() {
    return this.getToken(odeGrammarParser.OR, 0);
};
BBoolBinaryOperatorContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitBBoolBinaryOperator(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function EBoolBinaryOperatorContext(parser, ctx) {
	BoolExpressionContext.call(this, parser);
    this.leftexp = null; // ExpressionContext;
    this.op = null; // Token;
    this.rightexp = null; // ExpressionContext;
    BoolExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

EBoolBinaryOperatorContext.prototype = Object.create(BoolExpressionContext.prototype);
EBoolBinaryOperatorContext.prototype.constructor = EBoolBinaryOperatorContext;

odeGrammarParser.EBoolBinaryOperatorContext = EBoolBinaryOperatorContext;

EBoolBinaryOperatorContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

EBoolBinaryOperatorContext.prototype.L = function() {
    return this.getToken(odeGrammarParser.L, 0);
};

EBoolBinaryOperatorContext.prototype.LE = function() {
    return this.getToken(odeGrammarParser.LE, 0);
};

EBoolBinaryOperatorContext.prototype.G = function() {
    return this.getToken(odeGrammarParser.G, 0);
};

EBoolBinaryOperatorContext.prototype.GE = function() {
    return this.getToken(odeGrammarParser.GE, 0);
};

EBoolBinaryOperatorContext.prototype.E = function() {
    return this.getToken(odeGrammarParser.E, 0);
};

EBoolBinaryOperatorContext.prototype.NE = function() {
    return this.getToken(odeGrammarParser.NE, 0);
};
EBoolBinaryOperatorContext.prototype.accept = function(visitor) {
    if ( visitor instanceof odeGrammarVisitor ) {
        return visitor.visitEBoolBinaryOperator(this);
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
    var _startState = 40;
    this.enterRecursionRule(localctx, 40, odeGrammarParser.RULE_boolExpression, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 231;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
        switch(la_) {
        case 1:
            localctx = new BracketBoolExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 216;
            this.match(odeGrammarParser.LPAREN);
            this.state = 217;
            this.boolExpression(0);
            this.state = 218;
            this.match(odeGrammarParser.RPAREN);
            break;

        case 2:
            localctx = new BoolUnaryOperatorContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 220;
            localctx.op = this.match(odeGrammarParser.NOT);
            this.state = 221;
            this.boolExpression(6);
            break;

        case 3:
            localctx = new EBoolBinaryOperatorContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 222;
            localctx.leftexp = this.expression(0);
            this.state = 223;
            localctx.op = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(((((_la - 36)) & ~0x1f) == 0 && ((1 << (_la - 36)) & ((1 << (odeGrammarParser.L - 36)) | (1 << (odeGrammarParser.G - 36)) | (1 << (odeGrammarParser.LE - 36)) | (1 << (odeGrammarParser.GE - 36)))) !== 0))) {
                localctx.op = this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 224;
            localctx.rightexp = this.expression(0);
            break;

        case 4:
            localctx = new EBoolBinaryOperatorContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 226;
            localctx.leftexp = this.expression(0);
            this.state = 227;
            localctx.op = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(_la===odeGrammarParser.NE || _la===odeGrammarParser.E)) {
                localctx.op = this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 228;
            localctx.rightexp = this.expression(0);
            break;

        case 5:
            localctx = new BoolConstantContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 230;
            localctx.value = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(_la===odeGrammarParser.TRUE || _la===odeGrammarParser.FALSE)) {
                localctx.value = this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 241;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,19,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 239;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,18,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new BBoolBinaryOperatorContext(this, new BoolExpressionContext(this, _parentctx, _parentState));
                    localctx.left = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, odeGrammarParser.RULE_boolExpression);
                    this.state = 233;
                    if (!( this.precpred(this._ctx, 3))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
                    }
                    this.state = 234;
                    localctx.op = this.match(odeGrammarParser.AND);
                    this.state = 235;
                    localctx.right = this.boolExpression(4);
                    break;

                case 2:
                    localctx = new BBoolBinaryOperatorContext(this, new BoolExpressionContext(this, _parentctx, _parentState));
                    localctx.left = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, odeGrammarParser.RULE_boolExpression);
                    this.state = 236;
                    if (!( this.precpred(this._ctx, 2))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                    }
                    this.state = 237;
                    localctx.op = this.match(odeGrammarParser.OR);
                    this.state = 238;
                    localctx.right = this.boolExpression(3);
                    break;

                } 
            }
            this.state = 243;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,19,this._ctx);
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


function MacroExpressionContext(parser, ctx) {
	ExpressionContext.call(this, parser);
    this.id = null; // VarIdentifierContext;
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

MacroExpressionContext.prototype = Object.create(ExpressionContext.prototype);
MacroExpressionContext.prototype.constructor = MacroExpressionContext;

odeGrammarParser.MacroExpressionContext = MacroExpressionContext;

MacroExpressionContext.prototype.varIdentifier = function() {
    return this.getTypedRuleContext(VarIdentifierContext,0);
};

MacroExpressionContext.prototype.LPAREN = function() {
    return this.getToken(odeGrammarParser.LPAREN, 0);
};

MacroExpressionContext.prototype.RPAREN = function() {
    return this.getToken(odeGrammarParser.RPAREN, 0);
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
    this.op = null; // Token;
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

UnaryOperatorExpressionContext.prototype = Object.create(ExpressionContext.prototype);
UnaryOperatorExpressionContext.prototype.constructor = UnaryOperatorExpressionContext;

odeGrammarParser.UnaryOperatorExpressionContext = UnaryOperatorExpressionContext;

UnaryOperatorExpressionContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

UnaryOperatorExpressionContext.prototype.PLUS = function() {
    return this.getToken(odeGrammarParser.PLUS, 0);
};

UnaryOperatorExpressionContext.prototype.MINUS = function() {
    return this.getToken(odeGrammarParser.MINUS, 0);
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
    this.iterator = null; // Token;
    this.bounds = null; // LoopBoundsContext;
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

SummationExpressionContext.prototype.LPAREN = function() {
    return this.getToken(odeGrammarParser.LPAREN, 0);
};

SummationExpressionContext.prototype.IN = function() {
    return this.getToken(odeGrammarParser.IN, 0);
};

SummationExpressionContext.prototype.LSQR = function() {
    return this.getToken(odeGrammarParser.LSQR, 0);
};

SummationExpressionContext.prototype.RSQR = function() {
    return this.getToken(odeGrammarParser.RSQR, 0);
};

SummationExpressionContext.prototype.RPAREN = function() {
    return this.getToken(odeGrammarParser.RPAREN, 0);
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

SummationExpressionContext.prototype.loopBounds = function() {
    return this.getTypedRuleContext(LoopBoundsContext,0);
};

SummationExpressionContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
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
    this.der = null; // Token;
    ExpressionContext.prototype.copyFrom.call(this, ctx);
    return this;
}

VariableExpressionContext.prototype = Object.create(ExpressionContext.prototype);
VariableExpressionContext.prototype.constructor = VariableExpressionContext;

odeGrammarParser.VariableExpressionContext = VariableExpressionContext;

VariableExpressionContext.prototype.varIdentifier = function() {
    return this.getTypedRuleContext(VarIdentifierContext,0);
};

VariableExpressionContext.prototype.APOSTROPHE = function() {
    return this.getToken(odeGrammarParser.APOSTROPHE, 0);
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

TernaryOperatorExpressionContext.prototype.LCRL = function() {
    return this.getToken(odeGrammarParser.LCRL, 0);
};

TernaryOperatorExpressionContext.prototype.QUESTIONMARK = function() {
    return this.getToken(odeGrammarParser.QUESTIONMARK, 0);
};

TernaryOperatorExpressionContext.prototype.COLON = function() {
    return this.getToken(odeGrammarParser.COLON, 0);
};

TernaryOperatorExpressionContext.prototype.RCRL = function() {
    return this.getToken(odeGrammarParser.RCRL, 0);
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
    var _startState = 42;
    this.enterRecursionRule(localctx, 42, odeGrammarParser.RULE_expression, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 298;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,23,this._ctx);
        switch(la_) {
        case 1:
            localctx = new BracketExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 245;
            this.match(odeGrammarParser.LPAREN);
            this.state = 246;
            this.expression(0);
            this.state = 247;
            this.match(odeGrammarParser.RPAREN);
            break;

        case 2:
            localctx = new FunctionDerivativeContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 249;
            this.match(odeGrammarParser.DER);
            this.state = 250;
            this.match(odeGrammarParser.LPAREN);
            this.state = 251;
            localctx.id = this.varIdentifier();
            this.state = 252;
            this.match(odeGrammarParser.RPAREN);
            break;

        case 3:
            localctx = new FunctionExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 254;
            localctx.func = this.match(odeGrammarParser.ID);
            this.state = 255;
            this.match(odeGrammarParser.LPAREN);
            this.state = 256;
            this.functionArguments();
            this.state = 257;
            this.match(odeGrammarParser.RPAREN);
            break;

        case 4:
            localctx = new UnaryOperatorExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 259;
            localctx.op = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(_la===odeGrammarParser.PLUS || _la===odeGrammarParser.MINUS)) {
                localctx.op = this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 260;
            this.expression(8);
            break;

        case 5:
            localctx = new VariableExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 261;
            localctx.id = this.varIdentifier();
            this.state = 263;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
            if(la_===1) {
                this.state = 262;
                localctx.der = this.match(odeGrammarParser.APOSTROPHE);

            }
            break;

        case 6:
            localctx = new ConstantExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 265;
            localctx.value = this.number();
            break;

        case 7:
            localctx = new MacroExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 266;
            this.match(odeGrammarParser.T__0);
            this.state = 267;
            localctx.id = this.varIdentifier();
            this.state = 276;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,22,this._ctx);
            if(la_===1) {
                this.state = 268;
                this.match(odeGrammarParser.LPAREN);
                this.state = 272;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << odeGrammarParser.T__0) | (1 << odeGrammarParser.DER) | (1 << odeGrammarParser.SUM) | (1 << odeGrammarParser.FLOAT) | (1 << odeGrammarParser.INT) | (1 << odeGrammarParser.ID) | (1 << odeGrammarParser.PLUS) | (1 << odeGrammarParser.MINUS) | (1 << odeGrammarParser.LPAREN))) !== 0) || _la===odeGrammarParser.LCRL) {
                    this.state = 269;
                    this.expression(0);
                    this.state = 274;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 275;
                this.match(odeGrammarParser.RPAREN);

            }
            break;

        case 8:
            localctx = new SummationExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 278;
            this.match(odeGrammarParser.SUM);
            this.state = 279;
            this.match(odeGrammarParser.LPAREN);
            this.state = 280;
            localctx.iterator = this.match(odeGrammarParser.ID);
            this.state = 281;
            this.match(odeGrammarParser.IN);
            this.state = 282;
            this.match(odeGrammarParser.LSQR);
            this.state = 283;
            localctx.bounds = this.loopBounds();
            this.state = 284;
            this.match(odeGrammarParser.RSQR);
            this.state = 285;
            this.match(odeGrammarParser.RPAREN);
            this.state = 286;
            this.match(odeGrammarParser.LCRL);
            this.state = 287;
            localctx.summationExp = this.expression(0);
            this.state = 288;
            this.match(odeGrammarParser.RCRL);
            break;

        case 9:
            localctx = new TernaryOperatorExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 290;
            this.match(odeGrammarParser.LCRL);
            this.state = 291;
            localctx.condition = this.boolExpression(0);
            this.state = 292;
            this.match(odeGrammarParser.QUESTIONMARK);
            this.state = 293;
            localctx.first = this.expression(0);
            this.state = 294;
            this.match(odeGrammarParser.COLON);
            this.state = 295;
            localctx.second = this.expression(0);
            this.state = 296;
            this.match(odeGrammarParser.RCRL);
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 311;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,25,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 309;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,24,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new BinaryOperatorExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    localctx.left = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, odeGrammarParser.RULE_expression);
                    this.state = 300;
                    if (!( this.precpred(this._ctx, 9))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
                    }
                    this.state = 301;
                    localctx.op = this.match(odeGrammarParser.CARET);
                    this.state = 302;
                    localctx.right = this.expression(9);
                    break;

                case 2:
                    localctx = new BinaryOperatorExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    localctx.left = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, odeGrammarParser.RULE_expression);
                    this.state = 303;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 304;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===odeGrammarParser.ASTERISK || _la===odeGrammarParser.DIVISION)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 305;
                    localctx.right = this.expression(8);
                    break;

                case 3:
                    localctx = new BinaryOperatorExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
                    localctx.left = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, odeGrammarParser.RULE_expression);
                    this.state = 306;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 307;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===odeGrammarParser.PLUS || _la===odeGrammarParser.MINUS)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 308;
                    localctx.right = this.expression(7);
                    break;

                } 
            }
            this.state = 313;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,25,this._ctx);
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
    this.enterRule(localctx, 44, odeGrammarParser.RULE_functionArguments);
    var _la = 0; // Token type
    try {
        this.state = 323;
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
            this.state = 314;
            this.expression(0);
            this.state = 319;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===odeGrammarParser.COMMA) {
                this.state = 315;
                this.match(odeGrammarParser.COMMA);
                this.state = 316;
                this.expression(0);
                this.state = 321;
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
	case 20:
			return this.boolExpression_sempred(localctx, predIndex);
	case 21:
			return this.expression_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

odeGrammarParser.prototype.boolExpression_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 3);
		case 1:
			return this.precpred(this._ctx, 2);
		default:
			throw "No predicate with index:" + predIndex;
	}
};

odeGrammarParser.prototype.expression_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 2:
			return this.precpred(this._ctx, 9);
		case 3:
			return this.precpred(this._ctx, 7);
		case 4:
			return this.precpred(this._ctx, 6);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.odeGrammarParser = odeGrammarParser;
