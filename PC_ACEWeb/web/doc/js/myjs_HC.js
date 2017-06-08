//v='myhc00000015';
function userCookie(){
	auid = util.Cookie.get('hcdataAUID');
	mid = util.Cookie.get('hcdataMID');
  amid = util.Cookie.get('hcdataAMID');
  power = util.Cookie.get('hcdataPower');
	userName = util.Cookie.get('hcdataNickName');
	userFace = util.Cookie.get('hcdataFace');
	userPhone = util.Cookie.get('hcdataPhone');
	
	noticeShow = util.Cookie.get('hcdataNoticeShow') || 1;
	util.Cookie.set('hcdataNoticeShow', noticeShow, 30);
}
function reloadUserCookie(user){
  util.Cookie.set('hcdataPower', user.POWER, 30);
  util.Cookie.set('hcdataNickName', user.NICKNAME, 30);
  util.Cookie.set('hcdataFace', user.FACE, 30);
  util.Cookie.set('hcdataNoticeShow', user.NOTICE_TOP, 30);
}
function PageStart_InitActions(){
	/*********************** 定义tab ***************************/
	if($('.tab').hasClass('userTab')) initTab_user();
	if($('.tab').hasClass('mycandidateTab')) initTab_mycandidate();
	if($('.tab').hasClass('mycandidateCVTab')) initTab_mycandidateCV();
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
		  go("../indexhc.html");
	  }
  });  
  $(".register_").click(function(){ onlog('点击注册按钮'); logout(); go("user_register.html?"+cmmv); });
  $(".logout_").click(function(){ onlog('点击退出按钮'); logout(); go("../indexhc.html?"+cmmv); });
  $(".returnMain_").click(function(){ onlog('点击返回首页按钮'); go("../indexhc.html?"+cmmv); });
  $(".userGuide_").click(function(){ onlog('点击用户指南'); window.open("user_guide.html?"+cmmv); });

	$(".menu_main_").click(function(){ onlog('点击MENU[首页]'); go("main.html?"+cmmv); });
	$(".menu_candidate_list_").click(function(){ onlog('点击MENU[候选人]'); util.Cookie.remove('curtypeHC'); go("candidate_list.html?"+cmmv); });
	$(".menu_candidate_process_list_").click(function(){ onlog('点击MENU[流程]'); go("candidate_process_list_ing.html?"+cmmv+"&tab=1"); });

	$(".menu_user_edit_").click(function(){ onlog('点击MENU[账号设置]'); go("user_edit.html?"+cmmv+"&tab=1"); });
	$(".menu_user_password_set_").click(function(){ onlog('点击MENU[修改密码]'); go("user_password_set.html?"+cmmv+"&tab=2"); });
	$(".menu_bill_list_").click(function(){ onlog('点击MENU[开票记录]'); go("bill_list.html?"+cmmv+"&tab=3"); });
	
	$(".user_edit_").click(function(){ onlog('点击TAB[账号设置]'); go("user_edit.html?"+cmmv+"&tab=1"); });
	$(".user_password_set_").click(function(){ onlog('点击TAB[修改密码]'); go("user_password_set.html?"+cmmv+"&tab=2"); });
	$(".bill_list_").click(function(){ onlog('点击TAB[开票记录]'); go("bill_list.html?"+cmmv+"&tab=3"); });
	
	$(".candidate_process_list_ing_").click(function(){ onlog('点击TAB[进行中]'); go("candidate_process_list_ing.html?"+cmmv+"&tab=1"); });
	$(".candidate_process_list_over_").click(function(){ onlog('点击TAB[已结束]'); go("candidate_process_list_over.html?"+cmmv+"&tab=2"); });
	$(".candidate_process_list_collect_").click(function(){ onlog('点击TAB[被收藏]'); go("candidate_process_list_collect.html?"+cmmv+"&tab=3"); });

	M0 = 'S';
}
function logout(){
  util.Cookie.remove('curtypeHC');
  util.Cookie.remove('memoText');
  util.Cookie.remove('curtAuid');
  util.Cookie.remove('hcdataAUID');
  util.Cookie.remove('hcdataMID');
  util.Cookie.remove('hcdataAMID');
  util.Cookie.remove('hcdataNickName');
  util.Cookie.remove('hcdataFullName');
  util.Cookie.remove('hcdataFace');
  util.Cookie.remove('hcdataPower');
  util.Cookie.remove('hcdataPhone');
  util.Cookie.remove('hcdataNoticeShow');
  util.Cookie.remove('hcdataAttentionShow');
  util.Cookie.remove('hcdataMMGroup');
  util.Cookie.remove('hcdataMMGroupDesc');
  util.Cookie.remove('hcdataMMFace');
  util.Cookie.remove('hcdataUploadURL');
  util.Cookie.remove('hcdataPIC_MAX_NUM');
  util.Cookie.remove('hcdataAVI_MAX_NUM');
  util.Cookie.remove('hcdataPIC_MAX_SIZE');
  util.Cookie.remove('hcdataAVI_MAX_SIZE');
  util.Cookie.remove('hcdataYOUKU_APPKEY');
  util.Cookie.remove('hcdataYOUKU_SECRET');
  util.Cookie.remove('hcdataYOUKU_ACCESS_TOKEN');
}

