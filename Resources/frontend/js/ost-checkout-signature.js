
/**
 * Einrichtungshaus Ostermann GmbH & Co. KG - Checkout Signature
 *
 * @package   OstCheckoutSignature
 *
 * @author    Eike Brandt-Warneke <e.brandt-warneke@aquatuning.de>
 * @copyright 2018 Einrichtungshaus Ostermann GmbH & Co. KG
 * @license   proprietary
 */

// Handler when the DOM is fully loaded
$( document ).ready(function() {

    // are we on plugin page?
    if(document.getElementById("signature-pad")){

        var sPI = "#sigPreviewImg";
        var cSig = "#client_signature";
        var cSP = "#CheckoutSignaturePlugin";
        var tmpH = "#tempholder";
        var mCH = "#modalContentHolder";
        var tAaB = ".table--actions.actions--bottom";
        var txtH = "#Textholder";

        var wrapper = document.getElementById("signature-pad");
        // var confirmButton = document.getElementById("confirmButton");
        // var confirmButton = jQuery.find( 'body button[type="submit"].btn.is--primary');

        var confirmForm = document.getElementById("confirm--form");
        var clearButton = wrapper.querySelector("[data-action=clear]");
        var savePNGButton = wrapper.querySelector("[data-action=save-png]");
        var saveJPGButton = wrapper.querySelector("[data-action=save-jpg]");

        var canvas = wrapper.querySelector("canvas");
        var signaturePad = new SignaturePad(canvas, {
            // It's Necessary to use an opaque color when saving image as JPEG;
            // this option can be omitted if only saving as PNG or SVG
            backgroundColor: 'rgb(255, 255, 255)'
        });

        // Adjust canvas coordinate space taking into account pixel ratio,
        // to make it look crisp on mobile devices.
        // This also causes canvas to be cleared.
        function resizeCanvas() {

            // When zoomed out to less than 100%, for some very strange reason,
            // some browsers report devicePixelRatio as less than 1
            // and only part of the canvas is cleared then.
            var ratio =  Math.max(window.devicePixelRatio || 1, 1);

            // This part causes the canvas to be cleared
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);

            // This library does not listen for canvas changes, so after the canvas is automatically
            // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
            // canvas looks empty, because the internal data of this library wasn't cleared. To make sure
            // that the state of this library is consistent with visual state of the canvas, you
            // have to clear it manually.
            signaturePad.clear();
        }

        // On mobile devices it might make more sense to listen to orientation change,
        // rather than window resize events.
        window.onresize = resizeCanvas;
        resizeCanvas();

        function download(dataURL, filename) {
            var blob = dataURLToBlob(dataURL);

            var url = window.URL.createObjectURL(blob);

            var a = document.createElement("a");
            a.style = "display: none";
            a.href = url;
            a.download = filename;

            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
        }

        // One could simply use Canvas#toBlob method instead, but it's just to show
        // that it can be done using result of SignaturePad#toDataURL.
        function dataURLToBlob(dataURL) {
            // Code taken from https://github.com/ebidel/filer.js
            var parts = dataURL.split(';base64,');
            var contentType = parts[0].split(":")[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;
            var uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }

            return new Blob([uInt8Array], { type: contentType });
        }

        clearButton.addEventListener("click", function (event) {
            signaturePad.clear();
            signaturePad.clear();
            signaturePad.clear();

            $(sPI).css('opacity', '0');
        });

        savePNGButton.addEventListener("click", function (event) {

            if (signaturePad.isEmpty()) {
                alert(ostCheckoutSignatureSnippets.alertPleaseSign);
            } else {

                if(signaturePad.isNotEnoughPixels()){
                    alert(ostCheckoutSignatureSnippets.alertPleaseSignEnough);
                }else{

                    var dataURL = signaturePad.toDataURL();
                    document.getElementById('signatureData').value = dataURL;
                    var blob = dataURLToBlob(dataURL);

                    $( jQuery.find( 'body button[type="submit"].btn.is--primary') ).css( "display", "block" );
                    //download(dataURL, "signature.png");

                    $(sPI).css('opacity', '1');

                    $(cSig).html('<a href="#"><table><tr><td id="CheckoutSignaturePluginSigContainer"><button id="CheckoutSignaturePluginSigX">X</button><img id="sigPreviewImg" style="height: 60px; float: left;" src="'+dataURL+'"></td><td style="padding-left: 25px"><a href="#" id="resignButton" class="btn">'+ostCheckoutSignatureSnippets.resign+'</a></td></tr></table></a>');
                    $(cSig).css('margin',"0px");

                    var element = $(cSP);
                    element.detach();
                    $(tmpH).append(element);

                    $(cSP).css('display', 'none');

                    $.modal.close();

                    $('#CheckoutSignaturePluginSigX').click(function(){

                        $( jQuery.find( 'body button[type="submit"].btn.is--primary') ).css( "display", "none" );
                        $(sPI).css('opacity', '0');
                        $('#CheckoutSignaturePluginSigContainer').css('opacity', '0');

                    });


                    $('#resignButton').click(function(){

                        var modalSizing = 0;


                        //$(tAaB).css('float',"right");
                        //$(tAaB).css('width',"20%");

                        $(cSP).css('display', 'none');

                        var modalElement = "";
                        var cnt = '<div id="modalContentHolder" style="height: 98% !important;"></div>';

                        modalElement = $.modal.open(cnt, {
                            title: ostCheckoutSignatureSnippets.modalTitle
                        });

                        var element = $(cSP);
                        element.detach();
                        $(mCH).append(element);
                        $(cSP).css('display', 'block');

                        resizeCanvas();

                        $('body').addClass( "CheckoutSignature" );

                        if(modalSizing>0){
                            canvas.height = modalSizing;
                        }

                    });

                }
            }
        });

        function testForSig(){

            if (signaturePad.isEmpty()) {
                $( jQuery.find( 'body button[type="submit"].btn.is--primary') ).css( "display", "none" );
            }else{
                $( jQuery.find( 'body button[type="submit"].btn.is--primary') ).css( "display", "block" );
            }

            confirmForm.addEventListener('submit', function(event){
                var dataURL = signaturePad.toDataURL();
                document.getElementById('signatureData').value = dataURL;
                var blob = dataURLToBlob(dataURL);
            });
        }

        testForSig();



            var modalSizing = 0;

            //$(tAaB).css('float',"right");
            //$(tAaB).css('width',"20%");

            $(cSP).css('display', 'none');

            var modalElement = "";
            var cnt = '<div id="modalContentHolder" style="height: 98% !important;"></div>';

            // $(txtH).click(function(){
            $('#signButton').click(function(){

                modalElement = $.modal.open(cnt, {
                    title: ostCheckoutSignatureSnippets.modalTitle
                });

                var element = $(cSP);
                element.detach();
                $(mCH).append(element);
                $(cSP).css('display', 'block');

                resizeCanvas();

                $('body').addClass( "CheckoutSignature" );

                if(modalSizing>0){
                    canvas.height = modalSizing;
                }

            });

            function saveBeforeClose(){
                var element = $(cSP);
                element.detach();

                $(tmpH).append(element);
                $(cSP).css('display', 'none');

                modalSizing = canvas.height;
            }

            $.subscribe('plugin/swModalbox/onClose', saveBeforeClose);
    }

});