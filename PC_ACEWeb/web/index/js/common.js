//ajax
function ajax(url, data, sfun){
    $.ajax({ type: "POST",
             url: "HIOnline.y?cmd=apply",
             data: {"applyUrl": url, "applyParam": data},
             timeout:15000, 
             beforeSend:function(XMLHttpRequest){
                 //alert('远程调用开始...'); 
             }, 
             success: function(html, textStatus, XMLHttpRequest){
                 if(sfun) sfun(html);
             },
             complete:function(XMLHttpRequest,textStatus){ 
                 //alert('远程调用成功，状态文本值：'+textStatus);
             },
             error:function(XMLHttpRequest,textStatus,errorThrown){
                 util.UI.err("请求失败，请稍后再试~~~~");
                 //alert('error...状态文本值：'+textStatus+" 异常信息："+errorThrown);
             }
    });
}