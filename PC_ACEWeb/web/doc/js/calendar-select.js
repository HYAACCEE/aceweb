//v=cal00000004;
function calendar_init($pdiv, mode){
  var cal = $pdiv.find(".calendar");
  for(var i=0; i<cal.length; i++){
    var $obj = $(cal[i]);
    $obj.append('<select name="year" style="padding:0px;width:55px"></select><select name="month" style="margin-left:2px; padding:0px; width:42px"></select><select name="day" style="margin-left:2px; padding:0px; width:42px"></select>');
    if(mode=='YM') calendar_initAction($obj, $obj.next(), 1,1,0);
    else calendar_initAction($obj, $obj.next(), 1,1,1);
  }
}
function calendar_set($pdiv){
  var cal = $pdiv.find(".calendar");
  for(var i=0; i<cal.length; i++){
    var $obj = $(cal[i]);
    var v = $obj.next().val();
    if(v.length>0 && v!='至今'){
      var vv = v.indexOf("/")>0 ? v.split("/"):v.split("-");
      if(vv.length>0) $obj.find('select[name=year]').val(vv[0]);
      if(vv.length>1) $obj.find('select[name=month]').val(vv[1]);
      if(vv.length>2) $obj.find('select[name=day]').val(vv[2]);
    }else if(v.length==0 || v=='至今'){
      $obj.find('select[name=year]').val('');
      $obj.find('select[name=month]').val('');
      $obj.find('select[name=day]').val('');
    }
    if(v=='至今'){
    	$obj.next().next().find(":checkbox").attr("checked", true);
    }
  }
}
/*
 * 生成级联菜单
 */
function calendar_initAction($pdiv, $vvinput, hasY, hasM, hasD){
  var date = new Date();
  var year = date.getFullYear();//获取当前年份
  var month = date.getMonth();//获取当前月份
  
  if(hasY==1){
    var dropList;
    for(var y=1940;y<=year;y++){
      dropList = dropList + "<option value='"+y+"' "+(y==year ? "selected":"")+">"+y+"</option>";
    }
    $pdiv.find('select[name=year]').html(dropList);//生成年份下拉菜单
  }else{
    $pdiv.find('select[name=year]').hide();
  }
  
  if(hasM==1){
    var monthly;
    var showMM;
    for(var m=0;m<13;m++){
      if(m<10){
        showMM = "0"+m;
      }else{
        showMM = m;
      }
      monthly = monthly + "<option value='"+showMM+"' "+(m==month ? "selected":"")+">"+(m==0 ? "":showMM)+"</option>";
    }
    $pdiv.find('select[name=month]').html(monthly);//生成月份下拉菜单
  }else{
    $pdiv.find('select[name=month]').hide();
  }

  if(hasD==1){
    var dayly;
    var showDay;
    for(var d=0;d<=31;d++){
      if(d<10){
        showDay = "0"+d;
      }else{
        showDay = d;
      }
      dayly = dayly + "<option value='"+showDay+"'>"+(d==0 ? "":showDay)+"</option>";
    }
    $pdiv.find('select[name=day]').html(dayly);//生成天数下拉菜单
  }else{
    $pdiv.find('select[name=day]').hide();
  }

  /* 处理年 */
  $pdiv.find('select[name=year]').change(function(){
    $vvinput.val(getResult($pdiv, hasY, hasM, hasD));
  });
  /* 处理每个月有多少天---联动 */
  $pdiv.find('select[name=month]').change(function(){
    if(hasD==1){
      var currentDay;
      var total;
      var Flag = $pdiv.find('select[name=year]').val();
      var currentMonth = $pdiv.find('select[name=month]').val();
      if(currentMonth in [1,3,5,7,8,10,12]){
        total = 31;
      }
      if(currentMonth in [4,6,9,11]){
        total = 30;
      }
      if(currentMonth==2){
        if((Flag%4 == 0 && Flag%100 != 0) || Flag%400 == 0){
          total = 29;
        }else{
            total = 28;
        }
      }
      var showDay;
      for(day=0;day <= total;day++){
        if(day<10){
          showDay = "0"+day;
        }else{
          showDay = day;
        }
        currentDay = currentDay + "<option value='"+showDay+"'>"+(day==0 ? "": showDay)+"</option>";
      }
      $pdiv.find('select[name=day]').html(currentDay);//生成日期下拉菜单
    }
    
    $vvinput.val(getResult($pdiv, hasY, hasM, hasD));
  })
  /* 处理选择day变化 */
  $pdiv.find('select[name=day]').change(function(){
    $vvinput.val(getResult($pdiv, hasY, hasM, hasD));
  });
}
function getResult($pdiv, hasY, hasM, hasD){
   var rtn = '';
   if(hasY==1) rtn += $pdiv.find('select[name=year]').val()+"/";
   if(hasM==1) rtn += $pdiv.find('select[name=month]').val()+"/";
   if(hasD==1) rtn += $pdiv.find('select[name=day]').val()+"/";
   rtn = rtn.substring(0, rtn.length-1).replace(new RegExp("null", "g"), "00");
   
   if($pdiv.next().next().hasClass("today")){
	  $pdiv.next().next().find(":checkbox").attr("checked", false);
   }
   return rtn;
}