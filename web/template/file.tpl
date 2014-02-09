<link rel="stylesheet" href="css/trans.css">
<div id="bd" class="trans">
    <div class="file-nav"></div>
    <form id="form" class="content doc-trans" action="submitFile.php" method="post" enctype="multipart/form-data">
        <ul class="file-info clear">
            <li class="file-info-detail">
                <iframe class="ie6mask"></iframe>
                <span class="bull">•</span>
                <label for="srcLanguage">选择语言：</label>
                <select id="srcLanguage" class="flog-js" data-act="select-lang" name="lang1">
                    <option value="zh">中文</option>
                    <option value="en">英文</option>
                    <option value="ru">俄文</option>
                    <option value="jp">日文</option>
                    <option value="fr">法文</option>
                    <option value="kr">韩文</option>
                </select>
                <label class="dest-language" for="destLanguage">&gt;&gt;</label>
                <select id="destLanguage" class="flog-js" data-act="select-lang" name="lang2">
                    <option value="en">英文</option>
                    <option value="zh">中文</option>
                    <option value="ru">俄文</option>
                    <option value="jp">日文</option>
                    <option value="fr">法文</option>
                    <option value="kr">韩文</option>
                </select>
                <span>目前不支持外文与外文互译</span>
            </li>
            <li class="file-info-detail">
                <span class="bull">•</span>
                <label for="fileInfo">提交文档：</label>
                <input id="fileInfo" class="input-file flog-js" data-act="select-file" name="fileInfo" type="file">
            </li>
            <li class="file-info-detail">
                <span class="bull">•</span>
                <label for="doctype">选择文档用途<i>：</i></label>
                <ul id="doctype" class="clear">
                    <li>
                        <input id="thesis" type="radio" value="专业论文" name="doctype" checked="checked">
                        <label for="thesis">专业论文</label>
                    </li>
                    <li>
                        <input id="resume" type="radio" value="简历简介" name="doctype">
                        <label for="resume">简历简介</label>
                    </li>
                    <li>
                        <input id="intro" type="radio" value="公司产品介绍" name="doctype">
                        <label for="intro">公司产品介绍</label>
                    </li>
                    <li>
                        <input id="contract" type="radio" value="合同标书" name="doctype">
                        <label for="contract">合同标书</label>
                    </li>
                    <li>
                        <input id="abroad" type="radio" value="留学移民" name="doctype">
                        <label for="abroad">留学移民</label>
                    </li>
                    <li class="more-type">
                        <input id="more" type="radio" value="更多" name="doctype">
                        <label for="more">更多</label>
                        <input id="moreText" type="text" name="moreText" value="" placeholder="请输入">
                    </li>
                </ul>
            </li>
            <li class="file-info-detail">
                <span class="bull">•</span>
                <label for="proField">选择专业领域<i>：</i></label>
                <ul id="proField" class="clear">
                    <li>
                        <input id="noField" type="radio" value="通用" name="proField" checked="checked">
                        <label for="noField">无特殊专业</label>
                    </li>
                    <li>
                        <input id="biomedicine" type="radio" value="生物医学" name="proField">
                        <label for="biomedicine">生物医学</label>
                    </li>
                    <li>
                        <input id="economicTrade" type="radio" value="经济贸易" name="proField">
                        <label for="economicTrade">经济贸易</label>
                    </li>
                    <li>
                        <input id="legalNorm" type="radio" value="法律法规" name="proField">
                        <label for="legalNorm">法律法规</label>
                    </li>
                    <li>
                        <input id="humanityArt" type="radio" value="人文艺术" name="proField">
                        <label for="humanityArt">人文艺术</label>
                    </li>
                    <li>
                        <input id="mechanoElectronic" type="radio" value="机械电子" name="proField">
                        <label for="mechanoElectronic">机械电子</label>
                    </li>
                    <li>
                        <input id="architecturalEngineering" type="radio" value="建筑工程" name="proField">
                        <label for="architecturalEngineering">建筑工程</label>
                    </li>
                    <li>
                        <input id="ITST" type="radio" value="IT科技" name="proField">
                        <label for="ITST">IT科技</label>
                    </li>
                    <li class="more-type">
                        <input id="moreField" type="radio" value="更多-" name="proField">
                        <label for="moreField">更多</label>
                        <input id="moreFieldText" type="text" name="moreFieldText" value="" placeholder="请输入">
                    </li>
                </ul>
            </li>
            <li class="file-info-detail">
                <span class="bull">•</span>
                <label for="otherRequirement">要求备注<i>：</i></label>
                <textarea name="otherInfo" id="otherRequirement"></textarea>
            </li>
        </ul>
        <div class="suggest">为建议填写，帮助我们选择合适的译员和理解您的需求，获取更佳的翻译质量</div>
        <a id="goToConfirmTrans" class="form-item-layout control-btn flog-js" data-act="try-submit" href="javascript:void(0)" rel="nofollow">提交翻译</a>
        <span class="read-agreement">
            <input id="alreadyRead" type="checkbox" checked="true"><label for="alreadyRead">我已阅读并同意<a href="terms-of-service.php" target="_blank" rel="nofollow">《元培专业翻译服务条款》</a></label>
        </span>
    </form>
</div>

<div class="confirmSubmit">
    <div class="user-info" style="margin-top: 192px;">
        <div class="closeWrap clear">
            <a class="close" href="javascript:void(0);"></a>
        </div> 
        <div class="user-content">
            <span class="title">个人信息 <i>(<strong>*</strong>为必填)</i></span>
            <label for="userNameI">姓名：</label>
            <div class="form-item-layout">
                <input id="userNameI" name="nameInfo" value="">
            </div>
            <label for="userPhoneI"><i class="important"><strong>*</strong></i>电话：</label>
            <div class="form-item-layout">
                <input id="userPhoneI" name="phoneInfo" value="" placeholder="用于报价，固话请填写区号">
            </div>
            <label for="userEmailI"><i class="important"><strong>*</strong></i>常用邮箱：</label> 
            <div class="form-item-layout">
                <input id="userEmailI" name="emailInfo" value="" placeholder="用于接收翻译结果">
            </div> 
            <label for="userQQI">QQ号码：</label>
            <div class="form-item-layout">
                <input id="userQQI" name="qqInfo" value="">
            </div>
            <label for="userBillI">发票抬头：</label> 
            <div class="form-item-layout">
                <input id="userBillI" name="billInfo" value="" placeholder="抬头，如公司名称等">
            </div>
        </div>
        <div class="confirmWrap">
            <a id="goToTrans" class="form-item-layout control-btn flog-js" data-act="confirm-submit" href="javascript:void(0)" rel="nofollow">确认提交</a>
        </div>
    </div>
    <div class="forIEShadow"></div>
</div>