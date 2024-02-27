import { useList } from "@pankod/refine-core";
import { Box, Typography } from "@pankod/refine-mui";

import { ManagerCard } from "components";



const Managers = () => {

    const { data, isLoading, isError } = useList({ resource: "users" });

    //koristi se opcionalni operator ?. da bi se izbeglo pristupanje undefined vrednostima 
    //u objektu data. Ako data ne postoji, uzmemo prazan niz umesto undefined vrednosti.
    const allManagers = data?.data ?? [];

    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;

    return (
        <Box sx={{backgroundImage: "radial-gradient(circle at 50.3% 44.5%, rgb(116, 147, 179) 0%, rgb(62, 83, 104) 100.2%)", 
        padding:'10px', borderRadius:'25px'}}>
            <Typography fontSize={25} fontWeight={700} color="white">
                Managers List
            </Typography>

            <Box
                mt="20px"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    backgroundColor: "#fcfcfc",
                    borderRadius:'25px'
                }}
            >
                {allManagers.map((manager) => (
                    (manager.email !== "reservationsapp33@gmail.com") && (
                        <ManagerCard
                        key={manager._id}
                        id={manager._id}
                        name={manager.name}
                        email={manager.email}
                        avatar={manager.avatar}
                        noOfObjects={manager.allObjects.length}
                        />
                    )
                    ))}

            </Box>
        </Box>
    );
};

export default Managers;