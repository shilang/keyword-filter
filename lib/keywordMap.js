/**
 * Created by Administrator on 2015/2/4.
 */
var fs = require('fs');
var path = require('path');
var HashMap = require('hashmap').HashMap;

var filePath = path.join(__dirname, '../config/keyword.txt');
var filterMap = new HashMap();
var filterWordList = [];
var endTag = '\0'; // 关键词结束符
var data = fs.readFileSync(filePath, {encoding: 'utf-8'});
if (data) {
    filterWordList = data.split(/\r?\n/);
    for (var i = 0; i < filterWordList.length; i++) {
        var charArray = filterWordList[i].split('');
        var len = charArray.length;
        if (len > 0) {
            var subMap = filterMap;
            for (var k = 0; k < len - 1; k++) {
                var obj = subMap.get(charArray[k]);
                if (obj == null) {
                    var subMapTmp = new HashMap();
                    subMap.set(charArray[k], subMapTmp);
                    subMap = subMapTmp;
                } else {
                    subMap = obj;
                }
            }
            //處理最后一個字符
            var obj = subMap.get(charArray[len - 1]);
            if (obj == null) {
                var subMapTmp = new HashMap();
                subMapTmp.set(endTag, null);
                subMap.set(charArray[len - 1], subMapTmp);
            } else {
                obj.set(endTag, null);
            }
        }
    }
}

module.exports.KeywordMap = filterMap;
module.exports.endTag = endTag;