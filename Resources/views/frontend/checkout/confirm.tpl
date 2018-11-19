{extends file="parent:frontend/checkout/confirm.tpl"}


{block name="frontend_checkout_confirm_tos_panel"}


    {$smarty.block.parent}


    <input type="hidden" id="signatureData" name="signatureData" value="">

    <script type="text/javascript">
        var ostCheckoutSignatureSnippets = {
            resign: "Unterschrift neu erfassen",
            modalTitle: "Unterschrift",
            alertPleaseSign: "Bitte erfassen Sie Ihre Unterschrift.",
            alertPleaseSignEnough: "Bitte erfassen Sie eine richtige Unterschrift."
        };
    </script>

{/block}






{* Table actions *}
{block name='frontend_checkout_confirm_confirm_table_actions'}
    {block name='frontend_checkout_signature_field'}
        <div class="panel has--border" id="plugin_CheckoutSignature_holder">
            <div class="panel--body is--rounded">
                <div class="table--header block-group">
                    <div class="panel--th column--product block">
                        Unterschrift
                    </div>
                </div>
                <div class="table--tr block-group row--product is--last-row">
                    <div class="" style="width: 100% !important;">
                        <div id="Textholder">
                            <div id="client_signature" style="margin: 15px;">
                                <span id="signButton" class="btn">Unterschrift erfassen</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="tempholder" style="opacity: 0"></div>

        <div class="panel has--border" id="CheckoutSignaturePlugin" style="height: 100%">
            <div id="signature-pad" class="signature-pad">
                <div class="signature-pad--body">
                    <canvas class="canvas--element" style="height: 100% !important;"></canvas>
                </div>
                <div class="signature-pad--footer">

                    <div class="signature-pad--actions">
                        <div>
                            <button type="button" class="btn button clear" data-action="clear" onclick="document.getElementById('confirmButton').style.display='none';">Löschen</button>
                        </div>
                        <div>
                            <button type="button" id="savePNGButton" class="btn button save" data-action="save-png">Speichern</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/block}



    {$smarty.block.parent}



{/block}


