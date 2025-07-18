/**
 * jsPDF AutoTable plugin v2.0.14
 * Copyright (c) 2014 Simon Bengtsson, https://github.com/simonbengtsson/jsPDF-AutoTable
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 *
 * @preserve
 */
"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}(function (API) {
    "use strict";
    var FONT_ROW_RATIO = 1.15;
    var doc, cursor, settings, pageCount, table;
    var defaultStyles = {
        cellPadding: 5,
        fontSize: 10,
        font: "helvetica",
        lineColor: 200,
        lineWidth: .1,
        fontStyle: "normal",
        overflow: "ellipsize",
        fillColor: 255,
        textColor: 20,
        halign: "left",
        valign: "top",
        fillStyle: "F",
        rowHeight: 20,
        columnWidth: "auto"
    };
    var themes = {
        striped: {
            table: {
                fillColor: 255,
                textColor: 80,
                fontStyle: "normal",
                fillStyle: "F"
            },
            header: {
                textColor: 255,
                fillColor: [41, 128, 185],
                rowHeight: 23,
                fontStyle: "bold"
            },
            body: {},
            alternateRow: {
                fillColor: 245
            }
        },
        grid: {
            table: {
                fillColor: 255,
                textColor: 80,
                fontStyle: "normal",
                lineWidth: .1,
                fillStyle: "DF"
            },
            header: {
                textColor: 255,
                fillColor: [26, 188, 156],
                rowHeight: 23,
                fillStyle: "F",
                fontStyle: "bold"
            },
            body: {},
            alternateRow: {}
        },
        plain: {
            header: {
                fontStyle: "bold"
            }
        }
    };
    var defaultOptions = function defaultOptions() {
        return {
            theme: "striped",
            styles: {},
            headerStyles: {},
            bodyStyles: {},
            alternateRowStyles: {},
            columnStyles: {},
            startY: false,
            margin: 40,
            pageBreak: "auto",
            tableWidth: "auto",
            createdHeaderCell: function createdHeaderCell(cell, data) {},
            createdCell: function createdCell(cell, data) {},
            drawHeaderRow: function drawHeaderRow(row, data) {},
            drawRow: function drawRow(row, data) {},
            drawHeaderCell: function drawHeaderCell(cell, data) {},
            drawCell: function drawCell(cell, data) {},
            beforePageContent: function beforePageContent(data) {},
            afterPageContent: function afterPageContent(data) {}
        }
    };
    API.autoTable = function (headers, data, options) {
        doc = this;
        settings = initOptions(options || {});
        pageCount = 1;
        cursor = {
            y: settings.startY === false ? settings.margin.top : settings.startY
        };
        var userStyles = {
            textColor: 30,
            fontSize: doc.internal.getFontSize(),
            fontStyle: doc.internal.getFont().fontStyle
        };
        createModels(headers, data);
        calculateWidths();
        var firstRowHeight = table.rows[0] && settings.pageBreak === "auto" ? table.rows[0].height : 0;
        var minTableBottomPos = settings.startY + settings.margin.bottom + table.headerRow.height + firstRowHeight;
        if (settings.pageBreak === "avoid") {
            minTableBottomPos += table.height
        }
        if (settings.pageBreak === "always" && settings.startY !== false || settings.startY !== false && minTableBottomPos > doc.internal.pageSize.height) {
            doc.addPage();
            cursor.y = settings.margin.top
        }
        applyStyles(userStyles);
        settings.beforePageContent(hooksData());
        if (settings.drawHeaderRow(table.headerRow, hooksData({
                row: table.headerRow
            })) !== false) {
            printRow(table.headerRow, settings.drawHeaderCell)
        }
        applyStyles(userStyles);
        printRows();
        settings.afterPageContent(hooksData());
        applyStyles(userStyles);
        return this
    };
    API.autoTableEndPosY = function () {
        if (typeof cursor === "undefined" || typeof cursor.y === "undefined") {
            return 0
        }
        return cursor.y
    };
    API.autoTableHtmlToJson = function (table) {
        var data = [],
            headers = [],
            header = table.rows[0],
            tableRow, rowData, i, j;
        for (i = 0; i < header.cells.length; i++) {
            headers.push(typeof header.cells[i] !== "undefined" ? header.cells[i].textContent : "")
        }
        for (i = 1; i < table.rows.length; i++) {
            tableRow = table.rows[i];
            rowData = [];
            for (j = 0; j < header.cells.length; j++) {
                rowData.push(typeof tableRow.cells[j] !== "undefined" ? tableRow.cells[j].textContent : "")
            }
            data.push(rowData)
        }
        return {
            columns: headers,
            data: data,
            rows: data
        }
    };
    API.autoTableText = function (text, x, y, styles) {
        if (typeof x !== "number" || typeof y !== "number") {
            console.error("The x and y parameters are required. Missing for the text: ", text)
        }
        var fontSize = doc.internal.getFontSize() / doc.internal.scaleFactor;
        var lineHeightProportion = FONT_ROW_RATIO;
        var splitRegex = /\r\n|\r|\n/g;
        var splittedText = null;
        var lineCount = 1;
        if (styles.valign === "middle" || styles.valign === "bottom" || styles.halign === "center" || styles.halign === "right") {
            splittedText = typeof text === "string" ? text.split(splitRegex) : text;
            lineCount = splittedText.length || 1
        }
        y += fontSize * (2 - lineHeightProportion);
        if (styles.valign === "middle") y -= lineCount / 2 * fontSize;
        else if (styles.valign === "bottom") y -= lineCount * fontSize;
        if (styles.halign === "center" || styles.halign === "right") {
            var alignSize = fontSize;
            if (styles.halign === "center") alignSize *= .5;
            if (lineCount >= 1) {
                for (var iLine = 0; iLine < splittedText.length; iLine++) {
                    doc.text(splittedText[iLine], x - doc.getStringUnitWidth(splittedText[iLine]) * alignSize, y);
                    y += fontSize
                }
                return doc
            }
            x -= doc.getStringUnitWidth(text) * alignSize
        }
        doc.text(text, x, y);
        return doc
    };

    function initOptions(userOptions) {
        var settings = extend(defaultOptions(), userOptions);
        if (typeof settings.extendWidth !== "undefined") {
            settings.tableWidth = settings.extendWidth ? "auto" : "wrap";
            console.error("Use of deprecated option: extendWidth, use tableWidth instead.")
        }
        if (typeof settings.margins !== "undefined") {
            if (typeof settings.margin === "undefined") settings.margin = settings.margins;
            console.error("Use of deprecated option: margins, use margin instead.")
        } [["padding", "cellPadding"], ["lineHeight", "rowHeight"], "fontSize", "overflow"].forEach(function (o) {
            var deprecatedOption = typeof o === "string" ? o : o[0];
            var style = typeof o === "string" ? o : o[1];
            if (typeof settings[deprecatedOption] !== "undefined") {
                if (typeof settings.styles[style] === "undefined") {
                    settings.styles[style] = settings[deprecatedOption]
                }
                console.error("Use of deprecated option: " + deprecatedOption + ", use the style " + style + " instead.")
            }
        });
        var marginSetting = settings.margin;
        settings.margin = {};
        if (typeof marginSetting.horizontal === "number") {
            marginSetting.right = marginSetting.horizontal;
            marginSetting.left = marginSetting.horizontal
        }
        if (typeof marginSetting.vertical === "number") {
            marginSetting.top = marginSetting.vertical;
            marginSetting.bottom = marginSetting.vertical
        } ["top", "right", "bottom", "left"].forEach(function (side, i) {
            if (typeof marginSetting === "number") {
                settings.margin[side] = marginSetting
            } else {
                var key = Array.isArray(marginSetting) ? i : side;
                settings.margin[side] = typeof marginSetting[key] === "number" ? marginSetting[key] : 40
            }
        });
        return settings
    }

    function createModels(inputHeaders, inputData) {
        table = new Table;
        table.x = settings.margin.left;
        var splitRegex = /\r\n|\r|\n/g;
        var headerRow = new Row(inputHeaders);
        headerRow.index = -1;
        var themeStyles = extend(defaultStyles, themes[settings.theme].table, themes[settings.theme].header);
        headerRow.styles = extend(themeStyles, settings.styles, settings.headerStyles);
        inputHeaders.forEach(function (rawColumn, dataKey) {
            if (typeof rawColumn === "object") {
                dataKey = typeof rawColumn.dataKey !== "undefined" ? rawColumn.dataKey : rawColumn.key
            }
            if (typeof rawColumn.width !== "undefined") {
                console.error("Use of deprecated option: column.width, use column.styles.columnWidth instead.")
            }
            var col = new Column(dataKey);
            col.styles = settings.columnStyles[col.dataKey] || {};
            table.columns.push(col);
            var cell = new Cell;
            cell.raw = typeof rawColumn === "object" ? rawColumn.title : rawColumn;
            cell.styles = headerRow.styles;
            cell.text = "" + cell.raw;
            cell.contentWidth = cell.styles.cellPadding * 2 + getStringWidth(cell.text, cell.styles);
            cell.text = cell.text.split(splitRegex);
            headerRow.cells[dataKey] = cell;
            settings.createdHeaderCell(cell, {
                column: col,
                row: headerRow,
                settings: settings
            })
        });
        table.headerRow = headerRow;
        inputData.forEach(function (rawRow, i) {
            var row = new Row(rawRow);
            var isAlternate = i % 2 === 0;
            var themeStyles = extend(defaultStyles, themes[settings.theme].table, isAlternate ? themes[settings.theme].alternateRow : {});
            var userStyles = extend(settings.styles, settings.bodyStyles, isAlternate ? settings.alternateRowStyles : {});
            row.styles = extend(themeStyles, userStyles);
            row.index = i;
            table.columns.forEach(function (column) {
                var cell = new Cell;
                cell.raw = rawRow[column.dataKey];
                cell.styles = extend(row.styles, column.styles);
                cell.text = typeof cell.raw !== "undefined" ? "" + cell.raw : "";
                row.cells[column.dataKey] = cell;
                settings.createdCell(cell, hooksData({
                    column: column,
                    row: row
                }));
                cell.contentWidth = cell.styles.cellPadding * 2 + getStringWidth(cell.text, cell.styles);
                cell.text = cell.text.split(splitRegex)
            });
            table.rows.push(row)
        })
    }

    function calculateWidths() {
        var tableContentWidth = 0;
        table.columns.forEach(function (column) {
            column.contentWidth = table.headerRow.cells[column.dataKey].contentWidth;
            table.rows.forEach(function (row) {
                var cellWidth = row.cells[column.dataKey].contentWidth;
                if (cellWidth > column.contentWidth) {
                    column.contentWidth = cellWidth
                }
            });
            column.width = column.contentWidth;
            tableContentWidth += column.contentWidth
        });
        table.contentWidth = tableContentWidth;
        var maxTableWidth = doc.internal.pageSize.width - settings.margin.left - settings.margin.right;
        var preferredTableWidth = maxTableWidth;
        if (typeof settings.tableWidth === "number") {
            preferredTableWidth = settings.tableWidth
        } else if (settings.tableWidth === "wrap") {
            preferredTableWidth = table.contentWidth
        }
        table.width = preferredTableWidth < maxTableWidth ? preferredTableWidth : maxTableWidth;
        var dynamicColumns = [];
        var dynamicColumnsContentWidth = 0;
        var fairWidth = table.width / table.columns.length;
        var staticWidth = 0;
        table.columns.forEach(function (column) {
            var colStyles = extend(defaultStyles, themes[settings.theme].table, settings.styles, column.styles);
            if (colStyles.columnWidth === "wrap") {
                column.width = column.contentWidth
            } else if (typeof colStyles.columnWidth === "number") {
                column.width = colStyles.columnWidth
            } else if (colStyles.columnWidth === "auto" || true) {
                if (column.contentWidth <= fairWidth && table.contentWidth > table.width) {
                    column.width = column.contentWidth
                } else {
                    dynamicColumns.push(column);
                    dynamicColumnsContentWidth += column.contentWidth;
                    column.width = 0
                }
            }
            staticWidth += column.width
        });
        distributeWidth(dynamicColumns, staticWidth, dynamicColumnsContentWidth, fairWidth);
        table.height = 0;
        var all = table.rows.concat(table.headerRow);
        all.forEach(function (row, i) {
            var lineBreakCount = 0;
            var cursorX = table.x;
            table.columns.forEach(function (col) {
                var cell = row.cells[col.dataKey];
                col.x = cursorX;
                applyStyles(cell.styles);
                var textSpace = col.width - cell.styles.cellPadding * 2;
                if (cell.styles.overflow === "linebreak") {
                    cell.text = doc.splitTextToSize(cell.text, textSpace + 1, {
                        fontSize: cell.styles.fontSize
                    })
                } else if (cell.styles.overflow === "ellipsize") {
                    cell.text = ellipsize(cell.text, textSpace, cell.styles)
                } else if (cell.styles.overflow === "visible") {} else if (cell.styles.overflow === "hidden") {
                    cell.text = ellipsize(cell.text, textSpace, cell.styles, "")
                } else if (typeof cell.styles.overflow === "function") {
                    cell.text = cell.styles.overflow(cell.text, textSpace)
                } else {
                    console.error("Unrecognized overflow type: " + cell.styles.overflow)
                }
                var count = Array.isArray(cell.text) ? cell.text.length - 1 : 0;
                if (count > lineBreakCount) {
                    lineBreakCount = count
                }
                cursorX += col.width
            });
            row.heightStyle = row.styles.rowHeight;
            row.height = row.heightStyle + lineBreakCount * row.styles.fontSize * FONT_ROW_RATIO;
            table.height += row.height
        })
    }

    function distributeWidth(dynamicColumns, staticWidth, dynamicColumnsContentWidth, fairWidth) {
        var extraWidth = table.width - staticWidth - dynamicColumnsContentWidth;
        for (var i = 0; i < dynamicColumns.length; i++) {
            var col = dynamicColumns[i];
            var ratio = col.contentWidth / dynamicColumnsContentWidth;
            var isNoneDynamic = col.contentWidth + extraWidth * ratio < fairWidth;
            if (extraWidth < 0 && isNoneDynamic) {
                dynamicColumns.splice(i, 1);
                dynamicColumnsContentWidth -= col.contentWidth;
                col.width = fairWidth;
                staticWidth += col.width;
                distributeWidth(dynamicColumns, staticWidth, dynamicColumnsContentWidth, fairWidth);
                break
            } else {
                col.width = col.contentWidth + extraWidth * ratio
            }
        }
    }

    function printRows() {
        table.rows.forEach(function (row, i) {
            if (isNewPage(row.height)) {
                var samePageThreshold = 3;
                addPage()
            }
            row.y = cursor.y;
            if (settings.drawRow(row, hooksData({
                    row: row
                })) !== false) {
                printRow(row, settings.drawCell)
            }
        })
    }

    function addPage() {
        settings.afterPageContent(hooksData());
        doc.addPage();
        pageCount++;
        cursor = {
            x: settings.margin.left,
            y: settings.margin.top
        };
        settings.beforePageContent(hooksData());
        if (settings.drawHeaderRow(table.headerRow, hooksData({
                row: table.headerRow
            })) !== false) {
            printRow(table.headerRow, settings.drawHeaderCell)
        }
    }

    function isNewPage(rowHeight) {
        var afterRowPos = cursor.y + rowHeight + settings.margin.bottom;
        return afterRowPos >= doc.internal.pageSize.height
    }

    function printRow(row, hookHandler) {
        for (var i = 0; i < table.columns.length; i++) {
            var column = table.columns[i];
            var cell = row.cells[column.dataKey];
            if (!cell) {
                continue
            }
            applyStyles(cell.styles);
            cell.x = column.x;
            cell.y = cursor.y;
            cell.height = row.height;
            cell.width = column.width;
            if (cell.styles.valign === "top") {
                cell.textPos.y = cursor.y + cell.styles.cellPadding
            } else if (cell.styles.valign === "bottom") {
                cell.textPos.y = cursor.y + row.height - cell.styles.cellPadding
            } else {
                cell.textPos.y = cursor.y + row.height / 2
            }
            if (cell.styles.halign === "right") {
                cell.textPos.x = cell.x + cell.width - cell.styles.cellPadding
            } else if (cell.styles.halign === "center") {
                cell.textPos.x = cell.x + cell.width / 2
            } else {
                cell.textPos.x = cell.x + cell.styles.cellPadding
            }
            var data = hooksData({
                column: column,
                row: row
            });
            if (hookHandler(cell, data) !== false) {
                doc.rect(cell.x, cell.y, cell.width, cell.height, cell.styles.fillStyle);
                doc.autoTableText(cell.text, cell.textPos.x, cell.textPos.y, {
                    halign: cell.styles.halign,
                    valign: cell.styles.valign
                })
            }
        }
        cursor.y += row.height
    }

    function applyStyles(styles) {
        var arr = [{
            func: doc.setFillColor,
            value: styles.fillColor
        }, {
            func: doc.setTextColor,
            value: styles.textColor
        }, {
            func: doc.setFontStyle,
            value: styles.fontStyle
        }, {
            func: doc.setDrawColor,
            value: styles.lineColor
        }, {
            func: doc.setLineWidth,
            value: styles.lineWidth
        }, {
            func: doc.setFont,
            value: styles.font
        }, {
            func: doc.setFontSize,
            value: styles.fontSize
        }];
        arr.forEach(function (obj) {
            if (typeof obj.value !== "undefined") {
                if (obj.value.constructor === Array) {
                    obj.func.apply(this, obj.value)
                } else {
                    obj.func(obj.value)
                }
            }
        })
    }

    function hooksData(additionalData) {
        additionalData = additionalData || {};
        var data = {
            pageCount: pageCount,
            settings: settings,
            table: table,
            cursor: cursor
        };
        for (var prop in additionalData) {
            if (additionalData.hasOwnProperty(prop)) {
                data[prop] = additionalData[prop]
            }
        }
        return data
    }

    function ellipsize(text, width, styles, ellipsizeStr) {
        ellipsizeStr = typeof ellipsizeStr !== "undefined" ? ellipsizeStr : "...";
        if (Array.isArray(text)) {
            text.forEach(function (str, i) {
                text[i] = ellipsize(str, width, styles, ellipsizeStr)
            });
            return text
        }
        if (width >= getStringWidth(text, styles)) {
            return text
        }
        while (width < getStringWidth(text + ellipsizeStr, styles)) {
            if (text.length < 2) {
                break
            }
            text = text.substring(0, text.length - 1)
        }
        return text.trim() + ellipsizeStr
    }

    function getStringWidth(text, styles) {
        applyStyles(styles);
        var w = doc.getStringUnitWidth(text);
        return w * styles.fontSize
    }

    function extend(defaults) {
        var extended = {};
        var prop;
        for (prop in defaults) {
            if (defaults.hasOwnProperty(prop)) {
                extended[prop] = defaults[prop]
            }
        }
        for (var i = 1; i < arguments.length; i++) {
            var options = arguments[i];
            for (prop in options) {
                if (options.hasOwnProperty(prop)) {
                    if (typeof options[prop] === "object" && !Array.isArray(options[prop])) {
                        extended[prop] = options[prop]
                    } else {
                        extended[prop] = options[prop]
                    }
                }
            }
        }
        return extended
    }
})(jsPDF.API);
var Table = function Table() {
    _classCallCheck(this, Table);
    this.height = 0;
    this.width = 0;
    this.x = 0;
    this.y = 0;
    this.contentWidth = 0;
    this.rows = [];
    this.columns = [];
    this.headerRow = null;
    this.settings = {}
};
var Row = function Row(raw) {
    _classCallCheck(this, Row);
    this.raw = raw || {};
    this.index = 0;
    this.styles = {};
    this.cells = {};
    this.height = 0;
    this.y = 0
};
var Cell = function Cell(raw) {
    _classCallCheck(this, Cell);
    this.raw = raw;
    this.styles = {};
    this.text = "";
    this.contentWidth = 0;
    this.textPos = {};
    this.height = 0;
    this.width = 0;
    this.x = 0;
    this.y = 0
};
var Column = function Column(dataKey) {
    _classCallCheck(this, Column);
    this.dataKey = dataKey;
    this.options = {};
    this.styles = {};
    this.contentWidth = 0;
    this.width = 0;
    this.x = 0
};