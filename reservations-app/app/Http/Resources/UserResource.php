<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'ID --➤ ' => $this->resource->id,
            'IME --➤ ' => $this->resource->name,
            'EMAIL --➤ ' => $this->resource->email,
        ];

        if ($this->resource->jeAdmin) {
            $data['KORISNICKA ULOGA --➤ '] = 'Ovaj korisnik je administrator.';
        }

        if ($this->resource->jeMenadzerObjekata) {
            $data['KORISNICKA ULOGA --➤ '] = 'Ovaj korisnik je menadzer objekta.';
        }


        if (!($this->resource->jeAdmin) && !($this->resource->jeMenadzerObjekata)) {
            $data['KORISNICKA ULOGA --➤ '] = 'Ovo je obican korisnik.';
        }

        return $data;

    }
}
