<?php
namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
class DishResource extends JsonResource { public function toArray(Request $request): array { return ['id' => $this->id, 'name' => $this->name, 'description' => $this->description, 'price' => $this->price === null ? null : (float) $this->price, 'currency' => $this->currency, 'is_available' => $this->is_available, 'media' => MediaResource::collection($this->whenLoaded('media'))]; } }
