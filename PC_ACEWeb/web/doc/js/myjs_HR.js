v='myhr00000017';
var attentionShow;
function userCookie(){
	auid = util.Cookie.get('hrdataAUID');
	mid = util.Cookie.get('hrdataMID');
	amid = util.Cookie.get('hrdataAMID');
    power = util.Cookie.get('hrdataPower');
	userName = util.Cookie.get('hrdataNickName');
    userFace = util.Cookie.get('hrdataFace');
	userPhone = util.Cookie.get('hrdataPhone');
  
  noticeShow = util.Cookie.get('hrdataNoticeShow') || 1;
  util.Cookie.set('hrdataNoticeShow', noticeShow, 30);

  attentionShow = util.Cookie.get('hrdataAttentionShow') || 1;
  util.Cookie.set('hrdataAttentionShow', attentionShow, 30);
}
function reloadUserCookie(user){
  util.Cookie.set('hrdataPower', user.POWER, 30);
  util.Cookie.set('hrdataNickName', user.NICKNAME, 30);
  util.Cookie.set('hrdataFace', user.FACE, 30);
  util.Cookie.set('hrdataNoticeShow', user.NOTICE_TOP, 30);
  util.Cookie.set('hrdataAttentionShow', user.NOTICE_COLLECT, 30);
}
function PageStart_InitActions(){
	/*********************** 定义tab ***************************/
	if($('.tab').hasClass('userTab')) initTab_user();
	if($('.tab').hasClass('mycandidateTab')) initTab_mycandidate();
  if($('.tab').hasClass('mycandidateCVTab')) initTab_mycandidateCV();
	if($('.tab').hasClass('myjobTab')) initTab_myjob();
  if($("#topbar")) setTimeout(myMsgSocket, 2000);

	var url = location.href;
	var p1 = url.indexOf("tab=");
	if(p1 > 0)
	  tab = url.substring(p1+4, p1+5);
	else tab = 1;
	$("#tab_"+tab).addClass("thistab");

  $(".tab div").click(function(){
      $(this).addClass("thistab").siblings().removeClass("thistab");
  });
  
  /* 返回顶部 */
  $("body").append('<div class="backTop bg-white text-c pointer gone"><i class="block"></i><span>返回<br />顶部</span></div>');
  $(window).scroll(function(){
  	var scroll = $(window).scrollTop();
  	if(scroll > 0){
  		$(".backTop").show();
  	}else{
  		$(".backTop").hide();
  	}
  })
  $(".backTop").click(function(){
  	$('body,html').animate({scrollTop: 0}, 200);
  })

	/************************ 定义action ***********************/
  
  $(".logo").click(function(){ 
	  if(auid && auid.length > 20){
		  onlog('点击LOGO'); go("main.html"); 
	  }else{
		  go("../ace.html");
	  }
  });
  $(".register_").click(function(){ onlog('点击注册按钮'); logout(); go("user_register.html?"+cmmv); }); //user_register_invitecode.html
  $(".logout_").click(function(){ onlog('点击退出按钮'); logout(); go("index.html?"+cmmv); });
  $(".returnMain_").click(function(){ onlog('点击返回首页按钮'); go("../index.html?"+cmmv); });

	$(".menu_main_").click(function(){ onlog('点击MENU[首页]'); go("main.html?"+cmmv); });
	$(".menu_my_candidate_process_list_").click(function(){ util.Cookie.remove('curtypeHR'); onlog('点击MENU[我的候选人]'); go("my_candidate_process_list_ing.html?"+cmmv+"&tab=1"); });
	$(".menu_my_job_list_").click(function(){ onlog('点击MENU[职位]'); go("my_job_list.html?"+cmmv); });

	$(".menu_user_edit_").click(function(){ onlog('点击MENU[账号设置]'); go("user_edit.html?"+cmmv+"&tab=1"); });
	$(".menu_user_password_set_").click(function(){ onlog('点击MENU[修改密码]'); go("user_password_set.html?"+cmmv+"&tab=2"); });
	$(".menu_bill_list_").click(function(){ onlog('点击MENU[开票记录]'); go("bill_list.html?"+cmmv+"&tab=3"); });

	$(".menu_my_candidate_process_list_ing_").click(function(){util.Cookie.remove('curtypeHR'); onlog('点击MENU[进行中]'); go("my_candidate_process_list_ing.html?"+cmmv); });
  $(".menu_my_candidate_process_list_over_").click(function(){ onlog('点击MENU[已结束]'); go("my_candidate_process_list_over.html?"+cmmv); });
	$(".menu_my_candidate_process_list_collect_").click(function(){ onlog('点击MENU[已收藏]'); go("my_candidate_process_list_collect.html?"+cmmv); });

	$(".user_edit_").click(function(){ onlog('点击TAB[账号设置]'); go("user_edit.html?"+cmmv+"&tab=1"); });
	$(".user_password_set_").click(function(){ onlog('点击TAB[修改密码]'); go("user_password_set.html?"+cmmv+"&tab=2"); });
	$(".bill_list_").click(function(){ onlog('点击TAB[开票记录]'); go("bill_list.html?"+cmmv+"&tab=3"); });
	$(".my_candidate_process_list_ing_").click(function(){ onlog('点击TAB[进行中]'); go("my_candidate_process_list_ing.html?"+cmmv+"&tab=1"); });
	$(".my_candidate_process_list_over_").click(function(){ onlog('点击TAB[已结束]'); go("my_candidate_process_list_over.html?"+cmmv+"&tab=2"); });
  $(".my_candidate_process_list_collect_").click(function(){ onlog('点击TAB[已收藏]'); go("my_candidate_process_list_collect.html?"+cmmv+"&tab=3"); });

//	$(".my_job_list_").click(function(){ onlog('点击TAB[招聘中]'); go("my_job_list.html"); });
//	$(".my_job_list_underline_").click(function(){ onlog('点击TAB[已下线]'); go("my_job_list_underline.html?tab=2"); });
	
  M0 = 'B';
}

