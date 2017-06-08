  $(document).ready(function(){
    /***********此处编写js*************/
    CV_Detail_Top(); //简历-基本详情
    initCondition(); //附件-condition 
    
    $(".goBack").click(function(){  
    	var curtHtml = util.Cookie.get('curtHtml');//存储当前HTML
	    go(curtHtml);
    }); 
    /**********************************/
  });
  //初始化Conditon
  function initCondition(){
    ACECommon_ShowData("ComService.y?cmd=html", "{objectMode:'H00403-2'}", $("#hidata_condition"), 0, function(ret,html){
        Condition_InitActions(); //定义条件中的action
        query(); //查询
    });
  }
  //定义条件中的action
  function Condition_InitActions(){
    UI_InitDateSE($("#startDate"), $("#endDate"), -1, 20);
    $(".actionType_").change(function(){
        query();
    });
    /*$("#startDate").keyup(function(){
        query();
    });
    $("#endDate").keyup(function(){
        query();
    });*/
  }
  //查询事件
  function query(){
    ACECommon_ShowData("CandiDetailSService.y?cmd=actionDetail", "{cid:'"+CID+"',index:'1',actionType:'"+$(".actionType_").val()+"',startDate:'"+$("#startDate").val()+"',endDate:'"+$("#endDate").val()+"'}", $("#hidata1"), 0, function(ret,html){
        Pub_InitSlide();
        $("#nodata").hide();
    }, function(){
        $("#hidata1").hide();
        $("#nodata").show();
    });
  }