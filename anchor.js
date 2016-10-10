(function($)
{

$.fn.anchor = function(options) {

  var defaults = {
    headingClass: 'anchored',
    anchorClass:  'anchor',
    symbol:       '¶',
    maxLength:    100
  },
  opt       = $.extend({}, defaults, options),
  usedNames = [],
  cleanName = function(name) {
    return name.replace(/[^\w\s]+/gi, '')
               .replace(/[_\s]/g, '-')
               .replace(/^-+|-+$/g,'')
               .toLowerCase() || 'a';
  };

  return this.each(function() {
    var $self = $(this),
        name  = $self.text(),
        count = 1,
        id;

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
    if(usedNames[name] >= 1) {
      count = usedNames[name] + 1;
      id = name + '-' + count;
    } 
    else {
      id = name;
    }
    usedNames[name] = count;

    /**
     *  Set anchor id and class name
     */
    self.addClass(opt.headingClass)
        .attr('id', id);

    /**
     *  Append clickable anchor
     */
    var $a = $('<a></a>',{
               class: opt.anchorClass,
               href:  '#' + id,
               text:  opt.symbol
             });
             
    self.append($a);
    
  });
};

})(jQuery);
