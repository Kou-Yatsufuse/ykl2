//-----------------------------------------------------------------------------
//  ykl2 v0.3.2
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
    // 要素が無効でない場合はクライアント領域をそのまま返す。
    if(ele.style.display !== 'none') { return { width: ele.clientWidth, height: ele.clientHeight }; }

    // 表示はさせないが、要素は存在するようにする。
    ele.style.visibility = 'hidden';
    ele.style.display = 'block';

    // クライアント領域を取得する。
    const width = ele.clientWidth;
    const height = ele.clientHeight;

    // 要素を非表示に戻す。
    ele.style.display = 'none';
    ele.style.visibility = '';

    // 取得した値を返す。
    return { width: width, height: height };
};
/**
 * スクロールバーの幅を取得する。
 * @public
 * @static
 * @function
 * @returns {Number} スクロールバーの幅。
 */
ykl2.commonFunctions.getScrollBarWidth = function()
{
    // スクロールバーの幅を計算して返す。
    return window.innerWidth - document.body.clientWidth;
};
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

//-----------------------------------------------------------------------------
//  ykl2 animation Start.
//-----------------------------------------------------------------------------
/**
 * アニメーションクラス宣言です。
 * @public
 * @static
 * @namespace ykl2.animation
 */
ykl2.animation = {};
/**
* 開くときのアニメーションフラグです。
* @public
* @static
* @field
* @type {Number}
*/
ykl2.animation.DRAW_OPEN = 0;
/**
* 閉じる時のアニメーションフラグです。
* @public
* @static
* @field
* @type {Number}
*/
ykl2.animation.DRAW_CLOSE = 1;
/**
* 縦横アニメーションフラグです。
* @public
* @static
* @field
* @type {Number}
*/
ykl2.animation.DIRECTION_WH = 0;
/**
* 横アニメーションフラグです。
* @public
* @static
* @field
* @type {Number}
*/
ykl2.animation.DIRECTION_W = 1;
/**
* 縦アニメーションフラグです。
* @public
* @static
* @field
* @type {Number}
*/
ykl2.animation.DIRECTION_H = 2;
/**
* 描画情報オブジェクトです。
* @private
* @static
* @field
* @type {Object}
*/
ykl2.animation._drawInfo = {};
/**
* アニメーション中フラグです。
* @private
* @static
* @field
* @type {Boolean}
*/
ykl2.animation._isAnimation = false;
/**
 * オーバーフロースタイルのバックアップです。
 * @private
 * @static
 * @field
 * @type {String}
 */
