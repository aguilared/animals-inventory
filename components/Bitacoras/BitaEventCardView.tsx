import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import getBitaEventId from "../../services/getBitaEventId";
import dayjs from "dayjs";
import Interweave from "interweave";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";


const styles = {
  card: {
    maxWidth: 645,
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 40,
  },

  avatar: {
    backgroundColor: red[500],
  },
};

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const convertDate = (date: any) => {
  var d = dayjs(date).format("DD-MM-YYYY");
  return d;
};
const convertDate1 = (date: any) => {
  var d = dayjs(date).format("D-M-YY h:mm");
  return d;
};

const BitaEventCard = (props: any): JSX.Element => {
  const { query } = useRouter();
  const { bitacoraSelected } = props;
  const [bitacora_id, setBitacora_id] = useState("");
  const [bitacoraDate, setBitacoraDate] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [tipoevent, setTipoEvent] = useState("");
  const [event, setEvent] = useState("");

  console.log("bitacoraSelected", bitacoraSelected);
  useEffect(
    function () {
      getBitaEventId(bitacoraSelected.id).then((resp) => {
        console.log("resp", resp);
        setBitacora_id(resp.bitacora_id);
        setBitacoraDate(resp.event_date);
        setAuthor(resp.bitacora.author.name);
        setTipoEvent(resp.tipoEvent.description);
        setEvent(resp.event.description);
        setDescription(resp.description);
      });
    },
    [bitacoraSelected]
  );

  return (
    <Card
      sx={{
        display: "flex",
        width: ["70%", "70%", "30.33%"],
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="h6" component="div">
            ID Bitacora: {bitacora_id}
          </Typography>
          <Typography variant="h6" component="div">
            ID BitaEvent: {bitacoraSelected.id}
          </Typography>
          <Typography variant="h6" component="div">
            Author: {author}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Fecha: {convertDate1(bitacoraDate)}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Tipo Event: {tipoevent}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Event: {event}
          </Typography>

          <Typography variant="subtitle1" color="textSecondary" component="div">
            <Interweave content={description} />
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }} />
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 30 }}
        image={"/static/images/" + `${bitacoraSelected.id}` + ".jpg"}
        alt="Live from space album cover"
      />
    </Card>
  );
};

BitaEventCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BitaEventCard);
