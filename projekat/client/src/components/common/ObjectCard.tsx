import { Place } from "@mui/icons-material";
import { Link } from "@pankod/refine-react-router-v6";
import { Typography, Box, Card, CardMedia, CardContent, Stack } from "@pankod/refine-mui";

import { ObjectCardProps } from "interfaces/object";


//prima parametra iz interfejsa i prikazuje na kartici objekta
const ObjectCard = ({id, title, location, price, photo}: ObjectCardProps) => {
  return (
    <Card
      component={Link} 
      to={`/objects/show/${id}`}
      sx={{
        maxWidth: '330px', 
        padding: '10px',
        '&:hover':{
          boxShadow: '0 22px 45px 2px rgba(176, 176, 176, 0.1)'
        },
        cursor:'pointer',
        textDecoration: 'none',
        background: '#476072',
        border: '2px solid #ffffff'
      }}
      elevation={0}
    >

      <CardMedia
      component="img"
      width = "100%"
      height={210}
      image = {photo}
      alt ="card image"
      sx ={{borderRadius: '10px'}}
      />

      <CardContent sx={{ display:'flex', flexDirection:'row', justifyContent:'space-between', gap: '10px', paddingX:'5px'}} >
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={500} color="#fff" >{title}</Typography>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Place
              sx={{fontSize: 18, color: '#fff' ,marginTop: 0.5}}
            />
            <Typography fontSize={14} color='#fff'>{location}</Typography>
          </Stack>
        </Stack>
        <Box px={1.5} py={0.5} borderRadius={1} bgcolor ="#334257" height = "fit-content" >
          <Typography fontSize={12} fontWeight={600} color="#fff" >${price}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ObjectCard