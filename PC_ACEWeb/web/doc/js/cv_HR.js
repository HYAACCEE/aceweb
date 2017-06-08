//v=cvhr000022;
var isMainPag = 0;
$(document).ready(function(){
    CID = getUrlCid();
    PCID = getUrlPcid();
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
	
  curdiv.find(".detail_").click(function(e){
	  util.Cookie.set('curtHtml',window.location.href,30);//存储当前HTML
      e.stopPropagation();
      onlog('点击[简历列表]'+cur_dataid());
      
      if(isMainPag == 1){
    	  curClickDIV = $(this).parent().parent().parent();
    	  $(this).addClass("grey");
    	  thisCidClick();
    	  util.UI.shadeHtml("candidate_detail_cv.html?nw=1&"+urlCid(), 960, 0);
      }else{
    	  go("candidate_detail_cv.html?"+urlCid());
      }
  });
  $(".export_").click(function(e){
      e.stopPropagation();
      onlog('点击[简历转发]按钮'+cur_dataid());
      util.UI.html("hrdialog_share_candidate.html?"+urlCid(), 480, 360, function(){});
  });
  $(".download_").click(function(e){
      e.stopPropagation();
      onlog('点击[简历下载]按钮'+cur_dataid());
      util.UI.confirm("您要下载简历吗？", function(){
        ajax_("CandiDetailBService.y?cmd=download", "{cid:'"+cur_dataid()+"'}", function(ret, html){
          window.open(html);
        });
      });
  });
  $(".HR_inviteIV_").click(function(e){
    e.stopPropagation();
    ajax_("CandiProcessBService.y?cmd=hrPower", "", function(ret, html){
      if(ret==1){
        if(html==1){
          onlog('点击[邀请面试]按钮'+cur_dataid());
          util.UI.html("hrdialog_invite.html?tid="+DATAID2+"&pcid="+cur_pcid()+"&"+urlCid(), 480, 320, function(){});
        }else{
          onlog('点击[邀请面试]按钮,但未签约'+cur_dataid());
          ajax_("CandiProcessBService.y?cmd=inviteLog", "{cid:'"+cur_dataid()+"'}");
          util.UI.html("hrdialog_unInvite.html", 420, 240, function(){});
        }
      }else{
        util.UI.err(html);
      }
    });
  });
  $(".HR_addIV_").click(function(e){
    e.stopPropagation();
    onlog('点击[安排面试]按钮'+cur_dataid());
    util.UI.html("hrdialog_interview_add.html?tid="+DATAID2+"&pcid="+cur_pcid()+"&"+urlCid(), 480, 432, function(){});
  });
  $(".HR_editIV_").click(function(e){
    e.stopPropagation();
    onlog('点击[面试变更]按钮'+cur_dataid());
    util.UI.html("hrdialog_interview_edit.html?tid="+DATAID2+"&pcid="+cur_pcid()+"&"+urlCid(), 480, 432, function(){});
  });
  $(".HR_addOffer_").click(function(e){
	e.stopPropagation();
    onlog('点击[上传Offer]按钮'+cur_dataid());
    util.UI.html("hrdialog_offer_upload.html?tid="+DATAID2+"&pcid="+cur_pcid()+"&"+urlCid(), 400, 220, function(){});
  });
  $(".HR_editOffer_").click(function(e){
    e.stopPropagation();
    onlog('点击[Offer变更]按钮'+cur_dataid());
    util.UI.html("hrdialog_offer_edit.html?tid="+DATAID2+"&pcid="+cur_pcid()+"&"+urlCid(), 400, 220, function(){});
  });
  $(".HR_showIV_").click(function(e){
    e.stopPropagation();
    onlog('点击[面试详情]按钮'+cur_dataid());
    util.UI.html("hrdialog_show_interview_info.html?tid="+DATAID2+"&pcid="+cur_pcid()+"&"+urlCid(), 480, 310, function(){});
  });
  $(".HR_showOffer_").click(function(e){
    e.stopPropagation();
    onlog('点击[Offer详情]按钮'+cur_dataid());
    ACECommon_ShowData("CandiProcessBService.y?cmd=offerFile", "{cid:'"+cur_dataid()+"',pcid:'"+cur_pcid()+"'}", null, 0, function(ret,html){
      util.UI.html("hrdialog_openfile.html?"+xmll(html), 0, 0, function(){});
    });
  });
  $(".HR_setIVPass_").click(function(e){
    e.stopPropagation();
    onlog('点击[面试通过]按钮'+cur_dataid());
    util.UI.confirm("您确认此人面试通过吗？", function(){
        ajax_("CandiProcessBService.y?cmd=doProcess", "{process:'330003', cid:'"+cur_dataid()+"', pcid:'"+cur_pcid()+"'}", function(ret, html){
          if(ret==1) reload();
          else util.UI.err(html);
        });
    });
  });
  $(".HR_setIVUnPass_").click(function(e){
    e.stopPropagation();
    onlog('点击[面试未通过]按钮'+cur_dataid());
    util.UI.confirm("您确认此人面试未通过吗？", function(){
        ajax_("CandiProcessBService.y?cmd=doProcess", "{process:'330043', cid:'"+cur_dataid()+"', pcid:'"+cur_pcid()+"'}", function(ret, html){
          if(ret==1) reload();
          else util.UI.err(html);
        });
    });
  });
  $(".HR_setEntry_").click(function(e){
    e.stopPropagation();
    onlog('点击[确定入职]按钮'+cur_dataid());
    util.UI.confirm("您确认此人已入职吗？", function(){
      ajax_("CandiProcessBService.y?cmd=doProcess", "{process:'330007', cid:'"+cur_dataid()+"', pcid:'"+cur_pcid()+"'}", function(ret, html){
          reload();
      });
    });
  });
  $(".HR_setUnEntry_").click(function(e){
    e.stopPropagation();
    onlog('点击[未能入职]按钮'+cur_dataid());
    util.UI.confirm("确定候选人未入职吗？", function(){
        ajax_("CandiProcessBService.y?cmd=doProcess", "{process:'330047', cid:'"+cur_dataid()+"', pcid:'"+cur_pcid()+"'}", function(ret, html){
          if(ret==1) reload();
          else util.UI.err(html);
        });
    });
  });
  $(".HR_setDimission_").click(function(e){
    e.stopPropagation();
    onlog('点击[离职]按钮'+cur_dataid());
    util.UI.confirm("确定候选人已离职吗？", function(){
      ajax_("CandiProcessBService.y?cmd=doProcess", "{objectMode:'H00520', cid:'"+cur_dataid()+"', pcid:'"+cur_pcid()+"'}", function(ret, html){
          if(ret==1){
            util.UI.msgDialog("", "感谢您的反馈，我们工作人员将在3个工作日内与您联系。请耐心等待。", function(){
              reload();
            });
          }else{
            util.UI.err(html);
          }
      });
    });
  });
  $(".HR_billPayToHC_").click(function(e){
    e.stopPropagation();
    onlog('点击[付款给顾问]按钮'+cur_dataid());
    util.UI.confirmDialog("付款给顾问", "付款给顾问后您将无法发起退款，确定继续？", function(){
      ajax_("CandiProcessBService.y?cmd=doProcess", "{process:'550003', cid:'"+cur_dataid()+"', pcid:'"+cur_pcid()+"'}", function(ret, html){
        if(ret==1) reload();
        else util.UI.err(html);
      });
    });
  });
  $(".HR_showReason_").click(function(e){
    e.stopPropagation();
    onlog('点击[查看原因]按钮'+cur_dataid());
    F_showDetail(cur_dataid(), DATAID2, cur_pcid(), "","的原因");
  });
  $(".HR_showDetail_").click(function(e){
    e.stopPropagation();
    onlog('点击[查看详情]按钮'+cur_dataid());
    F_showDetail(cur_dataid(), DATAID2, cur_pcid(), "","");
  });
  curdiv.find(".HR_Home_collect_").click(function(e){
	    e.stopPropagation();
	    onlog('点击[收藏]按钮'+cur_dataid());
	    util.Cookie.set('hrdataAttentionShow', "0", 30);
	    attentionShow = 0;
	    var event = e.target;
    	var thisParent = $(curdiv).find(".dataline_");
    	var dataId = $(curdiv).children().attr("data");
    	var loadingIndex = util.UI.loading();
	    ajax_("CandiProcessBService.y?cmd=doProcess", "{objectMode:'H00522', cid:'"+cur_dataid()+"'}", function(ret, html){
	      util.UI.closeLoading(loadingIndex);
	      if(ret==1){
	    		var dataline = $(event).parent().parent().parent().parent().parent();
	    		e.target == '[object HTMLImageElement]' ? dataline = dataline.parent() : dataline = dataline;
	    		dataline.find(".actions_").attr("data1",'1');
	    		dataline.find(".actions_").hide();
	    		dataline.find("#candidNumber_").show();
	    		dataline.find("#itemFooter_").show();
	    		dataline.find("#itemFooter_").children().eq(0).hide();
	    		dataline.find("#itemFooter_").children().eq(1).removeClass("gone");
	    		dataline.find("#itemFooter_").children().eq(1).html("已收藏");
	    		dataline.find("#collectImg_").removeClass("gone");
	    		dataline.find("#collectImg_").attr('src',"../doc/images/HR/marker_guanzhu.png");
	    	}else{
	        if(isMainPag == 1){
	          util.UI.err(html);
	        }
	    	}
	    });
	});
  $(".HR_collect_").click(function(e){
    e.stopPropagation();
    onlog('点击[收藏]按钮'+cur_dataid());
    util.Cookie.set('hrdataAttentionShow', "0", 30);
    attentionShow = 0;
    ajax_("CandiProcessBService.y?cmd=doProcess", "{objectMode:'H00522', cid:'"+cur_dataid()+"'}", function(ret, html){
        CV_Detail_Top();
    });
  });
  $(".HR_unCollect_").click(function(e){
    e.stopPropagation();
    onlog('点击[取消收藏]按钮'+cur_dataid());
    util.UI.confirm("您要取消收藏此人吗？", function(){
        ajax_("CandiProcessBService.y?cmd=doProcess", "{objectMode:'H00523', cid:'"+cur_dataid()+"'}", function(ret, html){
            CV_Detail_Top();
        });
    });
  });
  $(".HR_addBlacklist_").click(function(e){
    e.stopPropagation();
    onlog('点击[加入黑名单]按钮'+cur_dataid());
    util.UI.confirm("您要将此人加入黑名单吗？", function(){
        ajax_("CandiProcessBService.y?cmd=doProcess", "{objectMode:'H00524', cid:'"+cur_dataid()+"'}", function(ret, html){
            CV_Detail_Top();
            util.UI.msg(html);
        });
    });
  });
  $(".HR_delBlacklist_").click(function(e){
    e.stopPropagation();
    onlog('点击[移出黑名单]按钮'+cur_dataid());
    ajax_("CandiProcessBService.y?cmd=doProcess", "{objectMode:'H00526', cid:'"+cur_dataid()+"'}", function(ret, html){
        CV_Detail_Top();
        util.UI.msg(html);
    });
  });
}

$(".HR_hcInfo_").click(function(e){
  onlog('点击[查看顾问信息]按钮'+cur_dataid());
  util.UI.html("hrdialog_show_hunter_info.html?"+$(this).attr("data"), 380, 270);
});
function F_showDetail(cid, tid, pcid, pid,reason){
	  //////util.UI.html("hcdialog_show_process_detail.html?tid="+DATAID2+"&pcid="+cur_pcid()+"&"+urlCid(), 480, 400, function(){});
	  ajax_("CandiProcessBService.y?cmd=detailInfo", "{cid:'"+cid+"',tid:'"+tid+"',pcid:'"+pcid+"',pid:'"+pid+"'}", function(ret, html){
	      if(ret==1){
	        if(html.indexOf("http:")>=0){
	          util.UI.html("hrdialog_openfile.html?"+xmll(html.split(SP)[1]), 0, 0, function(){});
	        }else{
	          var ss = html.split("`");
	          var title;
	          if(ss[0] == "安排面试" || ss[0] == "面试变更"){
	            title = "面试详情";
	          }else if(ss[0] == "安排顾问面试"){
	            title = "顾问面试详情";
	          }else{
	            title = ss[0]+reason;
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
  $(".candidate_detail_cv_").click(function(e){
      location.href = "candidate_detail_cv.html?tab=1&"+urlCid();
  });
  $(".candidate_detail_process_").click(function(e){
      location.href = "candidate_detail_process.html?tab=2&"+urlCid();
  });
  $(".candidate_detail_action_").click(function(e){
      location.href = "candidate_detail_action.html?tab=3&"+urlCid();
  });
  $(".candidate_detail_files_").click(function(e){
      location.href = "candidate_detail_files.html?tab=4&"+urlCid();
  });
}

//简历-基本详情
function CV_Detail_Top(){
	  ajax_("CandiDetailBService.y?cmd=detail", "{cid:'"+CID+"',index:'1'}", function(ret, html){
	      $("#hidata_top").html(html);
	      $("#hidata_top").show();
	      $("#v_uptdate").html($("#uptdate").val());
	      if($("#pcid").val().length>0){
	        PCID = $("#pcid").val();
	        $(".candidate_detail_process_").show();
	      }
	      if($("#hrexportPower").val()==1){
	        $(".export_").show();
	        $(".download_").show();
	      }
		  if(attentionShow == 1){
		       $(".concern_tip").show();
		    }else{
		       $(".concern_tip").hide();
		    }
	      initCVGuideHead();
	      CV_InitActions($("#hidata_head")); //初始化简历按钮的控制
	      Menu_InitSlide($("#hidata_top")); //初始化更多
	  });
}
