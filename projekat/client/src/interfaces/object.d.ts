import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    objectType: string,
    location: string,
    price: number | undefined,
}

export interface ObjectCardProps {
  id?: BaseKey | undefined,
  title: string,
  location: string,
  price: string,
  photo: string,
}
