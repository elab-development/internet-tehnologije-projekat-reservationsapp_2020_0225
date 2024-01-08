<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TipObjektaResource extends JsonResource
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
            'NAZIV TIPA --➤ ' => $this->resource->naziv,
            'BROJ OBJEKATA KOJI SU OVOG TIPA --➤ ' => $this->resource->brojObjekataKojiSuTrenutnoOvogTipa,
        ];
    }
}
