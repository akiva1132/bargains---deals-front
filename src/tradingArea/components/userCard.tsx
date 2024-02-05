import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { User } from '../types';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const UserCard = ({ user }: { user: User }) => {
    const navigate = useNavigate();
  return (
    <Card variant="outlined" sx={{ width: "80%", height: "250px" }}>
      <CardOverflow sx={{ height: "70%" }}>
        <AspectRatio sx={{ width: "110%", height:"150%" , display:"flex"}} ratio="2">
          <img
            src={user.profileImage}
            alt="imageProfile"
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">{user.firstName + " " + user.lastName}</Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
        <Divider inset="context" />
        <CardContent sx={{display:"flex",alignItems: "center"}} orientation="horizontal">
          <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
            {"30 מודעות"}
          </Typography>
          <Divider orientation="vertical" />
          <Button onClick={() => navigate(`/tradingArea/lot/${user.id}`)} sx={{fontSize:"13px"}}>{"היכנס למגרש"}</Button>
          {/* <Divider orientation="vertical" />
          <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
            1 hour ago
          </Typography> */}
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
