#StickIt Sticky Sidebar jQuery Plugin

StickIt is a jQuery plugin for sticking things in place.

##Usage

To stick something in place, simple call **StickIt** on a jQuery object:

    jQuery( function( $ ) {
        $( '#sticky-widget-area' ).StickIt( {
            topoffset    : 30,
            bottomoffset : 30,
            wrapper      : '#primary'
        });
    });

The plugin takes 3 arguments, all of which are optional.

- **topoffset** : The distance from the top of the screen to trigger the element
- **bottomoffset** : The distance from the footer to stop stickyness
- **wrapper** : The outermost wrapper the wraps the sidebar. This is optional, but *highly* recommended

Each argument can be supplied via options to the function, or as data elements on the element itself:

- data-topoffset="30",
- data-bottomoffset="30",
- data-wrapper="#primary"

##Markup

There is a particular markup needed for the plugin to function correctly. The sticky element needs to be inside of a defined column, so something like:

    <div id="primary">
        <div id="main" class="column md-8">
            <!-- Main Content Here -->
        </div>
        <div id="sidebar" class="column md-4">
            <div id="not-sticky-widget-area">
                <!-- Put not sticky sidebar here -->
            </div>
            <div id="sticky-widget-area">
                <!-- Put sticky sidebar here -->
            </div>
        </div>
    </div>

###Sample markup from sidebar.php in a WordPress theme:

    <aside id="sidebar" class="column sm-4">

        <?php if ( is_active_sidebar( 'not-sticky-sidebar' ) ) : ?>
            <div class="widget-area secondary sidebar" role="complementary">
                <?php dynamic_sidebar( 'not-sticky-sidebar' ); ?>
            </div>
        <?php endif; ?>

        <?php if ( is_active_sidebar( 'sticky-sidebar' ) ) : ?>
            <div id="sticky-widget-area" class="widget-area secondary sidebar" role="complementary">
                <?php dynamic_sidebar( 'sticky-sidebar' ); ?>
            </div>
        <?php endif; ?>

    </aside>