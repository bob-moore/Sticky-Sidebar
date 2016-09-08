( function ( $ ) {

    var $window = $( window );
    var settings;
    var defaults = {
        'topoffset' : 0,
        'bottomoffset' : 0,
        'wrapper' : null
    };

    $.fn.StickIt = function( options ) {
        // Extend default settings
        settings = $.extend( {}, defaults, options );
        // Create objects
        return this.each( function() {
            return new StickyWidget( $( this ) );
        });
    };

    function StickyWidget( $el ) {
        var $parent   = $el.parents().first();
        var $wrapper  = $el.data( 'wrapper' ) || settings.wrapper;
        var triggers  = {};
        var offsets   = {};
        var waypoints = {};
        var $container;

        // Init object on window load
        $window.on( 'load', init );

        function init() {
            // Create Wrapper
            if( $wrapper === 'undefined' || $wrapper === null ) {
                var parents = $el.parents();
                $wrapper = parents[1];
            }
            $wrapper = $( $wrapper );
            // Create Container
            $el.wrap( '<div id="fixed-container"></div>' );
            $container = $( '#fixed-container' );
            // Set up offsets
            offsets = {
                top      : parseInt( $el.data( 'topoffset' ) ) || parseInt( settings.topoffset ),
                bottom   : parseInt( $el.data( 'bottomoffset' ) ) || parseInt( settings.bottomoffset ),
                total    : parseInt( $parent.offset().top ),
                original : parseInt( $el.position().top )

            };
            bind_events();
            calculate_positions( create_triggers );
        }

        function bind_events() {
            $window.on( 'load', init );
            $window.on( 'resize', refresh );
        }
        function create_triggers() {
            // Create Triggers to fire directly on element, for scrolling down
            waypoints.affix = $container.waypoint( function( direction ) {
                // If we are scrolling down, affix element
                if( direction === 'down' ) {
                    affix_element();
                    return this;
                }
                // If we are scrolling up, defix element
                if( direction === 'up' ) {
                    defix_element();
                    return this;
                }
                return this;
            }, { offset : offsets.top } );

            // Create Triggers to fire on parent, when we reach the bottom
            waypoints.defix = $wrapper.waypoint( function( direction ) {
                // If we are scrolling up, affix element
                if( direction === 'up' ) {
                    affix_element();
                    return this;
                }
                // If we've reach the bottom, defix element
                if( direction === 'down' ) {
                    affix_bottom();
                    return this;
                }
            }, { offset : triggers.bottom });
            // Immediate refresh to check responsiveness
            refresh();
        }

        function calculate_positions( callback ) {
            triggers.top    = offsets.top || 0;
            triggers.bottom = 0 - ( $wrapper.outerHeight() - $el.height() ) + offsets.top + offsets.bottom;
            return callback();
        }

        function refresh() {
            return calculate_positions( function() {
                waypoints.affix[0].destroy();
                waypoints.defix[0].destroy();
                if( $parent.outerWidth() >= $wrapper.innerWidth() ) {
                    defix_element();
                } else {
                    dimension_element();
                    create_triggers();
                }
                return;
            });
        }

        var calculate_bottom = function() {
            return $wrapper.height() - $el.outerHeight() - offsets.bottom ;
        };

        function affix_element() {
            var position = window.pageYOffset - offsets.total;
            if( position < 0 ) {
                return;
            }
            position_element( position ).addClass( 'affixed' );
        }

        function defix_element( placement ) {
            $el.attr( 'style', '' );
        }

        function affix_bottom() {
            $el.css( { 'position' : 'absolute', 'top' : calculate_bottom(), 'width' : 'auto' } );
        }

        function position_element() {
            $el.css( { 'position' : 'fixed', 'top' : offsets.top, 'width' : $parent.width() } );
            return $el;
        }

        function dimension_element() {
            $el.css( { 'width' : $parent.width() } );
            $container.css( { 'height' : $el.height() } );
            return $el;
        }
    }

}( jQuery ));