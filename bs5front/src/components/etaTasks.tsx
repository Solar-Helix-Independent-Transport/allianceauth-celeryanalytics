import { useQuery } from "@tanstack/react-query";
import Container from "react-bootstrap/Container";
import QueueCard from "./Queue";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

export const ETADivs = () => {
  const { isPending, isFetching, error, data, refetch } = useQuery({
    queryKey: ["queues"],
    queryFn: () => fetch("/celery/api/celery/eta/").then((res) => res.json()),
    refetchOnWindowFocus: false,
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <h4 className="text-center">
        Future Scheduled Tasks
        {isFetching ? (
          <Spinner className="mx-3" size="sm" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <i
            onClick={() => {
              refetch();
            }}
            className="btn btn-primary fa fa-refresh mx-3"
            aria-hidden="true"
          ></i>
        )}
      </h4>
      <Container className="d-flex flex-row flex-wrap justify-content-center">
        {isPending ? (
          <Spinner className="my-3" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : data?.length > 0 ? (
          data.map((val: any) => {
            return (
              <QueueCard
                title={val.name}
                queues={val.queues}
              />
            );
          })
        ) : (
          <Card border={"info"} className="my-3">
            <Card.Body>
              <Card.Text>All Queues Empty</Card.Text>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};
