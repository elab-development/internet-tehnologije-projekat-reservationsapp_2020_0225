import { Email, Phone } from "@mui/icons-material";
import { Box, Stack, Typography } from "@pankod/refine-mui";

import { ProfileProps, ObjectProps } from "interfaces/common";
import ObjectCard from "./ObjectCard";

//provera url slike
function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}
//iygled profila
const Profile = ({ type, name, avatar, email, objects }: ProfileProps) => (
    <Box sx={{backgroundImage: "radial-gradient(circle at 50.3% 44.5%, rgb(116, 147, 179) 0%, rgb(62, 83, 104) 100.2%)",
    padding:'10px', borderRadius:'25px'}}>
        <Typography fontSize={25} fontWeight={700} color="white">
            {type} Profile
        </Typography>

        <Box mt="20px" borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2.5,
                }}
            >
                <img
                    src="https://media.istockphoto.com/id/1314534661/fr/photo/client-satisfait-dobtenir-le-pr%C3%AAt-assurant-la-poign%C3%A9e-de-main-de-vie-avec-le-banquier.jpg?b=1&s=612x612&w=0&k=20&c=FolRAXCwGQh-TnvT2d_XQ2zXrgeQJ_la_QprJUGhegI="
                    width={280}
                    height={250}
                    alt="abstract"
                    className="my_profile-bg"
                />
                <Box
                    flex={1}
                    sx={{
                        marginTop: { md: "58px" },
                        marginLeft: { xs: "20px", md: "0px" },
                    }}
                >
                    <Box
                        flex={1}
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        gap="20px"
                    >
                        <img
                            src={
                                checkImage(avatar)
                                    ? avatar
                                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                            }
                            width={78}
                            height={78}
                            alt="user_profile"
                            className="my_profile_user-img"
                        />

                        <Box
                            flex={1}
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            gap="30px"
                        >
                            <Stack direction="column">
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    color="#11142D"
                                >
                                    {name}
                                </Typography>
                                <Typography fontSize={16} color="#808191">
                                    Object Manager
                                </Typography>
                            </Stack>

                            <Stack direction="column" gap="30px">
                                
                                <Stack
                                    direction="row"
                                    flexWrap="wrap"
                                    gap="20px"
                                    pb={4}
                                >
                                    <Stack flex={1} gap="15px">
                                        <Typography
                                            fontSize={14}
                                            fontWeight={500}
                                            color="#808191"
                                        >
                                            Contact
                                        </Typography>
                                        <Box
                                            display="flex"
                                            flexDirection="row"
                                            alignItems="center"
                                            gap="10px"
                                        >
                                            <Phone sx={{ color: "#11142D" }} />
                                            <Typography
                                                fontSize={14}
                                                color="#11142D"
                                                noWrap
                                            >
                                                +381 444 789
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Stack flex={1} gap="15px">
                                        <Typography
                                            fontSize={14}
                                            fontWeight={500}
                                            color="#808191"
                                        >
                                            Email address
                                        </Typography>
                                        <Box
                                            display="flex"
                                            flexDirection="row"
                                            alignItems="center"
                                            gap="10px"
                                        >
                                            <Email sx={{ color: "#11142D" }} />
                                            <Typography
                                                fontSize={14}
                                                color="#11142D"
                                            >
                                                {email}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>

        {objects.length > 0 && (
            <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#334257">
                <Typography fontSize={18} fontWeight={600} color="#fff">
                    {type} Objects
                </Typography>

                <Box
                    mt={2.5}
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 4,
                        justifyContent: "center"
                    }}
                >
                    {objects?.map((object: ObjectProps) => (
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
        )}
    </Box>
);

export default Profile;