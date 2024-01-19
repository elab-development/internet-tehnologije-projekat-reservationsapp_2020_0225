<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecenzijaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'vrsta_recenzije' => $this->resource->vrstaRecenzije,
            'komentar' => $this->resource->komentarUzRecenziju,
            'broj_zvezdica' => $this->resource->brojZvezdica,
            'user' => new UserResource($this->resource->user),
            'objekat' => new ObjekatResource($this->resource->objekat),
        ];
    }
}
