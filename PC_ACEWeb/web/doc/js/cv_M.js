v='cvm00000001';
$(document).ready(function(){
    CID = getUrlCid();
});
function urlCid(){
  return URL_SPLITER_CID + cur_dataid();
}

//当前操作的cid
function cur_dataid(){
  return CID || DATAID; //或已在common.js中的DataLine_InitFuns函数中赋值
}
function cur_pcid(){
  return PCID || DATAID1; //或已在common.js中的DataLine_InitFuns函数中赋值
}

//初始化简历按钮的控制
function CV_InitActions(pdiv){
  var curdiv = pdiv || $("#hidata1");
  DataLine_InitFuns(curdiv);
  Pub_InitSlide(curdiv);
  
}
function F_showDetail(cid, tid, pcid, pid){
  //////util.UI.html("hcdialog_show_process_detail.html?tid="+DATAID2+"&pcid="+cur_pcid()+"&"+urlCid(), 480, 400, function(){});
  ajax_("CandiProcessMService.y?cmd=detailInfo", "{cid:'"+cid+"',tid:'"+tid+"',pcid:'"+pcid+"',pid:'"+pid+"'}", function(ret, html){
      if(ret==1){
        if(html.indexOf("http:")>=0){
          util.UI.html("hcdialog_openfile.html?"+xmll(html.split(SP)[1]), 0, 0, function(){});
        }else{
          var ss = html.split("`");
          var title;
          if(ss[0] == "安排面试" || ss[0] == "面试变更"){
            title = "面试详情";
          }else if(ss[0] == "安排顾问面试"){
            title = "顾问面试详情";
          }else{
            title = ss[0];
          }
          util.UI.msgBox(title, ss[1]);
        }
      }else{
        util.UI.err(html);
      }
  });
}

//简历的菜单
function CV_InitMenus(){
  $(".candidate_detail_cv_").click(function(){
      location.href = "candidate_detail_cv.html?tab=1&g=098"+CID;
  });
  $(".candidate_detail_process_").click(function(){
      location.href = "candidate_detail_process.html?tab=2&g=098"+CID;
  });
  $(".candidate_detail_action_").click(function(){
      location.href = "candidate_detail_action.html?tab=3&g=098"+CID;
  });
  $(".candidate_detail_files_").click(function(){
      location.href = "candidate_detail_files.html?tab=4&g=098"+CID;
  });
}

//简历-基本详情
function CV_Detail_Top(){
  ajax_("CandiDetailMService.y?cmd=detail", "{cid:'"+CID+"',index:'1'}", function(ret, html){
      $("#hidata_top").html(html);
      $("#hidata_top").show();
      $("#v_uptdate").html($("#uptdate").val());
      if($("#uptPower").val()==1) $(".M_editCV_").show();
      if($("#hcivPower").val()==1) $(".M_addHCIV_").show();
      CV_InitActions($("#hidata_top")); //初始化简历按钮的控制
      Menu_InitSlide($("#hidata_top")); //初始化更多
  });
}
//公司名称匹配
function AOrganQuery(a,$div){
  ajax_("CandiDetailMService.y?cmd=aorgan", "{objectMode:'',keyword:'"+a+"'}", function(ret, html){
    if(ret==1){
      $div.html(html);
      $div.show();
    }else{
      $div.html('');
      $div.hide();
    }
  });
}
