// Generated from LatexLexer.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';



const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0002:\u01af\b\u0001\b\u0001\u0004\u0002\t\u0002\u0004\u0003",
    "\t\u0003\u0004\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006",
    "\u0004\u0007\t\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b",
    "\t\u000b\u0004\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f",
    "\u0004\u0010\t\u0010\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013",
    "\t\u0013\u0004\u0014\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016",
    "\u0004\u0017\t\u0017\u0004\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a",
    "\t\u001a\u0004\u001b\t\u001b\u0004\u001c\t\u001c\u0004\u001d\t\u001d",
    "\u0004\u001e\t\u001e\u0004\u001f\t\u001f\u0004 \t \u0004!\t!\u0004\"",
    "\t\"\u0004#\t#\u0004$\t$\u0004%\t%\u0004&\t&\u0004\'\t\'\u0004(\t(\u0004",
    ")\t)\u0004*\t*\u0004+\t+\u0004,\t,\u0004-\t-\u0004.\t.\u0004/\t/\u0004",
    "0\t0\u00041\t1\u00042\t2\u00043\t3\u00044\t4\u00045\t5\u00046\t6\u0004",
    "7\t7\u00048\t8\u00049\t9\u0004:\t:\u0004;\t;\u0004<\t<\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0004\u0003",
    "\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003",
    "\u0007\u0003\b\u0003\b\u0003\t\u0003\t\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\r\u0003",
    "\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\u000e\u0003\u000e\u0003\u000f",
    "\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0012",
    "\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0013\u0003\u0013\u0003\u0013",
    "\u0003\u0013\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0015",
    "\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015",
    "\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0016",
    "\u0003\u0016\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017",
    "\u0003\u0017\u0003\u0017\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018",
    "\u0003\u0018\u0003\u0019\u0003\u0019\u0003\u0019\u0003\u0019\u0003\u0019",
    "\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001b",
    "\u0003\u001b\u0003\u001b\u0003\u001b\u0003\u001b\u0003\u001c\u0003\u001c",
    "\u0003\u001c\u0003\u001d\u0003\u001d\u0003\u001d\u0003\u001d\u0003\u001e",
    "\u0003\u001e\u0003\u001e\u0003\u001e\u0003\u001e\u0003\u001e\u0003\u001e",
    "\u0003\u001e\u0003\u001f\u0003\u001f\u0003\u001f\u0003\u001f\u0003\u001f",
    "\u0003\u001f\u0003\u001f\u0003\u001f\u0003\u001f\u0003 \u0003 \u0003",
    "!\u0003!\u0003\"\u0003\"\u0003#\u0003#\u0003$\u0006$\u0107\n$\r$\u000e",
    "$\u0108\u0003$\u0003$\u0007$\u010d\n$\f$\u000e$\u0110\u000b$\u0003$",
    "\u0005$\u0113\n$\u0003$\u0003$\u0006$\u0117\n$\r$\u000e$\u0118\u0003",
    "$\u0005$\u011c\n$\u0003$\u0006$\u011f\n$\r$\u000e$\u0120\u0003$\u0005",
    "$\u0124\n$\u0005$\u0126\n$\u0003%\u0003%\u0003&\u0003&\u0005&\u012c",
    "\n&\u0003&\u0006&\u012f\n&\r&\u000e&\u0130\u0003\'\u0006\'\u0134\n\'",
    "\r\'\u000e\'\u0135\u0003(\u0006(\u0139\n(\r(\u000e(\u013a\u0003(\u0003",
    "(\u0003)\u0003)\u0003)\u0003)\u0003)\u0003*\u0003*\u0003+\u0003+\u0003",
    "+\u0003+\u0003,\u0003,\u0003,\u0003,\u0003,\u0003,\u0003-\u0003-\u0003",
    "-\u0003-\u0003-\u0003-\u0003.\u0003.\u0003.\u0003.\u0003.\u0003.\u0003",
    "/\u0003/\u00030\u00060\u015f\n0\r0\u000e0\u0160\u00031\u00031\u0003",
    "2\u00032\u00033\u00033\u00034\u00034\u00035\u00035\u00036\u00056\u016e",
    "\n6\u00036\u00066\u0171\n6\r6\u000e6\u0172\u00036\u00036\u00076\u0177",
    "\n6\f6\u000e6\u017a\u000b6\u00036\u00056\u017d\n6\u00036\u00036\u0006",
    "6\u0181\n6\r6\u000e6\u0182\u00036\u00056\u0186\n6\u00036\u00066\u0189",
    "\n6\r6\u000e6\u018a\u00056\u018d\n6\u00037\u00037\u00038\u00038\u0003",
    "8\u00038\u00038\u00038\u00038\u00038\u00039\u00039\u00039\u00039\u0003",
    "9\u00039\u00039\u00039\u00039\u0003:\u0006:\u01a3\n:\r:\u000e:\u01a4",
    "\u0003:\u0003:\u0003;\u0003;\u0003;\u0003;\u0003;\u0003<\u0003<\u0002",
    "\u0002=\u0004\u0003\u0006\u0004\b\u0005\n\u0006\f\u0007\u000e\b\u0010",
    "\t\u0012\n\u0014\u000b\u0016\f\u0018\r\u001a\u000e\u001c\u000f\u001e",
    "\u0010 \u0011\"\u0012$\u0013&\u0014(\u0015*\u0016,\u0017.\u00180\u0019",
    "2\u001a4\u001b6\u001c8\u001d:\u001e<\u001f> @!B\"D#F$H%J\u0002L\u0002",
    "N&P\'R(T)V*X+Z,\\-^.`/b0d1f2h3j4l5n\u0002p6r7t8v9x:\u0004\u0002\u0003",
    "\u0007\u0003\u00022;\u0004\u0002GGgg\u0004\u0002--//\u0004\u0002C\\",
    "c|\u0005\u0002\u000b\f\u000f\u000f\"\"\u0002\u01c2\u0002\u0004\u0003",
    "\u0002\u0002\u0002\u0002\u0006\u0003\u0002\u0002\u0002\u0002\b\u0003",
    "\u0002\u0002\u0002\u0002\n\u0003\u0002\u0002\u0002\u0002\f\u0003\u0002",
    "\u0002\u0002\u0002\u000e\u0003\u0002\u0002\u0002\u0002\u0010\u0003\u0002",
    "\u0002\u0002\u0002\u0012\u0003\u0002\u0002\u0002\u0002\u0014\u0003\u0002",
    "\u0002\u0002\u0002\u0016\u0003\u0002\u0002\u0002\u0002\u0018\u0003\u0002",
    "\u0002\u0002\u0002\u001a\u0003\u0002\u0002\u0002\u0002\u001c\u0003\u0002",
    "\u0002\u0002\u0002\u001e\u0003\u0002\u0002\u0002\u0002 \u0003\u0002",
    "\u0002\u0002\u0002\"\u0003\u0002\u0002\u0002\u0002$\u0003\u0002\u0002",
    "\u0002\u0002&\u0003\u0002\u0002\u0002\u0002(\u0003\u0002\u0002\u0002",
    "\u0002*\u0003\u0002\u0002\u0002\u0002,\u0003\u0002\u0002\u0002\u0002",
    ".\u0003\u0002\u0002\u0002\u00020\u0003\u0002\u0002\u0002\u00022\u0003",
    "\u0002\u0002\u0002\u00024\u0003\u0002\u0002\u0002\u00026\u0003\u0002",
    "\u0002\u0002\u00028\u0003\u0002\u0002\u0002\u0002:\u0003\u0002\u0002",
    "\u0002\u0002<\u0003\u0002\u0002\u0002\u0002>\u0003\u0002\u0002\u0002",
    "\u0002@\u0003\u0002\u0002\u0002\u0002B\u0003\u0002\u0002\u0002\u0002",
    "D\u0003\u0002\u0002\u0002\u0002F\u0003\u0002\u0002\u0002\u0002H\u0003",
    "\u0002\u0002\u0002\u0002N\u0003\u0002\u0002\u0002\u0002P\u0003\u0002",
    "\u0002\u0002\u0002R\u0003\u0002\u0002\u0002\u0002T\u0003\u0002\u0002",
    "\u0002\u0003V\u0003\u0002\u0002\u0002\u0003X\u0003\u0002\u0002\u0002",
    "\u0003Z\u0003\u0002\u0002\u0002\u0003\\\u0003\u0002\u0002\u0002\u0003",
    "^\u0003\u0002\u0002\u0002\u0003`\u0003\u0002\u0002\u0002\u0003b\u0003",
    "\u0002\u0002\u0002\u0003d\u0003\u0002\u0002\u0002\u0003f\u0003\u0002",
    "\u0002\u0002\u0003h\u0003\u0002\u0002\u0002\u0003j\u0003\u0002\u0002",
    "\u0002\u0003l\u0003\u0002\u0002\u0002\u0003p\u0003\u0002\u0002\u0002",
    "\u0003r\u0003\u0002\u0002\u0002\u0003t\u0003\u0002\u0002\u0002\u0003",
    "v\u0003\u0002\u0002\u0002\u0003x\u0003\u0002\u0002\u0002\u0004z\u0003",
    "\u0002\u0002\u0002\u0006~\u0003\u0002\u0002\u0002\b\u0080\u0003\u0002",
    "\u0002\u0002\n\u0082\u0003\u0002\u0002\u0002\f\u0084\u0003\u0002\u0002",
    "\u0002\u000e\u0086\u0003\u0002\u0002\u0002\u0010\u0088\u0003\u0002\u0002",
    "\u0002\u0012\u008a\u0003\u0002\u0002\u0002\u0014\u008c\u0003\u0002\u0002",
    "\u0002\u0016\u0090\u0003\u0002\u0002\u0002\u0018\u0096\u0003\u0002\u0002",
    "\u0002\u001a\u009c\u0003\u0002\u0002\u0002\u001c\u00a2\u0003\u0002\u0002",
    "\u0002\u001e\u00a4\u0003\u0002\u0002\u0002 \u00a8\u0003\u0002\u0002",
    "\u0002\"\u00ac\u0003\u0002\u0002\u0002$\u00b0\u0003\u0002\u0002\u0002",
    "&\u00b4\u0003\u0002\u0002\u0002(\u00b8\u0003\u0002\u0002\u0002*\u00bc",
    "\u0003\u0002\u0002\u0002,\u00c3\u0003\u0002\u0002\u0002.\u00ca\u0003",
    "\u0002\u0002\u00020\u00d1\u0003\u0002\u0002\u00022\u00d6\u0003\u0002",
    "\u0002\u00024\u00db\u0003\u0002\u0002\u00026\u00e0\u0003\u0002\u0002",
    "\u00028\u00e5\u0003\u0002\u0002\u0002:\u00e8\u0003\u0002\u0002\u0002",
    "<\u00ec\u0003\u0002\u0002\u0002>\u00f4\u0003\u0002\u0002\u0002@\u00fd",
    "\u0003\u0002\u0002\u0002B\u00ff\u0003\u0002\u0002\u0002D\u0101\u0003",
    "\u0002\u0002\u0002F\u0103\u0003\u0002\u0002\u0002H\u0125\u0003\u0002",
    "\u0002\u0002J\u0127\u0003\u0002\u0002\u0002L\u0129\u0003\u0002\u0002",
    "\u0002N\u0133\u0003\u0002\u0002\u0002P\u0138\u0003\u0002\u0002\u0002",
    "R\u013e\u0003\u0002\u0002\u0002T\u0143\u0003\u0002\u0002\u0002V\u0145",
    "\u0003\u0002\u0002\u0002X\u0149\u0003\u0002\u0002\u0002Z\u014f\u0003",
    "\u0002\u0002\u0002\\\u0155\u0003\u0002\u0002\u0002^\u015b\u0003\u0002",
    "\u0002\u0002`\u015e\u0003\u0002\u0002\u0002b\u0162\u0003\u0002\u0002",
    "\u0002d\u0164\u0003\u0002\u0002\u0002f\u0166\u0003\u0002\u0002\u0002",
    "h\u0168\u0003\u0002\u0002\u0002j\u016a\u0003\u0002\u0002\u0002l\u018c",
    "\u0003\u0002\u0002\u0002n\u018e\u0003\u0002\u0002\u0002p\u0190\u0003",
    "\u0002\u0002\u0002r\u0198\u0003\u0002\u0002\u0002t\u01a2\u0003\u0002",
    "\u0002\u0002v\u01a8\u0003\u0002\u0002\u0002x\u01ad\u0003\u0002\u0002",
    "\u0002z{\u0007]\u0002\u0002{|\u0003\u0002\u0002\u0002|}\b\u0002\u0002",
    "\u0002}\u0005\u0003\u0002\u0002\u0002~\u007f\u0007=\u0002\u0002\u007f",
    "\u0007\u0003\u0002\u0002\u0002\u0080\u0081\u0007}\u0002\u0002\u0081",
    "\t\u0003\u0002\u0002\u0002\u0082\u0083\u0007\u007f\u0002\u0002\u0083",
    "\u000b\u0003\u0002\u0002\u0002\u0084\u0085\u0007*\u0002\u0002\u0085",
    "\r\u0003\u0002\u0002\u0002\u0086\u0087\u0007+\u0002\u0002\u0087\u000f",
    "\u0003\u0002\u0002\u0002\u0088\u0089\u0007~\u0002\u0002\u0089\u0011",
    "\u0003\u0002\u0002\u0002\u008a\u008b\u0007a\u0002\u0002\u008b\u0013",
    "\u0003\u0002\u0002\u0002\u008c\u008d\u0007^\u0002\u0002\u008d\u008e",
    "\u0007r\u0002\u0002\u008e\u008f\u0007k\u0002\u0002\u008f\u0015\u0003",
    "\u0002\u0002\u0002\u0090\u0091\u0007^\u0002\u0002\u0091\u0092\u0007",
    "h\u0002\u0002\u0092\u0093\u0007t\u0002\u0002\u0093\u0094\u0007c\u0002",
    "\u0002\u0094\u0095\u0007e\u0002\u0002\u0095\u0017\u0003\u0002\u0002",
    "\u0002\u0096\u0097\u0007^\u0002\u0002\u0097\u0098\u0007e\u0002\u0002",
    "\u0098\u0099\u0007f\u0002\u0002\u0099\u009a\u0007q\u0002\u0002\u009a",
    "\u009b\u0007v\u0002\u0002\u009b\u0019\u0003\u0002\u0002\u0002\u009c",
    "\u009d\u0007^\u0002\u0002\u009d\u009e\u0007u\u0002\u0002\u009e\u009f",
    "\u0007s\u0002\u0002\u009f\u00a0\u0007t\u0002\u0002\u00a0\u00a1\u0007",
    "v\u0002\u0002\u00a1\u001b\u0003\u0002\u0002\u0002\u00a2\u00a3\u0007",
    "^\u0002\u0002\u00a3\u001d\u0003\u0002\u0002\u0002\u00a4\u00a5\u0007",
    "u\u0002\u0002\u00a5\u00a6\u0007k\u0002\u0002\u00a6\u00a7\u0007p\u0002",
    "\u0002\u00a7\u001f\u0003\u0002\u0002\u0002\u00a8\u00a9\u0007e\u0002",
    "\u0002\u00a9\u00aa\u0007q\u0002\u0002\u00aa\u00ab\u0007u\u0002\u0002",
    "\u00ab!\u0003\u0002\u0002\u0002\u00ac\u00ad\u0007v\u0002\u0002\u00ad",
    "\u00ae\u0007c\u0002\u0002\u00ae\u00af\u0007p\u0002\u0002\u00af#\u0003",
    "\u0002\u0002\u0002\u00b0\u00b1\u0007e\u0002\u0002\u00b1\u00b2\u0007",
    "q\u0002\u0002\u00b2\u00b3\u0007v\u0002\u0002\u00b3%\u0003\u0002\u0002",
    "\u0002\u00b4\u00b5\u0007u\u0002\u0002\u00b5\u00b6\u0007g\u0002\u0002",
    "\u00b6\u00b7\u0007e\u0002\u0002\u00b7\'\u0003\u0002\u0002\u0002\u00b8",
    "\u00b9\u0007e\u0002\u0002\u00b9\u00ba\u0007u\u0002\u0002\u00ba\u00bb",
    "\u0007e\u0002\u0002\u00bb)\u0003\u0002\u0002\u0002\u00bc\u00bd\u0007",
    "c\u0002\u0002\u00bd\u00be\u0007t\u0002\u0002\u00be\u00bf\u0007e\u0002",
    "\u0002\u00bf\u00c0\u0007u\u0002\u0002\u00c0\u00c1\u0007k\u0002\u0002",
    "\u00c1\u00c2\u0007p\u0002\u0002\u00c2+\u0003\u0002\u0002\u0002\u00c3",
    "\u00c4\u0007c\u0002\u0002\u00c4\u00c5\u0007t\u0002\u0002\u00c5\u00c6",
    "\u0007e\u0002\u0002\u00c6\u00c7\u0007e\u0002\u0002\u00c7\u00c8\u0007",
    "q\u0002\u0002\u00c8\u00c9\u0007u\u0002\u0002\u00c9-\u0003\u0002\u0002",
    "\u0002\u00ca\u00cb\u0007c\u0002\u0002\u00cb\u00cc\u0007t\u0002\u0002",
    "\u00cc\u00cd\u0007e\u0002\u0002\u00cd\u00ce\u0007v\u0002\u0002\u00ce",
    "\u00cf\u0007c\u0002\u0002\u00cf\u00d0\u0007p\u0002\u0002\u00d0/\u0003",
    "\u0002\u0002\u0002\u00d1\u00d2\u0007u\u0002\u0002\u00d2\u00d3\u0007",
    "k\u0002\u0002\u00d3\u00d4\u0007p\u0002\u0002\u00d4\u00d5\u0007j\u0002",
    "\u0002\u00d51\u0003\u0002\u0002\u0002\u00d6\u00d7\u0007e\u0002\u0002",
    "\u00d7\u00d8\u0007q\u0002\u0002\u00d8\u00d9\u0007u\u0002\u0002\u00d9",
    "\u00da\u0007j\u0002\u0002\u00da3\u0003\u0002\u0002\u0002\u00db\u00dc",
    "\u0007v\u0002\u0002\u00dc\u00dd\u0007c\u0002\u0002\u00dd\u00de\u0007",
    "p\u0002\u0002\u00de\u00df\u0007j\u0002\u0002\u00df5\u0003\u0002\u0002",
    "\u0002\u00e0\u00e1\u0007e\u0002\u0002\u00e1\u00e2\u0007q\u0002\u0002",
    "\u00e2\u00e3\u0007v\u0002\u0002\u00e3\u00e4\u0007j\u0002\u0002\u00e4",
    "7\u0003\u0002\u0002\u0002\u00e5\u00e6\u0007n\u0002\u0002\u00e6\u00e7",
    "\u0007p\u0002\u0002\u00e79\u0003\u0002\u0002\u0002\u00e8\u00e9\u0007",
    "n\u0002\u0002\u00e9\u00ea\u0007q\u0002\u0002\u00ea\u00eb\u0007i\u0002",
    "\u0002\u00eb;\u0003\u0002\u0002\u0002\u00ec\u00ed\u0007^\u0002\u0002",
    "\u00ed\u00ee\u0007n\u0002\u0002\u00ee\u00ef\u0007g\u0002\u0002\u00ef",
    "\u00f0\u0007h\u0002\u0002\u00f0\u00f1\u0007v\u0002\u0002\u00f1\u00f2",
    "\u0003\u0002\u0002\u0002\u00f2\u00f3\b\u001e\u0003\u0002\u00f3=\u0003",
    "\u0002\u0002\u0002\u00f4\u00f5\u0007^\u0002\u0002\u00f5\u00f6\u0007",
    "t\u0002\u0002\u00f6\u00f7\u0007k\u0002\u0002\u00f7\u00f8\u0007i\u0002",
    "\u0002\u00f8\u00f9\u0007j\u0002\u0002\u00f9\u00fa\u0007v\u0002\u0002",
    "\u00fa\u00fb\u0003\u0002\u0002\u0002\u00fb\u00fc\b\u001f\u0003\u0002",
    "\u00fc?\u0003\u0002\u0002\u0002\u00fd\u00fe\u0007-\u0002\u0002\u00fe",
    "A\u0003\u0002\u0002\u0002\u00ff\u0100\u0007/\u0002\u0002\u0100C\u0003",
    "\u0002\u0002\u0002\u0101\u0102\u0007`\u0002\u0002\u0102E\u0003\u0002",
    "\u0002\u0002\u0103\u0104\u0007?\u0002\u0002\u0104G\u0003\u0002\u0002",
    "\u0002\u0105\u0107\u0005J%\u0002\u0106\u0105\u0003\u0002\u0002\u0002",
    "\u0107\u0108\u0003\u0002\u0002\u0002\u0108\u0106\u0003\u0002\u0002\u0002",
    "\u0108\u0109\u0003\u0002\u0002\u0002\u0109\u010a\u0003\u0002\u0002\u0002",
    "\u010a\u010e\u00070\u0002\u0002\u010b\u010d\u0005J%\u0002\u010c\u010b",
    "\u0003\u0002\u0002\u0002\u010d\u0110\u0003\u0002\u0002\u0002\u010e\u010c",
    "\u0003\u0002\u0002\u0002\u010e\u010f\u0003\u0002\u0002\u0002\u010f\u0112",
    "\u0003\u0002\u0002\u0002\u0110\u010e\u0003\u0002\u0002\u0002\u0111\u0113",
    "\u0005L&\u0002\u0112\u0111\u0003\u0002\u0002\u0002\u0112\u0113\u0003",
    "\u0002\u0002\u0002\u0113\u0126\u0003\u0002\u0002\u0002\u0114\u0116\u0007",
    "0\u0002\u0002\u0115\u0117\u0005J%\u0002\u0116\u0115\u0003\u0002\u0002",
    "\u0002\u0117\u0118\u0003\u0002\u0002\u0002\u0118\u0116\u0003\u0002\u0002",
    "\u0002\u0118\u0119\u0003\u0002\u0002\u0002\u0119\u011b\u0003\u0002\u0002",
    "\u0002\u011a\u011c\u0005L&\u0002\u011b\u011a\u0003\u0002\u0002\u0002",
    "\u011b\u011c\u0003\u0002\u0002\u0002\u011c\u0126\u0003\u0002\u0002\u0002",
    "\u011d\u011f\u0005J%\u0002\u011e\u011d\u0003\u0002\u0002\u0002\u011f",
    "\u0120\u0003\u0002\u0002\u0002\u0120\u011e\u0003\u0002\u0002\u0002\u0120",
    "\u0121\u0003\u0002\u0002\u0002\u0121\u0123\u0003\u0002\u0002\u0002\u0122",
    "\u0124\u0005L&\u0002\u0123\u0122\u0003\u0002\u0002\u0002\u0123\u0124",
    "\u0003\u0002\u0002\u0002\u0124\u0126\u0003\u0002\u0002\u0002\u0125\u0106",
    "\u0003\u0002\u0002\u0002\u0125\u0114\u0003\u0002\u0002\u0002\u0125\u011e",
    "\u0003\u0002\u0002\u0002\u0126I\u0003\u0002\u0002\u0002\u0127\u0128",
    "\t\u0002\u0002\u0002\u0128K\u0003\u0002\u0002\u0002\u0129\u012b\t\u0003",
    "\u0002\u0002\u012a\u012c\t\u0004\u0002\u0002\u012b\u012a\u0003\u0002",
    "\u0002\u0002\u012b\u012c\u0003\u0002\u0002\u0002\u012c\u012e\u0003\u0002",
    "\u0002\u0002\u012d\u012f\u0005J%\u0002\u012e\u012d\u0003\u0002\u0002",
    "\u0002\u012f\u0130\u0003\u0002\u0002\u0002\u0130\u012e\u0003\u0002\u0002",
    "\u0002\u0130\u0131\u0003\u0002\u0002\u0002\u0131M\u0003\u0002\u0002",
    "\u0002\u0132\u0134\t\u0005\u0002\u0002\u0133\u0132\u0003\u0002\u0002",
    "\u0002\u0134\u0135\u0003\u0002\u0002\u0002\u0135\u0133\u0003\u0002\u0002",
    "\u0002\u0135\u0136\u0003\u0002\u0002\u0002\u0136O\u0003\u0002\u0002",
    "\u0002\u0137\u0139\t\u0006\u0002\u0002\u0138\u0137\u0003\u0002\u0002",
    "\u0002\u0139\u013a\u0003\u0002\u0002\u0002\u013a\u0138\u0003\u0002\u0002",
    "\u0002\u013a\u013b\u0003\u0002\u0002\u0002\u013b\u013c\u0003\u0002\u0002",
    "\u0002\u013c\u013d\b(\u0003\u0002\u013dQ\u0003\u0002\u0002\u0002\u013e",
    "\u013f\u0007^\u0002\u0002\u013f\u0140\u0007\"\u0002\u0002\u0140\u0141",
    "\u0003\u0002\u0002\u0002\u0141\u0142\b)\u0003\u0002\u0142S\u0003\u0002",
    "\u0002\u0002\u0143\u0144\u000b\u0002\u0002\u0002\u0144U\u0003\u0002",
    "\u0002\u0002\u0145\u0146\u0007_\u0002\u0002\u0146\u0147\u0003\u0002",
    "\u0002\u0002\u0147\u0148\b+\u0004\u0002\u0148W\u0003\u0002\u0002\u0002",
    "\u0149\u014a\u0007^\u0002\u0002\u014a\u014b\u0007h\u0002\u0002\u014b",
    "\u014c\u0007t\u0002\u0002\u014c\u014d\u0007c\u0002\u0002\u014d\u014e",
    "\u0007e\u0002\u0002\u014eY\u0003\u0002\u0002\u0002\u014f\u0150\u0007",
    "^\u0002\u0002\u0150\u0151\u0007e\u0002\u0002\u0151\u0152\u0007f\u0002",
    "\u0002\u0152\u0153\u0007q\u0002\u0002\u0153\u0154\u0007v\u0002\u0002",
    "\u0154[\u0003\u0002\u0002\u0002\u0155\u0156\u0007^\u0002\u0002\u0156",
    "\u0157\u0007u\u0002\u0002\u0157\u0158\u0007s\u0002\u0002\u0158\u0159",
    "\u0007t\u0002\u0002\u0159\u015a\u0007v\u0002\u0002\u015a]\u0003\u0002",
    "\u0002\u0002\u015b\u015c\u0007`\u0002\u0002\u015c_\u0003\u0002\u0002",
    "\u0002\u015d\u015f\t\u0005\u0002\u0002\u015e\u015d\u0003\u0002\u0002",
    "\u0002\u015f\u0160\u0003\u0002\u0002\u0002\u0160\u015e\u0003\u0002\u0002",
    "\u0002\u0160\u0161\u0003\u0002\u0002\u0002\u0161a\u0003\u0002\u0002",
    "\u0002\u0162\u0163\u0007*\u0002\u0002\u0163c\u0003\u0002\u0002\u0002",
    "\u0164\u0165\u0007+\u0002\u0002\u0165e\u0003\u0002\u0002\u0002\u0166",
    "\u0167\u0007}\u0002\u0002\u0167g\u0003\u0002\u0002\u0002\u0168\u0169",
    "\u0007\u007f\u0002\u0002\u0169i\u0003\u0002\u0002\u0002\u016a\u016b",
    "\u00073\u0002\u0002\u016bk\u0003\u0002\u0002\u0002\u016c\u016e\u0007",
    "/\u0002\u0002\u016d\u016c\u0003\u0002\u0002\u0002\u016d\u016e\u0003",
    "\u0002\u0002\u0002\u016e\u0170\u0003\u0002\u0002\u0002\u016f\u0171\u0005",
    "n7\u0002\u0170\u016f\u0003\u0002\u0002\u0002\u0171\u0172\u0003\u0002",
    "\u0002\u0002\u0172\u0170\u0003\u0002\u0002\u0002\u0172\u0173\u0003\u0002",
    "\u0002\u0002\u0173\u0174\u0003\u0002\u0002\u0002\u0174\u0178\u00070",
    "\u0002\u0002\u0175\u0177\u0005n7\u0002\u0176\u0175\u0003\u0002\u0002",
    "\u0002\u0177\u017a\u0003\u0002\u0002\u0002\u0178\u0176\u0003\u0002\u0002",
    "\u0002\u0178\u0179\u0003\u0002\u0002\u0002\u0179\u018d\u0003\u0002\u0002",
    "\u0002\u017a\u0178\u0003\u0002\u0002\u0002\u017b\u017d\u0007/\u0002",
    "\u0002\u017c\u017b\u0003\u0002\u0002\u0002\u017c\u017d\u0003\u0002\u0002",
    "\u0002\u017d\u017e\u0003\u0002\u0002\u0002\u017e\u0180\u00070\u0002",
    "\u0002\u017f\u0181\u0005n7\u0002\u0180\u017f\u0003\u0002\u0002\u0002",
    "\u0181\u0182\u0003\u0002\u0002\u0002\u0182\u0180\u0003\u0002\u0002\u0002",
    "\u0182\u0183\u0003\u0002\u0002\u0002\u0183\u018d\u0003\u0002\u0002\u0002",
    "\u0184\u0186\u0007/\u0002\u0002\u0185\u0184\u0003\u0002\u0002\u0002",
    "\u0185\u0186\u0003\u0002\u0002\u0002\u0186\u0188\u0003\u0002\u0002\u0002",
    "\u0187\u0189\u0005n7\u0002\u0188\u0187\u0003\u0002\u0002\u0002\u0189",
    "\u018a\u0003\u0002\u0002\u0002\u018a\u0188\u0003\u0002\u0002\u0002\u018a",
    "\u018b\u0003\u0002\u0002\u0002\u018b\u018d\u0003\u0002\u0002\u0002\u018c",
    "\u016d\u0003\u0002\u0002\u0002\u018c\u017c\u0003\u0002\u0002\u0002\u018c",
    "\u0185\u0003\u0002\u0002\u0002\u018dm\u0003\u0002\u0002\u0002\u018e",
    "\u018f\t\u0002\u0002\u0002\u018fo\u0003\u0002\u0002\u0002\u0190\u0191",
    "\u0007^\u0002\u0002\u0191\u0192\u0007n\u0002\u0002\u0192\u0193\u0007",
    "g\u0002\u0002\u0193\u0194\u0007h\u0002\u0002\u0194\u0195\u0007v\u0002",
    "\u0002\u0195\u0196\u0003\u0002\u0002\u0002\u0196\u0197\b8\u0003\u0002",
    "\u0197q\u0003\u0002\u0002\u0002\u0198\u0199\u0007^\u0002\u0002\u0199",
    "\u019a\u0007t\u0002\u0002\u019a\u019b\u0007k\u0002\u0002\u019b\u019c",
    "\u0007i\u0002\u0002\u019c\u019d\u0007j\u0002\u0002\u019d\u019e\u0007",
    "v\u0002\u0002\u019e\u019f\u0003\u0002\u0002\u0002\u019f\u01a0\b9\u0003",
    "\u0002\u01a0s\u0003\u0002\u0002\u0002\u01a1\u01a3\t\u0006\u0002\u0002",
    "\u01a2\u01a1\u0003\u0002\u0002\u0002\u01a3\u01a4\u0003\u0002\u0002\u0002",
    "\u01a4\u01a2\u0003\u0002\u0002\u0002\u01a4\u01a5\u0003\u0002\u0002\u0002",
    "\u01a5\u01a6\u0003\u0002\u0002\u0002\u01a6\u01a7\b:\u0003\u0002\u01a7",
    "u\u0003\u0002\u0002\u0002\u01a8\u01a9\u0007^\u0002\u0002\u01a9\u01aa",
    "\u0007\"\u0002\u0002\u01aa\u01ab\u0003\u0002\u0002\u0002\u01ab\u01ac",
    "\b;\u0003\u0002\u01acw\u0003\u0002\u0002\u0002\u01ad\u01ae\u000b\u0002",
    "\u0002\u0002\u01aey\u0003\u0002\u0002\u0002\u001a\u0002\u0003\u0108",
    "\u010e\u0112\u0118\u011b\u0120\u0123\u0125\u012b\u0130\u0135\u013a\u0160",
    "\u016d\u0172\u0178\u017c\u0182\u0185\u018a\u018c\u01a4\u0005\u0004\u0003",
    "\u0002\b\u0002\u0002\u0004\u0002\u0002"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

