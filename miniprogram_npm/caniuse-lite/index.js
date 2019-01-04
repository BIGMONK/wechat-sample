module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1544075347706, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _agents = require('./agents');

Object.defineProperty(exports, 'agents', {
  enumerable: true,
  get: function get() {
    return _agents.agents;
  }
});

var _feature = require('./feature');

Object.defineProperty(exports, 'feature', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_feature).default;
  }
});

var _features = require('./features');

Object.defineProperty(exports, 'features', {
  enumerable: true,
  get: function get() {
    return _features.features;
  }
});

var _region = require('./region');

Object.defineProperty(exports, 'region', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_region).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
}, function(modId) {var map = {"./agents":1544075347707,"./feature":1544075347713,"./features":1544075347716,"./region":1544075347717}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1544075347707, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.agents = undefined;

var _browsers = require('./browsers');

var _browserVersions = require('./browserVersions');

var agentsData = require('../../data/agents');

function unpackBrowserVersions(versionsData) {
    return Object.keys(versionsData).reduce(function (usage, version) {
        usage[_browserVersions.browserVersions[version]] = versionsData[version];
        return usage;
    }, {});
}

var agents = exports.agents = Object.keys(agentsData).reduce(function (map, key) {
    var versionsData = agentsData[key];
    map[_browsers.browsers[key]] = Object.keys(versionsData).reduce(function (data, entry) {
        if (entry === 'A') {
            data.usage_global = unpackBrowserVersions(versionsData[entry]);
        } else if (entry === 'C') {
            data.versions = versionsData[entry].reduce(function (list, version) {
                if (version === '') {
                    list.push(null);
                } else {
                    list.push(_browserVersions.browserVersions[version]);
                }
                return list;
            }, []);
        } else if (entry === 'D') {
            data.prefix_exceptions = unpackBrowserVersions(versionsData[entry]);
        } else if (entry === 'E') {
            data.browser = versionsData[entry];
        } else if (entry === 'F') {
            data.release_date = Object.keys(versionsData[entry]).reduce(function (map, key) {
                map[_browserVersions.browserVersions[key]] = versionsData[entry][key];
                return map;
            }, {});
        } else {
            // entry is B
            data.prefix = versionsData[entry];
        }
        return data;
    }, {});
    return map;
}, {});
}, function(modId) { var map = {"./browsers":1544075347708,"./browserVersions":1544075347710,"../../data/agents":1544075347712}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1544075347708, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var browsers = exports.browsers = require('../../data/browsers');
}, function(modId) { var map = {"../../data/browsers":1544075347709}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1544075347709, function(require, module, exports) {
module.exports={A:"ie",B:"edge",C:"firefox",D:"chrome",E:"safari",F:"opera",G:"ios_saf",H:"op_mini",I:"android",J:"bb",K:"op_mob",L:"and_chr",M:"and_ff",N:"ie_mob",O:"and_uc",P:"samsung",Q:"and_qq",R:"baidu"};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1544075347710, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var browserVersions = exports.browserVersions = require('../../data/browserVersions');
}, function(modId) { var map = {"../../data/browserVersions":1544075347711}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1544075347711, function(require, module, exports) {
module.exports={"0":"14","1":"63","2":"32","3":"3","4":"57","5":"4.2-4.3","6":"59","7":"60","8":"61","9":"62",A:"10",B:"11",C:"12",D:"7",E:"9",F:"4",G:"8",H:"6",I:"18",J:"15",K:"5",L:"16",M:"46",N:"17",O:"19",P:"20",Q:"21",R:"22",S:"23",T:"24",U:"25",V:"26",W:"27",X:"28",Y:"29",Z:"30",a:"31",b:"11.1",c:"33",d:"34",e:"35",f:"36",g:"37",h:"38",i:"39",j:"40",k:"41",l:"42",m:"43",n:"44",o:"45",p:"13",q:"47",r:"48",s:"49",t:"50",u:"51",v:"52",w:"53",x:"54",y:"55",z:"56",AB:"58",BB:"64",CB:"65",DB:"11.5",EB:"12.1",FB:"3.2",GB:"67",HB:"70",IB:"5.5",JB:"69",KB:"71",LB:"72",MB:"73",NB:"3.1",OB:"66",PB:"5.1",QB:"6.1",RB:"7.1",SB:"9.1",TB:"10.1",UB:"3.6",VB:"TP",WB:"9.5-9.6",XB:"10.0-10.1",YB:"10.5",ZB:"10.6",aB:"3.5",bB:"11.6",cB:"2",dB:"4.0-4.1",eB:"68",fB:"5.0-5.1",gB:"6.0-6.1",hB:"7.0-7.1",iB:"8.1-8.4",jB:"9.0-9.2",kB:"9.3",lB:"10.0-10.2",mB:"10.3",nB:"11.0-11.2",oB:"11.3-11.4",pB:"all",qB:"2.1",rB:"2.2",sB:"2.3",tB:"4.1",uB:"4.4",vB:"4.4.3-4.4.4",wB:"11.8",xB:"6.2",yB:"7.2",zB:"1.2","0B":"7.12"};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1544075347712, function(require, module, exports) {
module.exports={A:{A:{H:0.00977361,D:0.00977361,G:0.136831,E:0.136831,A:0.0684153,B:2.56557,IB:0.009298},B:"ms",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","IB","H","D","G","E","A","B","","",""],E:"IE",F:{IB:962323200,H:998870400,D:1161129600,G:1237420800,E:1300060800,A:1346716800,B:1381968000}},B:{A:{"0":0.052613,C:0.019132,p:0.023915,J:0.062179,L:0.157839,N:1.67405,I:0},B:"ms",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","C","p","0","J","L","N","I","","",""],E:"Edge",F:{"0":1470096000,C:1438128000,p:1447286400,J:1491868800,L:1508198400,N:1525046400,I:1542067200}},C:{A:{"0":0.00453,"1":0.645705,"2":0.004471,"3":0.004417,"4":0.038264,"6":0.04783,"7":0.162622,"8":0.110009,"9":2.87458,cB:0.004783,F:0.009566,K:0.004879,H:0.020136,D:0.005725,G:0.004417,E:0.00533,A:0.004283,B:0.004317,C:0.004471,p:0.004486,J:0.009566,L:0.004417,N:0.004349,I:0.004393,O:0.004443,P:0.004283,Q:0.008652,R:0.004393,S:0.009566,T:0.008786,U:0.004326,V:0.004317,W:0.004393,X:0.004418,Y:0.008834,Z:0.004783,a:0.009566,c:0.004326,d:0.004783,e:0.009566,f:0.004417,g:0.004783,h:0.076528,i:0.004783,j:0.009566,k:0.004783,l:0.004783,m:0.023915,n:0.009566,o:0.023915,M:0.004783,q:0.062179,r:0.081311,s:0.014349,t:0.019132,u:0.019132,v:0.263065,w:0.014349,x:0.019132,y:0.014349,z:0.057396,AB:0.028698,BB:0.019132,CB:0,aB:0.008786,UB:0.009566},B:"moz",C:["","","","cB","3","aB","UB","F","K","H","D","G","E","A","B","C","p","0","J","L","N","I","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","2","c","d","e","f","g","h","i","j","k","l","m","n","o","M","q","r","s","t","u","v","w","x","y","z","4","AB","6","7","8","9","1","BB","CB",""],E:"Firefox",F:{"0":1338854400,"1":1540252800,"2":1409616000,"3":1213660800,"4":1510617600,"6":1520985600,"7":1525824000,"8":1529971200,"9":1536105600,cB:1161648000,aB:1246320000,UB:1264032000,F:1300752000,K:1308614400,H:1313452800,D:1317081600,G:1317081600,E:1320710400,A:1324339200,B:1327968000,C:1331596800,p:1335225600,J:1342483200,L:1346112000,N:1349740800,I:1353628800,O:1357603200,P:1361232000,Q:1364860800,R:1368489600,S:1372118400,T:1375747200,U:1379376000,V:1386633600,W:1391472000,X:1395100800,Y:1398729600,Z:1402358400,a:1405987200,c:1413244800,d:1417392000,e:1421107200,f:1424736000,g:1428278400,h:1431475200,i:1435881600,j:1439251200,k:1442880000,l:1446508800,m:1450137600,n:1453852800,o:1457395200,M:1461628800,q:1465257600,r:1470096000,s:1474329600,t:1479168000,u:1485216000,v:1488844800,w:1492560000,x:1497312000,y:1502150400,z:1506556800,AB:1516665600,BB:null,CB:null}},D:{A:{"0":0.004706,"1":0.66962,"2":0.009566,"4":0.066962,"6":0.043047,"7":0.04783,"8":0.057396,"9":0.086094,F:0.004706,K:0.004879,H:0.004879,D:0.005591,G:0.005591,E:0.005591,A:0.004534,B:0.009566,C:0.009566,p:0.004879,J:0.014349,L:0.004393,N:0.004393,I:0.008652,O:0.004418,P:0.004393,Q:0.004317,R:0.019132,S:0.008786,T:0.014349,U:0.004783,V:0.009566,W:0.004326,X:0.004783,Y:0.186537,Z:0.009566,a:0.023915,c:0.014349,d:0.014349,e:0.019132,f:0.017668,g:0.009566,h:0.033481,i:0.009566,j:0.023915,k:0.028698,l:0.004783,m:0.038264,n:0.009566,o:0.014349,M:0.014349,q:0.019132,r:0.043047,s:0.617007,t:0.019132,u:0.033481,v:0.014349,w:0.019132,x:0.052613,y:0.066962,z:0.066962,AB:0.09566,BB:0.110009,CB:0.19132,OB:0.162622,GB:0.449602,eB:0.76528,JB:22.4323,HB:4.11816,KB:0.043047,LB:0.009566,MB:0},B:"webkit",C:["F","K","H","D","G","E","A","B","C","p","0","J","L","N","I","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","2","c","d","e","f","g","h","i","j","k","l","m","n","o","M","q","r","s","t","u","v","w","x","y","z","4","AB","6","7","8","9","1","BB","CB","OB","GB","eB","JB","HB","KB","LB","MB"],E:"Chrome",F:{"0":1316131200,"1":1512518400,"2":1389657600,"4":1489017600,"6":1496707200,"7":1500940800,"8":1504569600,"9":1508198400,F:1264377600,K:1274745600,H:1283385600,D:1287619200,G:1291248000,E:1296777600,A:1299542400,B:1303862400,C:1307404800,p:1312243200,J:1316131200,L:1319500800,N:1323734400,I:1328659200,O:1332892800,P:1337040000,Q:1340668800,R:1343692800,S:1348531200,T:1352246400,U:1357862400,V:1361404800,W:1364428800,X:1369094400,Y:1374105600,Z:1376956800,a:1384214400,c:1392940800,d:1397001600,e:1400544000,f:1405468800,g:1409011200,h:1412640000,i:1416268800,j:1421798400,k:1425513600,l:1429401600,m:1432080000,n:1437523200,o:1441152000,M:1444780800,q:1449014400,r:1453248000,s:1456963200,t:1460592000,u:1464134400,v:1469059200,w:1472601600,x:1476230400,y:1480550400,z:1485302400,AB:1492560000,BB:1516752000,CB:1520294400,OB:1523923200,GB:1527552000,eB:1532390400,JB:1536019200,HB:1539648000,KB:null,LB:null,MB:null}},E:{A:{F:0,K:0.009566,H:0.004349,D:0.004783,G:0.038264,E:0.028698,A:0.052613,B:0.167405,C:1.35837,NB:0,FB:0.008692,PB:0.019132,QB:0.009566,RB:0.004283,SB:0.100443,TB:0.224801,b:0.640922,VB:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","NB","FB","F","K","PB","H","QB","D","RB","G","E","SB","A","TB","B","b","C","VB","",""],E:"Safari",F:{NB:1205798400,FB:1226534400,F:1244419200,K:1275868800,PB:1311120000,H:1343174400,QB:1382400000,D:1382400000,RB:1410998400,G:1413417600,E:1443657600,SB:1458518400,A:1474329600,TB:1490572800,B:1505779200,b:1522281600,C:1537142400,VB:null}},F:{A:{"2":0.005152,E:0.0082,B:0.016581,C:0.004317,J:0.00685,L:0.00685,N:0.00685,I:0.005014,O:0.006015,P:0.004879,Q:0.006597,R:0.006597,S:0.013434,T:0.006702,U:0.006015,V:0.005595,W:0.004393,X:0.008652,Y:0.004879,Z:0.004879,a:0.009566,c:0.005014,d:0.009758,e:0.004879,f:0.023915,g:0.004283,h:0.004367,i:0.004534,j:0.004367,k:0.004227,l:0.004418,m:0.004317,n:0.004227,o:0.004471,M:0.004417,q:0.008942,r:0.004369,s:0.004417,t:0.004369,u:0.004317,v:0.004326,w:0.004783,x:0.014349,y:0.224801,z:0.688752,WB:0.00685,XB:0.004783,YB:0.008392,ZB:0.004706,b:0.006229,DB:0.004879,bB:0.008786,EB:0.019132},B:"webkit",C:["","","","","","","","","","","","","","","E","WB","XB","YB","ZB","B","b","DB","bB","C","EB","J","L","N","I","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","2","c","d","e","f","g","h","i","j","k","l","m","n","o","M","q","r","s","t","u","v","w","x","y","z","","",""],E:"Opera",F:{"2":1442448000,E:1150761600,WB:1223424000,XB:1251763200,YB:1267488000,ZB:1277942400,B:1292457600,b:1302566400,DB:1309219200,bB:1323129600,C:1323129600,EB:1352073600,J:1372723200,L:1377561600,N:1381104000,I:1386288000,O:1390867200,P:1393891200,Q:1399334400,R:1401753600,S:1405987200,T:1409616000,U:1413331200,V:1417132800,W:1422316800,X:1425945600,Y:1430179200,Z:1433808000,a:1438646400,c:1445904000,d:1449100800,e:1454371200,f:1457308800,g:1462320000,h:1465344000,i:1470096000,j:1474329600,k:1477267200,l:1481587200,m:1486425600,n:1490054400,o:1494374400,M:1498003200,q:1502236800,r:1506470400,s:1510099200,t:1515024000,u:1517961600,v:1521676800,w:1525910400,x:1530144000,y:1534982400,z:1537833600},D:{E:"o",B:"o",C:"o",WB:"o",XB:"o",YB:"o",ZB:"o",b:"o",DB:"o",bB:"o",EB:"o"}},G:{A:{"5":0.00323716,G:0.130565,C:5.65532,FB:0.00107905,dB:0,fB:0.0118696,gB:0.00431621,hB:0.0269763,iB:0.0690594,jB:0.0323716,kB:0.224443,lB:0.38738,mB:0.414356,nB:0.860005,oB:2.88431},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","FB","dB","5","fB","gB","hB","G","iB","jB","kB","lB","mB","nB","oB","C","","",""],E:"iOS Safari",F:{"5":1299628800,FB:1270252800,dB:1283904000,fB:1331078400,gB:1359331200,hB:1394409600,G:1410912000,iB:1413763200,jB:1442361600,kB:1458518400,lB:1473724800,mB:1490572800,nB:1505779200,oB:1522281600,C:1537142400}},H:{A:{pB:2.09913},B:"o",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","pB","","",""],E:"Opera Mini",F:{pB:1426464000}},I:{A:{"3":0.0009805,"5":0.19708,F:0.130406,GB:0,qB:0,rB:0.0009805,sB:0.021571,tB:0.037259,uB:0,vB:0.441225},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","qB","rB","sB","3","F","tB","5","uB","vB","GB","","",""],E:"Android Browser",F:{"3":1298332800,"5":1374624000,qB:1256515200,rB:1274313600,sB:1291593600,F:1318896000,tB:1341792000,uB:1386547200,vB:1401667200,GB:1494115200}},J:{A:{D:0.005217,A:0.020868},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","D","A","","",""],E:"Blackberry Browser",F:{D:1325376000,A:1359504000}},K:{A:{A:0,B:0,C:0,M:0.0111391,b:0,DB:0,EB:0},B:"o",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","A","B","b","DB","C","EB","M","","",""],E:"Opera Mobile",F:{A:1287100800,B:1300752000,b:1314835200,DB:1318291200,C:1330300800,EB:1349740800,M:1474588800},D:{M:"webkit"}},L:{A:{HB:31.9945},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","HB","","",""],E:"Chrome for Android",F:{HB:1539734400}},M:{A:{"1":0.172161},B:"moz",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","1","","",""],E:"Firefox for Android",F:{"1":1540252800}},N:{A:{A:0.0115934,B:0.130425},B:"ms",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","A","B","","",""],E:"IE Mobile",F:{A:1340150400,B:1353456000}},O:{A:{wB:4.38228},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","wB","","",""],E:"UC Browser for Android",F:{wB:1471392000},D:{wB:"webkit"}},P:{A:{F:0.770771,K:0.0937424,xB:0.145822,yB:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","F","K","xB","yB","","",""],E:"Samsung Internet",F:{F:1461024000,K:1481846400,xB:1509408000,yB:1528329600}},Q:{A:{zB:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","zB","","",""],E:"QQ Browser",F:{zB:1483228800}},R:{A:{"0B":0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","0B","","",""],E:"Baidu Browser",F:{"0B":1491004800}}};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1544075347713, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = unpackFeature;

var _statuses = require('../lib/statuses');

var _statuses2 = _interopRequireDefault(_statuses);

var _supported = require('../lib/supported');

var _supported2 = _interopRequireDefault(_supported);

var _browsers = require('./browsers');

var _browserVersions = require('./browserVersions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MATH2LOG = Math.log(2);

function unpackSupport(cipher) {
    // bit flags
    var stats = Object.keys(_supported2.default).reduce(function (list, support) {
        if (cipher & _supported2.default[support]) list.push(support);
        return list;
    }, []);

    // notes
    var notes = cipher >> 7;
    var notesArray = [];
    while (notes) {
        var note = Math.floor(Math.log(notes) / MATH2LOG) + 1;
        notesArray.unshift('#' + note);
        notes -= Math.pow(2, note - 1);
    }

    return stats.concat(notesArray).join(' ');
}

function unpackFeature(packed) {
    var unpacked = { status: _statuses2.default[packed.B], title: packed.C };
    unpacked.stats = Object.keys(packed.A).reduce(function (browserStats, key) {
        var browser = packed.A[key];
        browserStats[_browsers.browsers[key]] = Object.keys(browser).reduce(function (stats, support) {
            var packedVersions = browser[support].split(' ');
            var unpacked = unpackSupport(support);
            packedVersions.forEach(function (v) {
                return stats[_browserVersions.browserVersions[v]] = unpacked;
            });
            return stats;
        }, {});
        return browserStats;
    }, {});
    return unpacked;
}
}, function(modId) { var map = {"../lib/statuses":1544075347714,"../lib/supported":1544075347715,"./browsers":1544075347708,"./browserVersions":1544075347710}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1544075347714, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    1: "ls", // WHATWG Living Standard
    2: "rec", // W3C Recommendation
    3: "pr", // W3C Proposed Recommendation
    4: "cr", // W3C Candidate Recommendation
    5: "wd", // W3C Working Draft
    6: "other", // Non-W3C, but reputable
    7: "unoff" // Unofficial, Editor's Draft or W3C "Note"
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1544075347715, function(require, module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    y: 1 << 0,
    n: 1 << 1,
    a: 1 << 2,
    p: 1 << 3,
    u: 1 << 4,
    x: 1 << 5,
    d: 1 << 6
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1544075347716, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * Load this dynamically so that it
 * doesn't appear in the rollup bundle.
 */

var features = exports.features = require('../../data/features');
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1544075347717, function(require, module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = unpackRegion;

var _browsers = require('./browsers');

function unpackRegion(packed) {
    return Object.keys(packed).reduce(function (list, browser) {
        var data = packed[browser];
        list[_browsers.browsers[browser]] = Object.keys(data).reduce(function (memo, key) {
            var stats = data[key];
            if (key === '_') {
                stats.split(' ').forEach(function (version) {
                    return memo[version] = null;
                });
            } else {
                memo[key] = stats;
            }
            return memo;
        }, {});
        return list;
    }, {});
}
}, function(modId) { var map = {"./browsers":1544075347708}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1544075347706);
})()
//# sourceMappingURL=index.js.map