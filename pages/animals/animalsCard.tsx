import type { NextPage } from "next";
import Container from "../../components/Container";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import Interweave from "interweave";
import axios from "axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: true,
      staleTime: 10000,
    },
  },
});

const convertDate = (date: any) => {
  return dayjs(date).format("DD/MM/YYYY");
};

const AnimalsCard: NextPage = () => {
  const { status, data, error, isLoading, refetch } = useQuery(
    "animals",
    async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}animals/`);
      console.log("DATA1", res);
      return res.data;
    }
  );

  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto px-20">
          <h1 className="text-gray-600 text-5xl font-bold">
            List Animals Gonzalera Ranch
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data ? (
            data.map((animal: any, key: any) => (
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
            ))
          ) : (
            <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
            </div>
          )}
        </div>
      </QueryClientProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </Container>
  );
};

export default AnimalsCard;
