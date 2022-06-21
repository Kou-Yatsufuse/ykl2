//-----------------------------------------------------------------------------
//  ykl2 v0.2.0
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
 /**
  * 要素の表示領域サイズを返します。
  * @public
  * @static
  * @function
  * @returns {Object} 横幅(width), 高さ(height) を格納したオブジェクト
  */
 ykl2.commonFunctions.getElementDisplaySize = function(ele)
 {
    return { width: ele.clientWidth, height: ele.clientHeight };
 }
//-----------------------------------------------------------------------------
//  ykl2 commonFunctions End.
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// ykl2 appearImages Start.
//-----------------------------------------------------------------------------
/**
 * 画像連速表示クラスです。
 * @param {String} id 作成する要素のID 
 * @param {String} parentId 親要素のID 
 * @param {Number} refreshRate 表示更新間隔（ミリ秒）
 * @namespace ykl2.appearImages
 * @constructor
 */
ykl2.appearImages = function(id, parentId, refreshRate)
{
    // コンストラクタを呼び出す。
    this._constructor(id, parentId, refreshRate);
};
/**
 * コンストラクタ
 * @private
 * @function
 * @param {String} id 自身のID
 * @param {String} parentId 親要素のID
 * @param {Number} refreshRate 表示更新間隔（ミリ秒）
 */
ykl2.appearImages.prototype._constructor = function(id, parentId, refreshRate)
{
    // 引数をメンバ変数に格納
    this._id = id;
    this._parentId = parentId;
    this._refreshRate = refreshRate;

    // メンバ変数の初期化
    this._imageInfoArary = [];

    // 画像表示要素を作成して親要素に追加。
    this._imgElement = this._createImageElement();
    const parentEle = document.getElementById(this._parentId);
    parentEle.appendChild(this._imgElement);
};
/**
 * 自身のIDです。
 * @private
 * @field
 * @type {String}
 */
ykl2.appearImages.prototype._id = null;
/**
 * 親要素のIDです。
 * @private
 * @field
 * @type {String}
 */
ykl2.appearImages.prototype._parentId = null;
/**
 * 表示更新間隔（ミリ秒）です。
 * @private
 * @field
 * @type {Number}
 */
ykl2.appearImages.prototype._refreshRate = null;
/**
 * 表示情報オブジェクト配列です。
 * @private
 * @field
 * @type {Array}
 */
ykl2.appearImages.prototype._imageInfoArary = null;
/**
 * 画像表示要素です。
 * @private
 * @field
 * @type {Element}
 */
ykl2.appearImages.prototype._imgElement = null;
/**
 * 表示更新タイマーIDです。
 * @private
 * @field
 * @type {Number}
 */
ykl2.appearImages.prototype._timerId = null;
/**
 * 表示されている画像の透明度です。
 * @private
 * @field
 * @type {Number}
 */
ykl2.appearImages.prototype._nowOpacity = 0;
/**
 * 透明度変更の刻み値です。
 * @private
 * @field
 * @type {Number}
 */
ykl2.appearImages.prototype._opacityStep = 0;
/**
 * 現在の画像番号です。
 * @private
 * @field
 * @type {Number}
 */
ykl2.appearImages.prototype._nowImageNumber = 0;
/**
 * 画像を追加します。
 * @public
 * @function
 * @param {String} url 表示する画像のURL
 * @param {Number} width 画像表示時の横幅
 * @param {Number} height 画像表示時の縦幅
 * @param {Number} appearTime 画像が表示されるまでの時間（ミリ秒）。
 * @param {*} stayTime 画像表示後に次の画像表示を始めるまでの時間（ミリ秒）。
 */
ykl2.appearImages.prototype.addImage = function(url, width, height, appearTime, stayTime)
{
    // 画像情報を格納します。
    let imageInfo =
    {
        url : url,
        width: width,
        height: height,
        appearTime : appearTime,
        stayTime: stayTime
    };
    // 画像情報を配列に追加する。
    this._imageInfoArary.push(imageInfo);
};
/**
 * 登録されている画像の数を返します。
 * @public
 * @function
 * @returns {Number} 登録されている画像の数。
 */
