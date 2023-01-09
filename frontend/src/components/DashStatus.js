import React from "react";
import { Panel } from "react-bootstrap";
import { useQuery } from "react-query";
import { loadWorkers } from "../apis/Dashboard";
import ErrorBoundary from "./ErrorBoundary";
import StatusLabel from "./StatusLabel";

export const WorkerStatus = () => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["celery", "status"],
    queryFn: () => loadWorkers(),
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
  });

  if (isLoading) return <StatusLabel time={"30"} isFetching={isLoading} {...{error }} />;

  return (
    <ErrorBoundary>
      <StatusLabel time={"30"} {...{ isFetching, error }} />
      <div className="flex-container">
        {data.map((key) => {
          return (
            <Panel style={{ minWidth: "200px", margin: "5px" }}>
              <Panel.Heading>
                <h4 className="text-center">{key.name}</h4>
              </Panel.Heading>
              <Panel.Body>
                <p>
                  Uptime{" "}
                  <span className="pull-right">
                    {Math.floor(key.uptime / 60 / 60)} Hours
                  </span>
                </p>
                <p>
                  Tasks{" "}
                  <span className="pull-right">
                    {key.total.toLocaleString()}
                  </span>
                </p>
              </Panel.Body>
            </Panel>
          );
        })}
      </div>
    </ErrorBoundary>
  );
};
