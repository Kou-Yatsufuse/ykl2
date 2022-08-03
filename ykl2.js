//-----------------------------------------------------------------------------
//  ykl2 v0.2.1
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
    // 表示しない状態で、且つ幅と高さの指定が 0px の場合のみ要素のサイズを取得する。
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
