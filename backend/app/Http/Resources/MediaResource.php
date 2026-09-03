<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
class MediaResource extends JsonResource { public function toArray(Request $request): array { return ['id' => $this->id, 'storage_key' => $this->storage_key, 'thumbnail_key' => $this->thumbnail_key, 'medium_key' => $this->medium_key, 'large_key' => $this->large_key, 'mime_type' => $this->mime_type, 'width' => $this->width, 'height' => $this->height]; } }
