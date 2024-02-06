import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Car } from '../types';
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { CustomizedSnackbars } from './CustomizedSnackbars';



  export const MediaCard2 = ({ detsils }: { detsils: Car }) => {
    const [liked, setLiked] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");


    const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setLiked(!liked);
      setMessage("סומן כאהוב")
      setOpen(true)
    };
  
    const handleShare = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      const copyText = `הנה מודעה שחשבתי שמתעניין אותך https://bargains-deals-front.onrender.com/tradingArea/car/${detsils._id}`
  
      try {
        await navigator.clipboard.writeText(copyText);
        setMessage("הטקסט הועתק ללוח");
        setOpen(true);
      } catch (err) {
        console.error('Unable to copy text to clipboard', err);
        setMessage("הטקסט לא ניתן להעתיק ללוח");
        setOpen(true);
      }
    };
  

    const navigate = useNavigate();
    return (
      <div onClick={() => navigate(`/tradingArea/car/${detsils._id}`)}>
        <CustomizedSnackbars title={message} open={open} setOpen={setOpen}/>
        <Card sx={{ maxWidth: 345, margin: "10px", cursor: "pointer" }}>
          <CardMedia
            sx={{ height: "120px" }}
            image={detsils.imageUrls[0]}
            title="green iguana"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {detsils.manufacturer + " " + detsils.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {"model: " + detsils.model}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {"km: " + detsils.km}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {detsils.note}
            </Typography>
          </CardContent>
          <CardActions>
            <div className='buttons'>
            <IconButton color="primary" aria-label="add to shopping cart" onClick={handleShare}>
              <ShareIcon />
            </IconButton>
            <IconButton onClick={handleLike} aria-label="אהבתי">
              {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }