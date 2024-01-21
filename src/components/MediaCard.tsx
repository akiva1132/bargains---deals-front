import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Car } from '../types';

export const MediaCard = ({detsils}:{detsils:Car}) => {
  return (
    <Card sx={{ maxWidth: 345, margin:"10px"}}>
      <CardMedia
        sx={{ height: "120px" }}
        image={detsils.imageUrl}
        title="green iguana"
      />
      <CardContent>
        <Typography  variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {detsils.manufacturer + " " + detsils.name}
        </Typography>
        <Typography  variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {"model: " + detsils.model}
        </Typography>
        <Typography  variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {"km: " + detsils.km}
        </Typography>
        <Typography  variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {detsils.note}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}