function logout(){
  util.Cookie.remove('curtypeHR');
  util.Cookie.remove('hrdataAUID');
  util.Cookie.remove('hrdataMID');
  util.Cookie.remove('hrdataAMID');
  util.Cookie.remove('hrdataNickName');
  util.Cookie.remove('hrdataFullName');
  util.Cookie.remove('hrdataFace');
  util.Cookie.remove('hrdataPower');
  util.Cookie.remove('hrdataPhone');
  util.Cookie.remove('hrdataNoticeShow');
  util.Cookie.remove('hrdataAttentionShow');
  util.Cookie.remove('hrdataMMGroup');
  util.Cookie.remove('hrdataMMGroupDesc');
  util.Cookie.remove('hrdataUploadURL');
  util.Cookie.remove('hrdataPIC_MAX_NUM');
  util.Cookie.remove('hrdataAVI_MAX_NUM');
  util.Cookie.remove('hrdataPIC_MAX_SIZE');
  util.Cookie.remove('hrdataAVI_MAX_SIZE');
  util.Cookie.remove('hrdataYOUKU_APPKEY');
  util.Cookie.remove('hrdataYOUKU_SECRET');
  util.Cookie.remove('hrdataYOUKU_ACCESS_TOKEN');
}

function initTab_user(){
	var s = '';
	s += '<div class="float-l dt10 user_edit_" id="tab_1"><a class="white pointer"><span>账号设置</span></a></div>';
	s += '<div class="float-l dt10 mgl40 user_password_set_" id="tab_2"><a class="white pointer"><span>修改密码</span></a></div>';
	s += '<div class="float-l dt10 mgl40 bill_list_" id="tab_3"><a class="white pointer"><span>开票记录</span></a></div>';
	$(".tab").html(s);
}
function initTab_myjob(){
//	var s = '';
//	s += '<div class="float-l dt10 mgl40" id="tab_1"><a class="light-grey pointer my_job_list_ "><span>招聘中</span></a></div>';
//	s += '<div class="float-l dt10 mgl40" id="tab_2"><a class="light-grey pointer my_job_list_underline_"><span>已下线</span></a></div>';
//	$(".tab").html(s);
}
function initTab_mycandidate(){
	var s = '';
	s += '<div class="float-l dt10 mgl40 f14 my_candidate_process_list_ing_" id="tab_1"><a class="white pointer"><span class="f14">进行中</span></a></div>';
  s += '<div class="float-l dt10 mgl40 f14 my_candidate_process_list_over_" id="tab_2"><a class="white pointer"><span class="f14">已结束</span></a></div>';
	s += '<div class="float-l dt10 mgl40 f14my_candidate_process_list_collect_" id="tab_3"><a class="white pointer"><span class="f14">已关注</span></a></div>';
	$(".tab").html(s);
}
function initTab_mycandidateCV(){
  var s = '';
  s += '<div class="float-l dt10 pointer candidate_detail_cv_" id="tab_1"><span>简历</span></div>';
  s += '<div class="float-l dt10 mgl40 pointer candidate_detail_process_ gone" id="tab_2"><span>流程</span></div>';
  $(".tab").html(s);  
  CV_InitMenus();//初始化菜单控制
}
function checkLogin(){	
  if(auid && auid.length > 20){
		return true;
	}else{
    if(window.parent){
      window.parent.location.href = "user_login.html?=="+window.parent.location.href;
    }else{
      location.href = "user_login.html?=="+location.href;
    }
	}
	return false;	
}
function initTopbar(){
	var s = '';
	if(!isThis(".html") || isThis("index") || isThis("r_login") || isThis("r_register") || isThis("r_password_re") || isThis("r_password_for") || isThis("er_company_det") ||isThis("er_company_checkem") ||isThis("er_verifyemail_re")){
    s += '<div class="main display-table">';
    s += '<div class="display-td middle text-c">';
    s += '<div class="float-l pointer logo dt10" style="position: relative;"><img style="width:34px;height:51px" src="../doc/images/HR/hrlogo.png"><span style="position: absolute;top: 0;"><img height="10" src="../doc/images/Beta.png"></span></div>';
    s += '<div class="float-r dt20">';
    s += '<span class="float-l bold f19 pd20"></span>';
    s += '<span class="float-r pdr90"><button class="btn-large f12 h30 pd20 login_">登录</button></span>';
    s += '<span class="float-r pdr20"><button class="btn-black f12 h30 pd20 register_">申请注册</button></span>';
    s += '<span class="float-r pdr20"><button class="btn-transparent2 f14 pointer hunter_">我是猎头</button>';
    s += '</span>';
    s += '</div>';
    s += '</div>';
	}else{
		if(checkLogin()){

			s += '<div class="main display-table">';
			s += '<div class="display-td middle text-c">';
			s += '<div class="float-l pointer logo pdr60 dt10" style="position: relative;"><img style="width:34px;height:51px" src="../doc/images/HR/hrlogo.png"><span style="position: absolute;top: 0;"><img height="10" src="../doc/images/Beta.png"></span></div>';
//			s += '<div class="float-l dt20">';
//			s += '<span class="f16 pd20"><button class="'+(isThis('main.html')?'bold black':'')+' pointer btn-transparent2 f16 menu_main_">每周精选</button></span>';
//			s += '<span class="nav-main">';
//			s += '<span class="f16 pd20 nowrap" id="li-1"><button class="'+(isThis('my_candidate_process_list_')?'bold black':'')+' pointer menu_my_candidate_process_list_ btn-transparent2 f16 pd5 reddot_">我的候选人</button><img class="middle" width="13" src="../doc/images/arrow.png"></span>';
//			s += '<span class="f16 pd20"><button class="'+(isThis('my_job_list.html')?'bold black':'')+' pointer menu_my_job_list_ btn-transparent2 f16">我的职位</button></span>';
//			s += '</span></div><div class="float-r dt20 pdr50 nav-main">';
//			s += '<!--span><img style="CURSOR: pointer" onclick="javascript:window.open(\'http://b.qq.com/webc.htm?new=0&sid=7996109&o=ACELITE&q=7\', \'_blank\', \'height=502, width=644,toolbar=no,scrollbars=no,menubar=no,status=no\');"  border="0" SRC=http://wpa.qq.com/pa?p=1:7996109:3 alt="在线客服"></span-->';
//			s += '<span class="pdl20 f12" id="li-4">'+userName+'&nbsp;&nbsp;<img class="middle" width="11" src="../doc/images/arrow_s.png"></span>';
//			s += '</span>';
//			s += '</div>';
			s += '<div class="float-l dt20">';
			s += '<div class="layui-inline f16 pd20"><button class="'+(isThis('main.html')?'bold black':'')+' pointer btn-transparent2 f16 menu_main_">每周精选</button></div>';
			s += '<div class="layui-inline nav-main">';
			s += '<div class="layui-inline f16 pd20 nowrap nav-item" id="li-1"><button class="'+(isThis('my_candidate_process_list_')?'bold black':'')+' pointer menu_my_candidate_process_list_ btn-transparent2 f16 pd5 reddot_" style="position: relative;"><div id="menu_main_num" class="gone" style="position:absolute;top: -3px;left: -8px;width:12px; height:12px; background-color:#ee2222; border-radius:10px;"></div>我的候选人</button><img class="middle" width="13" src="../doc/images/arrow.png"></div>';
			s += '<div class="layui-inline f16 pd20"><button class="'+(isThis('my_job_list.html')?'bold black':'')+' pointer menu_my_job_list_ btn-transparent2 f16">我的职位</button></div>';
			s += '</div></div><div class="float-r dt20 nav-main">';
			s += '<!--span><img style="CURSOR: pointer" onclick="javascript:window.open(\'http://b.qq.com/webc.htm?new=0&sid=7996109&o=ACELITE&q=7\', \'_blank\', \'height=502, width=644,toolbar=no,scrollbars=no,menubar=no,status=no\');"  border="0" SRC=http://wpa.qq.com/pa?p=1:7996109:3 alt="在线客服"></span-->';
			s += '<div class="layui-inline pdl20 f12 nav-item dt5" id="li-4">'+userName+'&nbsp;&nbsp;<img class="middle" width="11" src="../doc/images/arrow_s.png"></div>';
			s += '<a class="float-r mgl20 coll pdt5" href="my_candidate_process_list_collect.html"><img src="../doc/images/HR/sc_icon.png" class="mgr5 float-l" height="17">收藏夹</a>';
			s += '</div>';
			s += '</div>';
			s += '<!--隐藏盒子-->';
			s += '<div id="box-1" class="menu hidden-box hidden-loc-index">';
			s += '<p style="background:red; filter:alpha(opacity:0,8); opacity:0;height:5px"><span class="h5"></span></p>';
			s += '<p><span><button class="light-link btn-transparent2 full-width f14 menu_my_candidate_process_list_ing_">进行中</button></span></p>';
      s += '<p><span><button class="light-link btn-transparent2 full-width f14 menu_my_candidate_process_list_over_">已结束</button></span></p>';
			s += '<p><span><button class="light-link btn-transparent2 full-width f14 menu_my_candidate_process_list_collect_">已收藏</button></span></p>';
			s += '</div>';
			s += '<div id="box-4" class="menu hidden-box hidden-loc-us">';
      s += '<p style="background:red; filter:alpha(opacity:0.5); opacity:0;height:5px"><span class="h5"></span></p>';
			s += '<p><span><button class="light-link btn-transparent2 full-width f14 menu_user_edit_">账号设置</button></span></p>';
			s += '<p><span><button class="light-link btn-transparent2 full-width f14 menu_user_password_set_">修改密码</button></span></p>';
			s += '<p><span><button class="light-link btn-transparent2 full-width f14 menu_bill_list_">开票记录</button></span></p>';
			s += '<p><span><button class="light-link btn-transparent2 full-width f14 logout_">退出</button></span></p>';
			s += '</div>';
			s += '</div>';
		}
	}	
	$('#topbar').html(s);
}
function initLeftbar(){
	
}
function initBottombar(){
	var s = '';
	s += '<div class="main display-table"><div class="display-td text-c middle">';
	s += '<div class="footTop">';
	s += '<span class="pd15 pointer aboutus_"><a href="../acehr.html">关于我们</a></span>';
	s += '<span class="pd2 pointer contactus_">|</span>';
	s += '<span class="pd15 pointer contactus_"><a href="../acecontact.html">联系我们</a></span>';
	s += '</div>';
//	s += '<div class="footIcon">';
//	s += '<a href="#"></a>';
//	s += '<a href="#"><div></div></a>';
//	s += '<a href="#"></a>';
//	s += '</div>';
	s += '<div class="footBom"><br>沪ICP备17013902号 © 2017 ACE</div>';
	s += '</div></div>';
	$('#bottombar').html(s);
}

