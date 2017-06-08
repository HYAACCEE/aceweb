//v=cvedit00000011;
var cid = getUrlCid();
var MAX_INDEX = 8;
var submitFlag = 0;
var successFlag = 0;
var commitFlag = 0;
$(document).ready(function(){
  /***********此处编写js*************/
  initForm(); //初始化Form

  $(window).bind('beforeunload',function(){return '您输入的内容尚未保存，确定离开此页面吗？';});
  //提交
  $(".commit_").click(function(e) {
	  $(window).unbind('beforeunload');
      commitFlag = 1;
      save();
  });
  //保存
  $(".save_").click(function(e) {
	  $(window).unbind('beforeunload');
      commitFlag = 0;
      util.UI.confirm('确认保存吗？', function(){
        save();
      });
  });
  //提交审核
  $(".cmtUpdate_").click(function(e) {
	  $(window).unbind('beforeunload');
      commitFlag = 1;
      util.UI.confirm('提交后不能再编辑，确认提交吗？', function(){
        save();
      });
  });
  $(".addmore_").click(function(e){
      var i = $(this).attr("data");
      var n = $("#hidata"+i).children("div.hidata_subform").length;
      var newform = $("#hidata"+i+"_form").data("newform");
      newform = newform.replace(new RegExp("ZZZ", "g"), n); // 将ZZZ替换为n
      $("#hidata"+i).append(newform);
      
      Form_InitActions(i, n);
  });
  /**********************************/
});
function checkIsMobiler(){
  var mobile = $.trim($("#phone").val());  
  var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
  //如果为1开头则验证手机号码   
  if (!isMobile.exec(mobile) && mobile.length != 11) {
      $("#checkcandidate").removeClass("gone");
      $("#checkcandidate").html("手机格式不正确");
      return false;  
  }
      $("#checkcandidate").addClass("gone");
  return true;  
}
function save(){
  loadingIndex = util.UI.loading();
  submitFlag = 0;
  successFlag = 0;
  for(var i=1;i<=MAX_INDEX;i++){
    if(i==2) continue;
    if(i==6) continue;
    submitDetail(i);
  }
} 
//初始化Form
function initForm(){
  for(var i=1;i<=MAX_INDEX;i++){
    if(i==2) continue;
    if(i==6) continue;
    loadForm(i);
  }
}
function submitDetail(i){
  var old_formdata = ""; ////////////////////$("#hidata"+i+"_form").data("formdata");
  var new_formdata = JSON.stringify({ dataform: $("#hidata"+i+"_form").serializeArray()});
  if (new_formdata != old_formdata){
    log("[submitDetail]  i="+i+"  old_formdata="+old_formdata);
    log("[submitDetail]  i="+i+"  new_formdata="+new_formdata);
    ACECommon_Submit("Candi"+M0+"Service.y?cmd=editDetail", "{index:'"+i+"',cid:'"+cid+"',N:'"+$("#hidata"+i).children("div.hidata_subform").length+"'}", function(ret, html){
        if(ret==1){
          //parent.util.UI.msg(html);
          loadForm(i);
          submitFlag++;
          successFlag++;
          submitCommplete();
        }else{
          submitFlag++;
          submitCommplete();          
        }
    }, {'div':$("#hidata"+i)});
  }else{
    submitFlag++;
    successFlag++;
    submitCommplete();
  } 
}

