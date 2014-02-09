<link type="text/css" href="./css/trans.css" rel="stylesheet">
<div id="bd" class="trans">
    <form class="content quick-trans" onsubmit="return false;">
        <div class="form-item-layout first-margin-fix first-margin-fix-right-tip">
            <a href="javascript:void(0)" id="fast-tip" hidefocus="true" class="message-tip">确保卓越翻译质量的六个技巧</a>
            <img src="./images/in-tip.jpg" style="margin-bottom:-3px">
        </div>
        <div class="form-item-layout first-margin-fix first-margin-fix-left">
            <label for="language">选择语言：</label>
            <select name="language" id="language" class="first-margin-fix">
                <option value="auto">自动检测语言</option>
                <option value="en-zh" class="clog-js" data-act="en-to-cn">英文-&gt;中文</option>
                <option value="zh-en" class="clog-js" data-act="cn-to-en">中文-&gt;英文</option>
            </select>
            <i class="trans-lang-message">目前仅支持中英互译</i>
            <i class="trans-error-message"></i>
        </div>

        <label for="inputText">翻译内容：</label>
        <textarea name="transContent" id="inputText" class="form-item-layout input-text" placeholder="请勿在此提交起名、古文、诗歌、菜单等创意性翻译。以上类型，请提交文档或咨询客服。"></textarea>
        <div class="trans-info form-item-layout">
            <a href="javascript:void(0)" class="clear-content clog-js" data-act="clear" rel="nofollow">清空内容</a>
            <span class="lang-text">字数统计：</span><span class="text-num">0</span>
            <div class="timeCost">预计耗时：<span class="time-num">0</span>分钟</div>
            <div class="price">价格：<span class="pay-num">0</span>元</div>
            <div id="christmas" title="有道专业翻译圣诞嘉年华活动">周年庆优惠 <span class="f-price">0</span>元，实际应支付 <span class="real-price">0</span>元</div>
        </div>
        <div class="demand-note">
            <label for="demandNote">需求备注：</label>
            <textarea name="demandNote" id="demandNote" rows="1" placeholder="如翻译领域、用途、专业词汇等相关说明"></textarea>
            <i class="demand-error-message"></i>
        </div>
        <div class="user-phone">
            <label for="inputText">&nbsp;&nbsp;电话：</label>
            <div class="form-item-layout">
                <input name="userMobile" id="userPhoneI" placeholder="可获得免费翻译状态短信提醒">
                <span class="error-tel"></span>
            </div>
        </div>
        <a id="goToTrans" class="form-item-layout control-btn form-item-submit" href="javascript:void(0)" rel="nofollow">提交翻译</a>
        <span class="read-agreement">
            <input id="alreadyRead" type="checkbox" checked="">
            <label for="alreadyRead">我已阅读并同意<a href="terms-of-service.php" target="_blank" rel="nofollow">《元培专业翻译服务条款》</a></label>
        </span>
        <div class="not-working-time content"></div>
        <div class="not-working-time-text">
            <span>您好，我们的工作时间为周一至周五 09:00-22:00，周六、日 09:00-22:00（重大节假日除外），由于现在是非工作时间，很抱歉无法为您提供快速翻译服务。
                <br><br>您可以使用&nbsp;&nbsp;<a href="file.php" rel="nofollow">文档翻译</a>&nbsp;&nbsp;或&nbsp;
                <a href="why-fast.php" rel="nofollow">了解快速翻译服务</a>
            </span>
        </div>
    </form>
    <div id="trans-history">
        <h3 class="history-title">
            <a class="see-more clog-js" href="javascript:void(0)" data-act="View-more" data-href="user.s?method=translateResult" rel="nofollow">查看更多</a>翻译记录
        </h3>
        <div id="trans-history-list"></div>
    </div>
</div>