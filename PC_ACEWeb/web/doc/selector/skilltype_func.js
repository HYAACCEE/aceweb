var skill_flag_arr = new Array();		//	已选中数组
//var skill_flag_arr = new Array('0100','2400','2402');

var Skilltype = {
	// 软件技能
	init : function(){
		var _str='',_id='';
		if (skill_flag_arr.length>0){
			for (var i in skill_flag_arr){
				_str+=','+skill_a[skill_flag_arr[i]];
				_id+=','+skill_flag_arr[i];
			}
			$('#btn_SkilltypeID').val(_str.substring(1));
			$('#SkilltypeID').val(_id.substring(1));
		}
	},
	Show : function(){
		var output='',flag,output2='';
		for(var i in skill_flag_arr){
			output2+='<li class="Skilltype'+skill_flag_arr[i]+' chkON" onclick="Skilltype.Chk(\''+skill_flag_arr[i]+'\')">'+skill_a[skill_flag_arr[i]]+'</li>';
		}
		$('#SkilltypeSelected dd').html(output2);

		for (var i in skill_a){
			if(i.substring(2)=='00'){
				output+='<li onclick="Skilltype.SubLayer(\''+i+'\')">'+skill_a[i]+'</li>';
			}
		}

		$('#drag').width('670px');
		$('#SkilltypeList').html('<ul>'+output+'</ul>');
		$('#SkilltypeSelected dd').html(output2);

		// 鼠标悬停变色
		$('#SkilltypeAlpha li').hover(function(){$(this).addClass('over')},function(){$(this).removeClass('over')});
		// 点击弹出子菜单
		$('#SkilltypeList li').click(function(e){$("#sublist").css({top:e.pageY-4,left:e.pageX-4}).hover(function(){$(this).show()},function(){$(this).hide()})})
	},
	// 子职位 悬浮菜单
	SubLayer : function(id){
		var output='',width,flag;
		var myid=id.substr(0,2);
		var len=0;
		for (var i in skill_a){
			if(i.substr(0,2)==myid){
				flag=in_array(i,skill_flag_arr)?' chkON':'';
				if(i.substr(2)=='00'){
					output+='<h4 onclick="Skilltype.Chk(\''+id+'\')"><a href="javascript:" class="Skilltype' + id + flag +'">'+skill_a[id]+'</a></h4>';
				}else{
					output+='<li><a href="javascript:" class="Skilltype' + i + flag +'" onclick="Skilltype.Chk(\''+i+'\')">'+skill_a[i]+'</a></li>';
					len++;
				}
			}
		}
		width=len>10?440:220;
		output='<div id="sub_skilltype"><ul style="width:'+width+'px">'+output+'</ul></div>';
		$("#sublist").html(output).show();
	},
	Chk : function(id){
		if(!in_array(id,skill_flag_arr)){
			if(id.substr(2)=='00'){	// 选中父类清除子类
				for (var i in skill_a){
					if(i.substr(0,2)==id.substr(0,2)){
						if(in_array(i,skill_flag_arr)) this.del(i);
					}
				}
			}else{	// 选中子类清除父类
				var myid;
				myid=id.substr(0,2)+'00';
				if(in_array(myid,skill_flag_arr)) this.del(myid);
			};

			if(skill_flag_arr.length<5){
				skill_flag_arr[skill_flag_arr.length]=id;
				var html='<li class="Skilltype'+id+'" onclick="Skilltype.Chk(\''+id+'\')">'+skill_a[id]+'</li>';
				$('#SkilltypeSelected dd').append(html);
				$('.Skilltype'+id).addClass('chkON');
				$('#SkilltypeSelected li').hover(function(){$(this).addClass('over')},function(){$(this).removeClass('over')});
			}else{
				alert('您最多能选择5项');
				return false;
			}
		}else{
			this.del(id)
		}
	},
	del : function(id){
		for (var i in skill_flag_arr){
			if(skill_flag_arr[i]==id) skill_flag_arr.splice(i,1);;
		}
		$('#SkilltypeSelected .Skilltype'+id).remove();
		$('.Skilltype'+id).removeClass('chkON');
	},
	// 确定
	confirm : function(){
		var funStr='',skill_Id='';
		for(var i in skill_flag_arr){
			funStr+=','+skill_a[skill_flag_arr[i]];
		}
		funStr=funStr.substring(1)?funStr.substring(1):''; 
		$('#btn_SkilltypeID').val(funStr);
		$('#SkilltypeID').val(skill_flag_arr);
		boxAlpha();
	},


/* ****************************** 单选 ********************************* */
	// 单选输出
	Show2 : function(){
		var output='',flag,output2='';
		for (var i in skill_a){
			if(i.substring(2)=='00'){
				output+='<li onclick="Skilltype.SubLayer2(\''+i+'\')">'+skill_a[i]+'</li>';
			}
		}
		$('#drag').width('670px');
		$('#SkilltypeList').html('<ul>'+output+'</ul>');
		// 鼠标悬停变色
		$('#SkilltypeAlpha li').hover(function(){$(this).addClass('over')},function(){$(this).removeClass('over')});
		// 点击弹出子菜单
		$('#SkilltypeList li').click(function(e){$("#sublist").css({top:e.pageY-4,left:e.pageX-4}).hover(function(){$(this).show()},function(){$(this).hide()})})
	},
	// 子职位 悬浮菜单
	SubLayer2 : function(id){
		var output='',width;
		var myid=id.substr(0,2);
		var len=0;
		for (var i in skill_a){
			if(i.substr(0,2)==myid){
				if(i.substr(2)=='00'){
					output+='<h4 onclick="Skilltype.Chk2(\''+id+'\')"><a href="javascript:">'+skill_a[id]+'</a></h4>';
				}else{
					output+='<li><a href="javascript:" onclick="Skilltype.Chk2(\''+i+'\')">'+skill_a[i]+'</a></li>';
					len++;
				}
			}
		}
		width=len>10?440:220;
		output='<div id="sub_skilltype" class="radio"><ul style="width:'+width+'px">'+output+'</ul></div>';
		$("#sublist").html(output).show();
	},
	Chk2 : function(id){
		$('#btn_SkilltypeID_2').val(skill_a[id]);
		$('#SkilltypeID_2').val(id);
		$("#sublist").empty().hide();
		boxAlpha();
	}
}
//赋值
function setSkilltypeSelect(array){
	for(var i in skill_a){
		for(var j in array){
			if(skill_a[i] == array[j]){
				skill_flag_arr.push(i);
			}
		}
	}
}
// 多选
function skilltypeSelect(){
	var dragHtml ='<div id="SkilltypeAlpha">';			//软件技能
		dragHtml+='		<dl id="SkilltypeSelected"><dt>已选软件技能：</dt><dd></dd></dl>';
		dragHtml+='		<div id="SkilltypeList"></div>';	//软件技能列表
		dragHtml+='</div>';
	$('#drag_h').html('<b>请选择软件技能（您最多能选择5项）</b><span onclick="Skilltype.confirm()">确定</span>');
	$('#drag_con').html(dragHtml);

	Skilltype.Show();
	boxAlpha();
	draglayer();
}

// 单选
function skilltypeSelect_2(){
	var dragHtml ='<div id="SkilltypeAlpha">';			//软件技能
		dragHtml+='		<div id="SkilltypeList"></div>';	//软件技能列表
		dragHtml+='</div>';
	$('#drag_h').html('<b>请选择软件技能</b><span onclick="boxAlpha()">关闭</span>');
	$('#drag_con').html(dragHtml);
	Skilltype.Show2();
	boxAlpha();
	draglayer();
}