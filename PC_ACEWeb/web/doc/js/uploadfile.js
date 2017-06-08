//v=uf0000006
var PIC = 'PIC';
var FILE = 'DOC|PDF';
var PICFILE = 'PIC|DOC|PDF';

function initUpload(clickFlag_){
  var clickFlag = true;
  if(clickFlag_==false) clickFlag = false;
  var uploads = $(".upload_");
  if(uploads.length>0){
    for(var i=0;i<uploads.length;i++){
      var $obj = $(uploads[i]);
      initUploadObj($obj, i+1, $obj.attr("ftype"), $obj.attr("fsrc"), clickFlag);
    }
  }
}

function initUploadObj($p, index, fileType, srcpic, clickFlag){
  /**判断是否是Safari和IE浏览器*/  
  if(isSafari || isIE){
    $p.html('<input class="uploadFile_" id="uploadFile'+index+'" type="file" style="height:16px; border:0px solid #ffffff"/>');
  }else{  
    /**如果不是就采用自定义的选择按钮和文件输入框*/
    if(fileType == PIC){
      $p.html('<a class="uploadimg pointer uploadFile_click_"><img id="uploadFile_show" width="120" height="110" src="'+srcpic+'"></a><input class="uploadFile_" id="uploadFile'+index+'" type="file" style="display: none"/>');

    }else if(fileType == FILE){
      $p.html('<a class="pointer color-focus uploadFile_click_"><img style="width:11px;height:11px" src="../doc/images/HC/add_plus.png"> 上传文件</a><span class="pd10 grey" id="uploadFile_show">仅支持word、pdf格式；文件大小在2M以内</span><input class="uploadFile_" id="uploadFile'+index+'" type="file" style="display: none"/>');
    
    }else if(fileType == PICFILE){
      $p.html('<a class="pointer color-focus uploadFile_click_"><img style="width:11px;height:11px" src="../doc/images/HC/add_plus.png"> 上传文件</a><span class="pd10 grey" id="uploadFile_show">仅支持word、pdf格式；文件大小在2M以内</span><input class="uploadFile_" id="uploadFile'+index+'" type="file" style="display: none"/>');
    }
  }
  if(clickFlag){
    
    $p.find(".uploadFile_click_").click(function () {
      $p.find(".uploadFile_").click();  //隐藏了input:file样式后，点击头像就可以本地上传
    });
    
    var lastSelectFile = null;
    $p.find(".uploadFile_").on("change",function(){
        var thisfile = this;
        if(!thisfile.files[0]){
          if(lastSelectFile!=null) thisfile.files[0] = lastSelectFile;
          return;
        }
        var fileName = thisfile.files[0].name; //文件名
        var objUrl = getLocalObjectURL(thisfile.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
        if (objUrl) {
  
          if(fileType == PIC){
            if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(fileName.toLowerCase())){
              util.UI.err("图片类型必须是.gif,jpeg,jpg,png中的一种");
              if(lastSelectFile!=null){
                thisfile.value = "";
                thisfile.files[0] = lastSelectFile;
              }else thisfile.value = "";
              return false;
            }
            if(!checkFileSize(thisfile, UPLOAD_PIC_MAXSIZE, lastSelectFile)){
              return false;
            }
//////////////////////////if($p.next().has("vvf")) $p.next().val("正在上传");
            $p.find("#uploadFile_show").attr("src", objUrl); //将图片路径存入show中，预览图片
          }
          
          if(fileType == FILE){
            if(!/\.(doc|pdf|docx)$/.test(fileName.toLowerCase())){
              util.UI.err("文件类型必须是,doc,pdf,docx中的一种");
              if(lastSelectFile!=null){
                thisfile.value = "";
                thisfile.files[0] = lastSelectFile;
              }else thisfile.value = "";
              return false;
            }
            if(!checkFileSize(thisfile, UPLOAD_FILE_MAXSIZE, lastSelectFile)){
              return  false;
            }
//////////////////////////if($p.next().has("vvf")) $p.next().val("正在上传");
            $p.find("#uploadFile_show").html(fileName); //将文件路径存入show中
          }
  
          if(fileType == PICFILE){
            if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|word|doc|pdf|docx)$/.test(fileName.toLowerCase())){
              util.UI.err("文件类型必须是.gif,jpeg,jpg,png,doc,pdf,docx中的一种");
              if(lastSelectFile!=null){
                thisfile.value = "";
                thisfile.files[0] = lastSelectFile;
              }else thisfile.value = "";
              return false;
            }
            if(!checkFileSize(thisfile, UPLOAD_PIC_MAXSIZE, lastSelectFile)){
              return  false;
            }
//////////////////////////if($p.next().has("vvf")) $p.next().val("正在上传");
            $p.find("#uploadFile_show").html(fileName); //将文件路径存入show中
          }
          
        }
        lastSelectFile = thisfile.files[0];
    });
  }
}

function checkFileSize(thisfile, maxSize, lastSelectFile){
  var fileSize = 0;         
  if (isIE && !thisfile.files) {     
    var filePath = thisfile.value;     
    var fileSystem = new ActiveXObject("Scripting.FileSystemObject");        
    fileSize = fileSystem.GetFile (filePath).Size;
  } else {    
    fileSize = thisfile.files[0].size;     
  }
  if(fileSize > maxSize){
    util.UI.err("文件不能大于"+(UPLOAD_PIC_MAXSIZE/1024/1024)+"M");
    if(lastSelectFile!=null){
      thisfile.value = "";
      thisfile.files[0] = lastSelectFile;
    }else thisfile.value = "";
    return false;
  }
  return true;
}