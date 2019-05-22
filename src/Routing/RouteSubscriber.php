<?php
/**
 * @file
 * Contains \Drupal\d324_gutenberg\Routing\RouteSubscriber.
 */

namespace Drupal\d324_gutenberg\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\RouteCollection;

/**
 * Listens to the dynamic route events.
 */
class RouteSubscriber extends RouteSubscriberBase {

  /**
   * {@inheritdoc}
   */
  public function alterRoutes(RouteCollection $collection) {
    // Replace "some.route.name" below with the actual route you want to override.
    if ($route = $collection->get('gutenberg.media.upload')) {
      $route->setDefaults([
        '_controller' => '\Drupal\d324_gutenberg\Controller\D324GutenbergMediaUploadController::upload',
      ]);
    }
  }
}
