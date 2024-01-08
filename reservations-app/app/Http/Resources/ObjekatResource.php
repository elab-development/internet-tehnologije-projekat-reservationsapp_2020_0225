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
            'ID --➤ ' => $this->resource->id,
            'NAZIV --➤ ' => $this->resource->naziv,
            'OPIS --➤ ' => $this->resource->opis,
            'GRAD --➤ ' => $this->resource->grad,
            'ADRESA --➤ ' => $this->resource->adresa,
            'BROJ OSTAVLJENIH RECENZIJA --➤ ' => $this->resource->brojRecenzija,
            'KORISNIK KOJI IZDAJE OBJEKAT --➤ ' => new UserResource($this->resource->userCreated),
            'KORISNIK KOJI JE REZERVISAO OBJEKAT --➤ ' => new UserResource($this->resource->userReserved),
            'TIP OBJEKTA --➤ ' => new TipObjektaResource($this->resource->tipObjekta),
        ];
    }
}
