function checkAccountMobile($phone, yfun){
  var value = $.trim($phone.val());
  if(value==''){
    $("#mobileMsg").html("<font color='red'>手机号码不能为空！</font>");
    setDisable($("#btn"), true);
    return false;
  }else if (!isMobile(value)){
    $("#mobileMsg").html("<font color='red'>手机号码格式不正确！</font>");
    setDisable($("#btn"), true);
    return false;
  }
  ajax_("HIBService.y?cmd=registCheckPhone", "{phone:'"+value+"'}",function(ret,html){
      if(ret==1){//注册过,直接登录
        setDisable($("#btn"), false);
        if(yfun) yfun();
        return true;        
      }else{
          setDisable($("#btn"), true);
          $("#mobileMsg").html("<font color='red'>"+html+",请直接登录"+"</font>");
          return false; 
      }   
  });
}

function checkAccountEmail($email, yfun){
  var value = $.trim($email.val());
  if(value==''){
    $("#emailMsg").html("<font color='red'>手机号码不能为空！</font>");
    return false;
  }else if (!isEmail(value)){
    $("#emailMsg").html("<font color='red'>手机号码格式不正确！</font>");
    return false;
  }
  ajax_("HIBService.y?cmd=registCheckEmail", "{email:'"+value+"'}",function(ret,html){
      if(ret==1){//注册过,直接登录
        if(yfun) yfun();
        return true;        
      }else{
          $("#emailMsg").html("<font color='red'>"+html+",请直接登录"+"</font>");
          return false; 
      }   
  });
}

function setDisable($obj, flag){
  if(flag){
    $obj.removeAttr("disabled");
    $obj.removeClass("btn-disabled");
  }else{
    $obj.attr("disabled",true);
    $obj.addClass("btn-disabled");
  }
}


// 验证中文名称
function isChineseName(name) {
 var pattern = /^[\u4E00-\u9FA5]{1,6}$/;
 return pattern.test(name);
}
 
// 验证手机号
function isMobile(phone) {
  //var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
  if(!myreg.test(phone)){
      return false; 
  }
  return true;
}
 
// 验证身份证 
function isCardNo(card) { 
 var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
 return pattern.test(card); 
}

// 验证EMAIL
function isEmail(email) {
  var patten = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
  return patten.test(email);
}
