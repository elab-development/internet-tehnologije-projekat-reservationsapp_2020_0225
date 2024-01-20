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
            'id' => $this->resource->id,
            'ime' => $this->resource->name,
            'email' => $this->resource->email,
        ];

        if ($this->resource->jeAdmin) {
            $data['korisnicka_uloga'] = 'Ovaj korisnik je administrator.';
        }

        if ($this->resource->jeMenadzerObjekata) {
            $data['korisnicka_uloga'] = 'Ovaj korisnik je menadzer objekta.';
        }


        if (!($this->resource->jeAdmin) && !($this->resource->jeMenadzerObjekata)) {
            $data['korisnicka_uloga'] = 'Ovo je obican korisnik.';
        }

        return $data;

    }
}
