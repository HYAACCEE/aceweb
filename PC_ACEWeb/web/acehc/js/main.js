  $(document).ready(function(){
    /***********此处编写js*************/
    $(".sortTab_ span").click(function(){
        $(this).addClass("color-focus").siblings().removeClass("color-focus");
        $(".sortTab_ img").addClass("gone");
        $(this).children("img").removeClass("gone");
        queryTaskList($(this).attr("data"));
    });    
    $(".sortTab_ span").eq(0).click();     
    
    $(".titleView_ span").click(function(){
        $(this).addClass("bg-focus").siblings().removeClass("bg-focus");
        $(this).addClass("white").siblings().removeClass("white");
        queryStatData($(this).attr("data"));
    });
    $(".titleView_ span").eq(0).click();

    $(".closeNotice_").click(function(){
        ajax_("MainSService.y?cmd=closeTopNotice", "", function(ret, html){
            if(ret==1){
                $("#p_notice").hide();
                util.Cookie.set('hcdataNoticeShow', 0, 30);       
            }
          });
    });
    
    $(".addpage_").click(function(){
        location.href = "candidate_add.html";
    });
    /**********************************/
  });
  function init(){
    queryNoticeList();
    queryActionList();
  }
  function change(){  
      var box1=document.getElementById("box1");  
      var box2=document.getElementById("box2");  
      box1.style.zIndex="1";  
      box2.style.zIndex="2";  
  }
  //通知列表
  function queryNoticeList(){
    ACECommon_ShowData("MainSService.y?cmd=listNotice", "{objectMode:'H00109-1'}", $("#hidata1"), 0, function(ret,html){
        if(noticeShow==1) $("#p_notice").show();
    }); 
  }  
  //任务日列表
  function queryTaskList(MK){
    ACECommon_ShowData("MainSService.y?cmd=listTaskDay", "{objectMode:'H00109-2',sortMK:'"+MK+"'}", $("#hidata2"), 0, function(ret,html){
        CV_InitActions();
        
        $(".taskList_").click(function(){
            var $curdiv_ = $(this).parent().parent();
            $curdiv_.html('');
            taskList($curdiv_, MK, $curdiv_.attr("data"), "");
        });
        $(".taskList_").eq(0).click();
        
        $(".taskType_").click(function(){
            $(this).addClass("btn-focus").siblings().removeClass("btn-focus");
            var $curdiv_ = $(this).parent().parent().next("div");
            $curdiv_.html('');
            taskList($curdiv_, MK, $curdiv_.attr("data"), $(this).attr("data"));
        });
        
    });   
  }
  var pq;
  function taskList(curdiv,MK,day,taskType){
    PQuery.PAGE_ROW = 10;
    pq = new PQuery("MainSService.y?cmd=listTask",
             "{objectMode:'H00109-22',sortMK:'"+MK+"',day:'"+day+"',taskType:'"+taskType+"'}",
             curdiv, null, 1);
    page_query();
  }
  function page_query(page){
    pq.prependFlag = 0;
    pq.query(page, function(ret, html){
        if(ret==1){
          var $thisdiv = pq.dataDiv.find(".flow:last");
          CV_InitActions($thisdiv);
          var elli = $thisdiv.find(".ellipsis");
          for(var i = 0;i < elli.length;i++){
        	  console.log($(elli[i]).html());
        	  $(elli[i]).attr("title",$(elli[i]).text());
          }
        }
    });
  }
 
  function reload(tid, result){
	    if(result.indexOf("666")>=0){
	        var $this_ = $("#line"+tid).children().eq(1);
	        $this_.append("<div class='bold f18 text-c' style='position: absolute;top: 10px;left: 10px;' id='box1'><div class='dt15' style='line-height: 58px;'><img class='img30' src=../doc/images/homeSuccess.png> "+"<span class=\"pd10\">操作成功!</span>" + "</div></div>");
	        
	        var i = 1;
	        setInterval(function(){               
	          if(i == 0) {
	             $("#line"+tid).hide();

	            // page_query(); //重载任务列表
	            // queryTaskList($(this).attr("data"));
	             
	            location.href = "main.html"; // reload后刷新整个页面 2017-04-21 by sally
	          }
	          $this_.addClass(i);
	          i--;
	        },1000);
	      }else{
	        util.UI.msg(result);
	      }
	    }
   
  //日历事件列表
  function queryActionList(){
    //$('#task_calendar').html('');
    ACECommon_ShowData("MainSService.y?cmd=listAction", "{objectMode:'H00109-3'}", $("#hidata3"), 0, function(ret,html){
        $('#task_calendar').jalendar();
    },function(ret,html){
        $('#task_calendar').jalendar();
    });   
  }  
  //统计数据列表
  function queryStatData(MK){
    ACECommon_ShowData("MainSService.y?cmd=listStatData", "{objectMode:'H00109-4',queryMK:'"+MK+"'}", $("#hidata4"), 0, function(ret,html){
    });   
  }
