var $curpdiv_ = null;
function in_array(needle, haystack) {
  if(typeof needle == 'string' || typeof needle == 'number') {
    for(var i in haystack) {
      if(haystack[i] == needle) {
          return true;
      }
    }
  }
  return false;
}
