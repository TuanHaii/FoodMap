<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
class ReviewResource extends JsonResource { public function toArray(Request $request): array { return ['id' => $this->id, 'restaurant_id' => $this->restaurant_id, 'rating' => $this->rating, 'content' => $this->content, 'status' => $this->status, 'helpful_count' => $this->helpful_count, 'user' => new UserResource($this->whenLoaded('user')), 'media' => MediaResource::collection($this->whenLoaded('media')), 'created_at' => $this->created_at, 'updated_at' => $this->updated_at]; } }
