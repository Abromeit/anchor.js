(function($)
{


$.fn.anchorEnablePageScroll = function() {

  var moveTo = function(target_y,speed,$target){
    speed   = speed || 'slow';
    $target = $('html,body');

    $target.animate({scrollTop:target_y},speed);
  };

  $(document).on('ready load',function(){

    var $el = $(location.hash),
        y;

    if( $el.length ){
      y = $el.offset().top;
      moveTo(y);
    }

  });

  return this;
};


$.fn.anchor = function(options) {

  var defaults = {
        headingClass: 'anchored',
        anchorClass:  'anchor',
        symbol:       '¶',
        maxLength:    100
      },
      opt       = $.extend({}, defaults, options),
      usedNames = {},
      cleanName = function(name) {
        return name.replace(/[^\w\s]+/gi, '')
                   .replace(/[_\s]/g, '-')
                   .replace(/^-+|-+$/g,'')
                   .toLowerCase() || 'a';
      };

  return this.each(function() {
    var $self = $(this),
        name  = $self.text(),
        id,
        $a;

    /**
     *  Strip away unwanted characters
     */
    name = cleanName(name);
    if(name.length > opt.maxLength) {
      name = name.substring(0, opt.maxLength);
    }

    /**
     *  Make sure anchor isn't already in use
     */
    if(usedNames[name]) {
      usedNames[name]++;
      id = name + '-' + usedNames[name];
    } 
    else {
      usedNames[name] = 1;
      id = name;
    }

    /**
     *  Build clickable link
     */
    $a = $('<a></a>', {
      class: opt.anchorClass,
      href:  '#' + id,
      text:  opt.symbol
    });

    /**
     *  Set anchor id and class name
     *  and append our clickable link
     */
    $self.addClass(opt.headingClass)
         .attr('id', id)
         .append($a);
    
  });
};

})(jQuery);