ykl2.animation._overflowBackup = '';
/**
* 描画情報オブジェクトを返します。
* @public
* @static
* @function
* @returns {Object} 描画情報オブジェクトです。
*/
ykl2.animation.getDrawInfo = function()
{
	return this._drawInfo;
};
/**
* 開閉アニメーションを行います。
* @public
* @static
* @function
* @param {Object} option 描画情報オブジェクトです。
*/
ykl2.animation.toggle = function(option)
{
	// アニメーション中は終了するまで処理させない。
	if(this._isAnimation) { return; }
	this._isAnimation = true;

	// オプション値の補正。要素がない場合は終了する。
	option = this._fixOption(option);
	if(option.element === null) { return; }

	// 描画情報を設定する。
	this._drawInfo.element   = option.element;
	this._drawInfo.direction = option.direction;
	this._drawInfo.openClose = option.openClose;
	this._drawInfo.width     = option.width;
	this._drawInfo.height    = option.height;
	this._drawInfo.time      = option.time;

	// アニメーションを行う際は一番全面に表示する。
	this._drawInfo.element.style.zIndex = 100;

    // オーバーフローのバックアップを取り、クリップするように変更。
    this._overflowBackup = this._drawInfo.element.style.overflow;
    this._drawInfo.element.style.overflow = 'clip';

	// 描画時の刻み値を設定する。
	this._setDrawWH();

	// アニメーション開始時の幅、高さを設定する。
	this._setNowWH();

	// requestAnimationFrameが使用できるかで処理を分ける。
	if(ykl2.commonFunctions.canAnimationFrame())
	{
		this._drawInfo.handle = requestAnimationFrame(ykl2.animation._procAnimation);
	}
	else
	{
		//-----------------------------------------------------------------
		// requestAnimationFrameが使えない時はアニメーションしない。
		//-----------------------------------------------------------------
		if(this._drawInfo.openClose === this.DRAW_OPEN)
		{
			this._drawInfo.element.style.width  = this._drawInfo.width  + 'px';
			this._drawInfo.element.style.height = this._drawInfo.height + 'px';
		}
		else
		{
			this._drawInfo.element.style.display = 'none';
		}
		this._isAnimation = false;
	}
};
/**
* 描画情報オブジェクトを補正します。
* @private
* @static
* @function
* @param {Object} option 描画情報オブジェクトです。
* @returns {Object} 補正された描画情報オブジェクトです。
*/
ykl2.animation._fixOption = function(option)
{
	// 要素の指定がない場合は終了。
	if(!option.element) { option.element = null; return; }

	// アニメーションの指定がない場合は縦横アニメーションにする。
	if(this._checkAnimationFlag(option.direction) === false)
	{
		option.direction = this.DIRECTION_WH;
	}
	// アニメーション速度が指定されていない場合はデフォルトを設定します。
	if(!option.time) { option.time = 5000; }

	// 開閉フラグが設定されていない場合は要素を見て決定する。
	if(!option.openClose)
	{
		if(option.element.style.display === 'none') { option.openClose = this.DRAW_OPEN;  }
		else                                        { option.openClose = this.DRAW_CLOSE; }
	}
    // 表示しない状態か、幅と高さの指定が無い場合のみ要素のサイズを取得する。
    if(option.element.style.display === 'none' || (!option.width && !option.height))
    {
        const size = ykl2.commonFunctions.getElementDisplaySize(option.element);
        option.width = size.width;
        option.height = size.height;
    }
	// 補正した描画情報オブジェクトを返します。
	return option;
};
/**
* アニメーション方向フラグが正常かどうかを返します。
* @private
* @static
* @function
* @param {Number} flag アニメーション方向フラグです。
* @returns {Boolean} true：正常 false：異常
*/
ykl2.animation._checkAnimationFlag = function(flag)
{
	// アニメーション方向が指定されている場合はtrueを返します。
	if(flag === this.DIRECTION_WH) { return true; }
	if(flag === this.DIRECTION_W)  { return true; }
	if(flag === this.DIRECTION_H)  { return true; }

	// アニメーションフラグが異常のためfalseを返します。
	return false;
};
/**
* 描画時の刻み値を設定します。
* @private
* @static
* @function
*/
ykl2.animation._setDrawWH = function()
{
	// 刻み値を計算する。
	this._drawInfo.drawWidth  = this._drawInfo.width  / (this._drawInfo.time / 1000);
	this._drawInfo.drawHeight = this._drawInfo.height / (this._drawInfo.time / 1000);

	// 変更方向による補正。
	if(this._drawInfo.direction === this.DIRECTION_W) { this._drawInfo.drawHeight = 0; }
	if(this._drawInfo.direction === this.DIRECTION_H) { this._drawInfo.drawWidth  = 0; }

	// 閉じる場合はマイナス値にする。
	if(this._drawInfo.openClose === this.DRAW_CLOSE)
	{
		this._drawInfo.drawWidth  = -this._drawInfo.drawWidth;
		this._drawInfo.drawHeight = -this._drawInfo.drawHeight;
	}
};
/**
* アニメーション開始時の幅、高さを設定します。
* @private
* @static
* @function
*/
ykl2.animation._setNowWH = function()
{
	// 開くアニメーションの時の処理。
	if(this._drawInfo.openClose === this.DRAW_OPEN)
	{
		// 縦横アニメーションする時。
		if(this._drawInfo.direction === this.DIRECTION_WH)
		{
			this._drawInfo.nowWidth  = 0;
			this._drawInfo.nowHeight = 0;
			return;
		}
		// 横アニメーションする時。
		if(this._drawInfo.direction === this.DIRECTION_W)
		{
			this._drawInfo.nowWidth  = 0;
			this._drawInfo.nowHeight = this._drawInfo.height;
			return;
		}
		// 縦アニメーションする時。
		this._drawInfo.nowWidth  = this._drawInfo.width;
		this._drawInfo.nowHeight = 0;
		return;
	}
	else
	{
		// 閉じるアニメーション時は最大値が初期値になる。
		this._drawInfo.nowWidth  = this._drawInfo.width;
		this._drawInfo.nowHeight = this._drawInfo.height;
		return;
	}
};
/**
 * オーバーフローの値を復元します。
 * @private
 * @static
 * @function
 */
