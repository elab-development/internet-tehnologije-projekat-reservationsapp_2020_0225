/* eslint-disable no-restricted-globals */
import { Typography, Box, Stack} from "@pankod/refine-mui";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";

import Confetti from 'react-confetti';


import  { useState, useEffect } from "react";


import {
    ChatBubble,
    Delete,
    Edit,
    Phone,
    Place,
} from "@mui/icons-material";

import { FaStar } from "react-icons/fa6";

import { AuthProvider } from "@pankod/refine-core";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";
import axios from "axios";

import { CustomButton } from "components";

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}







const ObjectDetails = () => {

    //Za zvezdice
    //Ovaj kod se koristi za kreiranje interaktivnog sistema 
    //ocenjivanja zvezdica (rating) na veb stranici ili u aplikaciji.
    // U prvom redu, koristi se React hook useState kako bi se pratilo stanje ocene (rating).
    // Početna vrednost ocene postavljena je na 0, a setRating funkcija će se koristiti za ažuriranje ocene.
    //Zatim, koristi se još jedan React hook useState kako bi se pratilo stanje boje ocene (rateColor).
    // Početna vrednost boje postavljena je na 0, a setColor funkcija će se koristiti za ažuriranje boje.

    const [rating, setRating] = useState<number>(0);
    const [rateColor, setColor] = useState<number>(0);

///////////////////////////////////////////////////////////////////////////////////
    //Za Konfete animaciju
    //Ovaj kod omogućava pokretanje animacije konfeta postavljanjem vrednosti
    // isCelebrating na true, a zatim se automatski zaustavlja nakon 5 sekundi,
    // simulirajući efekat slavlja koji traje određeno vreme.



    //Prvi deo koda koristi React hook useState kako bi pratio trenutno stanje animacije.
    // Varijabla isCelebrating određuje da li je animacija trenutno aktivna ili ne,
    // a setCelebrating funkcija omogućava ažuriranje tog stanja.
    const [isCelebrating, setCelebrating] = useState(false);

    //Zatim, koristi se React hook useEffect kako bi se definisala
    // funkcionalnost koja će se izvršiti nakon svakog renderovanja komponente,
    // ali samo kada se vrednost isCelebrating promeni.
    useEffect(() => {
   //U okviru useEffect-a, postavlja se tajmer (setTimeout) 
   //koji će nakon 5000 milisekundi (5 sekundi) pozvati funkciju 
   //koja će postaviti vrednost isCelebrating na false, čime se završava animacija.
        const resetCelebration = setTimeout(() => {
            setCelebrating(false);
        }, 5000);

//Na kraju, funkcija vraćena iz useEffect-a koristi clearTimeout 
//kako bi očistila tajmer ukoliko se komponenta unmount-uje pre 
//nego što istekne vreme. Ovo pomaže u sprečavanju curenja resursa (memory leak)
// i neželjenog ponašanja kada korisnik napusti stranicu ili komponentu pre nego što animacija završi.
        return () => clearTimeout(resetCelebration);
    }, [isCelebrating]);

////////////////////////////////////////////////////////////////////////////////


//////////////////ADMIN/////////////////////
//authProvider objekat koji se koristi u React aplikacijama za upravljanje autentikacijom korisnika.
// Objekat ima pet funkcija: login, logout, checkError, checkAuth i getUserIdentity.
    const authProvider: AuthProvider = {
        
//login se poziva kada se korisnik uloguje. Ona prima podatke o korisnikovom autentifikacionom token-u kao argument.
// U ovoj funkciji se proverava da li je autentifikacioni token ispravan i, ako jeste, izdvoji se profileObj koji sadrži 
//podatke o korisniku. 
//Zatim se korisnikov name, email i avatar sačuvaju u bazi podataka, a zatim se kreira objekat user 
//koji se skladišti u localStorage. Ako je korisnik admin, to se takođe označava u localStorage.
        login: async({ credential }: CredentialResponse) => {
          const profileObj = credential ? parseJwt(credential) : null;
    
          //save user to mongodb
          if(profileObj){
            const response = await fetch('http://localhost:8080/api/v1/users', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                name: profileObj.name,
                email: profileObj.email,
                avatar: profileObj.picture,
              })
            })
    
            const data = await response.json();
    
            if(response.status === 200) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...profileObj,
                avatar: profileObj.picture,
                userid:data._id
              })
            );
              // proveri da li je  admin i oznaci u bazi
              if (profileObj.email === "reservationsapp33@gmail.com") {
                localStorage.setItem("isAdmin", "true");
              } else {
                localStorage.removeItem("isAdmin");
              }
            }
            else {
                 //autentifikacija neuspesna
              return Promise.reject()
            }
          }     
    
          localStorage.setItem("token", `${credential}`);
    //autentifikacija uspesna
          return Promise.resolve();
        },

        //Funkcija logout se poziva kada se korisnik izloguje. Ona briše podatke o korisniku, token-u i postavlja isAdmin na null.
        logout: () => {
          const token = localStorage.getItem("token");
    
          if (token && typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("isAdmin");
            axios.defaults.headers.common = {};
            window.google?.accounts.id.revoke(token, () => {
              return Promise.resolve();
            });
          }
    
          return Promise.resolve();
        },

        //Funkcija checkError se poziva kada se desi greška u autentikaciji.
        checkError: () => Promise.resolve(),

        //Funkcija checkAuth se poziva kako bi se proverilo da li je korisnik ulogovan. 
