
/**
 * Einrichtungshaus Ostermann GmbH & Co. KG - Checkout Signature
 *
 * @package   OstCheckoutSignature
 *
 * @author    Eike Brandt-Warneke <e.brandt-warneke@aquatuning.de>
 * @copyright 2018 Einrichtungshaus Ostermann GmbH & Co. KG
 * @license   proprietary
 */

$( document ).ready(function() {



    if($('body').hasClass('is--ctl-checkout')){

        var elements = $('div[id^="plugin_"]');
        var eles = [];

        if(elements.length>1){

            elements.each(function( index ) {

                var elswidth = Math.floor(100/elements.length);
                var elsOuterWidth = $(this).outerWidth();
                var pixels = elsOuterWidth*(elswidth/100);

                eles[index] = $(this);

                $(this).css("float","left");
                $(this).css("width", (pixels-5)+"px");

                if(index === 0 && $(this).height() === 145){
                    $(this).height(155);
                    $(this).children().first().height("100%");

                    $(this).css({ 'height': "155 px" });
                    $(this).children().first().css({ 'height': "100%" });
                }
                else{

                    if(index !== 0){
                        $(this).css("margin-left", "5px");

                        $(this).css({ 'height': ($(eles[(index-1)]).height()) + "px" });
                        $(this).children().first().css({ 'height': ($(eles[(index-1)]).height()) + "px" });
                    }else{
                        $(this).css("margin-right", "5px");
                    }

                }

            });

        }else{
            elements.css("width", "100%");
        }

    }

});