ykl2.animation._repairOverflow = function()
{
    // オーバーフローの値を復元します。
    this._drawInfo.element.style.overflow = this._overflowBackup;
}
/**
* アニメーション処理を行います。
* @private
* @static
* @function
*/
ykl2.animation._procAnimation = function()
{
	// 描画情報の取得。
	const drawInfo = ykl2.animation.getDrawInfo();

	// 最新の幅、高さを計算する。
	drawInfo.nowWidth  += drawInfo.drawWidth;
	drawInfo.nowHeight += drawInfo.drawHeight;

	// 開くアニメーションか閉じるアニメーションかで処理を分ける。
	if(drawInfo.openClose === ykl2.animation.DRAW_OPEN)
	{
		// 開くアニメーション時の処理。
		drawInfo.element.style.display = 'block';
		if(drawInfo.width <= drawInfo.nowWidth && drawInfo.height <= drawInfo.nowHeight)
		{
			// 現在の値が目標値を超えていれば目標値を設定して終了。
			drawInfo.element.style.width  = drawInfo.width  + 'px';
			drawInfo.element.style.height = drawInfo.height + 'px';

			// 呼び出しをキャンセル。
			cancelAnimationFrame(drawInfo.handle);

			// アニメーション終了。
			ykl2.animation._isAnimation = false;

            // オーバーフローの値を復元。
            ykl2.animation._repairOverflow();
			return;
		}
	}
	else
	{
		// 閉じるアニメーション時の処理。
		if(drawInfo.nowWidth <= 0 || drawInfo.nowHeight <= 0)
		{
			// 幅または高さが0以下になったら要素を消して終了。
			drawInfo.element.style.width   = '';
			drawInfo.element.style.height  = '';
			drawInfo.element.style.display = 'none';

			// 呼び出しをキャンセル。
			cancelAnimationFrame(drawInfo.handle);

			// アニメーション終了。
			ykl2.animation._isAnimation = false;

			// アニメーションが終了したら表示優先度を消す。
			ykl2.animation._drawInfo.element.style.zIndex = '';

            // オーバーフローの値を復元。
            ykl2.animation._repairOverflow();
			return;
		}
	}
	// 現在の値を要素に反映する。
	drawInfo.element.style.width  = Math.floor(drawInfo.nowWidth)  + 'px';
	drawInfo.element.style.height = Math.floor(drawInfo.nowHeight) + 'px';

	// 呼び出しを止める。
	cancelAnimationFrame(drawInfo.handle);

	// 再度呼び出しを行う。
	drawInfo.handle = requestAnimationFrame(ykl2.animation._procAnimation);
};
//-----------------------------------------------------------------------------
//  ykl2.animation End.
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//  ykl2.showImage Start.
//-----------------------------------------------------------------------------
/**
 * 画像表示クラス宣言です。
 * @public
 * @static
 * @namespace ykl2.showImage
 */
ykl2.showImage = {};
/**
 * 画像要素です。
 * @private
 * @field
 * @type Element
 */
ykl2.showImage._imgElement = null;

/**
 * 背景要素です。
 * @private
 * @field
 * @type Element
 */
ykl2.showImage._backElement = null;