function loadForm(i){
  ACECommon_Data("ComService.y?cmd=html", "{objectMode:'H00302-"+i+"'}", function(ret1,html1,extdata1){          
      $("#hidata"+extdata1+"_form").data("newform", html1);
      $("#hidata"+extdata1+"_form").data("formdata", JSON.stringify({ dataform: $("#hidata"+extdata1+"_form").serializeArray()}));
      log("[Form_InitActions]  extdata1="+extdata1+"  formdata="+$("#hidata"+extdata1+"_form").data("formdata"));        
      
      Form_InitActions(extdata1); //定义条件中的action
      
      ACECommon_Data("Candi"+M0+"Service.y?cmd=candiInfo", "{index:'"+extdata1+"',cid:'"+cid+"'}", function(ret,html,extdata){
          if(ret==1){
            html = eval('('+html+')');
            
            var c = html.length - $("#hidata"+extdata).find(".hidata_subform").length;
            for(var m=0;m<c;m++){
              $("#hidata"+extdata).parent().find(".addmore_").click();
            }
            
            var n = 0;
            jQuery.each(html, function (index, value) {
              var ss = value.split(SP);
              var $thisdiv_ = $("#hidata"+extdata).find(".hidata_subform").eq(n);
              var vv = $thisdiv_.find(".vv");
              for(var i=0;i<vv.length;i++){
                ss[i] = JSONSTR(ss[i]);
                if(ss[i].indexOf("UUU===")==0){
                  $(vv[i]).val(ss[i].replace(new RegExp("UUU===", "g"), ""));
                  $(vv[i]).css("color", "#ee0000");
                }else{
                  $(vv[i]).val(ss[i]);
                }

                if($(vv[i]).attr("isvvc")==1){
                  $(vv[i]).next().val($(vv[i]).val());
                  if(ss[i].indexOf("UUU===")==0){ $(vv[i]).next().css("color", "#ee0000"); }
                  $(vv[i]).val("");
                }
              }
              checkTextLength($thisdiv_);
              
              calendar_set($thisdiv_);
        	  	
              if(extdata==1){
                var v_sex = $thisdiv_.find("#v_sex").val();
                if(v_sex.length>0){
                  $thisdiv_.find("#radio"+v_sex).attr("checked",true);
                }else{
//                $thisdiv_.find("#v_sex").next().find(".radio:first").attr("checked",true);
//                $thisdiv_.find("#v_sex").next().find(".radio:first").click(); 2017-4-25  by linda 去掉了默认选中性别
                }
                
                var cmtUpdatePower = ss[ss.length-1];
                $("#cmtUpdatePower").val(cmtUpdatePower);
                if(cmtUpdatePower==2){
                  $(".cmtUpdate_").attr("disabled", "disabled");
                  $(".cmtUpdate_").addClass("btn-disabled");
                  $(".cmtUpdate_").show();
                  $(".cmtUpdate_").html("简历更新审核中");
                  $(".save_").hide();
                }else if(cmtUpdatePower==1){
                  $(".cmtUpdate_").show();
                  $(".save_").hide();
                }else{
                  $(".cmtUpdate_").hide();
                  $(".save_").show();
                }
              }
              if(extdata==7 || extdata==8){
                $textLengthCheck = $thisdiv_.find(".textLengthCheck_");
                checkTextLength($textLengthCheck);
              }
//              if($thisdiv_.find("#totime").val() == "至今"){
//                $thisdiv_.find("#totime").next().children(":checkbox").attr("checked", true);
//              }
              
              n++;
            });
            $("#hidata"+extdata+"_form").data("formdata", JSON.stringify({ dataform: $("#hidata"+extdata+"_form").serializeArray()}));
            log("[loadForm]  extdata="+extdata+"  formdata="+$("#hidata"+extdata+"_form").data("formdata"));
          }
      }, function(ret,html,extdata){
          if(extdata==4 || extdata==5 || extdata==8){
            $("#hidata"+extdata).html("");
            $("#hidata"+extdata+"_form").data("formdata", "{\"dataform\":[]}");
            ////////////////////////////$thisdiv_.find(".delete_").parent().show();
          }
      }, {'extdata':extdata1});
  }, null, {'div':$("#hidata"+i), 'extdata':i});
}


