var School = {

/* ****************************** 单选 ********************************* */
	// 单选输出
	Show13 : function(){
		var output='',flag,output2='';
		for (var i in s_a){
			if(i.substring(2)=='0000'){
				output+='<li onclick="School.SubLayer2(\''+i+'\')">'+s_a[i]+'</li>';
			}
		}
		$('#drag').width('670px');
		$('#SchoolList').html('<ul>'+output+'</ul>');
		// 鼠标悬停变色
		$('#SchoolAlpha li').hover(function(){$(this).addClass('over')},function(){$(this).removeClass('over')});
		// 点击弹出子菜单
		$('#SchoolList li').click(function(e){$("#sublist").css({top:e.pageY-4,left:e.pageX-4}).hover(function(){$(this).show()},function(){$(this).hide()})})
	},
	// 子职位 悬浮菜单
	SubLayer2 : function(id){
		var output='',width;
		var myid=id.substr(0,2);
		var len=0;
		for (var i in s_a){
			if(i.substr(0,2)==myid){
				if(i.substr(2)=='0000'){
					output+='<h4"><a href="javascript:">'+s_a[id]+'</a></h4>';
				}else{
					output+='<li><a href="javascript:" onclick="School.Chk2(\''+i+'\')">'+s_a[i]+'</a></li>';
					len++;
				}
			}
		}
		width=len>10?240:240;
		output='<div id="sub_funtype" class="radio"><ul style="height:200px; width:'+width+'px; overflow:auto;">'+output+'</ul></div>';
		$("#sublist").html(output).show();
	},
	Chk2 : function(id){
		var $_other = s_a[id]; 
        if($_other=="手动填写"){
            $addHtml='<div style="border-top:1px dotted #f90;"><center><input type="text" maxLength="60" id="temp_name" name="temp_name" style="width:200px"><input id="temp_send" type="button" value="确定"></center></div>';
            $("#SchoolList").append($addHtml);
            $("#sublist").empty().hide();
            $("#temp_send").click(function(){
                var $temp_name = $("#temp_name").attr("value");
                $curpdiv_.find('#btn_SchoolID_2').val($(temp_name).val());
                boxAlpha();
            })            
        }else{
        	$curpdiv_.find('#btn_SchoolID_2').val(s_a[id]);
        	$curpdiv_.find('#SchoolID_2').val(id);
  		    $("#sublist").empty().hide();
  		    boxAlpha();
        }

	}
}
// 单选
function schoolSelect_2(pdiv){
	$curpdiv_ = pdiv;
	var dragHtml ='<div id="SchoolAlpha">';
		dragHtml+='		<div id="SchoolList"></div>';
		dragHtml+='</div>';
	$('#drag_h').html('<b>请选择学校</b><span onclick="boxAlpha()">关闭</span>');
	$('#drag_con').html(dragHtml);
	School.Show13();
	boxAlpha();
	draglayer();
}