/**
 * 画像を画面中央に表示します。
 * @public
 * @function
 * @param {String} url 画像のURLです。
 * @param {Number} width 画像の幅です。
 * @param {Number} height 画像の高さです。
 */
ykl2.showImage.execute = function(url, width, height)
{
    // スクロールを不可にする。
    document.body.style.overflow = 'hidden';

    // スクロール量を取得します。
    const scrollX = ykl2.commonFunctions.getScrollX();
    const scrollY = ykl2.commonFunctions.getScrollY();

    // クライアント領域を取得します。
    let clientW = ykl2.commonFunctions.getClientWidth();
    let clientH = ykl2.commonFunctions.getClientHeight();

    // クライアント領域より幅または高さが大きかった場合の縮小処理。
    if(clientW < width || clientH < height)
    {
        // 画像の幅、高さが、クライアント領域の何%を占めるかを計算。
        let wPer = clientW / width;
        let hPer = clientH / height;

        // より小さかった大きさの割合に合わせて画像サイズを縮小する。
        if(wPer < hPer) { width = width * wPer; height = height * wPer; }
        else            { width = width * hPer; height = height * hPer; }
    }
    // 画像の表示位置を計算します。
    let imgX = ( clientW / 2 ) - ( width  / 2 ) + scrollX;
    let imgY = ( clientH / 2 ) - ( height / 2 ) + scrollY;

    // 画像要素と背景要素を取得します。
    this._imgElement  = this._createImageElement(url, width, height);
    this._backElement = this._createBackElement(clientW, clientH);

    // 背景画像を配置します。
    this._backElement.style.position = 'absolute';
    this._backElement.style.left     = scrollX + 'px';
    this._backElement.style.top      = scrollY + 'px';

    // 画像を配置します。
    this._imgElement.style.position = 'absolute';
    this._imgElement.style.left     = imgX + 'px';
    this._imgElement.style.top      = imgY + 'px';

    // bodyの子要素として追加します。
    document.body.appendChild(this._backElement);
    document.body.appendChild(this._imgElement);
};
/**
 * 画像要素を作成します。
 * @private
 * @function
 * @param {String} url 画像のURLです。
 * @param {Number} width 画像の幅です。
 * @param {Number} height 画像の高さです。
 * @return {Element} 画像要素です。
 */
ykl2.showImage._createImageElement = function(url, width, height)
{
    // 画像要素を作成します。
    const image = document.createElement('img');
    image.id           = 'showImage';
    image.src          = url;
    image.width        = width;
    image.height       = height;
    image.style.zIndex = 15;

    // イベントを設定します。
    const that = this;
    image.onclick     = function() { that._removeElements(); };
    image.onmouseover = function() { image.style.cursor = 'pointer'; };
    image.onmouseout  = function() { image.style.cursor = 'default'; };

    // 画像要素を返します。
    return image;
};
/**
 * 背景要素を作成します。
 * @private
 * @function
 * @param {Number} width
 * @param {Number} height
 * @return {Element} 背景要素です。
 */
ykl2.showImage._createBackElement = function(width, height)
{
    // 背景要素を作成します。
    const back = document.createElement('div');
    back.id                    = 'backgroundScreen';
    back.style.margin          = '0';
    back.style.padding         = '0';
    back.style.width           = width + 'px';
    back.style.height          = height + 'px';
    back.style.backgroundColor = '#000000';
    back.style.zIndex          = 10;
    back.style.opacity         = 0.75;

    // 背景要素を返します。
    return back;
};
/**
 * 画像、背景要素を削除します。
 * @private
 * @function
 */
ykl2.showImage._removeElements = function()
{
    // body要素から要素を削除します。
    document.body.removeChild(this._imgElement);
    document.body.removeChild(this._backElement);
    
    // 要素にnullを設定して参照をなくします。
    this._imgElement = null;
    this._backElement = null;

    document.body.style.overflow = 'auto';
};
//-----------------------------------------------------------------------------
//  ykl.showImage End.
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//  ykl2.tileImages Start.
//-----------------------------------------------------------------------------
/**
 * 画像をタイル状に表示するクラスです。
 * @param {String} id 自身のIDです。
 * @param {String} parentId 親要素のIDです。
 * @param {Number} columnCnt カラム数です。
 * @param {Number} 画像のパディングです(px)。
 * @namespace ykl2.tileImages
 * @constructor
 */
