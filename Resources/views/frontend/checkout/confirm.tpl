
{* file to extend *}
{extends file="parent:frontend/checkout/confirm.tpl"}

{* set namespace *}
{namespace name="frontend/ost-checkout-signature/checkout/confirm"}



{* add our custom js *}
{block name="frontend_checkout_confirm_tos_panel"}

    {* prepend parent *}
    {$smarty.block.parent}

    {* hidden fields *}
    <input type="hidden" id="signatureData" name="signatureData" value="">

    {* configuration *}
    <script type="text/javascript">
        var ostCheckoutSignatureSnippets = {
            resign: "Unterschrift neu erfassen",
            modalTitle: "Unterschrift",
            alertPleaseSign: "Bitte erfassen Sie Ihre Unterschrift.",
            alertPleaseSignEnough: "Bitte erfassen Sie eine richtige Unterschrift."
        };
    </script>

{/block}



{* add table actions *}
{block name='frontend_checkout_confirm_confirm_table_actions'}

    <div class="panel has--border ost-checkout-signature--container" id="plugin_CheckoutSignature_holder">
        <div class="panel--body is--rounded">
            <div class="table--header block-group">
                <div class="panel--th column--product block">
                    Unterschrift
                </div>
            </div>
            <div class="table--tr block-group row--product is--last-row">
                <div class="" style="width: 100% !important;">
                    <div id="Textholder">
                        <div id="client_signature" style="margin: 0;">
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

    <div style="clear: both;"></div>

    {* add parent *}
    {$smarty.block.parent}

{/block}