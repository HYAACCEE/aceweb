function initNav(){

  var s = '   <div class="listmenu">'
      +'<ul class="layui-nav layui-nav-tree" lay-filter="menu">'
      +'  <li class="layui-nav-item layui-nav-itemed">'
      +'    <a class="a-first goto" href="#" data="main.html">首页</a>'
      +'  </li>'
      +'  <li class="layui-nav-item">'
      +'    <a href="javascript:;">候选人</a>'
      +'    <dl class="layui-nav-child">';
  s += '      <dd><a href="#" class="goto" data="candidate_cv_complete_list.html">简历完善</a></dd>'
  s += '      <dd><a href="#" class="goto" data="candidate_cv_edit_confirm_list.html">简历更新审核</a></dd>'
  s += '      <dd><a href="#" class="goto" data="candidate_comment_confirm_list.html">顾问面评审核</a></dd>'
  s += '      <dd><a href="#" class="goto" data="candidate_active_list.html">Active状态审核</a></dd>'
  s += '      <dd><a href="#" class="goto" data="candidate_good_list.html">精选名单</a></dd>';
  s += '      <dd><a href="#" class="goto" data="candidate_better_list.html">特别推荐名单</a></dd>';
  s += '      <dd><a href="#" class="goto" data="candidate_black_list.html">黑名单</a></dd>';
  if(auid.indexOf('20161101000000999000000001')>=0){
  }
  if(auid.indexOf('20161101000000999000000091')>=0){
    s += '      <dd><a href="#" class="goto" data="candidate_st_list.html">全部候选人</a></dd>';
  }
  s += '    </dl>'
      +'  </li>'
      +'  <li class="layui-nav-item">'
      +'    <a href="javascript:;">顾问</a>'
      +'    <dl class="layui-nav-child">'
      +'      <dd><a href="#" class="goto" data="hc_online_apply_list.html">顾问在线申请审核</a></dd>'
      +'      <dd><a href="#" class="goto" data="hc_account_add.html">新增顾问</a></dd>'
      +'      <dd><a href="#" class="goto" data="hc_account_edit_list.html">更新顾问账户</a></dd>'
      +'      <dd><a href="#" class="goto" data="hc_account_combine.html">合并顾问账户</a></dd>'
      +'      <dd><a href="#" class="goto" data="hc_black_list.html">黑名单</a></dd>'
      +'    </dl>'
      +'  </li>'
      +'  <li class="layui-nav-item">'
      +'    <a href="javascript:;">客户</a>'
      +'    <dl class="layui-nav-child">'
      +'      <dd><a href="#" class="goto" data="hr_online_apply_list.html">HR在线申请审核</a></dd>'
      +'      <dd><a href="#" class="goto" data="hr_company_add_list.html">新增公司</a></dd>'
      +'      <dd><a href="#" class="goto" data="hr_account_add.html">新增HR账户</a></dd>'
      +'      <dd><a href="#" class="goto" data="hr_company_edit_list.html">更新公司</a></dd>'
      +'      <dd><a href="#" class="goto" data="hr_account_edit_list.html">更新HR账户</a></dd>'
      +'      <dd><a href="#" class="goto" data="hr_job_add.html">新增职位</a></dd>'
      +'      <dd><a href="#" class="goto" data="hr_job_edit_list.html">更新职位</a></dd>'
      +'      <dd><a href="#" class="goto" data="hr_jd_input_list.html">在线职位录入</a></dd>'
      +'      <dd><a href="#" class="goto" data="hr_invited_list.html">邀请面试</a></dd>'
      +'      <dd><a href="#" class="goto" data="hr_agreement_add.html">新增合同</a></dd>'
      +'      <dd><a href="#" class="goto" data="hr_black_list.html">黑名单</a></dd>'
      +'    </dl>'
      +'  </li>'
      +'  <li class="layui-nav-item">'
      +'    <a href="javascript:;">流程</a>'
      +'    <dl class="layui-nav-child">'
      +'      <dd><a href="#" class="goto" data="pc_bill_list.html">开票</a></dd>'
      +'      <dd><a href="#" class="goto" data="pc_pay_list.html">付款</a></dd>'
      +'      <dd><a href="#" class="goto" data="pc_dimission_list.html">保障期内离职</a></dd>'
      +'    </dl>'
      +'  </li>'
      +'  <li class="layui-nav-item">'
      +'    <a href="javascript:;">统计</a>'
      +'    <dl class="layui-nav-child">'
      +'      <dd><a href="#" class="goto" data="stat_company_list.html">客户</a></dd>'
      +'      <dd><a href="#" class="goto" data="stat_HR_data.html">HR数据统计</a></dd>'
      +'      <dd><a href="#" class="goto" data="stat_candidate.html">候选人</a></dd>'
      +'      <dd><a href="#" class="goto" data="stat_hc.html">顾问</a></dd>'
      +'      <dd><a href="#" class="goto" data="stat_process_list_ing.html">流程</a></dd>'
      +'    </dl>'
      +'  </li>'
      +'</ul>'
      +'</div>';
  $("#leftbar").html(s);
}

$(document).ready(function(){

  initNav(); //初始化菜单
  
  layui.use(['layer', 'element'], function(exports){
    var layer = layui.layer
    ,element = layui.element(); //导航的hover效果、二级菜单等功能，需要依赖element模块

    
    //监听导航点击
    element.on('nav(menu)', function(elem){
      //console.log(elem)
      //layer.msg(elem.text());
    });
    
    $(".goto").click(function(e){
      to($(this).attr("data"));
    });
    $(".goto").eq(0).click();
  });
});
 
function to(url){
  $.ajaxSetup ({ cache: false });
  ajax(url+"?"+cmmv,{},function(data){  
    $("#mainArea").html(data);
  });
}
