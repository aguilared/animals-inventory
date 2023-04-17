import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import getAnimalId from "../../../services/getAnimalId";
import dayjs from "dayjs";
import Interweave from "interweave";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Container from "../../../components/Container";
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import Image from "next/image";

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

const convertDate1 = (date: any) => {
  var d = dayjs(date).format("D-M-YY h:mm");
  return d;
};

const BitaEventCard = (props: any): JSX.Element => {
  const { query } = useRouter();
  const [bitacora_id, setBitacora_id] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [owner, setOwner] = useState("");
  const [mother, setMother] = useState("");
  const [alive, setAlive] = useState("");
  const [description, setDescription] = useState("");
  const [claseanimal, setClaseanimal] = useState("");
  const [event, setEvent] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("Query", query);
  console.log("QueryId", query.id);
  useEffect(
    function () {
      setLoading(true);
      getAnimalId(query.id).then((resp) => {
        console.log("resp???", resp);
        setBitacora_id(resp.id);
        setName(resp.name);
        setBirthdate(resp.birthdate);
        setOwner(resp.owner.name);
        setMother(resp.mother);
        setAlive(resp.alive);
        setClaseanimal(resp.clase.description);
        setEvent(resp.claseid);
        setDescription(resp.info);
        setLoading(false);
      });
    },
    [query]
  );

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="container max-w-4xl m-auto px-4 mt-20">
      <Card
        sx={{
          display: "flex",
          width: ["70%", "70%", "30.33%"],
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <div>
            <h3 className="text-2xl tahoma font-extrabold tracking-widest text-gray-500">
              Reporte de un evento especifico de una Bitacora.
            </h3>
          </div>
          <Typography variant="h6" component="div">
            ID: {bitacora_id}
            {",  Name: "}
            {name}
          </Typography>
          <Typography variant="h6" component="div">
            Birthdate: {birthdate}
          </Typography>
          <Typography variant="h6" component="div">
            Dueno: {owner}
          </Typography>
          <Typography variant="h6" component="div">
            Mother: {mother}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Tipo Animal: {claseanimal}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Alive: {alive}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" component="div">
            <Interweave content={description} />
          </Typography>{" "}
        </CardContent>
        <div className="container max-w-4xl m-auto px-4 mt-20">
          <Image
            src={"/static/images/" + `${query.id}` + ".jpg"}
            alt="Image"
            width={1920 / 2}
            height={1280 / 2}
          />
        </div>
        <div className="container max-w-4xl m-auto px-4 mt-20">
          <Image
            src={"/static/images/" + `${query.id}` + "_1.jpg"}
            alt="Image"
            width={1920 / 2}
            height={1280 / 2}
          />
        </div>
        <div className="container max-w-4xl m-auto px-4 mt-20">
          <Image
            src={"/static/images/" + `${query.id}` + "_2.jpg"}
            alt="Image"
            width={1920 / 2}
            height={1280 / 2}
          />
        </div>
      </Card>
    </div>
  );
};

BitaEventCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BitaEventCard);
