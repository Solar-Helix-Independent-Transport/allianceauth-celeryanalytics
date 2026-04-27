import { useQuery } from "@tanstack/react-query";
import Container from "react-bootstrap/Container";
import WorkerCard from "./Worker";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";

export function WorkerDivs() {
  const [autoUpdate, setAutoUpdate] = useState(true);

  const { isPending, isFetching, error, data, refetch } = useQuery({
    queryKey: ["workers"],
    queryFn: () =>
      fetch("/celery/api/celery/status/").then((res) => res.json()),
    refetchOnWindowFocus: false,
    refetchInterval: autoUpdate ? 30000 : false,
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <h4 className="text-center">Available Workers</h4>
      <p className="text-center mb-0">
        {isFetching ? (
          <Spinner className="mx-3" size="sm" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : autoUpdate ? (
          <span
            onClick={() => {
              setAutoUpdate(!autoUpdate);
            }}
            className="btn btn-warning btn-sm"
          >
            <i className="fa-solid fa-x"></i> Cancel Auto Refresh
          </span>
        ) : (
          <span>
            <span
              onClick={() => {
                setAutoUpdate(!autoUpdate);
              }}
              className="btn btn-success btn-sm mx-1"
            >
              <i className="fa-solid fa-arrows-spin"></i> Auto Refresh
            </span>
            <span
              onClick={() => {
                refetch();
              }}
              className="btn btn-primary btn-sm mx-1"
            >
              <i
                onClick={() => {
                  refetch();
                }}
                className="fa fa-refresh"
                aria-hidden="true"
              ></i>{" "}
              Refresh
            </span>
          </span>
        )}
      </p>
      <Container
        fluid
        className="d-flex flex-row flex-wrap justify-content-center"
      >
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
