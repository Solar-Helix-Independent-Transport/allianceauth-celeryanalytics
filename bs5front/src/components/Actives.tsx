import { useQuery } from "@tanstack/react-query";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import ActiveCard from "./Active";
import { useState } from "react";

export const ActiveDivs = () => {
  const [autoUpdate, setAutoUpdate] = useState(false);

  const { isPending, isFetching, error, data, refetch } = useQuery({
    queryKey: ["actives"],
    queryFn: () =>
      fetch("/celery/api/celery/active/").then((res) => res.json()),
    refetchOnWindowFocus: false,
    refetchInterval: autoUpdate ? 5000 : false,
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <h4 className="text-center">Running Tasks</h4>
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
            return <ActiveCard title={val.name} queues={val.tasks} />;
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