ykl2.tileImages = function(id, parentId, columnCnt, padding)
{
    this._constructor(id, parentId, columnCnt, padding);
};
/**
 * 自要素のID
 * @private
 * @field
 * @type {String}
 */
ykl2.tileImages.prototype._id = null;
 /**
 * 親要素のID
 * @private
 * @field
 * @type {String}
 */
ykl2.tileImages.prototype._parentId = null;
 /**
 * 横カラム数
 * @private
 * @field
 * @type {Number}
 */
ykl2.tileImages.prototype._columnCnt = null;
 /**
 * パディング
 * @private
 * @field
 * @type {Number}
 */
ykl2.tileImages.prototype._padding = null;
 /**
 * 画像の横幅です。
 * @private
 * @field
 * @type {Number}
 */
ykl2.tileImages.prototype._imgWidth = null;
 /**
 * 表示用フレーム情報配列です。
 * @private
 * @field
 * @type {Array}
 */
ykl2.tileImages.prototype._dispFrames = [];
 /**
 * フレームの高さ情報配列です。
 * @private
 * @field
 * @type {Array}
 */
ykl2.tileImages.prototype._frameHeight = [];
/**
 * コンストラクタ
 * @private
 * @function
 * @param {String} id 自要素のID
 * @param {String} parentId 
 * @param {Number} columnCnt
 * @param {Number} padding
 */
ykl2.tileImages.prototype._constructor = function(id, parentId, columnCnt, padding)
{
    // 引数をメンバ変数に格納。
    this._id        = id;
    this._parentId  = parentId;
    this._columnCnt = columnCnt;
    this._padding   = padding;
    
    // カラム数が指定されていない場合はデフォルト(3)とする。
    if(!this._columnCnt) { this._columnCnt = 3; }

    // パディングが指定されていない場合はデフォルトとして(3)とする。
    if(!this._padding) { this._padding = 3; }

    // デフォルトでスクロールバーを表示する。
    document.body.style.overflow = "scroll";

    // 親要素の取得、ない場合はエラーメッセージを表示して終了。
    const parentElement = document.getElementById(this._parentId);
    if(!parentElement) { alert("ParentID Nothing!"); return; }
    
    // 表示領域からパディング、枠線分取り除いたものが画像横幅となる。
    const areaWidth = this._getClientWidth(this._parentId);
    this._imgWidth = this._getImgWidth(areaWidth);

    // カラム数分フレームを作成する。
    let index;
    for(index = 0; index < this._columnCnt; index++)
    {
        // 要素の作成とプロパティの設定。
        const frame = document.createElement("div");
        frame.style.float = "left";
        frame.style.width = this._imgWidth + "px";
        frame.style.padding = this._padding + "px";
        
        // 表示フレーム配列に追加し、親要素に子要素として追加。
        this._dispFrames.push(frame);
        parentElement.appendChild(frame);

        // フレーム毎の高さ計算配列を作成。
        this._frameHeight.push(0);
    }
    const br = document.createElement("br");
    br.style.clear = "both";
    parentElement.appendChild(br);

    // ウィンドウがリサイズされたときの処理
    window.addEventListener('resize', { myObj: this, handleEvent: this._recalcImgWidth} );
};
/**
 * 画像を追加します。
 * @public
 * @function
 * @param {String} imgPath
 * @param {Number} width
 * @param {Number} height
 */
