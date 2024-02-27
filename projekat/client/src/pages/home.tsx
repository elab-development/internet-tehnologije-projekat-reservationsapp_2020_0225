import { useList } from '@pankod/refine-core';

import{ Typography, Box, Stack} from '@pankod/refine-mui'
import { reservations_app } from 'assets';
import myImage from '../assets/object13.jpg'; 
import myImage2 from '../assets/object12.jpg';

import{
    PieChart,
    SatisfactionBox,
    NumberOfAvailableObjects,
    ObjectCard
} from 'components';
 

const Home = () => {
    {/*za vracanje koncerta koristimo ovu kuku */}
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
        <Box sx={{ display: 'flex' , backgroundImage: "radial-gradient(circle at 50.3% 44.5%, rgb(116, 147, 179) 0%, rgb(62, 83, 104) 100.2%)", borderRadius:'35px'}}>
        <Box
        sx={{  flex: 1,
            backgroundImage: "radial-gradient(circle at 50.3% 44.5%, rgb(116, 147, 179) 0%, rgb(62, 83, 104) 100.2%)",
            zIndex: 1, 
            padding: '20px',
            borderRadius:'35px'}}
        >
            <Typography fontSize={25} fontWeight={700} color="#FFFFFF">
                Welcome to <img src={reservations_app} alt="Reservations_App" width="230px" style={{marginTop: "15px", marginBottom: "-10px"}}/>
                 
            </Typography>

            <Box
                flex = {1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
                sx={{ background: '#334257'}}
                >
                <Typography fontSize="18px" fontWeight={600} color="#FFFFFF"> New Objects</Typography>
                <Box mt={2.5} sx={{display: 'flex', flexWrap:'wrap', gap:5, justifyContent: 'center'}}>
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
            
            
            <Box
                flex = {1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
                sx={{ background: '#334257'}}
                >
            <Typography fontSize={15} fontWeight={600} color="#FFFFFF" sx={{ textAlign: "justify"}}>
            Discover the ultimate convenience with our Reservations App,
            designed to streamline your booking experience across a diverse
            array of establishments. From securing a room in luxurious rooftops
            to reserving tables at vibrant restaurants, organizing meetings in
            dedicated spaces, and even booking time slots in sports halls or
            computer centers, our app provides a seamless solution for all your
            reservation needs. Whether you're planning a leisurely escape or 
            ensuring a productive work environment, our user-friendly platform
            simplifies the process, offering unparalleled accessibility for a 
            variety of services and venues. Download our Reservations App today
            and unlock a world of effortless bookings at your fingertips.
            </Typography>
            <br></br>
            <Box
            id="chart"
            flex={1}
            display="flex"
            bgcolor="#fcfcfc"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            pl={3.5}
            py={2}
            gap={8}
            borderRadius="15px"
            minHeight="110px"
            width="fit-content"
            sx={{ background: '#334257'}}

            >
              <img 
            src= {myImage}
            alt='object'
            style={{ height: '241px', width: '500px', borderRadius: '35px' }}
            />

            <img 
            src= {myImage2}
            alt='object'
            style={{ height: '241px', width: '500px' , borderRadius: '35px' }}
            />  
            </Box>
            

            </Box>
 <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <SatisfactionBox
                title="Number of satisfied customers"
                value={550}
                
                />

                <NumberOfAvailableObjects
                 title="Number of available objects"
                 value={1500}
                />
                
                <PieChart
                    title="Total number of objects"
                    value={5684}
                    series={[70,30]}
                    colors={['#476072', '#334257']}                
                />
            </Box>
           

           


            
        </Box>
        </Box>
        
    )
}

export default Home