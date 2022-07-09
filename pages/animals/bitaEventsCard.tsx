import type { NextPage } from "next";
import Container from "../../../components/Container";
import useSWR from "swr";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import Interweave from "interweave";
import axios from "axios";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

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

const convertDate1 = (date: any) => {
  return dayjs(date).format("YYYY/MM/DD hh:mm");
};

const BitaEventsCard: NextPage = () => {
  const { status, data, error, isLoading, refetch } = useQuery(
    "bitacoras",
    async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}bitacora/events`
      );
      console.log("DATA1", res);
      return res.data;
    }
  );
  console.log("Data", data);

  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto px-20">
          <h1 className="text-gray-600 text-5xl font-bold">
            List Bitacoras Events.
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {data ? (
            data.map((event: any, key: any) => (
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
                      <Typography variant="h6" component="div">
                        BitacoraID: {event.bitacora_id},{" "}
                        <a
                          href={`/bitacora/bita_event/${encodeURIComponent(
                            event.id
                          )}`}
                          target={"_blank"}
                          rel="noreferrer"
                        >
                          BitaEventID: {event.id}
                          {",  "}
                        </a>
                        {convertDate1(event.event_date)}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h2">
                        Author: {event.bitacora.author.name}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h2">
                        Tipo Event: {event.tipoEvent.description}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h2">
                        Event: {event.event.description}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        component="div"
                      >
                        <Interweave content={event.description} />
                      </Typography>
                    </CardContent>
                    <a
                      href={"/static/images/" + `${event.id}` + ".jpg"}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 30 }}
                        image={"/static/images/" + `${event.id}` + ".jpg"}
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

export default BitaEventsCard;
