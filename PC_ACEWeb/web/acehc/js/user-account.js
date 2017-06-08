  
  function checkMobile($phone, yfun){
    var phone = $.trim($phone.val());
    if(phone==''){
      $("#moileMsg").html("<font color='red'>手机号码不能为空！</font>");
      setDisable($("#btn"), true);
      return false;
    }else if (!isMobile(phone)){
      $("#moileMsg").html("<font color='red'>手机号码格式不正确！</font>");
      setDisable($("#btn"), true);
      return false;
    }
    ajax_("HIBService.y?cmd=registCheckPhone", "{phone:'"+phone+"'}",function(ret,html){
        if(ret==1){//注册过,直接登录
          setDisable($("#btn"), false);
          if(yfun) yfun();
          return true;        
        }else{
            setDisable($("#btn"), true);
            $("#moileMsg").html("<font color='red'>"+html+",请直接登录"+"</font>");
            return false; 
        }   
    });
  }
