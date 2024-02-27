import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import Form from "components/common/Form";

const EditObject = () => {
    const { data: user } = useGetIdentity();
    const [objectImage, setObjectImage] = useState({ name: "", url: "" });

    // onFinish predstavlja funkciju koja se poziva kada se forma pošalje (submit). formLoading je boolean vrednost 
    //koja označava da li se forma trenutno šalje. register je funkcija koju koristimo za registrovanje polja 
    //(npr. input elementa) u formi, dok handleSubmit predstavlja funkciju koja se poziva kada se forma pošalje (submit) 
    //i koja je zadužena za validaciju i slanje podataka sa forme na server.
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
    } = useForm();


    //U handleImageChange se definise funkcija za promenu slike za objekat. 
  //Ova funkcija prima fajl kao argument, zatim se kreira novi Promise koji koristi FileReader API kako bi se 
  //pretvorio fajl u Data URL, nakon cega se stanje objectImage azurira sa novim imenom i URL-om.
    const handleImageChange = (file: File) => {
        const reader = (readFile: File) =>
            new Promise<string>((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result as string);
                fileReader.readAsDataURL(readFile);
            });

        reader(file).then((result: string) =>
            setObjectImage({ name: file?.name, url: result }),
        );
    };

    //U onFinishHandler se definise funkcija koja se poziva kada se formular za kreiranje objekta zavrsi. 
//Prvo se proverava da li je korisnik dodao sliku za objekat. Ako nije, prikazuje se upozorenje
    const onFinishHandler = async (data: FieldValues) => {
        if (!objectImage.name) return alert("Please upload an object image");

        //u suprotnom poziva se onFinish funkcija i salju se podaci, URL slike za k i email korisnika.
        await onFinish({
            ...data,
            photo: objectImage.url,
            email: user.email,
        });
    };

    return (
        <Form
            type="Edit"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
            onFinishHandler={onFinishHandler}
            objectImage={objectImage}
        />
    );
};

export default EditObject;