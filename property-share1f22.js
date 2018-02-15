jQuery(document).ready(function ($) {
    "use strict";
    /*-----------------------------------------------------------------------------------*/
    /* Share Button
    /* https://github.com/carrot/share-button
    /*-----------------------------------------------------------------------------------*/
    var shareButtonLabel      = $('#share-button-title').text(),
        propertyTitle         = $('.single-property-title').text(),
        propertyThumbnail     = $('.only-for-print img').attr('src'),
        propertyDescription   = $.trim($('.entry-content p:first').text()),
        descriptionTextLength = 100, // Description Test Lenght for Social Media
        descriptionTextLabel  = 'Property URL'; // Label for URL you'd like to share via email

    var config = {
        title: propertyTitle,
        image: propertyThumbnail,
        description: propertyDescription.substring(0, descriptionTextLength),
        ui: {
            flyout: $('body').hasClass('rtl') ? 'bottom left' : 'bottom right',
            button_text: shareButtonLabel
        },
        networks: {
            email: {
                description: propertyDescription + '%0A%0A' + descriptionTextLabel + ': ' + window.location.href
            }
        }
    };

    new Share(".share-this", config);
});