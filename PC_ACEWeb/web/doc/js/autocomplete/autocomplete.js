//v=ac000001
/*jslint  browser: true, white: true, plusplus: true */
/*global $, countries */

$(function () {
    'use strict';
    autocomplete_Init();
});

function autocomplete_Init(div){
  var $obj;
  if(div) $obj = div.find('.autocomplete-company');
  else $obj = $('.autocomplete-company');
  $obj.autocomplete({
      serviceUrl: '../HIOnline.y?cmd=autoComplete&obj=COMPANY',
      onSelect: function (suggestion) {
      }
  });
  if(div) $obj = div.find('.autocomplete-HC');
  else $obj = $('.autocomplete-HC');
  $obj.autocomplete({
      serviceUrl: '../HIOnline.y?cmd=autoComplete&obj=HC',
      onSelect: function (suggestion) {
    	  var val = $(this).val();
    	  val = val.replace(/&nbsp;/g," ");
    	  $(this).val(val);
    	  $(this).siblings().val(suggestion.id)
      }
  });
  if(div) $obj = div.find('.autocomplete-addHR');
  else $obj = $('.autocomplete-addHR');
  $obj.autocomplete({
      serviceUrl: '../HIOnline.y?cmd=autoComplete&obj=ADDHR',
      onSelect: function (suggestion) {
    	  $(this).val("");
    	  clickAddHR(suggestion.id);
      }
  });
  if(div) $obj = div.find('.autocomplete-Candidate');
  else $obj = $('.autocomplete-Candidate');
  $obj.autocomplete({
      serviceUrl: '../HIOnline.y?cmd=autoComplete&obj=Candidate&data='+amid,
      onSelect: function (suggestion) {
    	  $(this).val("");
    	  clickAddCandi(suggestion.id);
      }
  });
  if(div) $obj = div.find('.autocomplete-hcCompany_M');
  else $obj = $('.autocomplete-hcCompany_M');
  $obj.autocomplete({
      serviceUrl: '../HIOnline.y?cmd=autoComplete&obj=HCCOMPANY_M',
      onSelect: function (suggestion) {
      }
  });
  if(div) $obj = div.find('.autocomplete-hcCompany');
  else $obj = $('.autocomplete-hcCompany');
  $obj.autocomplete({
      serviceUrl: '../HIOnline.y?cmd=autoComplete&obj=HCCOMPANY',
      onSelect: function (suggestion) {
      }
  });
  if(div) $obj = div.find('.autocomplete-jobType');
  else $obj = $('.autocomplete-jobType');
  $obj.autocomplete({
      serviceUrl: '../HIOnline.y?cmd=autoComplete&obj=JOBTYPE&amid='+amid,
      onSelect: function (suggestion) {
    	  job = suggestion.id;
    	  queryList();
      }
  });
  if(div) $obj = div.find('.autocomplete-job');
  else $obj = $('.autocomplete-job');
  $obj.autocomplete({
      serviceUrl: '../HIOnline.y?cmd=autoComplete&obj=JOB&auid='+auid,
      onSelect: function (suggestion) {
    	  job = suggestion.title;
      }
  });
  if(div) $obj = div.find('.autocomplete-city');
  else $obj = $('.autocomplete-city');
  $obj.autocomplete({
      serviceUrl: '../HIOnline.y?cmd=autoComplete&obj=CITY&amid='+amid,
      onSelect: function (suggestion) {
        city = suggestion.value;
        if(city=='所有城市') city = '';
        queryList();
      }
  });
  if(div) $obj = div.find('.autocomplete-school');
  else $obj = $('.autocomplete-school');
  $obj.autocomplete({
      serviceUrl: '../HIOnline.y?cmd=autoComplete&obj=SCHOOL',
      onSelect: function (suggestion) {
      }
  });
  if(div) $obj = div.find('.autocomplete-organs');
  else $obj = $('.autocomplete-organs');
  $obj.autocomplete({
      serviceUrl: '../HIOnline.y?cmd=autoComplete&obj=AORGAN',
      onSelect: function (suggestion) {
    	  var flag = true;
    	  var that = $(this);
    	  autoSelector(flag, that, $("#show_"+that.attr("showobjID")), $("#"+that.attr("valueobjID")), suggestion.value, suggestion.id);
      }
  });
  if(div) $obj = div.find('.autocomplete-checkedHR');
  else $obj = $('.autocomplete-checkedHR');
  $obj.autocomplete({
      serviceUrl: '../HIOnline.y?cmd=autoComplete&obj=CHECKEDHR',
      onSelect: function (suggestion) {
      }
  });
  if(div) $obj = div.find('.autocomplete-organ');
  else $obj = $('.autocomplete-organ');
  $obj.autocomplete({
	  serviceUrl: '../HIOnline.y?cmd=autoComplete&obj=ORGAN',
	  onSelect: function (suggestion) {
		  $(".address").removeClass("gone");
		  var address = suggestion.data;
		  var aa = address.split(",");
		  for(var i=0;i<aa.length;i++){
			  if(aa[i]!=""){
				  $(".address").append("<input class='radio' type='radio' name='radio_address' value='"+aa[i]+"' title='"+aa[i]+"' lay-filter='radio_address'><br/>");
			  }
		  }
		  form.render();
		  if(div) $obj = div.find('.autocomplete-hr');
		  else $obj = $('.autocomplete-hr');
		  $obj.autocomplete({
			  serviceUrl: '../HIOnline.y?cmd=autoComplete&obj=HR&data='+suggestion.id,
			  onSelect: function (suggestion) {
				  $("#auid").val(suggestion.id);
			  }
		  });
	  }
  });
}