var $menu_main_num = null;
var showMsgFlag = util.Cookie.get('hcdata_showMsgFlag') || true;
var showTime = 0;
function myMsgSocket(){
  if(!$(".menu_main_").offset()) return;
  ACECommon_ShowData("MainBService.y?cmd=newNotice", "{objectMode:'H00109-5'}", null, 0, function(ret,html){
      if(html>0){
        var $text_ = $("#menu_main_num");
        $text_.show();
        
        /*var $text_ = $("<div id='menu_main_num' style='position:absolute;width:12px; height:12px; background-color:#ee2222; border-radius:10px;'><span style='height:20px; line-height:20px; display:block; color:#FFF; text-align:center'></span></div>");
        $("#topbar").append($text_);
        $text_.css("top", ($(".reddot_").offset().top-5) +"px");
        $text_.css("left", ($(".reddot_").offset().left-8) +"px");*/
      }

      showTime++;
      if(showMsgFlag && showTime%6==2){
        layui.use('layer', function(){
          var layer = layui.layer;
          var type = "rb";
          var layindex = layer.msg('<div style="padding:20px;width:200px">您有'+ html +'条新消息</div>', {
            type: 1
            ,time: 5000
            ,offset: type //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
            ,id: 'LAY_demo'+type //防止重复弹出
            ,btn: '知道啦'
            ,btnAlign: 'c' //按钮居中
            ,shade: 0 //不显示遮罩
            ,yes: function(){
              showMsgFlag = false;
              util.Cookie.set('hcdata_showMsgFlag', showMsgFlag, 3);
              layer.closeAll();
            }
          });
        });
      }
  });
  window.onload = function(){
    t1 = setInterval(myMsgSocket, 60000);
  };
}

