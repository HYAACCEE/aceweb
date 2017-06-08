//v=cvhc00000014;
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
  var curdiv = pdiv || $("#container");
  DataLine_InitFuns(curdiv);
  Pub_InitSlide(curdiv);
  
  curdiv.find(".detail_").click(function(e){
	  util.Cookie.set('curtHtml',window.location.href,30);//存储当前HTML
      e.stopPropagation();
      onlog('点击[简历列表]'+cur_dataid());
      go("candidate_detail_cv.html?"+urlCid());
  });
  curdiv.find(".close_").click(function(e){
    e.stopPropagation();
    onlog('点击[首页close]'+cur_dataid());
    var thistask = $(this);
    ajax_("MainSService.y?cmd=closeTask", "{tid:'"+DATAID2+"'}", function(ret, html){
      if(ret==1){
        thistask.parent().parent().parent().parent().hide();
        /*// 重新刷新一下状态栏
        ACECommon_ShowData("MainSService.y?cmd=listTaskDay", "{objectMode:'H00109-2',sortMK:'"+MK+"'}", $("#hidata2"), 0, function(ret,html){
        });*/           
      }
    });
  });
  curdiv.find(".HC_userGuide_").click(function(e){
    e.stopPropagation();
    onlog('点击[用户指南]'+cur_dataid());
    window.open("user_guide.html");
  });
  curdiv.find(".HC_candidateInfo_").click(function(e){
      e.stopPropagation();
      onlog('点击[候选人头像]'+cur_dataid());
      if($(this).attr("data") == "1"){//是欢迎界面
          util.UI.html("hcdialog_show_customer.html?", 440, 250, function(){});
      }else{
          util.UI.html("hcdialog_show_candidate_info.html?pcid="+DATAID1+"&"+urlCid(), 440, 300, function(){});
      }
  });
  $(".HC_editCV_").click(function(e){
      e.stopPropagation();
      onlog('点击[简历编辑]按钮'+cur_dataid());
      go("candidate_edit.html?"+urlCid());
  });
  curdiv.find(".export_").click(function(e){
      e.stopPropagation();
      onlog('点击[简历转发]按钮'+cur_dataid());
      util.UI.html("hcdialog_share_candidate.html?"+urlCid(), 480, 360, function(){});
  });
  curdiv.find(".download_").click(function(e){
    e.stopPropagation();
    onlog('点击[简历下载]按钮'+cur_dataid());
    util.UI.confirm("您要下载简历吗？", function(){
      ajax_("CandiDetailSService.y?cmd=download", "{cid:'"+cur_dataid()+"'}", function(ret, html){
        window.open(html);
      });
    });
  });
  curdiv.find(".HC_delCandidate_").click(function(e){
      e.stopPropagation();
      onlog('点击[删除候选人]按钮'+cur_dataid());
      util.UI.confirm("您要删除此候选人吗？", function(){
          ajax_("CandiSService.y?cmd=del", "{cid:'"+cur_dataid()+"'}", function(ret, html){
          if(ret==1){
              util.UI.msg("删除成功.");
              location.href = "candidate_list.html";
            }else{
              util.UI.msgDialog("抱歉，您的操作未能成功！", html);
            }
        });
    });
  });
  curdiv.find(".HC_applyST_").click(function(e){
      e.stopPropagation();
      onlog('点击[申请入库]按钮'+cur_dataid());
      util.UI.confirm("您要申请入库吗？", function(){
          ajax_("CandiProcessSService.y?cmd=stApply", "{cid:'"+cur_dataid()+"'}", function(ret, html){
	    	  if(ret==1){
	            util.UI.msgDialog("申请成功", "我们会在24小时内审核完毕，敬请留意。");
	            reload();
	          }else{
              util.UI.msgDialog("申请入库失败！", html);
	          }
          });
	  });
  });
  curdiv.find(".HC_cancelST_").click(function(e){
      e.stopPropagation();
      onlog('点击[取消入库]按钮'+cur_dataid());
      util.UI.confirm("您要取消入库吗？", function(){
          ajax_("CandiProcessSService.y?cmd=doProcess", "{process:'220051', cid:'"+cur_dataid()+"'}", function(ret, html){
              if(ret==1){
                util.UI.msg("取消成功.");
                reload();
              }else{
                util.UI.msgDialog("抱歉，您的取消入库不能通过！", "原因：候选人简历状态不符合要求");
              }
          });
      });
  });
  curdiv.find(".HC_commitHCComment_").click(function(e){
      e.stopPropagation();
      onlog('点击[提交顾问面评]按钮'+cur_dataid());
      util.UI.confirm("您要提交顾问面评吗？", function(){
          var loadingIndex = util.UI.loading();
          ajax_("CandiCommentSService.y?cmd=commentCommitCheck", "{cid:'"+cur_dataid()+"',commitFlag:'1'}", function(ret,html){
            if(ret==1){
              util.UI.msgDialog("提交成功!", "我们会在24小时内审核完毕，敬请留意。");
              reload();
            }else{
              util.UI.msgDialog("抱歉，您的申请未能通过！", html);
            }
            util.UI.closeLoading(loadingIndex); //关闭loading
          });
      });
  });
  $(".HC_InActive_").click(function(e){
    e.stopPropagation();
    onlog('点击[InActive]按钮'+cur_dataid());
    util.UI.html("hcdialog_inactive.html?"+urlCid(), 480, 250, function(){});
  });
  $(".HC_activeApply_").click(function(e){
    e.stopPropagation();
    onlog('点击[active]按钮'+cur_dataid());
    util.UI.confirm("您要申请Active此候选人吗？", function(){
      ajax_("CandiProcessSService.y?cmd=activeApply", "{cid:'"+cur_dataid()+"'}", function(ret, html){
      if(ret==1){
          util.UI.msgDialog("申请成功!", "我们会在24小时内审核完毕，敬请留意。");
          reload();
        }else{
          util.UI.errDialog(html);
        }
      });
    });
  });
  curdiv.find(".HC_editHCComment_").click(function(e){
      e.stopPropagation();
      onlog('点击[编辑顾问面评]按钮'+cur_dataid());
      window.open("candidate_hc_comment_edit.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid());
  });
  curdiv.find(".HC_addHCIV_").click(function(e){
    e.stopPropagation();
    onlog('点击[顾问面试]按钮'+cur_dataid());
    util.UI.html("hcdialog_hc_interview_add.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 480, 340, function(){});
  });
  curdiv.find(".HC_editHCIV_").click(function(e){
      e.stopPropagation();
      onlog('点击[修改顾问面试]按钮'+cur_dataid());
      util.UI.html("hcdialog_hc_interview_edit.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 480, 340, function(){});
  });
  curdiv.find(".HC_setCandidateReplyIV_").click(function(e){
      e.stopPropagation();
      onlog('点击[候选人反馈：面试反馈]按钮'+cur_dataid());
      util.UI.html("hcdialog_set_candidate_reply_interview.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 480, 270, function(){});
  });
  curdiv.find(".HC_setCandidateReplyOffer_").click(function(e){
      e.stopPropagation();
      onlog('点击[候选人反馈：OFFER]按钮'+cur_dataid());
      util.UI.html("hcdialog_set_candidate_reply_offer.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 480, 270, function(){});
  });
  curdiv.find(".HC_setCandidateReplyEntry_").click(function(e){
    e.stopPropagation();
    onlog('点击[候选人反馈：入职]按钮'+cur_dataid());
    util.UI.html("hcdialog_set_candidate_reply_entry.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 480, 270, function(){});
  });
  curdiv.find(".HC_setCandidateEntryConfirm_").click(function(e){
    e.stopPropagation();
    onlog('点击[确定入职]按钮'+cur_dataid());
    util.UI.html("hcdialog_set_candidate_entry_confirm.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 480, 270, function(){});
  });
  curdiv.find(".HC_setHRIVResult_").click(function(e){
    e.stopPropagation();
    onlog('点击[HR面试反馈]按钮'+cur_dataid());
    util.UI.html("hcdialog_set_interview_hr_result.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 480, 270, function(){});
  });
  curdiv.find(".HC_setHRIVNext_").click(function(e){
    e.stopPropagation();
    onlog('点击[HR面试反馈]按钮'+cur_dataid());
    util.UI.html("hcdialog_set_interview_hr_next.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 480, 230, function(){});
  });
  curdiv.find(".HC_addHRIV_").click(function(e){
      e.stopPropagation();
      onlog('点击[安排面试]按钮'+cur_dataid());
      util.UI.html("hcdialog_hr_interview_add.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 460, 400, function(){});
  });
  curdiv.find(".HC_editHRIV_").click(function(e){
      e.stopPropagation();
      onlog('点击[面试变更]按钮'+cur_dataid());
      util.UI.html("hcdialog_hr_interview_edit.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 470, 380, function(){});
  });
  curdiv.find(".HC_confirmHRIV_").click(function(e){
    e.stopPropagation();
    onlog('点击[确定面试信息]按钮'+cur_dataid());
    util.UI.html("hcdialog_hr_interview_confirm.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 480, 390, function(){});
  });
  curdiv.find(".HC_uploadOffer_").click(function(e){
      e.stopPropagation();
      onlog('点击[上传Offer]按钮'+cur_dataid());
      util.UI.html("hcdialog_offer_upload.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 400, 220, function(){});
  });
  curdiv.find(".HC_editOffer_").click(function(e){
      onlog('点击[Offer变更]按钮'+cur_dataid());
      util.UI.html("hcdialog_offer_edit.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 400, 220, function(){});
  });
  curdiv.find(".HC_showOffer_").click(function(e){
      onlog('点击[Offer查看]按钮'+cur_dataid());
      ACECommon_ShowData("CandiProcessSService.y?cmd=offerFile", "{cid:'"+cur_dataid()+"',pcid:'"+DATAID1+"'}", null, 0, function(ret,html){
        util.UI.html("hcdialog_openfile.html?"+xmll(html), 0, 0, function(){});
      });
  });
  curdiv.find(".HC_setDimission_").click(function(e){
      e.stopPropagation();
      onlog('点击[离职原因]按钮'+cur_dataid());
      util.UI.html("hcdialog_set_dimission_reason.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 480, 250, function(){});
  });
  curdiv.find(".HC_setUnEntryReason_").click(function(e){
      e.stopPropagation();
      onlog('点击[未入职原因]按钮'+cur_dataid());
      util.UI.html("hcdialog_set_candidate_unentry_reason.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 480, 250, function(){});
  });
  curdiv.find(".HC_setUnPassIVReason_").click(function(e){
      e.stopPropagation();
      onlog('点击[面试未通过原因]按钮'+cur_dataid());
      util.UI.html("hcdialog_set_interview_unpass_reason.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 480, 250, function(){});
  });
  curdiv.find(".HC_closeProcess_").click(function(e){
      e.stopPropagation();
      onlog('点击[结束流程]按钮'+cur_dataid());
      util.UI.html("hcdialog_close_process.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 480, 380, function(){});
  });
  curdiv.find(".HC_mmInfo_").click(function(e){
//    e.stopPropagation();
//    var jobid = $(this).parent().attr("job");
//    var hramid = $(this).parent().attr("mm");
//    onlog('点击[首页卡片：HR公司]'+hramid);
//    onlog('点击[首页卡片：职位]'+jobid);
//    util.UI.html("my_job_detail.html?"+jobid+"=="+hramid, 1000, 700, function(){});
  });
  curdiv.find(".HC_hrInfo_").click(function(e){
    e.stopPropagation();
    var hrid = $(this).parent().attr("hr");
    onlog('点击[首页卡片：HR]'+hrid);
    util.UI.html("hcdialog_show_hr_info.html?"+hrid, 440, 300, function(){});
  });
  curdiv.find(".HC_hrinfo_").click(function(e){
    e.stopPropagation();
    var hrid = $(this).attr("data");
    onlog('点击[首页卡片：HR]'+hrid);
    util.UI.html("hcdialog_show_hr_info.html?"+hrid, 440, 300, function(){});
  });
  curdiv.find(".HC_jobinfo_").click(function(e){
    e.stopPropagation();
    var jobid = $(this).attr("data");
    if(jobid==""){return;}
    var hramid = $(this).attr("data1");
    onlog('点击[流程卡片：职位]'+jobid);
    util.UI.html("my_job_detail.html?"+jobid+"=="+hramid, 1000, 700, function(){});
  });
  curdiv.find(".HC_jobInfo_").click(function(e){
    e.stopPropagation();
    var jobid = $(this).parent().attr("job");
    var hramid = $(this).parent().attr("mm");
    if(jobid==""){return;}
    onlog('点击[首页卡片：职位]'+jobid);
    util.UI.html("my_job_detail.html?"+jobid+"=="+hramid, 1000, 700, function(){});
  });
  curdiv.find(".HC_showReason_").click(function(e){
      e.stopPropagation();
      onlog('点击[查看原因]按钮'+cur_dataid());
      F_showDetail(cur_dataid(), DATAID2, cur_pcid(), "","的原因");
  });
  curdiv.find(".HC_showDetail_").click(function(e){
    e.stopPropagation();
    onlog('点击[查看详情]按钮'+cur_dataid());
    F_showDetail(cur_dataid(), DATAID2, cur_pcid(), "","");
  });
  curdiv.find(".HC_admin_").click(function(e){
    e.stopPropagation();
    onlog('点击[admin流程控制]按钮'+cur_dataid());
	  if(DEBUG){
	      util.UI.html("hcdialog_admin.html?tid="+DATAID2+"&pcid="+DATAID1+"&"+urlCid(), 400, 430, function(){});
	  }
  });
  curdiv.find(".HC_delay_").click(function(e){
      e.stopPropagation();
      var pos = this;
      onlog('点击[推迟]按钮'+cur_dataid());
      util.UI.selfHtml("hcdialog_action_delay.html?tid="+DATAID2, 320, 320, function(){},pos);
  });

  curdiv.find(".HC_addCandiPage_").click(function(e){
      e.stopPropagation();
      var pos = this;
      onlog('点击首页[新增候选人]按钮'+cur_dataid());
      if(power == 0){
          util.UI.warning("您的账户还未通过审核,无法新增候选人");
      }else{
          location.href = "candidate_add.html";
      }
  });
}
function F_showDetail(cid, tid, pcid, pid, reason){
  //////util.UI.html("hcdialog_show_process_detail.html?tid="+DATAID2+"&pcid="+cur_pcid()+"&"+urlCid(), 480, 400, function(){});
  ajax_("CandiProcessSService.y?cmd=detailInfo", "{cid:'"+cid+"',tid:'"+tid+"',pcid:'"+pcid+"',pid:'"+pid+"'}", function(ret, html){
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
            title = ss[0] + reason;
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
      location.href = "candidate_detail_cv.html?tab=1&"+urlCid();
  });
  $(".candidate_detail_process_").click(function(){
      location.href = "candidate_detail_process.html?tab=2&"+urlCid();
  });
  $(".candidate_detail_action_").click(function(){
      location.href = "candidate_detail_action.html?tab=3&"+urlCid();
  });
  $(".candidate_detail_files_").click(function(){
      location.href = "candidate_detail_files.html?tab=4&"+urlCid();
  });
  $(".candidate_detail_memo_").click(function(){
      location.href = "candidate_detail_memo.html?tab=5&"+urlCid();
  });
}

//简历-基本详情
function CV_Detail_Top(){
  ajax_("CandiDetailSService.y?cmd=detail", "{cid:'"+CID+"',index:'1'}", function(ret, html){
      $("#hidata_top").html(html);
      $("#hidata_top").show();
      if($("#uptPower").val()==2){
        $("#p_cvupdate").html("<span class=red>简历更新审核中</span>"); 
      }else{
        if($("#uptPower").val()==1) $(".HC_editCV_").show();
        $("#v_uptdate").html($("#uptdate").val());
      }
      if($("#hcivPower").val()==1) $(".HC_editHCComment_").show();
      if($("#hcivPower").val()==2) $(".HC_editHCComment_").parent().html("<span class=red>顾问面评审核中</span>");
      if($("#hrexportPower").val()==1) $(".export_").show();
      if($("#hrexportPower").val()==1) $(".download_").show();
      CV_InitActions(); //初始化简历按钮的控制
      Menu_InitSlide($("#hidata_top")); //初始化更多
  });
}
//公司名称匹配
function AOrganQuery(a,$div){
  ajax_("CandiDetailSService.y?cmd=aorgan", "{objectMode:'',keyword:'"+a+"'}", function(ret, html){
    if(ret==1){
      $div.html(html);
      $div.show();
    }else{
      $div.html('');
      $div.hide();
    }
  });
}
