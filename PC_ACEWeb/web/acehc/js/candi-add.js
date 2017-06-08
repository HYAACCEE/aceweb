v='cvad00000004'
var stMode = 1;
var stModeLimitFlag = true;
var new_cid = '';
$(document).ready(function(){
  /***********此处编写js*************/
  initForm(); //初始化Form
  /**********************************/
});

function checkIsMobile(obj){
  var value = $.trim(obj.val());
  obj.val(value);
  if(value==''){
    return true;
  }
  if (!isMobile(value)) {
    $("#tipMobile").html("手机格式不正确");
    return false;  
  }
  $("#tipMobile").html("");
  return true;  
}
function checkIsEmail(obj){
  var value = $.trim(obj.val());
  obj.val(value);
  if(value==''){
    return true;
  }
  if(!isEmail(value)){
    $("#tipEmail").html("邮箱格式不正确");
    return false;
  }
  $("#tipEmail").html("");
  return true;  
}
function checkSalary(obj){
  if(obj.val()==''){
    return true;
  }
  if(obj.val() < 20){
    $("#tipSalary").html("年薪不能少于20万");
    return false;
  }
  $("#tipSalary").html("");
  return true;  
}
//初始化Form
function initForm(){
	if(power == 1){
	  ACECommon_ShowData("ComService.y?cmd=html", "{objectMode:'H00301'}", $("#hidata1"), 0, function(ret,html){
	      Form_InitActions(); //定义条件中的action
	  });
	}else{
		$("#hidata1").hide();
		$("#activView_").show();
	}
}
//定义Form中的action
function Form_InitActions(){
  autocomplete_Init();
  initUpload();
  
  $("#v_stMode").next().find(":radio").click(function(e){
    stMode = $(this).val();
    $("#v_stMode").val(stMode);
    if(stMode==0){
       $('.submit_').text('保存');
       $(".onlymore_").hide();
       $(".onlymore_").parent().next().children().removeClass("notnull");
       checkIsMobile($("#mobile"));
       checkIsEmail($("#email"));
       checkSalary($("#money"));
    } else if(stMode==1){
      $('.submit_').text('申请入库');
      $(".onlymore_").show();
      $(".onlymore_").parent().next().children().addClass("notnull");
    }
  });

  $("#phone").on("keydown", function() {
    $("#tipMobile").html("");
  });
  $("#phone").blur(function(){
      if(checkIsMobile($(this)) == false) return;
      if($(this).val().length==11){
        ACECommon_ShowData("CandiSService.y?cmd=checkPhoneIsOnline", "{phone:'"+$(this).val()+"'}",null,0, function(ret, html){
            $("#tipMobile").html("");
        },function(ret, html){
            $("#tipMobile").html(html);
        });
      }
  });
  
  $("#email").on("keydown", function() {
      $("#tipEmail").html("");
  });
  $("#email").blur(function(){
      if(checkIsEmail($(this)) == false) return;
      if($(this).val().length>0){
        ACECommon_ShowData("CandiSService.y?cmd=checkEmailIsOnline", "{email:'"+$(this).val()+"'}",null,1, function(ret, html){
          $("#tipEmail").html("");
        },function(ret, html){
            $("#tipEmail").html(html);
        });
      }
  });

  $("#money").keyup(function(){    
      $(this).val($(this).val().replace(/[^0-9.]/g,''));    
  }).bind("paste",function(){  //CTR+V事件处理    
      $(this).val($(this).val().replace(/[^0-9.]/g,''));     
  }).css("ime-mode", "disabled"); //CSS设置输入法不可用 
     
  $("#money").on("keydown", function() {
      $("#tipSalary").html("");
  });
  $("#money").blur(function(){
    checkSalary($(this));
  });

  $("#cname").on("keydown", function() {
    $("#tipCname").html("");
  });
  $("#job").on("keydown", function() {
    $("#tipJob").html("");
  });
  $("#mmOrgan").on("keydown", function() {
    $("#tipMMorgan").html("");
  });
    
  var maxsize = UPLOAD_FILE_MAXSIZE;//2M
  var errMsg = "上传的附件文件不能超过2M！！！";
  var  browserCfg = {};
  var ua = window.navigator.userAgent;
  if (ua.indexOf("MSIE")>=1){
   browserCfg.ie = true;
  }else if(ua.indexOf("Firefox")>=1){
   browserCfg.firefox = true;
  }else if(ua.indexOf("Chrome")>=1){
   browserCfg.chrome = true;
  }
  /*//选择文件
  $(".uploadFile_").click(function (){
      $("#uploadfile").click();
      $("#uploadfile").on("change",function(){//这个方法只在每次选择的文件不一样的之后,才执行,而且,如果文件过大的话,提示信息会每次翻倍 就是这个change方法会
          var fileurl = this.files[0].name;
          var fileType = fileurl.substring(fileurl.lastIndexOf('.'));
        	if(!/\.(word|doc|pdf|docx|DOC|DOCX|PDF|PDF\/DOC)$/.test(fileurl)){   
            util.UI.err("文件类型必须是.pdf,.doc,.docx中的一种");
            return false;  
          }else{
           try{
             var obj_file = document.getElementById("uploadfile");
             if(obj_file.value==""){
                util.UI.err("请先选择上传文件");
                return;
              }
              var filesize = 0;
             if(browserCfg.firefox || browserCfg.chrome ){
                filesize = obj_file.files[0].size;
             }else{
                util.UI.err(tipMsg);
                return;
             }
             if(filesize==-1){
                util.UI.err(tipMsg);
                return;
             }else if(filesize>maxsize){
                util.UI.err(errMsg);
                return;
            }else{
              $("#p_cvshow").html(this.files[0].name);
              return;
            }
         }catch(e){
          util.UI.err(e);
         }
        }
      });
  });*/
  
  //提交
  $(".submit_").click(function(e) {
    $btn_ = $(this);
    var isOk = true;
    if(checkIsMobile($("#phone")) == false
        || checkIsEmail($("#email")) == false
        || checkSalary($("#money")) == false){
      isOk = false;
    }
    if(!isOk){
//      util.UI.err("请检查数据输入是否正确");
      return false;
    }
    
    var loadingIndex = util.UI.loading();
    //上传文件
    ajaxFile_("CandiSService.y?cmd=uploadFile", "{fileNum:'"+$(".uploadFile_").length+"'}", function(html){
        if($("#uploadFile1")[0].files[0]){
          if(html.indexOf("222")==0){
            util.UI.closeLoading(loadingIndex);
            util.UI.err("文件上传失败，请重试");
            return;
          }
          $(".vvf").val(html); //赋值给参数vv
          //$("#fileUrl").val(html);
        }
        ACECommon_FormSubmit($btn_, "CandiSService.y?cmd=add", "{cid:'"+new_cid+"',email:'"+$("#email").val()+"',phone:'"+$("#phone").val()+"'}", function(ret, html){
      	  
      	    util.UI.closeLoading(loadingIndex);
            if(ret==1){
              if(stMode == 1){
                  location.href = "candidate_add_message_success.html";
              }else{
                  util.UI.msg("新增候选人成功!");
                  setTime = setInterval(function(){
                    location.href = "candidate_list.html";
                  },1000);
                  
              }
            }else if(ret==3){ //申请入库不成功时
              util.UI.closeLoading(loadingIndex);
              var js = JSON.parse(html);
              cid = js.cid;
              
              layer.confirm('<div class="bold f14 pdall20">'+js.html+'</div>', {
                title: '申请入库失败',
                btn: ['我知道了'] //可以无限个按钮
              }, function(index, layero){
                layer.close(index);
                location.href = "candidate_add.html";
              });
            }
        }, $("#hidata1"));
    });
  });
  //hover状态
  $(".base_condition").hover(function(){
    $(".condition_content").show();
  },function(){
    $(".condition_content").hide();
  })
}