//Ona proverava postoji li token u localStorage i u zavisnosti od toga, vraća Promise.resolve() ili Promise.reject().
        checkAuth: async () => {
          const token = localStorage.getItem("token");
    
          if (token) {
            return Promise.resolve();
          }
          return Promise.reject();
        },
    
        getPermissions: () => Promise.resolve(),

         //Funkcija getUserIdentity se poziva kako bi se dobili podaci o trenutno ulogovanom korisniku.
    // Ona proverava postoji li korisnik u localStorage i u zavisnosti od toga, vraća Promise.resolve() ili Promise.reject().
        getUserIdentity: async () => {
          const user = localStorage.getItem("user");
          if (user) {
            return Promise.resolve(JSON.parse(user));
          }
        },
      };
    //kreranje promenjive isAdmin samo ukoliko je u bazi data kolona true
      const isAdmin = localStorage.getItem("isAdmin") === "true";
//////////////////////////////////////KRAJ ADMINA////////////////////////////////////////////////////////////

    const navigate = useNavigate();
    const { data: user } = useGetIdentity();
    const { queryResult } = useShow();
    const { mutate } = useDelete();
    //useParams() je kuka iz React Routera koja se koristi za dobijanje parametara id.
    const { id } = useParams();

    const { data, isLoading, isError } = queryResult;

    const ObjectDetails = data?.data ?? {};

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    const isCurrentUser = user.email === ObjectDetails.creator.email;

   


    {/*za brisanje objekta*/}
    //handleDeleteObject() funkcija se poziva kada korisnik klikne na dugme za brisanje objekta.
    // U ovoj funkciji se prikazuje prozor za potvrdu brisanja, a ako korisnik potvrdi brisanje, poziva 
    //se funkcija mutate() koja briše objekat. U slučaju uspešnog brisanja, korisnik se preusmerava na stranicu sa listom objekta.
    const handleDeleteObject = () => {
        const response = confirm(
            "Are you sure you want to delete this object?",
        );
        if (response) {
            mutate(
                {
                    resource: "objects",
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/objects");
                    },
                },
            );
        }
    };






 //Za zvezdice