function initAOrganAutoSelector(showobjID, valueobjID){
  if($("#auto_"+showobjID).length==0){
    var $obj = $("#"+showobjID);
    $obj.append("<div id='show_"+showobjID+"'></div><input id='auto_"+showobjID+"' class='autocomplete-organs' style='width:630px;height:38px; border:none;' showobjID='"+showobjID+"' valueobjID='"+valueobjID+"'>")
    autocomplete_Init();
    //阻止input回车
    $obj.find(".autocomplete-organs").keydown(function(e){
    	if(e.keyCode == 13){
    		return false;
    	}
    })
  }
  var flag = false;
  autoSelector(flag, $("#auto_"+showobjID), $("#show_"+showobjID), $("#"+valueobjID));
}
function autoSelector(flag, $obj, $showobj, $valueobj, content, id){
  $obj.val("");
  var val = $valueobj.val();
  if(content && content.length>0){
    if(val.indexOf(content)<0){
       $showobj.append("<div style='position: relative;background:#F8F8F8;width: auto; height:25px;line-height:25px;min-width:100px; max-width:350px; display:inline-block;margin-top: 4px;margin-left: 5px;margin-bottom: 2px;border-radius: 2px;' id='v_"+id+"'><span style='padding: 0 20px 0 5px;' data=\""+content+"\">"+content+"</span><a class='dele close_pic' href='javascript:(0);' style='position: absolute;top: 7px;right: 6px;cursor: pointer;'></a></div>");
       if(val.length==0){
          val = content;
        }else{
          val = val+","+content;
        }
       $valueobj.val(val);
      }
  }else{
    if(val.length>0){
      var bb = val.split(",");
      for(var i=0;i<bb.length;i++){
        $showobj.append("<div style='position: relative;background:#F8F8F8;width: auto; height:25px;line-height:25px;min-width:100px; max-width:350px; display:inline-block;margin-top: 4px;margin-left: 5px;margin-bottom: 2px;border-radius: 2px;' id='"+i+"'><span style='padding: 0 20px 0 5px;' data=\""+bb[i]+"\">"+bb[i]+"</span><a class='dele close_pic' href='javascript:(0);' style='position: absolute;top: 7px;right: 6px;cursor: pointer;'></a></div>");
      }
    }
  }
  $(".dele").click(function(){
    var title = $(this).prev().attr("data");
    $(this).parent().remove();
    val = (','+val+',').replace(','+title+',', ',');
    if(val.length>2) val = val.substring(1, val.length-1);
    else val = '';
    $valueobj.val(val);
  });
}
