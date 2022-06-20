//-----------------------------------------------------------------------------
//  ykl2 v0.1.1
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
};
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
};
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
};
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
};
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
};
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
 };
 /**
  * HTML5 のアニメーションフレームに対応しているかを返します。
  * @public
  * @static
  * @function
  * @returns {Boolean} true: 対応している false: 対応していない。
  */
 ykl2.commonFunctions.canAnimationFrame = function()
 {
    // アニメーションフレームのリクエストIDを取得する。
    let requestID = window.requestAnimationFrame(ykl2.commonFunctions._animationFrameCallback);

    // リクエストIDが取得できた場合はコールバックを中止して true を返す。
    if(requestID)
    {
        window.cancelAnimationFrame(requestID);
        return true;
    }
    // アニメーションフレームに対応していないので false を返す。
    return false;
 };
 /**
  * アニメーションフレーム対応チェック用コールバック関数です。
  * @private
  * @static
  * @function
  * @param {Number} timeStamp 開始時のタイムスタンプ。
  */
 ykl2.commonFunctions._animationFrameCallback = function(timeStamp)
 {
    // 特に何もしない。
 };
/** 文字列の末尾にある「px」を取り除いて返します。
* @public
* @static
* @function
* @param {String} targetStr 処理対象となる文字列です。
* @returns {String} 整形した文字列です。
*/
ykl2.commonFunctions.trimPxString = function(targetStr)
{
	// 'px'の文字インデックスを取得します。
	let index = targetStr.lastIndexOf('px');

	// 'px'の文字が末尾にない場合はそのまま返します。
	if(index < 0) { return targetStr; }

	// 文字列を切り取って返します。
	return targetStr.substring(0, targetStr.length - (index - 1));
};
/**
* bodyタグのonloadイベントに関数を追加します。
* @public
* @static
* @function
* @param {Function} func onload時に実行させる関数です。
*/
ykl2.commonFunctions.addOnLoadFunction = function(func)
{
	// イベントに関数を登録します。
	window.addEventListener('load', func, false);
};
/**
 * 数値をフォーマットして返します。<br />
 * 必ず %?d という置換用文字列を含めて下さい。<br />
 * ない場合は指定された文字列がそのまま返ります。<br />
 * %5d のような指定であれば、５桁にゼロサプレスされた文字列が埋め込まれます。
 * @public
 * @static
 * @function
 * @param {String} format フォーマットの元になる文字列です。
 * @param {Number} number 埋め込まれる数値です。
 * @returns {String} 指定された桁にゼロサプレスされた文字列です。
 */
 ykl2.commonFunctions.formatNumber = function(format, number)
 {
     // %の箇所を特定します。ない場合はフォーマット文をそのまま返します。
     var perIndex = format.indexOf('%');
     if(perIndex < 0) { return format; }
     
     // %の直近のdを特定します。ない場合はフォーマット文をそのまま返します。
     var decIndex = format.indexOf('d', perIndex + 1);
     if(decIndex < 0) { return format; }
     
     // 数値の箇所を切り出します。ない場合はフォーマット文をそのまま返します。
     var decStr = format.substring(perIndex + 1, decIndex - (perIndex + 1));
     if(decStr.length <= 0) { return format; }
     
     // 切り出した文字列を数値に変換します。
     var fix = parseInt(decStr, 10);
     
     // ループ準備
     var index    = 0;
     var indexMax = fix - number.toString().length;
     var newStr   = '';
     
     // ゼロで埋めた数値文字列を作成する。
     for(index = 0; index < indexMax; index++) { newStr += '0'; }
     newStr += number.toString();
     
     // 文字列を作成して返します。
     newStr = format.substring(0, perIndex) + newStr + format.substring(decIndex + 1);
     return newStr;
 };
//-----------------------------------------------------------------------------
//  ykl2 commonFunctions End.
//-----------------------------------------------------------------------------