ykl2.appearImages.prototype.getImageCount = function()
{
    // 配列に登録されている要素数を返す。
    return this._imageInfoArary.length;
}
/**
 * 画像要素を作成して返します。
 * @private
 * @function
 * @returns {Element} 画像要素。
 */
ykl2.appearImages.prototype._createImageElement = function()
{
    // 画像要素を作成します。
    let ele = document.createElement('img');
    ele.id = this._id;
    ele.alt = 'appearImage';
    ele.style.margin = '0';
    ele.style.padding = '0';

    // 作成した要素を返す。
    return ele;
};
/**
 * 現在の画像情報オブジェクトを返します。
 * @private
 * @function
 * @returns {Object} 画像情報オブジェクト
 */
ykl2.appearImages.prototype._getNowImageInfo = function()
{
    // 画像情報インデックスが範囲外の場合は null を返す。
    if(this.getImageCount() <= this._nowImageNumber) { return null; }

    // 画像情報を返す。
    return this._imageInfoArary[this._nowImageNumber];
};
/**
 * 画像表示を開始します。
 * @public
 * @function
 */
ykl2.appearImages.prototype.start = function()
{
    // 登録されている画像が無かったら終了。
    if(this.getImageCount() <= 0) { return; }

    // 表示する画像番号を最初に設定
    this._nowImageNumber = 0;

    // 画像表示を行う。
    this._dispImage();
};
/**
 * 画像表示を行います。
 * @private
 * @function
 */
ykl2.appearImages.prototype._dispImage = function()
{
    // 表示する画像情報を初期化します。
    this._initImageInfo();

    // 画像を徐々に表示させる。
    this._appearImage();
};
/**
 * 表示する画像情報を初期化します。
 * @private
 * @function
 */
ykl2.appearImages.prototype._initImageInfo = function()
{
    // 画像の透明度を0に設定します。
    this._nowOpacity = 0;
    this._imgElement.style.opacity = 0;

    // 現在の画像情報から透明度変更刻み値を計算。
    const imgInfo = this._getNowImageInfo();
    this._opacityStep = 100 / (imgInfo.appearTime / this._refreshRate);

    // 画像のアドレスを表示領域にセット。
    this._imgElement.src = imgInfo.url;
};
/**
 * 画像を徐々に表示させます。
 * @private
 * @function
 */
ykl2.appearImages.prototype._appearImage = function()
{
    // 徐々に表示させる処理関数
    const that = this;
    const func = function()
    {
        // 透明度を設定します。
        that._nowOpacity += that._opacityStep;
        that._imgElement.style.opacity = that._nowOpacity / 100;

        // 画像が表示され終わったときの処理。
        if(that._nowOpacity >= 100) 
        {
            // 表示処理を止める。
            clearInterval(that._timerId);

            // 次画像までの表示待ちタイマー起動。
            that._setWaitTimer();
            return;
        }
    };
    // 徐々に画像を表示させる処理を一定周期で起動。
    this._timerId = setInterval(func, this._refreshRate);
};
/**
 * 表示待機処理。
 * @private
 * @function
 */
ykl2.appearImages.prototype._setWaitTimer = function()
{
    // 次の画像を表示するまでの待機処理。
    const that = this;
    const func = function()
    {
        // タイマーを停止
        clearTimeout(that._timerId);

        // インデックスを次に移動し、表示処理を起動する。
        that._setNextIndex();
        that._dispImage();
    };
    // 表示時間待機して描画処理を起動。
    this._timerId = setTimeout(func, this._getNowImageInfo().stayTime);
};
/**
 * 次のインデックスを設定します。
 * @private
 * @function
 */
ykl2.appearImages.prototype._setNextIndex = function()
{
    // 登録画像がない場合は-1を設定して終了。
    if(this.getImageCount() <= 0)
    {
        this._nowImageNumber = -1;
        return;
    }
    // 画像インデックスを次に設定。
    this._nowImageNumber++;

    // 画像インデックスが範囲外になったら最初に戻す。
    if(this.getImageCount() <= this._nowImageNumber) { this._nowImageNumber = 0; }
}
//-----------------------------------------------------------------------------
//  ykl2 appearImages End.
//-----------------------------------------------------------------------------