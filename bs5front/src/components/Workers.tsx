import { useQuery } from "@tanstack/react-query";
import Container from "react-bootstrap/Container";
import WorkerCard from "./Worker";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

export function WorkerDivs() {
  const { isPending, isFetching, refetch, error, data } = useQuery({
    queryKey: ["workers"],
    queryFn: () =>
      fetch("/celery/api/celery/status/").then((res) => res.json()),
    refetchOnWindowFocus: false,
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <h4 className="text-center">
        Available Workers{" "}
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
              <WorkerCard
                title={val.name}
                texts={val.fields}
                cardVariant="success"
              />
            );
          })
        ) : (
          <Card border={"warning"} className="my-3">
            <Card.Body>
              <Card.Text>No Workers Available</Card.Text>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}
