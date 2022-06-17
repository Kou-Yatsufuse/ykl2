//-----------------------------------------------------------------------------
//  ykl2 v0.1.0
//-----------------------------------------------------------------------------
//	Copyright (c) 2022 Kou Yatsufuse
//	Released under the MIT license
//	http://opensource.org/licenses/mit-license.php
//-----------------------------------------------------------------------------
/**
 * パッケージ宣言です。
 * @namespace ykl2
 */
const ykl2 = {};

//-----------------------------------------------------------------------------
//  ykl2 commonFunctions Start
//-----------------------------------------------------------------------------
/**
 * 共通関数クラス宣言です。
 * @public
 * @static
 * @namespace ykl2.commonFunctions
 */
ykl2.commonFunctions = {};

/**
 * 表示されているクライアント領域の幅を返します。
 * ※スクロールバーの領域除く
 * @public
 * @static
 * @function
 * @returns {Number} クライアント領域の幅(px)
 */
ykl2.commonFunctions.getClientWidth = function()
{
    return document.documentElement.clientWidth ||
           document.documentElement.offsetWidth ||
           document.body.clientWidth ||
           document.body.offsetWidth;
}
/**
 * 表示されているクライアント領域の高さを返します。
 * ※スクロールバーの領域除く
 * @public
 * @static
 * @function
 * @returns {Number} クライアント領域の高さ(px)
 */
ykl2.commonFunctions.getClientHeight = function()
{
    return document.documentElement.clientHeight;
}
/**
 * body 要素の領域幅を返します。
 * @public
 * @static
 * @function
 * @returns {Number} body 要素の領域幅(px)
 */
ykl2.commonFunctions.getBodyWidth = function()
{
    return document.documentElement.scrollWidth ||
           document.body.scrollWidth;
}
/**
 * body 要素の領域高さを返します。
 * @public
 * @static
 * @function
 * @returns {Number} body 要素の領域高さ(px)
 */
ykl2.commonFunctions.getBodyHeight = function()
{
    return document.documentElement.offsetHeight ||
           document.body.clientHeight ||
           document.body.clientHeight;
}
/**
 * 横方向のスクロール量を取得します。
 * @public
 * @static
 * @function
 * @returns {Number} 横方向のスクロール量(px)
 */
ykl2.commonFunctions.getScrollX = function()
{
    return window.pageXOffset || window.scrollX;
}
/**
 * 縦方向のスクロール量を取得します。
 * @public
 * @static
 * @function
 * @returns {Number} 縦方向のスクロール量(px)
 */
 ykl2.commonFunctions.getScrollY = function()
 {
     return window.pageYOffset || window.scrollY;
 }