var Module=typeof globalThis.__pyodide_module!=="undefined"?globalThis.__pyodide_module:{};if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH="";if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof process==="undefined"&&typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}var PACKAGE_NAME="mpmath.data";var REMOTE_PACKAGE_BASE="mpmath.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata["remote_package_size"];var PACKAGE_UUID=metadata["package_uuid"];function fetchRemotePackage(packageName,packageSize,callback,errback){if(typeof process==="object"){require("fs").readFile(packageName,function(err,contents){if(err){errback(err)}else{callback(contents.buffer)}});return}var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.9",true,true);Module["FS_createPath"]("/lib/python3.9","site-packages",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages","mpmath",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages/mpmath","calculus",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages/mpmath","functions",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages/mpmath","libmp",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages/mpmath","matrices",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages/mpmath","tests",true,true);Module["FS_createPath"]("/lib/python3.9/site-packages","mpmath-1.2.1-py3.9.egg-info",true,true);function processPackageData(arrayBuffer){assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:1109007,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1280,2545,3770,5069,6153,7162,8435,9548,10726,11733,12783,13791,15131,16130,17211,18495,19401,20332,21199,22252,23062,24074,25063,26459,27632,28568,29115,30012,30807,31625,32605,33464,34897,35943,37173,38249,39441,40629,41605,42804,43872,45027,46041,47276,48171,49228,50383,51569,52856,53716,54617,55535,56336,57584,58538,59027,59812,60949,62002,62924,63980,64928,66015,67116,68167,69276,70829,72256,73556,74804,76213,77730,79108,80510,81632,82825,83981,85307,86573,87642,88808,89962,91229,92266,93508,95103,96545,97657,99019,100341,101742,103182,104683,106177,107689,109096,110567,112071,113285,114722,116093,117197,118678,120038,121542,123012,124448,126018,127503,128660,130176,131606,133036,134654,136079,137434,138864,140216,141648,142993,144317,145719,147064,148488,149624,150771,152313,153598,154919,156409,157583,158784,160217,161626,163102,164515,165901,167321,168830,170113,171475,172948,173960,175502,176796,178108,179286,180638,181950,183394,184792,186367,187884,189348,190546,191854,193234,194703,196191,197785,199270,200824,202276,203637,205077,206610,207933,209308,210423,211621,212999,214346,215691,217106,218424,219589,221086,222525,223815,225185,226619,227973,229373,230701,232063,233351,234775,236189,237747,239124,240506,242038,243521,244723,246056,247447,248747,250171,251537,252747,254024,255385,256530,257976,259194,260613,261721,263012,264486,265837,267028,268019,269387,270644,272061,273407,274614,276072,277073,278045,279219,280275,281697,282810,283945,285650,286969,287798,288223,289636,290912,292332,293328,294837,296229,297411,298677,300150,301691,303039,304312,305583,306905,308217,309532,310901,312240,313705,315107,316513,317940,319410,320866,322375,323716,325124,326444,327442,328482,329841,330944,331790,332744,334091,335303,336740,338181,339595,340776,341873,342700,344009,345509,346797,348057,349345,350607,351829,352910,354188,355413,356483,357731,359067,360464,361888,363294,364645,365904,367237,368526,369926,371331,372684,374056,375424,376428,377827,379248,380514,381810,383028,384473,385896,387310,388627,389862,390961,392089,393298,394532,395648,396910,398070,399471,400869,402323,403665,404952,406059,407352,408461,409715,411016,412372,413484,414751,415828,416980,418333,419535,421044,422362,423829,425189,426587,427917,429079,430315,431478,432308,433676,434896,436143,437309,438548,439587,440759,441787,442833,443588,444775,445828,446891,447848,448896,450065,451193,452546,453612,454970,456197,457420,458779,460203,461157,462019,463172,464469,465750,466964,468048,469377,470528,471922,473176,474379,475658,476973,478358,479609,480912,482163,483178,484162,485429,486477,487736,488829,489801,490893,492221,493420,494340,495232,496501,497726,498808,499993,501263,502526,503736,504919,505936,506767,507815,508867,510120,511489,512686,514132,515381,516456,517611,518807,520047,520995,522257,523329,524564,525663,526746,527988,528925,529803,531182,532414,533669,534929,536021,537239,538330,539399,540485,541921,543264,544486,545848,547200,548446,549736,550885,552249,553555,554907,556165,557420,558361,559175,560222,561573,562927,564324,565578,566604,567779,568976,570195,571398,572634,573888,574780,575690,576592,577368,578257,579206,580102,581146,581976,582859,583884,584719,585649,586649,587378,588473,589078,589682,590891,591904,593674,595034,596186,597428,598547,599541,600614,601954,603312,604365,605421,606851,608171,609510,610838,612347,613516,614606,615899,616732,618075,619370,620633,622012,623391,624519,625678,626795,627938,629086,630348,631579,632828,634042,635284,636741,638274,639596,641110,642285,643661,645027,646402,647639,649065,650394,651637,652847,654156,655399,656594,657917,659135,660375,661273,662533,663727,664964,666081,667155,668314,669434,670397,671611,672692,673960,675141,676364,677341,678732,679920,681281,682747,683906,685083,686485,687598,688991,690184,691422,692724,694011,695145,696171,697393,698590,699906,701043,702140,703025,704378,705630,706459,707423,708174,709271,710494,711717,712875,713941,715143,716109,717396,718516,719644,720931,722187,723331,724781,725879,727115,728601,729835,731011,732348,733793,735054,736110,737005,738087,739218,740327,741591,742670,743463,744748,745858,746812,747939,749193,750427,751556,752842,753875,755042,756119,757455,758445,759842,761007,762220,762965,764202,764981,766244,767423,768605,769882,771275,772469,773835,775166,776102,776843,777999,778785,779902,781005,782121,783335,784419,785355,786511,787468,788438,789675,790710,791867,792980,793948,795077,796236,797189,798218,799348,800723,801724,803101,804468,805607,806776,808081,809047,810268,811501,812697,813652,815026,816077,817411,818561,819591,821027,822107,823363,824663,825871,827087,828307,829315,830468,831570,832443,833421,834387,835735,836693,837543,838496,839518,840666,841785,842971,844246,845435,846844,848204,849334,850529,851655,852932,854118,855221,856313,857699,858813,859544,860511,861745,863066,864307,865682,866756,867923,868966,869997,870869,871890,872748,873708,874448,875648,876886,878199,879245,880712,882101,883454,884628,885728,886457,887292,888407,889438,890146,890919,891449,892118,892563,893258,894114,895511,896826,898326,899388,900453,901487,902315,903414,904246,905188,906002,906787,907768,908941,909852,910743,911421,912384,913454,914760,915584,916735,917927,918879,919850,920972,922101,923090,924343,925627,927176,928903,930207,930898,931634,932747,933952,935106,936015,937044,938279,939342,940081,940946,941784,942661,943492,944369,945253,945974,946510,947202,948061,948946,949816,950634,951529,952382,953249,954069,954784,955667,956515,957377,958184,959043,959807,960528,961227,961965,962759,963602,964407,965271,966143,967009,968243,969760,970810,971834,972825,973615,974459,975523,976488,977412,978255,979197,980026,981094,981876,982918,983882,985129,986407,987462,988907,990178,991242,992382,993160,993905,994948,995930,997019,998427,999902,1001157,1002375,1003358,1004342,1005197,1006309,1007213,1008392,1009118,1010002,1010948,1012022,1013064,1014105,1015371,1016420,1017172,1018053,1019006,1020284,1021420,1022622,1024434,1026264,1028077,1029884,1031718,1033563,1035383,1037196,1039013,1040565,1041513,1042124,1043057,1044352,1045370,1046382,1047541,1048911,1049892,1050910,1052094,1053336,1054526,1056046,1057858,1059693,1061379,1062696,1063802,1064807,1065559,1066202,1066852,1067840,1068726,1069410,1070517,1071736,1072744,1073968,1075275,1076642,1077777,1079026,1080027,1081232,1082197,1083305,1084519,1085754,1086944,1087877,1088595,1089613,1090648,1091811,1092773,1093740,1094755,1095530,1096088,1097531,1099026,1099944,1100560,1101646,1103084,1104455,1105908,1107154,1107703,1108504],sizes:[1280,1265,1225,1299,1084,1009,1273,1113,1178,1007,1050,1008,1340,999,1081,1284,906,931,867,1053,810,1012,989,1396,1173,936,547,897,795,818,980,859,1433,1046,1230,1076,1192,1188,976,1199,1068,1155,1014,1235,895,1057,1155,1186,1287,860,901,918,801,1248,954,489,785,1137,1053,922,1056,948,1087,1101,1051,1109,1553,1427,1300,1248,1409,1517,1378,1402,1122,1193,1156,1326,1266,1069,1166,1154,1267,1037,1242,1595,1442,1112,1362,1322,1401,1440,1501,1494,1512,1407,1471,1504,1214,1437,1371,1104,1481,1360,1504,1470,1436,1570,1485,1157,1516,1430,1430,1618,1425,1355,1430,1352,1432,1345,1324,1402,1345,1424,1136,1147,1542,1285,1321,1490,1174,1201,1433,1409,1476,1413,1386,1420,1509,1283,1362,1473,1012,1542,1294,1312,1178,1352,1312,1444,1398,1575,1517,1464,1198,1308,1380,1469,1488,1594,1485,1554,1452,1361,1440,1533,1323,1375,1115,1198,1378,1347,1345,1415,1318,1165,1497,1439,1290,1370,1434,1354,1400,1328,1362,1288,1424,1414,1558,1377,1382,1532,1483,1202,1333,1391,1300,1424,1366,1210,1277,1361,1145,1446,1218,1419,1108,1291,1474,1351,1191,991,1368,1257,1417,1346,1207,1458,1001,972,1174,1056,1422,1113,1135,1705,1319,829,425,1413,1276,1420,996,1509,1392,1182,1266,1473,1541,1348,1273,1271,1322,1312,1315,1369,1339,1465,1402,1406,1427,1470,1456,1509,1341,1408,1320,998,1040,1359,1103,846,954,1347,1212,1437,1441,1414,1181,1097,827,1309,1500,1288,1260,1288,1262,1222,1081,1278,1225,1070,1248,1336,1397,1424,1406,1351,1259,1333,1289,1400,1405,1353,1372,1368,1004,1399,1421,1266,1296,1218,1445,1423,1414,1317,1235,1099,1128,1209,1234,1116,1262,1160,1401,1398,1454,1342,1287,1107,1293,1109,1254,1301,1356,1112,1267,1077,1152,1353,1202,1509,1318,1467,1360,1398,1330,1162,1236,1163,830,1368,1220,1247,1166,1239,1039,1172,1028,1046,755,1187,1053,1063,957,1048,1169,1128,1353,1066,1358,1227,1223,1359,1424,954,862,1153,1297,1281,1214,1084,1329,1151,1394,1254,1203,1279,1315,1385,1251,1303,1251,1015,984,1267,1048,1259,1093,972,1092,1328,1199,920,892,1269,1225,1082,1185,1270,1263,1210,1183,1017,831,1048,1052,1253,1369,1197,1446,1249,1075,1155,1196,1240,948,1262,1072,1235,1099,1083,1242,937,878,1379,1232,1255,1260,1092,1218,1091,1069,1086,1436,1343,1222,1362,1352,1246,1290,1149,1364,1306,1352,1258,1255,941,814,1047,1351,1354,1397,1254,1026,1175,1197,1219,1203,1236,1254,892,910,902,776,889,949,896,1044,830,883,1025,835,930,1e3,729,1095,605,604,1209,1013,1770,1360,1152,1242,1119,994,1073,1340,1358,1053,1056,1430,1320,1339,1328,1509,1169,1090,1293,833,1343,1295,1263,1379,1379,1128,1159,1117,1143,1148,1262,1231,1249,1214,1242,1457,1533,1322,1514,1175,1376,1366,1375,1237,1426,1329,1243,1210,1309,1243,1195,1323,1218,1240,898,1260,1194,1237,1117,1074,1159,1120,963,1214,1081,1268,1181,1223,977,1391,1188,1361,1466,1159,1177,1402,1113,1393,1193,1238,1302,1287,1134,1026,1222,1197,1316,1137,1097,885,1353,1252,829,964,751,1097,1223,1223,1158,1066,1202,966,1287,1120,1128,1287,1256,1144,1450,1098,1236,1486,1234,1176,1337,1445,1261,1056,895,1082,1131,1109,1264,1079,793,1285,1110,954,1127,1254,1234,1129,1286,1033,1167,1077,1336,990,1397,1165,1213,745,1237,779,1263,1179,1182,1277,1393,1194,1366,1331,936,741,1156,786,1117,1103,1116,1214,1084,936,1156,957,970,1237,1035,1157,1113,968,1129,1159,953,1029,1130,1375,1001,1377,1367,1139,1169,1305,966,1221,1233,1196,955,1374,1051,1334,1150,1030,1436,1080,1256,1300,1208,1216,1220,1008,1153,1102,873,978,966,1348,958,850,953,1022,1148,1119,1186,1275,1189,1409,1360,1130,1195,1126,1277,1186,1103,1092,1386,1114,731,967,1234,1321,1241,1375,1074,1167,1043,1031,872,1021,858,960,740,1200,1238,1313,1046,1467,1389,1353,1174,1100,729,835,1115,1031,708,773,530,669,445,695,856,1397,1315,1500,1062,1065,1034,828,1099,832,942,814,785,981,1173,911,891,678,963,1070,1306,824,1151,1192,952,971,1122,1129,989,1253,1284,1549,1727,1304,691,736,1113,1205,1154,909,1029,1235,1063,739,865,838,877,831,877,884,721,536,692,859,885,870,818,895,853,867,820,715,883,848,862,807,859,764,721,699,738,794,843,805,864,872,866,1234,1517,1050,1024,991,790,844,1064,965,924,843,942,829,1068,782,1042,964,1247,1278,1055,1445,1271,1064,1140,778,745,1043,982,1089,1408,1475,1255,1218,983,984,855,1112,904,1179,726,884,946,1074,1042,1041,1266,1049,752,881,953,1278,1136,1202,1812,1830,1813,1807,1834,1845,1820,1813,1817,1552,948,611,933,1295,1018,1012,1159,1370,981,1018,1184,1242,1190,1520,1812,1835,1686,1317,1106,1005,752,643,650,988,886,684,1107,1219,1008,1224,1307,1367,1135,1249,1001,1205,965,1108,1214,1235,1190,933,718,1018,1035,1163,962,967,1015,775,558,1443,1495,918,616,1086,1438,1371,1453,1246,549,801,503],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData["data"]=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData},true);Module["removeRunDependency"]("datafile_mpmath.data")}Module["addRunDependency"]("datafile_mpmath.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.9/site-packages/mpmath/__init__.py",start:0,end:8613,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/ctx_base.py",start:8613,end:24598,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/ctx_fp.py",start:24598,end:31170,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/ctx_iv.py",start:31170,end:48381,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/ctx_mp.py",start:48381,end:97829,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/ctx_mp_python.py",start:97829,end:135559,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/function_docs.py",start:135559,end:416077,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/identification.py",start:416077,end:445330,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/math2.py",start:445330,end:463891,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/rational.py",start:463891,end:469867,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/usertools.py",start:469867,end:472896,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/visualization.py",start:472896,end:483523,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/calculus/__init__.py",start:483523,end:483685,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/calculus/approximation.py",start:483685,end:492502,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/calculus/calculus.py",start:492502,end:492614,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/calculus/differentiation.py",start:492614,end:512840,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/calculus/extrapolation.py",start:512840,end:586135,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/calculus/inverselaplace.py",start:586135,end:617270,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/calculus/odes.py",start:617270,end:627178,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/calculus/optimization.py",start:627178,end:660034,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/calculus/polynomials.py",start:660034,end:667911,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/calculus/quadrature.py",start:667911,end:706398,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/functions/__init__.py",start:706398,end:706706,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/functions/bessel.py",start:706706,end:744644,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/functions/elliptic.py",start:744644,end:786943,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/functions/expintegrals.py",start:786943,end:798587,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/functions/factorials.py",start:798587,end:803860,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/functions/functions.py",start:803860,end:821960,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/functions/hypergeometric.py",start:821960,end:873530,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/functions/orthogonal.py",start:873530,end:889627,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/functions/qfunctions.py",start:889627,end:897260,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/functions/rszeta.py",start:897260,end:943444,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/functions/theta.py",start:943444,end:980764,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/functions/zeta.py",start:980764,end:1017153,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/functions/zetazeros.py",start:1017153,end:1048011,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/libmp/__init__.py",start:1048011,end:1051801,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/libmp/backend.py",start:1051801,end:1055161,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/libmp/gammazeta.py",start:1055161,end:1126619,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/libmp/libelefun.py",start:1126619,end:1170480,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/libmp/libhyper.py",start:1170480,end:1207104,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/libmp/libintmath.py",start:1207104,end:1223792,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/libmp/libmpc.py",start:1223792,end:1250667,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/libmp/libmpf.py",start:1250667,end:1295689,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/libmp/libmpi.py",start:1295689,end:1323311,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/matrices/__init__.py",start:1323311,end:1323405,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/matrices/calculus.py",start:1323405,end:1342014,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/matrices/eigen.py",start:1342014,end:1366408,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/matrices/eigen_symmetric.py",start:1366408,end:1424942,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/matrices/linalg.py",start:1424942,end:1451904,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/matrices/matrices.py",start:1451904,end:1484072,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/__init__.py",start:1484072,end:1484072,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/extratest_gamma.py",start:1484072,end:1491300,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/extratest_zeta.py",start:1491300,end:1492303,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/runtests.py",start:1492303,end:1497121,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_basic_ops.py",start:1497121,end:1512326,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_bitwise.py",start:1512326,end:1520012,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_calculus.py",start:1520012,end:1528983,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_compatibility.py",start:1528983,end:1531289,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_convert.py",start:1531289,end:1539799,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_diff.py",start:1539799,end:1542265,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_division.py",start:1542265,end:1547605,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_eigen.py",start:1547605,end:1551510,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_eigen_symmetric.py",start:1551510,end:1560288,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_elliptic.py",start:1560288,end:1586433,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_fp.py",start:1586433,end:1676430,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_functions.py",start:1676430,end:1707385,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_functions2.py",start:1707385,end:1804375,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_gammazeta.py",start:1804375,end:1832038,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_hp.py",start:1832038,end:1842499,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_identify.py",start:1842499,end:1843191,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_interval.py",start:1843191,end:1860718,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_levin.py",start:1860718,end:1865808,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_linalg.py",start:1865808,end:1876264,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_matrices.py",start:1876264,end:1884208,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_mpmath.py",start:1884208,end:1884404,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_ode.py",start:1884404,end:1886226,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_pickle.py",start:1886226,end:1886627,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_power.py",start:1886627,end:1891854,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_quad.py",start:1891854,end:1895747,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_rootfinding.py",start:1895747,end:1898879,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_special.py",start:1898879,end:1901727,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_str.py",start:1901727,end:1902271,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_summation.py",start:1902271,end:1904130,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_trig.py",start:1904130,end:1908929,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/test_visualization.py",start:1908929,end:1909873,audio:0},{filename:"/lib/python3.9/site-packages/mpmath/tests/torture.py",start:1909873,end:1917741,audio:0},{filename:"/lib/python3.9/site-packages/mpmath-1.2.1-py3.9.egg-info/PKG-INFO",start:1917741,end:1925807,audio:0},{filename:"/lib/python3.9/site-packages/mpmath-1.2.1-py3.9.egg-info/SOURCES.txt",start:1925807,end:1932419,audio:0},{filename:"/lib/python3.9/site-packages/mpmath-1.2.1-py3.9.egg-info/dependency_links.txt",start:1932419,end:1932420,audio:0},{filename:"/lib/python3.9/site-packages/mpmath-1.2.1-py3.9.egg-info/requires.txt",start:1932420,end:1932501,audio:0},{filename:"/lib/python3.9/site-packages/mpmath-1.2.1-py3.9.egg-info/top_level.txt",start:1932501,end:1932508,audio:0}],remote_package_size:1113103,package_uuid:"d967d877-ce40-4493-a80e-de443bda130e"})})();