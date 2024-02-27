import { useList } from '@pankod/refine-core';

import{ Typography, Box, Stack} from '@pankod/refine-mui'


import{
    PieChart,
    ObjectReferrals,
    TotalRevenue,
    ObjectCard,
} from 'components';
 

const AdminHome = () => {
    {/*za vracanje objekata koristimo ovu kuku */}
    const {data, isLoading, isError} = useList({
        resource:'objects',
        config: {
            pagination:{
            pageSize: 6
            }
        }


    })
//koristi se opcionalni operator ?. da bi se izbeglo pristupanje undefined vrednostima 
//u objektu data. Ako data ne postoji, uzmemo prazan niz umesto undefined vrednosti.
    const latestObjects = data?.data ?? [];

    if(isLoading) return <Typography>Loading...</Typography>
    if(isError) return <Typography>Something went wrong!</Typography>


    return(

        <Box sx = {{backgroundImage: "radial-gradient(circle at 50.3% 44.5%, rgb(116, 147, 179) 0%, rgb(62, 83, 104) 100.2%)",
        padding:'20px', borderRadius:'25px'}}>
            <Typography fontSize={25} fontWeight={700} color="white">
                Admin Dashboard
            </Typography>


            <Stack mt="25px" width="100%" direction={{xs: 'column', lg: 'row'}} gap={4}>
                <TotalRevenue/>
                <ObjectReferrals/>
            </Stack>


            <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <PieChart
                    title="Objects for Sale"
                    value={684}
                    series={[75,25]}
                    colors={['#476072', '#334257']}               
                />
                <PieChart
                    title="Total Customers"
                    value={5684}
                    series={[75,25]}
                    colors={['#476072', '#334257']}                
                />
                <PieChart
                    title="Successful Reservations"
                    value={555}
                    series={[75,25]}
                    colors={['#476072', '#334257']}              
                />
            </Box>
           

            <Box
                flex = {1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
                sx={{backgroundColor:'#334257', padding:'20px', borderRadius:'25px'}}
                >
                <Typography fontSize="18px" fontWeight={600} color="white"> Latest Objects </Typography>
                <Box mt={2.5} sx={{display: 'flex', flexWrap:'wrap', gap:5, justifyContent: "center"}}>
                {latestObjects.map((object) => (

                    <ObjectCard
                    key={object._id}
                    id={object._id}
                    title={object.title}
                    location={object.location}
                    price={object.price}
                    photo={object.photo}
                    />
                ))}
                </Box>

            </Box>
        </Box>
        
    )
}

export default AdminHome