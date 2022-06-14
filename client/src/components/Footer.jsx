import { Typography, Box } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
const Footer = () => {
    const iconStyles={margin:"10px"}
  return (
    <Box sx={{ display: "flex", minHeight: "120px" ,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <Box>
        <FacebookIcon color={'info'} fontSize={'medium'}sx={iconStyles}/>
        <InstagramIcon color={'error'} fontSize={'medium'} sx={iconStyles}/>
        <YouTubeIcon color={'error'} fontSize={'medium'} sx={iconStyles}/>
        <TwitterIcon color={'info'} fontSize={'medium'} sx={iconStyles}/>
      </Box>
      <Typography variant="overline"  fontFamily={"inherit"}>Copyright © 2022 ShopyApp</Typography>
    </Box>
  );
};

export default Footer;
// info error errorinfo