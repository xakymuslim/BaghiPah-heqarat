/**
 * JavaScript Related to Favorites
 */
(function($){
    "use strict";

    /*-----------------------------------------------------------------------------------*/
    /* Add to favorites
    /*-----------------------------------------------------------------------------------*/
    if ( typeof favoriteData !== "undefined" ) {

        $('#add-to-favorite').on( 'click', function(e){
            var $this = $(this);
            e.preventDefault();
            if ( !$this.hasClass( 'added' ) ) {

                var star = $this.find( 'i' );
                var favoriteTitle = $this.find( 'span' );

                var addToFavorite = $.ajax({
                    url: favoriteData.ajaxURL,
                    method: "POST",
                    data: {
                        property_id : favoriteData.propertyID,
                        action : favoriteData.action
                    },
                    dataType: "json",
                    beforeSend: function( xhr ) {
                        star.addClass('fa-spin');
                    }
                });

                addToFavorite.done( function( response ) {
                    star.removeClass('fa-spin');
                    if ( response.success ) {
                        $this.addClass( 'added' );
                        star.removeClass( 'fa-star-o').addClass( 'fa-star' );
                        favoriteTitle.removeClass( 'failed' );
                        favoriteTitle.html( response.message );
                    } else {
                        favoriteTitle.addClass('failed');
                        favoriteTitle.html( response.message );
                    }
                });

                addToFavorite.fail( function( jqXHR, textStatus ) {
                    alert( "Request Failed: " + textStatus );
                });
            }
        });

    }


    /*-----------------------------------------------------------------------------------*/
    /* Remove from favorites
    /*-----------------------------------------------------------------------------------*/
    $( '.remove-from-favorite' ).on( 'click', function( event ) {
        event.preventDefault();
        var $this = $(this);
        var property_item = $this.closest('.col-grid-post');
        var loader = $this.siblings('.loader');

        var removeFromFavorites = $.ajax({
            url: $this.attr( 'href' ),
            type: "POST",
            data: {
                property_id : $this.data( 'property-id' ),
                action : "remove_from_favorites"
            },
            dataType: "json",
            beforeSend: function( xhr ) {
                $this.hide();
                loader.css('display', 'block');
            }
        });

        removeFromFavorites.done( function( response ) {
            if ( response.success ) {
                property_item.remove();
            } else {
                loader.hide();
                alert( response.message );
            }
        });

        removeFromFavorites.fail( function( jqXHR, textStatus ) {
            alert( "Request Failed: " + textStatus );
        });

    });


})(jQuery);