//定义Form中的action
function Form_InitActions(i,n){
  autocomplete_Init();
  var $thisdiv_ = $("#hidata"+i).children("div.hidata_subform:last-child");
  
  //初始化年月选择控件
  if(i==1){
    calendar_init($thisdiv_);
  }else{
    calendar_init($thisdiv_, 'YM');
  }
  
  $thisdiv_.find("#phone").blur(function(){
    if($(this).val()=="") return;
    if(checkIsMobiler() == false) return;
      ACECommon_FormSubmit(null, "Candi"+M0+"Service.y?cmd=checkPhoneIsOnline", "{phone:'"+$(this).val()+"'}",null,0, function(ret, html){
          if(ret==1){
            $thisdiv_.find("#checkcandidate").hide();
          }else{
            $thisdiv_.find("#checkcandidate").show();
          }
      });
  });
  
  var obj_v_bizLmt = $thisdiv_.find(n==null ? "#checkboxTodayZZZ" : ("#checkboxToday"+n));
  obj_v_bizLmt.click(function(e){
      if($thisdiv_.find(".checkbox").is(':checked')){
    	  $thisdiv_.find(".checkbox").parent().prev().val("至今");
         //$thisdiv_.find("#totime").val("至今");
      }else{
    	  $thisdiv_.find(".checkbox").parent().prev().val("");
      }
	  calendar_set($thisdiv_);
  });
//  $thisdiv_.find("#totime").on("blur", function(){
//	  $thisdiv_.find(":checkbox").attr("checked", false);
//  });
  if(i==1){
    $thisdiv_.find("#v_sex").next().find(":radio").click(function(e){
        $thisdiv_.find("#v_sex").val($(this).val());
    });
   // $thisdiv_.find("#v_sex").next().find(":radio:first").click(); 2017-4-25  by linda 去掉了默认选中性别
  }
  if(i==4 || i==5 || i==8){
  
  }else{
    if(!n){
      $thisdiv_.find(".delete_").parent().hide();
    }
  }
  
  $thisdiv_.find(".delete_").click(function(e){
      var $this_ = $(this);
      util.UI.confirm('确认删除吗？', function(){
        $this_.parent().parent().remove();
      });
  });
  
  if(i==7 || i==8){
   // autocomplete_Init($thisdiv_);
  }
  
  $thisdiv_.find(".textLengthCheck_").on("keyup", function(){
	  var $this = $(this);
	  strLenCalc($this, $this.next(), $this.attr("textLength"));
  });
  $thisdiv_.find(".textLengthCheck_").on("blur", function(){
	  var $this = $(this);
	  strLenCalc($this, $this.next(), $this.attr("textLength"));
  });
  checkTextLength($thisdiv_);
  
//  if(M0=='M'){ 5-31 by linda “顾问面评审核”“简历更新审核”中的内容需要可被BS修改
//    $("#hidata00").find("input").attr("disabled", true);
//    $("#hidata00").find("textarea").attr("disabled", true);
//    $("#hidata00").find("select").attr("disabled", true);
//    $("#hidata00").find("input").attr("readonly", true);
//    $("#hidata00").find("textarea").attr("readonly", true);
//    $("#hidata00").find("select").attr("readonly", true);
//    $("#hidata00").find(".addmore_").hide();
//    $("#hidata00").find(".delete_").hide();
//  }
}
//字符超长检查
function checkTextLength($thisdiv_){
  $textLengthCheck = $thisdiv_.find(".textLengthCheck_");
  if($textLengthCheck && $textLengthCheck.length>0){
    for(var i=0;i<$textLengthCheck.length;i++){
      var $obj = $($textLengthCheck).eq(i);
      strLenCalc($obj, $obj.next(), $obj.attr("textLength"));
    }
  }
}
//判断字数限制
function strLenCalc(obj, checklen, maxlen){
　　var v = obj.val(), charlen = 0, maxlen = !maxlen ? 200 : maxlen, curlen = maxlen, len = v.length; 
　　for(var i = 0; i < v.length; i++){ 
　　　　if(v.charCodeAt(i) < 0 || v.charCodeAt(i) > 255) { 
	   curlen -= 1; 
      } 
	} 
	if(curlen >= len){
		$(checklen).show();
		$(checklen).html("还可输入 <strong>"+Math.floor((curlen-len)/2)+"</strong> 个字").css('color', ''); 
	}else{ 
		$(checklen).show();
		$(checklen).html("已经超过 <strong>"+Math.ceil((len-curlen)/2)+"</strong> 个字").css('color', '#FF0000'); 
	} 
} 