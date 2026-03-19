import { useQuery } from "@tanstack/react-query";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import ActiveCard from "./Active";

export const ActiveDivs = () => {
  const { isPending, isFetching, error, data, refetch } = useQuery({
    queryKey: ["actives"],
    queryFn: () => fetch("/celery/api/celery/active/").then((res) => res.json()),
    refetchOnWindowFocus: false,
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <h4 className="text-center">
        Running Tasks
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
              <ActiveCard
                title={val.name}
                queues={val.tasks}
              />
            );
          })
        ) : (
          <Card border={"info"} className="my-3">
            <Card.Body>
              <Card.Text>No Active Tasks</Card.Text>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};