export default class LatexLexer extends antlr4.Lexer {

    static grammarFileName = "LatexLexer.g4";
    static channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	static modeNames = [ "DEFAULT_MODE", "UNITS" ];
	static literalNames = [ null, "'['", "';'", null, null, null, null, "'|'", 
                         "'_'", "'\\pi'", null, null, null, "'\\'", "'sin'", 
                         "'cos'", "'tan'", "'cot'", "'sec'", "'csc'", "'arcsin'", 
                         "'arccos'", "'arctan'", "'sinh'", "'cosh'", "'tanh'", 
                         "'coth'", "'ln'", "'log'", null, null, "'+'", "'-'", 
                         null, "'='", null, null, null, null, null, "']'", 
                         null, null, null, null, null, null, null, null, 
                         null, "'1'" ];
	static symbolicNames = [ null, "L_BRACKET", "SEMICOLON", "L_BRACE", "R_BRACE", 
                          "L_PAREN", "R_PAREN", "VBAR", "UNDERSCORE", "PI", 
                          "CMD_FRAC", "CMD_CDOT", "CMD_SQRT", "BACK_SLASH", 
                          "CMD_SIN", "CMD_COS", "CMD_TAN", "CMD_COT", "CMD_SEC", 
                          "CMD_CSC", "CMD_ARCSIN", "CMD_ARCCOS", "CMD_ARCTAN", 
                          "CMD_SINH", "CMD_COSH", "CMD_TANH", "CMD_COTH", 
                          "CMD_LN", "CMD_LOG", "CMD_LEFT", "CMD_RIGHT", 
                          "ADD", "SUB", "CARET", "EQ", "NUMBER", "ID", "WS", 
                          "SLASH_SPACE", "ERROR_CHAR", "R_BRACKET", "U_CMD_FRAC", 
                          "U_CMD_CDOT", "U_CMD_SQRT", "U_CARET", "U_NAME", 
                          "U_L_PAREN", "U_R_PAREN", "U_L_BRACE", "U_R_BRACE", 
                          "U_ONE", "U_NUMBER", "U_CMD_LEFT", "U_CMD_RIGHT", 
                          "U_WS", "U_SLASH_SPACE", "U_ERROR_CHAR" ];
	static ruleNames = [ "L_BRACKET", "SEMICOLON", "L_BRACE", "R_BRACE", "L_PAREN", 
                      "R_PAREN", "VBAR", "UNDERSCORE", "PI", "CMD_FRAC", 
                      "CMD_CDOT", "CMD_SQRT", "BACK_SLASH", "CMD_SIN", "CMD_COS", 
                      "CMD_TAN", "CMD_COT", "CMD_SEC", "CMD_CSC", "CMD_ARCSIN", 
                      "CMD_ARCCOS", "CMD_ARCTAN", "CMD_SINH", "CMD_COSH", 
                      "CMD_TANH", "CMD_COTH", "CMD_LN", "CMD_LOG", "CMD_LEFT", 
                      "CMD_RIGHT", "ADD", "SUB", "CARET", "EQ", "NUMBER", 
                      "DIGIT", "EXP", "ID", "WS", "SLASH_SPACE", "ERROR_CHAR", 
                      "R_BRACKET", "U_CMD_FRAC", "U_CMD_CDOT", "U_CMD_SQRT", 
                      "U_CARET", "U_NAME", "U_L_PAREN", "U_R_PAREN", "U_L_BRACE", 
                      "U_R_BRACE", "U_ONE", "U_NUMBER", "U_DIGIT", "U_CMD_LEFT", 
                      "U_CMD_RIGHT", "U_WS", "U_SLASH_SPACE", "U_ERROR_CHAR" ];

