(function ($) {
    'use strict';
    $(document).ready(function () {
        if ($('input[name="cmd"]').length > 0) {
            var cmdarray = ["_xclick", "_cart", "_oe-gift-certificate", "_xclick-subscriptions", "_xclick-auto-billing", "_xclick-payment-plan", "_donations", "_s-xclick"];
            if (cmdarray.indexOf($('input[name="cmd"]').val()) > -1) {
                if ($('input[name="bn"]').length > 0) {
                    $('input[name="bn"]').val("AngellEYE_SP_BM_WordPress");
                } else {
                    $('input[name="cmd"]').after("<input type='hidden' name='bn' value='AngellEYE_SP_BM_WordPress' />");
                }

            }
        }
    });

})(jQuery);