function initSelectOptions_CandidateProcessStatus(obj){
	obj.options.add(new Option("","所有已入库"));
	obj.options.add(new Option("240000","未入库"));
	obj.options.add(new Option("240001","入库申请审核中"));
	obj.options.add(new Option("240002","未安排顾问面试"));
	obj.options.add(new Option("240003","已安排顾问面试"));
	obj.options.add(new Option("240004","顾问已提交面评"));
	obj.options.add(new Option("240005","已入库"));
	obj.options.add(new Option("240006","已入职"));
	obj.options.add(new Option("240007","入库待定"));
	obj.options.add(new Option("240008","黑名单"));
}
function initTab_user(){
	var s = '';
	s += '<div class="float-l user_edit_" style="line-height: 42px;" id="tab_1"><a class="white pointer"><span>账号设置</span></a></div>';
	s += '<div class="float-l mgl40 user_password_set_" style="line-height: 42px;" id="tab_2"><a class="white pointer"><span>修改密码</span></a></div>';
	s += '<div class="float-l mgl40 bill_list_" style="line-height: 42px;" id="tab_3"><a class="white pointer"><span>开票记录</span></a></div>';
	$(".tab").html(s);
}
function initTab_mycandidate(){
	var s = '';
	s += '<div class="float-l dt10" id="tab_1"><a class="white pointer candidate_process_list_ing_"><span>进行中</span></a></div>';
	s += '<div class="float-l dt10 mgl40" id="tab_2"><a class="white pointer candidate_process_list_over_"><span>已结束</span></a></div>';
//	s += '<div class="float-l dt10 mgl40" id="tab_3"><a class="white pointer candidate_process_list_collect_"><span>被收藏</span></a></div>';
	$(".tab").html(s);
}
function initTab_mycandidateCV(){
	var s = '';
	s += '<div class="float-l dt10 pointer candidate_detail_cv_" id="tab_1"><span>简历</span></div>';
	s += '<div class="float-l dt10 mgl40 pointer candidate_detail_process_" id="tab_2"><span>流程</span></div>';
	s += '<div class="float-l dt10 mgl40 pointer candidate_detail_action_" id="tab_3"><span>事件</span></div>';
	s += '<div class="float-l dt10 mgl40 pointer candidate_detail_files_" id="tab_4"><span>附件</span></div>';
	s += '<div class="float-l dt10 mgl40 pointer candidate_detail_memo_" id="tab_5"><span>备忘录</span></div>';
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
	if(!isThis(".html") || isThis("index") || isThis("r_login") || isThis("r_register") || isThis("r_password_re") || isThis("r_password_for") || isThis("er_company_det") || isThis("pply_succes")){
		s += '<div class="main display-table">';
		s += '<div class="display-td middle text-c">';
		s += '<div class="float-l pointer logo dt10" style="position: relative;"><img  style="width:34px;height:51px" src="../doc/images/HC/hclogo.png"><span style="position: absolute;top: 0;"><img height="10" src="../doc/images/Beta.png"></span></div>';
		s += '<div class="float-r dt20">';
		s += '<span class="float-l bold f19 pd20"></span>';
		s += '<span class="float-r pdr90"><button class="btn-large f12 pd20 h30 login_">登录</button></span>';
		s += '<span class="float-r pdr20"><button class="btn-black f12 pd20 h30 register_">申请注册</button></span>';
		s += '<span class="float-r pdr20"><button class="btn-transparent2 f14 pointer hr_">我要招人</button>';
		s += '</span>';
		s += '</div>';
		s += '</div>';
	}else{
		if(checkLogin()){

			s += '<div class="main display-table">';
			s += '<div class="display-td middle text-c">';
			s += '<div class="float-l logo pointer dt10" style="position: relative;"><img style="width:34px;height:51px" src="../doc/images/HR/hrlogo.png"><span style="position: absolute;top: 0;"><img height="10" src="../doc/images/Beta.png"></span></div>';
			s += '<div class="float-l dt20">';
			s += '<span id="menu_main_num" class="gone" style="position:absolute; width:20px; height:20px; background-color:#ee2222; border-radius:10px;"><span id="mainNC" style="height:20px; line-height:20px; display:block; color:#FFF; text-align:center"></span></span>';
      s += '<div class="layui-inline f16 pd20"><button class="'+(isThis('main.html')?'bold black':'')+' pointer btn-transparent2 f16 menu_main_">首页</button></div>';
			s += '<div class="layui-inline f16 pd20"><button class="'+(isThis('candidate_list.html')?'bold black':'')+' pointer btn-transparent2 f16 menu_candidate_list_">候选人</button></div>';
			s += '<div class="layui-inline f16 pd20"><button class="'+(isThis('candidate_process_list')?'bold black':'')+' pointer btn-transparent2 f16 menu_candidate_process_list_">流程</button></div>';
			s += '</div><div class="float-r dt20 pdr90 nav-main">';
			s += '<img class="raduis img30 userFace_" src="../doc/images/gw_face.png"><div class="layui-inline f12 pdl10 pdr30 nav-item" id="li-4">'+userName+'&nbsp;&nbsp;<img class="middle infoPic '+(power==1?"gone":"")+'" style="margin-right: 5px;" height="13" src="../doc/images/HC/shen_icon.png"><img class="middle" width="9" src="../doc/images/arrow_s.png"></div>';
			s += '<button class="btn-transparent2 f12 userGuide_"><img src="../doc/images/HC/help.png" height="14" style="margin-right: 5px;margin-top: -2px;" /><span class="pdl2">用户指南</span></button>';
			s += '</div>';
			s += '<!--隐藏盒子-->';
			s += '<div id="box-4" class="menu text-c hidden-box hidden-loc-us">';
      s += '<p style="background:#000; filter:alpha(opacity:0); opacity:0;height:5px"><span class="h5"></span></p>';
			s += '<p><span><button class="light-link btn-transparent2 full-width f14 menu_user_edit_">账号设置</button></span></p>';
			s += '<p><span><button class="light-link btn-transparent2 full-width f14 menu_user_password_set_">修改密码</button></span></p>';
			s += '<p><span><button class="light-link btn-transparent2 full-width f14 menu_bill_list_">开票记录</button></span></p>';
			s += '<p><span><button class="light-link btn-transparent2 full-width f14 logout_">退出</button></span></p>';
			s += '</div>';
			s += '</div>';
		}
	}	
	$('#topbar').html(s);
	if(userFace!='') $(".userFace_").attr("src", userFace);
}
function initLeftbar(){
	
}
function initBottombar(){
	var s = '';
	s += '<div class="main display-table"><div class="display-td text-c middle">';
	s += '<div class="footTop">';
	s += '<span class="pd15 aboutus_"><a href="../acehr.html">关于我们</a></span>';
	s += '<span class="pd2 pointer contactus_">|</span>';
	s += '<span class="pd15 contactus_"><a href="../acecontact.html">联系我们</a></span>';
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
	ACECommon_ShowData("MainSService.y?cmd=newNotice", "{objectMode:'H00109-5'}", null, 0, function(ret,html){
	    if(html>0){
	      $("#menu_main_num").show();
	      $("#mainNC").html(html>99 ? 99 : html);
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
    t1 = setInterval(myMsgSocket, 30000);
  };
}
