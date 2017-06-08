function checkAccountMobile($obj, $tip, flag, sfun){
  var value = $.trim($obj.val());
  if(value==''){
    $tip.html("<font color='red'>手机号码不能为空！</font>");
    return false;
  }else if(value.length!=11){
    if(flag)
      $tip.html("<font color='red'>手机号码格式不正确！</font>");
    return false;
  }else if (!isMobile(value)){
    $tip.html("<font color='red'>手机号码格式不正确！</font>");
    return false;
  }
  if(sfun){
    ajax_("HI"+M0+"Service.y?cmd=registCheckPhone", "{phone:'"+value+"'}",function(ret, html){
      if(ret==2) $tip.html("<font color='red'>"+html+"</font>");
      sfun(ret==1);
    });
  }
}
function checkAccountMobileExist($obj, $tip, flag, sfun){
	  var value = $.trim($obj.val());
	  if(value==''){
	    $tip.html("<font color='red'>手机号码不能为空！</font>");
	    return false;
	  }else if(value.length!=11){
	    if(flag)
	      $tip.html("<font color='red'>手机号码格式不正确！</font>");
	    return false;
	  }else if (!isMobile(value)){
	    $tip.html("<font color='red'>手机号码格式不正确！</font>");
	    return false;
	  }
	  if(sfun){
	    ajax_("HI"+M0+"Service.y?cmd=registCheckPhone", "{phone:'"+value+"'}",function(ret, html){
	      if(ret==1) $tip.html("<font color='red'>"+html+"</font>");
	      sfun(ret==2);
	    });
	  }
	}
function checkAccountEmail($obj, $tip, sfun){
  var value = $.trim($obj.val());
  if(value==''){
    $tip.html("<font color='red'>邮箱不能为空！</font>");
    return false;
  }else if (!isEmail(value)){
    $tip.html("<font color='red'>邮箱格式不正确！</font>");
    return false;
  }
  if(sfun){
    ajax_("HI"+M0+"Service.y?cmd=registCheckEmail", "{email:'"+value+"'}", function(ret, html){
      if(ret==2) $tip.html("<font color='red'>"+html+"</font>");
      sfun(ret==1);
    });
  }
}
function checkAccountCardno($obj, $tip, sfun){
  var value = $.trim($obj.val());
  if(value==''){
    $tip.html("<font color='red'>身份证号不能为空！</font>");
    return false;
  }else if (!isCardNo(value)){
    $tip.html("<font color='red'>身份证号格式不正确！</font>");
    return false;
  }
  if(sfun){
    ajax_("HI"+M0+"Service.y?cmd=registCheckCardno", "{cardno:'"+value+"'}", function(ret, html){
      if(ret==2) $tip.html("<font color='red'>"+html+"</font>");
      sfun(ret==1);
    });
  }
}

function setDisable($obj, flag){
  if(flag){
    $obj.attr("disabled",true);
    $obj.addClass("btn-disabled");
  }else{
    $obj.removeAttr("disabled");
    $obj.removeClass("btn-disabled");
  }
}


// 验证中文名称
function isChineseName(name) {
 var pattern = /^[\u4E00-\u9FA5]{1,6}$/;
 return pattern.test(name);
}

// 验证密码
function isPassword(pass) { 
  var pattern = /(.+){6,12}$/; 
  return pattern.test(pass); 
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
 return pattern.test(card) && IdentityCodeValid(card); 
}

// 验证EMAIL
function isEmail(email) {
  //var patten = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
  var patten = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  return patten.test(email);
}
// 验证座机
function checkTel(tel){
 var patten = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
 return patten.test(tel);
}

/***********************************************************************/
/*
根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
    地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
    出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
    顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
    校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

出生日期计算方法。
    15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
    2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
下面是正则表达式:
 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
 身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i            
 15位校验规则 6位地址编码+6位出生日期+3位顺序号
 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
 
 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
                公式(1)中： 
                i----表示号码字符从由至左包括校验码在内的位置序号； 
                ai----表示第i位置上的号码字符值； 
                Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
                i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
                Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

*/
//身份证号合法性验证 
//支持15位和18位身份证号
//支持地址编码、出生日期、校验位验证
function IdentityCodeValid(code) { 
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;
    
    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        tip = "身份证号格式错误";
        pass = false;
    }
    
    else if(!city[code.substr(0,2)]){
        tip = "地址编码错误";
        pass = false;
    }
    else{
      /* 2017-05-03 注释 by sally
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                tip = "校验位错误";
                pass =false;
            }
        }*/
    }
    //if(!pass) alert(tip);
    return pass;
}
/*********************************************************************************************/