    constructor(input) {
        super(input)
        this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    }

    get atn() {
        return atn;
    }
}

LatexLexer.EOF = antlr4.Token.EOF;
LatexLexer.L_BRACKET = 1;
LatexLexer.SEMICOLON = 2;
LatexLexer.L_BRACE = 3;
LatexLexer.R_BRACE = 4;
LatexLexer.L_PAREN = 5;
LatexLexer.R_PAREN = 6;
LatexLexer.VBAR = 7;
LatexLexer.UNDERSCORE = 8;
LatexLexer.PI = 9;
LatexLexer.CMD_FRAC = 10;
LatexLexer.CMD_CDOT = 11;
LatexLexer.CMD_SQRT = 12;
LatexLexer.BACK_SLASH = 13;
LatexLexer.CMD_SIN = 14;
LatexLexer.CMD_COS = 15;
LatexLexer.CMD_TAN = 16;
LatexLexer.CMD_COT = 17;
LatexLexer.CMD_SEC = 18;
LatexLexer.CMD_CSC = 19;
LatexLexer.CMD_ARCSIN = 20;
LatexLexer.CMD_ARCCOS = 21;
LatexLexer.CMD_ARCTAN = 22;
LatexLexer.CMD_SINH = 23;
LatexLexer.CMD_COSH = 24;
LatexLexer.CMD_TANH = 25;
LatexLexer.CMD_COTH = 26;
LatexLexer.CMD_LN = 27;
LatexLexer.CMD_LOG = 28;
LatexLexer.CMD_LEFT = 29;
LatexLexer.CMD_RIGHT = 30;
LatexLexer.ADD = 31;
LatexLexer.SUB = 32;
LatexLexer.CARET = 33;
LatexLexer.EQ = 34;
LatexLexer.NUMBER = 35;
LatexLexer.ID = 36;
LatexLexer.WS = 37;
LatexLexer.SLASH_SPACE = 38;
LatexLexer.ERROR_CHAR = 39;
LatexLexer.R_BRACKET = 40;
LatexLexer.U_CMD_FRAC = 41;
LatexLexer.U_CMD_CDOT = 42;
LatexLexer.U_CMD_SQRT = 43;
LatexLexer.U_CARET = 44;
LatexLexer.U_NAME = 45;
LatexLexer.U_L_PAREN = 46;
LatexLexer.U_R_PAREN = 47;
LatexLexer.U_L_BRACE = 48;
LatexLexer.U_R_BRACE = 49;
LatexLexer.U_ONE = 50;
LatexLexer.U_NUMBER = 51;
LatexLexer.U_CMD_LEFT = 52;
LatexLexer.U_CMD_RIGHT = 53;
LatexLexer.U_WS = 54;
LatexLexer.U_SLASH_SPACE = 55;
LatexLexer.U_ERROR_CHAR = 56;

LatexLexer.UNITS = 1;




