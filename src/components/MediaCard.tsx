import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Car } from '../types';
import { IoMdShare } from "react-icons/io";
import { FcLike } from 'react-icons/fc';
import { useNavigate  } from "react-router-dom";




export const MediaCard = ({ detsils }: { detsils: Car }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/car/${detsils._id}`)}>
      <Card sx={{ maxWidth: 345, margin: "10px", cursor:"pointer" }}>
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
            <IoMdShare className='IoMdShare' />
            <FcLike className='FcLike' style={{ left: "5px" }} />
          </div>
        </CardActions>
      </Card>
    </div>
  );
}