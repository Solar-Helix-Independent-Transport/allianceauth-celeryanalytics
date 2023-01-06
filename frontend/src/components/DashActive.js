import React from "react";
import { Panel } from "react-bootstrap";
import { useQuery } from "react-query";
import { loadActive } from "../apis/Dashboard";
import ErrorBoundary from "./ErrorBoundary";
import StatusLabel from "./StatusLabel";

export const ActiveTasks = () => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["celery", "active"],
    queryFn: () => loadActive(),
    refetchOnWindowFocus: false,
    refetchInterval: 5000,
  });

  if (isLoading) return <StatusLabel time={"5"} isFetching={isLoading} {...{error }} />;

  return (
    <ErrorBoundary>
      <StatusLabel time={"5"} {...{ isFetching, error }} />
      <div className="flex-container">
        {data.map((key) => {
          return (
            <>
              <Panel style={{ margin: "5px" }}>
                <Panel.Heading>
                  <h4 className="text-center">{key.name}</h4>
                </Panel.Heading>
                <Panel.Body>
                  {key.tasks.map((task) => {
                    return <p>{task}</p>;
                  })}
                </Panel.Body>
              </Panel>
            </>
          );
        })}
      </div>
    </ErrorBoundary>
  );
};
