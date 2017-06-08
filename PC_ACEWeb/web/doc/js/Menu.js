﻿//v=mn00000003;
//===========================下拉菜单展开关闭效果====================================
$(document).ready(function(){
	Menu_InitSlide();
});

function Menu_InitSlide(pdiv){
	var $curpdiv_ = pdiv || $("body");
//  nav-li hover e
	  var num;
	  $curpdiv_.find('.nav-main>.nav-item[id]').hover(function(){
	     /*图标向上旋转*/
	      $(this).children("img").not(".infoPic").removeClass().addClass('hover-up');
	      /*下拉框出现*/
	      var Obj = $(this).attr('id');
	      if(Obj){
	          var Obj_W = $(this).width();
	          var Obj_H = $(this).height();
	          num = Obj.substring(3, Obj.length);
	          $('#box-'+num).stop().slideDown(200);
//	          $('#box-'+num).show();
	          var box_W = $('#box-'+num).width();
	          $('#box-'+num).stop().css("top", ($(this).offset().top + Obj_H)+"px");
	          $('#box-'+num).stop().css("left", ($(this).offset().left + Obj_W - box_W +20) + "px");
	      }
	  },function(){
	      /*图标向下旋转*/
	      $(this).children("img").not(".infoPic").removeClass().stop().addClass('hover-down');
	      /*下拉框消失*/
	      $('#box-'+num).stop().hide();
	  });
	//  hidden-box hover e
	  $curpdiv_.find('.hidden-box').hover(function(){
	      /*保持图标向上*/
	      $('#li-'+num).children("img").not(".infoPic").removeClass().stop().addClass('hover-up');
	      $(this).stop().show();
	  },function(){
	      $(this).stop().slideUp(200);
	      $('#li-'+num).children("img").not(".infoPic").removeClass().stop().addClass('hover-down');
	  });
	
}