ykl2.tileImages.prototype.add = function(imgPath, width, height)
{
    // 画像情報オブジェクトを作成。
    const imgData =
    {
        path  : imgPath,
        w     : width,
        h     : height
    };
    // 一番高さが小さいカラムのインデックスを取得。
    const index = this._getLowHeightFrame();
    
    // 画像要素の作成。
    const imgElement = this._createImageElement(imgData);

    // 一番小さいカラムに画像要素を追加。
    this._dispFrames[index].appendChild(imgElement);

    // 追加した画像要素分高さを増やしておく。
    this._frameHeight[index] += this._getImgHeight(width, height);
};
/**
 * 画像要素を作成して返します。
 * @private
 * @function
 * @param {Object} imgData
 * @return {Object} 
 */
ykl2.tileImages.prototype._createImageElement = function(imgData)
{
    // 画像要素を作成して、画像のパスとクリック時に拡大表示されるよう設定。
    const imgElement = document.createElement("img");
    imgElement.src = imgData.path;
    imgElement.width = imgData.w;
    imgElement.height = imgData.h;
    imgElement.loading = "lazy";
    imgElement.style.maxWidth = '100%';
    imgElement.style.height = 'auto';
    imgElement.onclick = function(){ ykl2.showImage.execute(imgData.path, imgData.w, imgData.h); }

    // 作成した要素を返す。
    return imgElement;
};
/**
 * 全カラムの中から一番縦の長さが小さいカラムインデックスを返します。
 * @private
 * @function
 * @return {Number} カラムインデックス
 */
ykl2.tileImages.prototype._getLowHeightFrame = function()
{
    // 変数準備
    let index;
    const indexMax  = this._frameHeight.length;
    let minIndex  = 0;
    let minHeight = this._frameHeight[0];

    // 全カラムをチェック対象とする。
    for(index = 0; index < indexMax ; index++)
    {
        // 最小の長さより小さい場合に処理。
        if(minHeight > this._frameHeight[index])
        {
            // 最小の長さと、そのカラムインデックスを保存。
            minHeight = this._frameHeight[index];
            minIndex = index;
        }
    }
    // 最小のカラムインデックスを返す。
    return minIndex;
};
/**
 * 横幅の大きさから高さを計算して返します。
 * @private
 * @function
 * @param {Number} width 画像幅
 * @param {Number} height 画像高さ
 * @return {Number} 横幅と同縮小率の高さ。
 */
ykl2.tileImages.prototype._getImgHeight = function(width, height)
{
    // 横幅が縮小される同じ比率で高さを返す。
    const per = this._imgWidth / width;
    return height * per;
};
/**
 * 指定要素のクライアント領域幅を取得します。
 * @private
 * @function
 * @param {String} elementId 取得対象の要素ID
 * @return {Number} クライアント領域幅
 */
ykl2.tileImages.prototype._getClientWidth = function(elementId)
{
    // 親領域の取得。ない場合はnullを返す。
    const parentElement = document.getElementById(elementId);
    if(!parentElement) { return null; }

    // パディングと枠線分の幅を計算。
    const paddingWidth = parentElement.style.paddingLeft +
                         parentElement.style.paddingRight + 2;

    // クライアント領域の横幅を返す。
    return parentElement.clientWidth - paddingWidth;
}
/**
 * 画像表示横幅を取得します。
 * @private
 * @function
 * @param {Number} areaWidth 表示領域の幅
 * @return {Number} 画像表示横幅
 */
ykl2.tileImages.prototype._getImgWidth = function(areaWidth)
{
    return Math.floor((areaWidth / this._columnCnt)) - (this._padding * 4);
}
/**
 * ウィンドウリサイズ時の画像幅再計算処理
 * @private
 * @function
 */
ykl2.tileImages.prototype._recalcImgWidth = function()
{
   // 渡したthisオブジェクトをthatにする。
   const that = this.myObj;

   // 画像サイズの計算
   const cWidth = that._getClientWidth(that._parentId);
   that._imgWidth = that._getImgWidth(cWidth);

   // 全フレームの画像横幅を更新する。
   let index;
   for(index = 0; index < that._columnCnt; index++)
   {
       that._dispFrames[index].style.width = that._imgWidth + "px";
   }
}
//-----------------------------------------------------------------------------
//  ykl.tileImages End.
//-----------------------------------------------------------------------------