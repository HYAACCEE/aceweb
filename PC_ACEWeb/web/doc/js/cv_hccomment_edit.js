v='chedit00000020';
var cid = getUrlCid();
var hcid = getUrlHcid();
var MAX_NOTNULL_WORK_NUM = 1; //工作经验必填数目
var MAX_INDEX = 6;
var submitFlag = 0;
var successFlag = 0;
var commitFlag = 0;
var isOut = 0;
$(document).ready(function(){
  /***********此处编写js*************/
  initForm();
  $(window).bind('beforeunload', function(){
    return '您输入的内容尚未保存，确定离开此页面吗？';
  });
  $(".commit_").click(function(){
	  $(window).unbind('beforeunload');
    //util.UI.confirm("确认提交吗", function(){
      commitFlag = 1;
      save();
    //});
  });
  $(".save_").click(function(){
	  $(window).unbind('beforeunload');
    //util.UI.confirm("确认保存吗", function(){
      commitFlag = 0;
      save();
    //});
  });
  $(".addmore_").click(function(e){
      var i = $(this).attr("data");
      var n = $("#hidata"+i).children("div.hidata_subform").length;
      var newform = $("#hidata"+i+"_form").data("newform");
      newform = newform.replace(new RegExp("ZZZ", "g"), n); // 将ZZZ替换为n
      newform = newform.replace(new RegExp("<INDEX>", "g"), 1000+n); // 将ZZZ替换为n
      $("#hidata"+i).append(newform);
      
      Form_InitActions(i, n);
  });
 /**********************************/    
});
function save(){
  loadingIndex = util.UI.loading();
  submitFlag = 0;
  successFlag = 0;
  for(var i=1;i<=MAX_INDEX;i++){
    submitDetail(i);
  }
}
function initForm(){
  for(var i=1;i<=MAX_INDEX;i++){
    loadForm(i);
  }
} 
function submitDetail(i){
  if(i==1){
    var subform = $("#hidata"+i).children("div.hidata_subform");
    for(var k=0;k<subform.length;k++){
      var $subform_ = $(subform[k]);
      var workweightView = $subform_.find("#workweightView").children("div");
      var len = workweightView.length;
      var s = "";
      var total = 0;
      var $weightName_, $weightValue_;
      for(var j=0;j<len;j++){
        $weightName_ = $(workweightView[j]).find(".weightName_");
        $weightValue_ = $(workweightView[j]).find(".weightValue_");
        
        if(k==0 && commitFlag==1 && ($weightName_.val() == "" || $weightValue_.val() == "")
            || k>0 &&  commitFlag==1 && ($weightName_.val() != "" && $weightValue_.val() == "" || $weightName_.val() == "" && $weightValue_.val() != "")){
          util.UI.err("第"+(k+1)+"段工作经验中的工作内容不能为空!");
          $weightValue_.focus();
          util.UI.closeLoading(loadingIndex)
        	return false;
        }
        if($weightName_.val() != "" || $weightValue_.val() != ""){
          total += 1*$weightValue_.val();
          s += SP1 + $weightName_.val() +SP2+ $weightValue_.val();
        }
      }
      if(commitFlag==1 && total>100){
        util.UI.err("工作权重累计"+total+"不能大于100%！");
        $weightValue_.focus();
        util.UI.closeLoading(loadingIndex)
        return false;
      }
      $subform_.find("#v_workweight").val(s.substring(SP1.length));
    }
  }
  if(i==6){
    var subform = $("#hidata"+i).children("div.hidata_subform");
    for(var k=0;k<subform.length;k++){
      var $subform_ = $(subform[k]);
      var languageName = $subform_.find(".languageName_");
      var languageValue = $subform_.find(".languageValue_");
      var num = languageName.length;
      var s = "";
      for(var j=0;j<num;j++){
        s += SP1 + $(languageName[j]).val() +SP2+ $(languageValue[j]).val();
      }
      $subform_.find("#v_language").val(s.substring(SP1.length));
    }
  }

  var old_formdata = ""; /////////////////////////$("#hidata"+i+"_form").data("formdata");
  var new_formdata = JSON.stringify({ dataform: $("#hidata"+i+"_form").serializeArray()});
  log("[submitDetail]  i="+i+"  old_formdata="+old_formdata);
  log("[submitDetail]  i="+i+"  new_formdata="+new_formdata);
  if (new_formdata != old_formdata){
    ACECommon_Submit("CandiComment"+M0+"Service.y?cmd=edit", "{index:'"+i+"',cid:'"+cid+"',N:'"+$("#hidata"+i).children("div.hidata_subform").length+"'}", function(ret, html){
        if(ret==1){
          loadForm(i);
          submitFlag++;
          successFlag++;
          submitCommplete();
        }else{
          submitFlag++;
          submitCommplete();        	
        }
    }, {'div': $("#hidata"+i), 'nullMsg': '0', 'autoCloseLoading': '0'}); // nullMsg=0 不检查为空
  }else{
    submitFlag++;
    successFlag++;
    submitCommplete();
  }
}
function loadForm(i){
  ACECommon_Data("ComService.y?cmd=html", "{objectMode:'H00601-"+i+"'}", function(ret1,html1,extdata){
      $("#hidata"+extdata+"_form").data("newform", html1);
      $("#hidata"+extdata+"_form").data("formdata", JSON.stringify({ dataform: $("#hidata"+extdata+"_form").serializeArray()}));
      log("[Form_InitActions]  extdata="+extdata+"  formdata="+$("#hidata"+extdata+"_form").data("formdata"));
      Form_InitActions(extdata); //定义条件中的action
      ACECommon_Data("CandiComment"+M0+"Service.y?cmd=commentInfo", "{index:'"+extdata+"',cid:'"+cid+"',hcid:'"+hcid+"'}", function(ret,html,extdata){
          if(ret==1){
            log("[loadForm] index="+extdata+"  html=" + html);
            html = eval('('+html+')');
            
            if(extdata==1){
              var c = html.length - $("#hidata"+extdata).find(".hidata_subform").length;
              for(var m=0;m<c;m++){
                $("#hidata"+extdata).parent().find(".addmore_").click();
              }
            } 
            var n = 0;
            jQuery.each(html, function (index, value) {
              var $RvalueObj, $CheckboxObj;
              var zzz = (n ==0 ? "ZZZ" : n);
              
              var ss = value.split(SP);
              var $curdiv_ = $("#hidata"+extdata).find(".hidata_subform").eq(n);
              var vv = $curdiv_.find(".vv");
              for(var i=0;i<vv.length;i++){
                ss[i] = JSONSTR(ss[i]);
                var isUUU = ss[i].indexOf("UUU===")==0;
                if(isUUU){
                  $(vv[i]).val(ss[i].replace(new RegExp("UUU===", "g"), ""));
                  if($(vv[i]).attr("placeinput") == "undefined"){
                    $(vv[i]).css("color", "#ee0000");
                  }else{
                    $("."+$(vv[i]).attr("placeinput")).css("color", "#ee0000");
                  }
                }else{
                  $(vv[i]).val(ss[i]);
                }

                if($(vv[i]).attr("isvvc")==1){
                  $(vv[i]).next().val($(vv[i]).val());
                  if(isUUU){ $(vv[i]).next().css("color", "#ee0000"); }
                  $(vv[i]).val("");
                }
              }
              if(extdata==5){
            	  setFuntypeSelect($curdiv_.find("#btn_FuntypeID").val().split(","));
            	  setSkilltypeSelect($curdiv_.find("#btn_SkilltypeID").val().split(","));
              }
              if(extdata==1){
                $RvalueObj = $curdiv_.find("#v_bizLmt"+zzz);
                if($RvalueObj.val().length>0){
                  $RvalueObj.next().find(":radio[value='"+$RvalueObj.val()+"']").attr("checked",true); 
                }else{
                //  $RvalueObj.next().find(".radio").eq(0).attr("checked",true);
                }
                bizLmt_Controller($curdiv_, $RvalueObj.val());

                var sss = $curdiv_.find("#v_workweight").val().split(SP1);
                for(var m=0;m<sss.length-1;m++){
                  $curdiv_.find(".workadd_").click();
                }
                var workweightView = $curdiv_.find("#workweightView").children("div");
                for(var m=0;m<sss.length;m++){
                  var ss = sss[m].split(SP2);
                  $(workweightView[m]).find(".weightName_").val(ss[0]);
                  $(workweightView[m]).find(".weightValue_").val(ss[1]);
                }
              }
              
              if(extdata==2){
              	$("#candidataName_").html("( "+$("#candidataNameView_").val()+" )");
              	$("#candidataNameView_").remove();  
              	
                $RvalueObj = $curdiv_.find("#v_contractor"+zzz);
                if($RvalueObj.val().length>0){
                  $RvalueObj.next().find(":radio[value='"+$RvalueObj.val()+"']").attr("checked",true);
                }else{
                 //$RvalueObj.next().find(":radio").eq(0).attr("checked",true);
                }
              }
              
              if(extdata==3){
                initAOrganAutoSelector("p_select2_mm1", "v_select2_mm1");
              }
              
              if(extdata==4){
                initAOrganAutoSelector("p_select2_mm2", "v_select2_mm2");
              }
              
              if(extdata==6){
                //多选：性格
                /*$CheckboxObj = $curdiv_.find("#v_nature").next().find(":checkbox");
                var v_nature = $curdiv_.find("#v_nature").val();
                for(var k=0; k<$CheckboxObj.length; k++){
                  if(v_nature.indexOf($($CheckboxObj[k]).val()) !=-1){
                    $($CheckboxObj[k]).attr("checked",true);
                  }
                }*/
    	  		
                //多选：管理范围
                $RvalueObj = $curdiv_.find("#v_manageArea");
                $CheckboxObj = $RvalueObj.next().find(":checkbox");
                var v_manageArea = $RvalueObj.val();
                for(var k=0; k<$CheckboxObj.length; k++){
                  if(v_manageArea.indexOf($($CheckboxObj[k]).val()) !=-1){
                    $($CheckboxObj[k]).attr("checked",true);
                  }
                }

                //语言
                var sss = $curdiv_.find("#v_language").val().split(SP1);
                var languageName = $curdiv_.find(".languageName_");
                var languageValue = $curdiv_.find(".languageValue_");
                for(var m=0;m<sss.length;m++){                 
                  var ss = sss[m].split(SP2);                   
                  if(m>1){
                    language_AddAction($curdiv_.find(".languageView_"), ss[0], ss[1]);
                  }else{
                    $(languageName[m]).val(ss[0]);
                    $(languageValue[m]).val(ss[1]);
                  }
                }
              }
              
              //全局检查字符超长
              checkTextLength($curdiv_);
              
              n++;
            });
            $("#hidata"+extdata+"_form").data("formdata", JSON.stringify({ dataform: $("#hidata"+extdata+"_form").serializeArray()}));
            log("[loadForm]  extdata="+extdata+"  formdata="+$("#hidata"+extdata+"_form").data("formdata"));
           
          }
      }, null, {'extdata':extdata});
  }, null, {'div':$("#hidata"+i), 'extdata':i});
}

  
function workWeight_DeleteAction(obj){
  obj.click(function(e){
      var $this_ = $(this);
      util.UI.confirm('确认删除吗？', function(){   
         $this_.parent().remove();
      });
  });
}  
function language_DeleteAction(obj){
  obj.click(function(e){
      var $this_ = $(this);
      util.UI.confirm('确认删除吗？', function(){   
         $this_.parent().remove();
      });
  });
}
function language_AddAction(obj,name,value){
  ACECommon_ShowData("ComService.y?cmd=html", "{objectMode:'H00601-66'}", null, 0, function(ret,html){
      obj.append(html);
      obj.find("div:last-child").find(".languageName_").val(name);
      obj.find("div:last-child").find(".languageValue_").val(value);
      var deleteBtn = obj.find("div:last-child").find(".delete_");
      language_DeleteAction(deleteBtn);
  });
}
function initSelect2($obj){
  //这里全加
  $obj.select2();
  ajax_("HISService.y?cmd=autoComplete&obj=testORGAN","",function(ret,html){
    if(ret==1){
      var ss = html.split("`");
      for(var i=0;i<ss.length;i++){
        $obj.append("<option value="+ss[i]+">"+ss[i]+"</option>")
      }
    }
  });
  layui.use(['form'], function(){
    var form = layui.form();
    form.render();

    $(".layui-select-title").addClass("gone");//就加这一句
  });
}
function bizLmt_Controller($thisdiv_, v){
  if(v== 0){
    $thisdiv_.find(".isShowView").hide();
    $thisdiv_.find(".isShowView >input").val("");
  }else{
    $thisdiv_.find(".isShowView").show();
    $thisdiv_.find(".isShowView >input").val("");
  }
}
function Form_InitActions(i,n){
  var $thisdiv_ = $("#hidata"+i).children("div.hidata_subform:last-child");
  var $RvalueObj, $CheckboxObj;
  var zzz = (n==null ? "ZZZ" : n);
  
  if(i==1){
    if(n>0){
      $thisdiv_.find(".btn-slide").show();
      Pub_InitSlide($thisdiv_);
    }

    if(n==null){ //第一条工作经验有效
      $thisdiv_.find("#p_dimissionDate").show();
      $thisdiv_.find("#p_jobType").show();      
      $thisdiv_.find(".onlyFirst_").show();
      
    }else{ //非第一条工作经验无效
      $thisdiv_.find(".onlyFirst_").hide();
    }
    
    //竞业禁止
    $RvalueObj = $thisdiv_.find("#v_bizLmt"+zzz);
    $RvalueObj.next().find(":radio").click(function(e){
        $RvalueObj.val($(this).val());
        bizLmt_Controller($thisdiv_, $(this).val());
    });
    //$RvalueObj.next().find(":radio").eq(1).click(); //默认选中第2个
    
    //工作权重
    $thisdiv_.find(".workadd_").click(function(e){
        $thisdiv_.find("#workweightView").append($thisdiv_.find("#workweightView").find("div:last-child").prop("outerHTML"));
        var deleteBtn = $thisdiv_.find("#workweightView").find("div:last-child").find(".delete_");
        deleteBtn.show();
        workWeight_DeleteAction(deleteBtn);        
    });

  }
  
  if(i==2){
    //是否接受contractor
    $RvalueObj = $thisdiv_.find("#v_contractor"+zzz);
    $RvalueObj.next().find(":radio").click(function(e){
        $RvalueObj.val($(this).val());
    });
    //$RvalueObj.next().find(":radio").eq(0).click();
  }
  
  if(i==3){
    initAOrganAutoSelector("p_select2_mm1", "v_select2_mm1");
  }
  
  if(i==4){
    initAOrganAutoSelector("p_select2_mm2", "v_select2_mm2");
  }
  
  if(i==6){
    //多选：性格
  /*$RvalueObj = $thisdiv_.find("#v_nature");
      $RvalueObj.next().find(":checkbox").click(function(e){
      var check_val = [];
      var obj = $RvalueObj.next().find(":checkbox");
      for(k in obj){
          if(obj[k].checked)
              check_val.push(obj[k].value);
      }
      $RvalueObj.val(check_val);
    });*/
    
    //多选：管理范围
    $RvalueObj = $thisdiv_.find("#v_manageArea");
    $RvalueObj.next().find(":checkbox").click(function(e){
      var check_val = [];
      var obj = $RvalueObj.next().find(":checkbox");
      for(k in obj){
          if(obj[k].checked)
              check_val.push(obj[k].value);
      }
      $RvalueObj.val(check_val);            
    });
    
    //语言
    $thisdiv_.find(".addlanguage_").click(function(e){
        language_AddAction($thisdiv_.find(".languageView_"),null,null);
    });
    $thisdiv_.find(".languageSelect_").change(function(){
        var languageView = $thisdiv_.find(".languageView_");
        var s = "";
        for(var i=0;i<languageView.length;i++){
           s += SP1 + $(languageView[i]).find(".languageName_").val() +SP2+ $(languageView[i]).find(".languageSelect_").val();
        }
        $thisdiv_.find("#v_language").val(s.substring(1));
    });
  }
  
  //全局检查字符超长
  checkTextLength($thisdiv_);
  
  //全局定义：字符超长检查
  $thisdiv_.find(".textLengthCheck_").on("keyup", function(){
	  var $this = $(this);
	  strLenCalc($this, $this.next(), $this.attr("textLength"));
  });
  $thisdiv_.find(".textLengthCheck_").on("blur", function(){
	  var $this = $(this);
	  strLenCalc($this, $this.next(), $this.attr("textLength"));
  });

  //工作经验：必填项 变为 非必填项
  if((!n && MAX_NOTNULL_WORK_NUM==0) || n && n>=MAX_NOTNULL_WORK_NUM){
    $thisdiv_.find(".x").hide();
    $thisdiv_.find(".btn-slide").show();
    $thisdiv_.find(".btn-slide").click();
  }
  
  //M端无效处理
//  if(M0=='M'){  5-31 by linda “顾问面评审核”“简历更新审核”中的内容需要可被BS修改
//    $("#hidata00").find("input").attr("disabled",true);
//    $("#hidata00").find("textarea").attr("disabled",true);
//    $("#hidata00").find("select").attr("disabled",true);
//    $("#hidata00").find("input").attr("readonly",true);
//    $("#hidata00").find("textarea").attr("readonly",true);
//    $("#hidata00").find("select").attr("readonly",true);
//    $("#hidata00").find(".workadd_").hide();
//    $("#hidata00").find(".addlanguage_").hide();
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