//kreira niz sa pet elemenata (5 zvezdica) pomoću map funkcije.
// Svaka zvezdica ima svoj indeks i povezanu funkcionalnost.
// Trenutna ocena za datu zvezdicu određuje se pomoću indeksa + 1, jer ocene kreću od 1.
//Nakon toga, definiše se funkcija handleRatingClick koja postavlja ocenu na trenutnu
// ocenu kada korisnik klikne na zvezdicu. Svaka zvezdica je obavijena label elementom,
// a postavke kao što su kursor i pozicija se primenjuju stilizacijom.
//Za svaku zvezdicu se dodaje nevidljiva radio input komponenta postavljena izvan ekrana.
// Kada se klikne na zvezdicu, input mijenja vrednost i aktivira onChange događaj koji postavlja ocenu.
//Sledeći korak je prikazivanje FontAwesome ikone zvezdice (FaStar) sa odgovarajućom veličinom i bojom.
// Boja zvezdice zavisi od trenutne ocene i boje ocene. 
//Ako je trenutna ocena manja ili jednaka od boje ocene (ako je postavljena),
// zvezdica će biti obojena u žutu (#F0E68C), inače će biti siva.

    const starsArray = [...Array(5)].map((star, index) => {
        const currentRate = index + 1;

        const handleRatingClick = () => {
            setRating(currentRate);
        };

      
        return (
            <label key={currentRate} style={{ cursor: 'pointer', position: 'relative' }}>
                <input
                    type="radio"
                    name="rate"
                    value={currentRate}
                    style={{ position: 'absolute', left: '-9999px' }}
                    onChange={handleRatingClick}
                />
                <FaStar
                    size={25}
                    color={currentRate <= (rateColor || rating) ? '#F0E68C' : 'grey'}
                />
            </label>
        );
    });

