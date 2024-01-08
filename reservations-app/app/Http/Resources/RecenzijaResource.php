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
            'ID --➤ ' => $this->resource->id,
            'VRSTA RECENZIJE --➤ ' => $this->resource->vrstaRecenzije,
            'KOMENTAR --➤ ' => $this->resource->komentarUzRecenziju,
            'BROJ ZVEZDICA --➤ ' => $this->resource->brojZvezdica,
            'KORISNIK KOJI IZDAJE OBJEKAT --➤ ' => new UserResource($this->resource->user),
            'TIP OBJEKTA --➤ ' => new ObjekatResource($this->resource->objekat),
        ];
    }
}
