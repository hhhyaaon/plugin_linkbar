$(function() {

    window.hy = window.hy || {};

    window.hy.linkBar = function linkBar(config) {
        var cfg = $.extend(true, {
            //plug wapper
            element: $("<div>"),
            //icon className of link
            icoClass: "lnkbar_redpoint",
            //content collections
            contents: []
        }, config);

        var dspLinkArr = [];
        var listLinkArr = [];

        var $container = $("<div>").addClass("lnkbar_container");

        var $links = $("<div>").addClass("lnkbar_links");

        var $list = $("<ul>").addClass("lnkbar_list");

        var $end = $("<div>").text("END").addClass("lnkbar_end");


        var _this = this;




        //-----public-------

        _this.element = cfg.element;


        // _this._init = _init;
        // _this._bind = _bind;
        // _this._createDom = _createDom;
        // _this._getContent = _getContent;
        // _this._setLink = _setLink;
        // _this._resize = _resize;

        //------------

        /**
         * [_init description] Init plug-in
         * @return {[void]} [description]
         */
        _this._init = function() {
            _this._createDom();
            _this._bind();
        }

        /**
         * [_bind description] Bind events in plug-in
         * @return {[void]} [description]
         */
        _this._bind = function() {
            $(document).scroll(_this._setLink);
            $(window).resize(_this._resize);
        }


        /**
         * [createDom description] Create DOM of plug-in 
         * @return {[void]} [description] 
         */
        _this._createDom = function() {

            if (cfg.contents instanceof Array === false) return;

            $.each(cfg.contents, function(i, ele) {

                var $link = $("<a href='javascript:void(0);'>").text(i + 1).addClass("lnkbar_link").addClass(cfg.icoClass);

                //list
                var $listLink = $link.clone();
                listLinkArr.push($listLink);
                $list.append($("<li>").append(
                    $listLink
                ).append(
                    $("<div>").append(_this._getContent(ele)).addClass("lnkbar_ctn")
                ).addClass("lnkbar_item"));

                //links
                var $dspLink = $link.clone();
                dspLinkArr.push($dspLink);
                $links.append($dspLink.click(function() {
                    _this._gotoLink($(this));
                }));
            });

            $container.append($links).append($list).append($end);

            cfg.element.append($container);

            _this._resize();
        }

        /**
         * [_getContent description] Get jQuery elements of display contents
         * @param  {[string|jquery|element]} ctn [description] Contents display in every list item
         * @return {[jquery]}     [description] JQuery elements display finally
         */
        _this._getContent = function(ctn) {
            if (ctn == null) return $("<span>").text("");
            else if (typeof ctn === "string") return $("<span>").html(ctn);
            else if (ctn instanceof jQuery === true || ctn instanceof Element === true) return $(ctn);
            else return $("<span>").html(ctn.toString());
        }

        /**
         * [_setLink description] Set link show or hide
         */
        _this._setLink = function() {
            $.each(listLinkArr, function(i, ele) {
                var $dsplink = $(dspLinkArr[i]);
                var isDspLinkShow = ele.get(0).getBoundingClientRect().top <= $(ele).outerHeight(true) * (i);
                $dsplink.css("display", isDspLinkShow ? "block" : "none");
                $(ele).css("visibility", isDspLinkShow ? "hidden" : "visible");

                //todo hide dspLink
                $links.outerHeight(true) > $end.get(0).getBoundingClientRect().top ? $links.hide() : $links.show();
            });
        }

        /**
         * [_gotoLink description] Show content according to dspLinkEle
         * @param  {[type]} dspLinkEle [description]
         * @return {[type]}            [description]
         */
        _this._gotoLink = function(dspLinkEle) {
            var index = $(dspLinkEle).index();
            var $listLink = listLinkArr[index];
            $(window).scrollTop($listLink.offset().top - $listLink.outerHeight(true) * index);
        }

        /**
         * [_resize description] Update elements position in plug
         * @return {[void]} [description]
         */
        _this._resize = function() {
            if (listLinkArr.length === 0) return;
            var $link = listLinkArr[0];
            $links.css("left", $link.get(0).getBoundingClientRect().left + $link.scrollLeft());

        }

        /**
         * [_isAllDspLinkShowOrHide description] Wether all display links are show or hide
         * @param  {Boolean} isShow [description] true: judge show; false:judge hide
         * @return {Boolean}        [description] Is meets condition
         */
        _this._isAllDspLinkShowOrHide = function(isShow) {
            isShow = isShow === true;
            return $.grep(dspLinkArr, function(ele) {
                return $(ele).is(isShow ? ":visible" : ":hidden");
            }).length === dspLinkArr.length;
        }



        //----public----------------

        /**
         * [resize description] Update elements position in plug
         * @return {[void]} [description]
         */
        _this.resize = function() {
            _this._resize();
        }

        /**
         * [gotoLink description] Show content according to dspLinkEle
         * @param  {[type]} index [description] Link index will go
         * @return {[type]}            [description]
         */
        _this.gotoLink = function(index) {
            if ($.isNumeric(index) && Number(index) >= 0 && Number(index) < dspLinkArr.length) {
                index = Math.floor(index);
                var $dspLink = $(dspLinkArr[index - 1]);
                _this._gotoLink($dspLink);
            }
        }


        //execute
        _this._init();

        return _this;

    }



}(jQuery))
