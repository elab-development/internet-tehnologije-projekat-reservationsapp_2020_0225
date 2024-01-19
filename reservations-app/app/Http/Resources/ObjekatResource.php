<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ObjekatResource extends JsonResource
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
            'naziv' => $this->resource->naziv,
            'opis' => $this->resource->opis,
            'grad' => $this->resource->grad,
            'adresa' => $this->resource->adresa,
            'broj_recenzija' => $this->resource->brojRecenzija,
            'user_created' => new UserResource($this->resource->userCreated),
            'user_reserved' => new UserResource($this->resource->userReserved),
            'tip_objekta' => new TipObjektaResource($this->resource->tipObjekta),
        ];
    }
}
