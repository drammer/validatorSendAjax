    jQuery(document).ready(function(){

        jQuery('.button-validate').click( function(){
            jQuery(this).customValidatorAjax({wrappDiv:'.form-block-validate', ajaxUrl: 'http:\/\/site.com\/ajax.php'});
        } )

    })

(function($ ){
    $.fn.customValidatorAjax = function(options){

        var settings = {
            wrappDiv : 'form',
            falseValid : 'false-validate',
            ajaxUrl : '/',
        };
        var arrInputValue = new Object();

        var keyValidateInput = {
              actionInput:function(e){
                  e.addClass(settings.falseValid);
                      if(e.attr('type') == 'tel'){
                          var pattern = /^\d+$/
                            if(!pattern.test(e.val())){
                                e.addClass(settings.falseValid);
                            }else {
                                if (pattern.test(e.val())) {
                                    e.removeClass(settings.falseValid);
                                    arrInputValue[e.attr('name')] = e.val();
                                }
                            }
                      }
                      if(e.attr('type') == 'text'){
                         if(e.val().length <= 0){
                             e.addClass(settings.falseValid);
                         }else{
                             e.removeClass(settings.falseValid);
                             arrInputValue[e.attr('name')] = e.val();
                         }
                      }
                      if(e.attr('type') == 'email'){
                          var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                          if (!pattern.test(e.val())) {
                              e.addClass(settings.falseValid);
                          }else {
                              if (pattern.test(e.val())) {
                                  e.removeClass(settings.falseValid);
                                  arrInputValue[e.attr('name')] = e.val();
                              }
                          }
                      }
              }
        };
        if(options){
            $.extend(settings,options);
        }
        $(settings.wrappDiv).submit(function(e){
            e.preventDefault();
        });
        var allForm = this.closest(settings.wrappDiv);
        var inputField = $(allForm).find('input, textarea');
        $(inputField).each(function(){
            var requiredInput = $(this).attr('required');

            arrInputValue[$(this).attr('name')] = $(this).val();

            if( requiredInput !== undefined & $(this).val().length > 0 ){
                keyValidateInput.actionInput($(this));
            }
            if( requiredInput !== undefined & $(this).val().length <= 0 ){
                keyValidateInput.actionInput($(this));
            }
        });
        if( this.closest(settings.wrappDiv).find( $('.'+settings.falseValid)).length <= 0 ){
            arrInputValue['url'] = location.href;
            arrInputValue['action'] = 'test';
            jQuery.get(settings.ajaxUrl, arrInputValue, function(data){
                console.log(data);
                jQuery('input, textarea').val('').removeClass('focus').next('label').removeClass('active');
                jQuery('#modalGratitude').modal('show');
                setTimeout(function(){
                    jQuery('#modalGratitude').modal('hide');
                }, 3000);
            });

        }
    };
})(jQuery);
