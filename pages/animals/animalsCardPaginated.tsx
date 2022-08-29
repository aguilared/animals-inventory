import { Fragment, useEffect, useState } from "react";
import type { NextPage } from "next";
import Container from "../../components/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import Interweave from "interweave";
import { useInView } from "react-intersection-observer";
import useAnimals, { Animal } from "../../hooks/useAnimals";

const fetcher = (url: any) => fetch(url).then((res) => res.json());
const convertDate = (date: any) => {
  return dayjs(date).format("DD/MM/YYYY hh:mm");
};
const convertDate1 = (date: any) => {
  return dayjs(date).format("YYYY/MM/DD hh:mm");
};

const AnimalCardPaginated: NextPage = () => {
  const { ref, inView } = useInView();

  const {
    data: dataAnimals,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    error,
    status,
  } = useAnimals();
  console.log("Datall", dataAnimals);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <Container>
      <div className="container mx-auto px-20">
        <h1 className="text-gray-600 text-5xl font-bold">
          List Animals Paginated.
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {dataAnimals &&
          dataAnimals.pages.map((group, i) => (
            <Fragment key={i}>
              {group?.results.map((animal) => (
                <>
                  <div className="flex flex-col rounded-xl shadow-lg ">
                    <Card
                      sx={{
                        display: "flex",
                        width: ["70%", "70%", "20.33%"],
                        justifyContent: "space-between",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography variant="h6" align="left" component="div">
                          Animal ID: {animal.id},{" "}
                          <a
                            href={`/bitacora/bita_event/${encodeURIComponent(
                              animal.id
                            )}`}
                            target={"_blank"}
                            rel="noreferrer"
                          ></a>
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h6"
                          align="left"
                          component="h2"
                        >
                          Nombre: {animal.name}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h6"
                          align="left"
                          component="h2"
                        >
                          Dueno: {animal.owner.name}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h6"
                          align="left"
                          component="h2"
                        >
                          Nacimiento: {convertDate(animal.birthdate)}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h6"
                          align="left"
                          component="h2"
                        >
                          Tipo animal: {animal.clase.description}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h6"
                          align="left"
                          component="h2"
                        >
                          Madre: {animal.mother}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h6"
                          align="left"
                          component="h2"
                        >
                          Hierro: {animal.hierro}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h6"
                          align="left"
                          component="h2"
                        >
                          Date update: {convertDate(animal.updated_at)}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          align="left"
                          component="div"
                        >
                          <Interweave content={animal.info} />
                        </Typography>
                      </CardContent>

                      <a
                        href={"/static/images/" + `${animal.id}` + ".jpg"}
                        target={"_blank"}
                        rel="noreferrer"
                      >
                        <CardMedia
                          component="img"
                          sx={{ width: 30 }}
                          image={"/static/images/" + `${animal.id}` + ".jpg"}
                          alt="Live from space album cover"
                          onClick={() => console.log("CardActionArea clicked")}
                        />
                      </a>
                    </Card>
                  </div>
                </>
              ))}
            </Fragment>
          ))}
      </div>
      <div>
        <button
          ref={ref}
          className={
            "flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 my-8"
          }
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load Newer"
            : "Nothing more to load"}
        </button>
      </div>
    </Container>
  );
};

export default AnimalCardPaginated;
