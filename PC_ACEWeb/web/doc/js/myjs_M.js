v='mym00000002';
function userCookie(){
	auid = util.Cookie.get('amdataAUID');
	mid = util.Cookie.get('amdataMID');
	amid = util.Cookie.get('amdataAMID');
	userName = util.Cookie.get('amdataFullName');
}
function reloadUserCookie(user){
  util.Cookie.set('amdataPower', user.POWER, 30);
  util.Cookie.set('amdataNickName', user.NICKNAME, 30);
}
//初始化简历按钮的控制
function CV_InitActions(){
  DataLine_InitFuns();
  Pub_InitSlide();
}
function PageStart_InitActions(){
	/*********************** 定义tab ***************************/
  if($("#topbar")) setTimeout(myMsgSocket, 2000);
	
	/************************ 定义action ***********************/
  $(".logout_").click(function(){ onlog('点击退出按钮'); logout(); go("user_login.html"); });

}
function logout(){
  util.Cookie.remove('amdataAUID');
  util.Cookie.remove('amdataMID');
  util.Cookie.remove('amdataAMID');
  util.Cookie.remove('amdataNickName');
  util.Cookie.remove('amdataFullName');
  util.Cookie.remove('amdataPower');
  util.Cookie.remove('amdataMMGroup');
  util.Cookie.remove('amdataMMGroupDesc');
  util.Cookie.remove('amdataMMFace');
  util.Cookie.remove('amdataUploadURL');
  util.Cookie.remove('amdataPIC_MAX_NUM');
  util.Cookie.remove('amdataAVI_MAX_NUM');
  util.Cookie.remove('amdataPIC_MAX_SIZE');
  util.Cookie.remove('amdataAVI_MAX_SIZE');
  util.Cookie.remove('amdataYOUKU_APPKEY');
  util.Cookie.remove('amdataYOUKU_SECRET');
  util.Cookie.remove('amdataYOUKU_ACCESS_TOKEN');
}
function checkLogin(){
	if(auid && auid.length > 20){
		return true;
	}else{
		util.UI.msgDialog("登录信息已过期，请重新登录！");
		window.location.href("user_login.html");
	}
	return false;	
}
function initTopbar(){
	var s = '';
	if(!isThis(".html") || isThis("/index") || isThis("r_login") || isThis("r_register") || isThis("r_password_re") || isThis("r_password_for") || isThis("pply_succes")){
    s += '<div class="main display-table">';
    s += '<div class="display-td middle text-c">';
    s += '<div class="float-l pointer logo"><img class="img60" src="../doc/images/M/logo.png"></div>';
    s += '<div class="float-r dt20">';
    s += '<span class="float-l bold f19 pd20"></span>';
    s += '<span class="float-r pdr50"><button class="btn-default pd20 login_">登录</button></span>';
    s += '</span>';
    s += '</div>';
    s += '</div>';
	}else{
		if(checkLogin()){

      s += '<div class="main display-table">';
      s += '<div class="display-td middle text-c">';
      s += '<div class="float-l logo"><img class="img60" src="../doc/images/M/logo.png"></div>';
      s += '<div class="float-l dt20">';
      s += '</div><div class="float-r dt20 pdr50 nav-main">';
      s += '<img class="img30" src="../doc/images/gw_face.png"> <span class="grey f12 bold" id="li-4">'+userName+' <img class="arrow middle gone" src="../doc/images/arrow.png"></span>';
      s += '<a class="light-link logout_">退出</a></div>';
      s += '<!--隐藏盒子-->';
      s += '<div id="box-4" class="menu text-c hidden-box hidden-loc-us">';
      s += '<p><span><a class="light-link menu_user_edit_">账号设置</a></span></p>';
      s += '<p><span><a class="light-link menu_user_password_set_">修改密码</a></span></p>';
      s += '<p><span><a class="light-link logout_">退出</a></span></p>';
      s += '</div>';
      s += '</div>';
		}
	}
  $('#topbar').html(s);
}
function initLeftbar(){
}
function initBottombar(){

}
var $menu_main_num = null;
var showMsgFlag = true;
var showTime = 0;
function myMsgSocket(){
  if(!$(".menu_main_").offset()) return;
  ACECommon_ShowData("MainMService.y?cmd=newNotice", "{objectMode:'H00109-5'}", null, 0, function(ret,html){
      if(html>0){
        if($menu_main_num!=null){
          $menu_main_num = $("<div style='position:absolute;width:20px;height:20px; z-index:99; background-color:#ee2222; border-radius:10px;'><span id='menu_main_num' style='height:20px; line-height:20px; display:block; color:#FFF; text-align:center'></span></div>");
          $("#topbar").append($menu_main_num);
          $menu_main_num.css("top", ($(".menu_main_").offset().top) +"px");
          $menu_main_num.css("left", ($(".menu_main_").offset().left+48) +"px");
        }
        $("#menu_main_num").html((html>99 ? 99 : html));
      }else{
        if($menu_main_num!=null){
          $menu_main_num.hide();
        }
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