///////////////////////////KRAJ ZVEZDICA//////////////////////////////////////






    return (
        <Box
            borderRadius="15px"
            padding="20px"
            sx={{
                backgroundImage: "radial-gradient(circle at 50.3% 44.5%, rgb(116, 147, 179) 0%, rgb(62, 83, 104) 100.2%)"
            }}
            width="fit-content"
        >
            <Typography fontSize={25} fontWeight={700} color="#fff">
                Object Details
            </Typography>

            <Box
                mt="20px"
                display="flex"
                flexDirection={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <Box flex={1} maxWidth={764}>
                    <img
                        src={ObjectDetails.photo}
                        alt="object-details-img"
                        height={546}
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                        className="object-details-img"
                    />

                    <Box mt="15px">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            alignItems="center"
                        >
                            <Typography
                                fontSize={18}
                                fontWeight={500}
                                color="#fff"
                                textTransform="capitalize"
                            >
                                Object Type: {ObjectDetails.objectType.slice(0, -1)}
                            </Typography>
                            <Box>
                                <Typography 
                                fontSize={18}
                                fontWeight={500}
                                color="#fff"
                                textTransform="capitalize">
                                    Number of stars:
                                </Typography>
                                {/*ZVEZDICE*/}
                                <>
                                {starsArray}
                                </>
                            </Box>
                        </Stack>

                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                        >
                            <Box>
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#fff"
                                >
                                    {ObjectDetails.title}
                                </Typography>
                                <Stack
                                    mt={0.5}
                                    direction="row"
                                    alignItems="center"
                                    gap={0.5}
                                >
                                    <Place sx={{ color: "#fff" }} />
                                    <Typography fontSize={14} color="#fff">
                                        {ObjectDetails.location}
                                    </Typography>
                                </Stack>
                            </Box>

                            <Box>
                                <Typography
                                    fontSize={16}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#fff"
                                >
                                    Price
                                </Typography>
                                <Stack
                                    direction="row"
                                    alignItems="flex-end"
                                    gap={1}
                                >
                                    <Typography
                                        fontSize={25}
                                        fontWeight={700}
                                        color="#fff"
                                    >
                                        ${ObjectDetails.price}
                                    </Typography>
                                    <Typography
                                        fontSize={14}
                                        color="#fff"
                                        mb={0.5}
                                    >
                                        
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack mt="25px" direction="column" gap="10px">
                            <Typography fontSize={18} color="#fff">
                                Description
                            </Typography>
                            <Typography fontSize={14} color="#fff" sx={{ textAlign: "justify"}}>
                                {ObjectDetails.description}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                <Box
                    width="100%"
                    flex={1}
                    maxWidth={326}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            backgroundColor: "#334257"
                        }}
                        border="1px solid #E4E4E4"
                        borderRadius={2}
                    >
                        <Stack
                            mt={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <img
                                src={
                                    checkImage(ObjectDetails.creator.avatar)
                                        ? ObjectDetails.creator.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                alt="avatar"
                                width={90}
                                height={90}
                                style={{
                                    borderRadius: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <Box mt="15px">
                                <Typography
                                    fontSize={18}
                                    fontWeight={600}
                                    color="#fff"
                                >
                                    {ObjectDetails.creator.name}
                                </Typography>
                                <Typography
                                    mt="5px"
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#fff"
                                >
                                    Manager
                                </Typography>
                            </Box>

                            <Stack
                                mt="15px"
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                                <Place sx={{ color: "#fff" }} />
                                <Typography
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#fff"
                                >
                                    Belgrade, Serbia
                                </Typography>
                            </Stack>

                            <Typography
                                mt={1}
                                fontSize={16}
                                fontWeight={600}
                                color="#fff"
                            >
                                {ObjectDetails.creator.allObjects.length}{" "}
                                Objects
                            </Typography>
                        </Stack>

                        <Stack
                            width="100%"
                            mt="25px"
                            direction="row"
                            flexWrap="wrap"
                            gap={2}
                        >

                                {/*menjanje dugmeta u zavisnosti da li je admin ili ne*/}
                          {isAdmin ? (<CustomButton
                                title={"Edit"}
                                backgroundColor="#476072"
                                color="#FCFCFC"
                                fullWidth
                                icon={
                                     <Edit />
                                }
                                handleClick={() => {
                                    
                                        navigate(
                                            `/objects/edit/${ObjectDetails._id}`,
                                        );
                                }}
                            />) : (
                                <CustomButton
                                title={!isCurrentUser ? "Message" : "Edit"}
                                backgroundColor="#476072"
                                color="#FCFCFC"
                                fullWidth
                                icon={
                                    !isCurrentUser ? <ChatBubble /> : <Edit />
                                }
                                handleClick={() => {
                                    if (isCurrentUser) {
                                        navigate(
                                            `/objects/edit/${ObjectDetails._id}`,
                                        );
                                    } else{
                                        window.open('https://www.whatsapp.com/', '_blank');
                                    }
                                }}
                            />
                          )}
                                {/*menjanje dugmeta u zavisnosti da li je admin ili ne*/}
                            {isAdmin ? (
                            <CustomButton
                                title={"Delete"}
                                backgroundColor={
                                     "#BDC3C7"
                                }
                                color="#FCFCFC"
                                fullWidth
                                icon={<Delete />}
                                handleClick={() => {
                                    handleDeleteObject();
                                }}
                            />
                            ) : (
                                <CustomButton
                                title={!isCurrentUser ? "Call" : "Delete"}
                                backgroundColor={
                                    !isCurrentUser ? "#BDC3C7" : "#BDC3C7"
                                }
                                color="#FCFCFC"
                                fullWidth
                                icon={!isCurrentUser ? <Phone /> : <Delete />}
                                handleClick={() => {
                                    if (isCurrentUser) handleDeleteObject();
                                    else{
                                        window.open('https://www.whatsapp.com/', '_blank');
                                    }
                                }}
                            />
                          )}
  

                        </Stack>
                    </Stack>
                    {/*iframe element za ugradnju Google mape na veb stranicu i za dinamicku implementaciju lokacije vezane za odredjeni objekat*/}
                    <Stack>
                    <div style={{ width: '100%' }}>
                    <iframe
                        width="400"
                        height="400"
                        frameBorder="0"
                        scrolling="no"
                        // Embedovanje Google mape sa određenom lokacijom (ObjectDetails.location) i dodatnim parametrima kao što su zoom nivo, markiranje tačke na mapi, i sl.
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(ObjectDetails.location)}&t=&z=14&ie=UTF8&iwloc=B&output=embed&markers=color:red%7Clabel:P%7C${encodeURIComponent(ObjectDetails.location)}`}
                        style={{ width: '100%', height: '400px', border: "3px solid #334257" , borderRadius: 10, objectFit: "cover"}}
                        allowFullScreen
                    >
                    </iframe>
                </div>

                    </Stack>

                    <Box>
                    {isCelebrating && <Confetti />}    
                    {isAdmin ? null : (
                        <CustomButton
                            title="Book Now"
                            backgroundColor="#334257"
                            color="#FCFCFC"
                            fullWidth
                            handleClick ={ () => {
                                //Ukljucuje se animacija konfeta
                                setCelebrating(true);
                                alert('Object has been booked!');
                              }}
                              
                        />
                        )}
                    </Box>
                </Box>
        </Box>  
        </Box>
        
)};



export default ObjectDetails;