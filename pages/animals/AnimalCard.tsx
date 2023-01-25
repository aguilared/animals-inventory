import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import getAnimalId from "../../services/getAnimalId";
import dayjs from "dayjs";
import Interweave from "interweave";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

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

const AnimalCard = (props: any): JSX.Element => {
  const { bitacoraSelected } = props;
  console.log("bitacoraSelected", bitacoraSelected);

  const [bitacora_id, setBitacora_id] = useState("");
  const [name, setName] = useState("");
  const [bitacoraDate, setBitacoraDate] = useState("");
  const [author, setAuthor] = useState("");
  const [mother, setMother] = useState("");
  const [alive, setAlive] = useState("");
  const [description, setDescription] = useState("");
  const [tipoevent, setTipoEvent] = useState("");
  const [event, setEvent] = useState("");

  useEffect(
    function () {
      getAnimalId(bitacoraSelected.id).then((resp) => {
        console.log("resp???", resp);
        setBitacora_id(resp.id);
        setName(resp.name);
        setBitacoraDate(resp.birthdate);
        setAuthor(resp.owner.name);
        setMother(resp.mother);
        setAlive(resp.alive);
        setTipoEvent(resp.clase.description);
        setEvent(resp.claseid);
        setDescription(resp.info);
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
            ID: {bitacora_id}
            {",  Name: "}
            {name}
          </Typography>
          <Typography variant="h6" component="div">
            Birthdate: {bitacoraDate}
          </Typography>
          <Typography variant="h6" component="div">
            Owner: {author}
          </Typography>
          <Typography variant="h6" component="div">
            Mother: {mother}
          </Typography>

          <Typography gutterBottom variant="h6" component="h2">
            Clase: {tipoevent}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Alive: {alive}
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
      <CardMedia
        component="img"
        sx={{ width: 30 }}
        image={"/static/images/" + `${bitacoraSelected.id}` + "_1.jpg"}
        alt="Live from space album cover"
      />
      <CardMedia
        component="img"
        sx={{ width: 30 }}
        image={"/static/images/" + `${bitacoraSelected.id}` + "_2.jpg"}
        alt="Live from space album cover"
      />
    </Card>
  );
};

AnimalCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnimalCard);
