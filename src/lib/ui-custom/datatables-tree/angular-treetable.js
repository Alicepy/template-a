define(['scripts/ui-custom/datatables-tree/jquery.treeTable.js'], function() {
    angular.module('angular-treetable', []).
    directive('treetable', function() {
        return {
            require: '?ngModel',
            scope: {
                scopeTtOptions: '=ttOptions'
            },
            restrict: 'A',
            link: function($scope, element, attrs, ngModel) {
                var scopeTtOptions = $scope.scopeTtOptions;
                //console.log($scope.scopeTtOptions);
                var option = {
                    expandLevel: scopeTtOptions.level || 2,
                    theme: scopeTtOptions.theme || "default"
                };
                //更新表格行
                function updateTableRow(data) {
                    if (data == null) {
                        $(element).empty().unbind().treeTable(option);
                        return;
                    }

                    var columns = scopeTtOptions.columns;
                    var idCol = scopeTtOptions.id;
                    var pIdCol = scopeTtOptions.pid;

                    var html = "";
                    html += "<thead><tr>";
                    var customStyleArray = new Array();
                    for (var i = 0, j = columns.length; i < j; i++) {
                        var column = columns[i];
                        var name = "";
                        var width = "";
                        var height = "";
                        var styleFlag = false;
                        if (column) {
                            name = column.name;
                            width = column.width;
                            height = column.height;
                        }
                        html += "<th";
                        if (width || height) {
                            customStyleArray.push(i);
                            styleFlag = true;
                        }
                        if (width && width.length > 0) {
                            html += " width='" + width + "'";
                            styleFlag = true;
                        }
                        if (height && height.length > 0) {
                            html += " height=" + height + "'";
                        }
                        html += ">" + name + "</th>";
                    }
                    html += "</tr></thead>";

                    if (data != null && data.length > 0) {

                        var orderArr = [];
                        if (scopeTtOptions.order) {
                            function addItem(pId, index) {
                                var leaveCnt = data.length;
                                if (leaveCnt == 0) return;
                                var delArr = [];
                                var findCnt = 1;
                                for (var i = 0; i < leaveCnt; i++) {
                                    var item = data[i];
                                    if ((pId == null) ? (item[pIdCol] == null || item[pIdCol] == "null" || item[pIdCol] == "0" || item[pIdCol] == "" || item[pIdCol] == item[idCol]) : (item[pIdCol] == pId)) {
                                        if (index == -1) {
                                            orderArr.push(item);
                                        } else {
                                            orderArr.splice(index + findCnt, 0, item)
                                        }
                                        delArr.push(i);
                                        findCnt++;
                                    }
                                }
                                for (var i = delArr.length - 1; i >= 0; i--) {
                                    data.splice(delArr[i], 1);
                                }
                            }
                            addItem(null, -1);
                            while (data.length > 0) {
                                for (var i = 0; i < orderArr.length; i++) {
                                    addItem(orderArr[i][idCol], i);
                                }
                            }
                        } else {
                            orderArr = data;
                        }

                        //输出所有行
                        html += "<tbody>"
                        for (var i = 0, j = orderArr.length; i < j; i++) {
                            var item = orderArr[i];
                            html += "<tr id=\"" + item[idCol] + "\"";
                            if (item[pIdCol] != null && item[pIdCol] != "null" && item[pIdCol] != "0" && item[pIdCol] != "" && item[pIdCol] != item[idCol]) {
                                html += " pId=\"" + item[pIdCol] + "\"";
                            }
                            html += ">";
                            for (var m = 0, n = columns.length; m < n; m++) {
                                var col = columns[m];
                                var val = col["id"] ? item[col["id"]] : item[idCol];
                                if (val == null) val = "";
                                //自定义方法输出
                                if (col["render"]) {
                                    if (m != 0) {
                                        html += "<td><div style='margin: 0px;'>" + col["render"](val, item) + "</div></td>";
                                    } else {
                                        html += "<td><span>" + col["render"](val, item) + "</span></td>";
                                    }
                                } else {
                                    if (m != 0) {
                                        html += "<td title='" + val + "'><div style='margin: 0px;'>" + val + "</div></td>";
                                    } else {
                                        html += "<td title='" + val + "'><span>" + val + "</span></td>";
                                    }
                                }
                            }
                            html += "</tr>";
                        }
                        html += "</tbody>";
                    }

                    $(element).empty().unbind().append(html).treeTable(option);
                }
                $scope.$watch("scopeTtOptions.data", function(data) {
                    updateTableRow(data);
                });
            }
        };
    });
});
