function M_MENU($container_) {
  this.$M_MENU_ = $container_;
}
function M_TAB(title, url){
  this.title = title;
  this.url = url;
}
M_MENU.prototype.addTab = function(newtab){
  var $tab = $('<dd><a href="#" class="goto" data="'+M_TAB.url+'">'+M_TAB.title+'</a></dd>');
  this.$M_MENU_.append($tab);
}
var m_menus = {
    new M_MENU("首页", "main.html"),
    new M_MENU("", ""),
    new M_MENU("", ""),
    new M_MENU("", ""),    
}

var m_submenus = {
    new M_MENU("首页", "main.html"),
    new M_MENU("", ""),
    new M_MENU("", ""),
    new M_MENU("", ""),    
}