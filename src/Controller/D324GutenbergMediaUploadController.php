<?php
/**
 * @file
 * Contains \Drupal\d324_gutenberg\Controller\D324GutenbergMediaUploadController.
 */

namespace Drupal\d324_gutenberg\Controller;
use Drupal\editor\Entity\Editor;
use Drupal\gutenberg\Controller\MediaController;
use Drupal\media\Entity\Media;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Component\Serialization\Json;

/**
 * An example controller.
 */
class D324GutenbergMediaUploadController extends MediaController {

  /**
   * Returns JSON representing the new file upload, or validation errors.
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The request.
   * @param \Drupal\editor\Entity\Editor $editor
   *   The editor.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   The JSON response.
   */
  public function upload(Request $request, Editor $editor = NULL) {
    $jsonResponse = parent::upload($request, $editor);
    $file_entity = Json::decode($jsonResponse->getContent());

    // Create media entity with saved file.
    $media_entity = Media::create([
      'bundle' => $file_entity['media_type'],
      'uid' => \Drupal::currentUser()->id(),
      'langcode' => \Drupal::languageManager()->getDefaultLanguage()->getId(),
      'status' => 1,
      'thumbnail' => [
        'target_id' => $file_entity['id'],
        'alt' => $file_entity['media_details']['file'],
      ],
      'field_media_image' => [
        'target_id' => $file_entity['id'],
        'alt' => $file_entity['media_details']['file'],
      ],
    ]);

    $media_entity->save();
    return $jsonResponse;
  }

}
