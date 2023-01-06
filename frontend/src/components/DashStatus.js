import React from "react";
import { Panel, Label } from "react-bootstrap";
import { useQuery } from "react-query";
import { loadWorkers } from "../apis/Dashboard";
import ErrorBoundary from "./ErrorBoundary";
export const WorkerStatus = () => {
  const { isLoading, error, data, isFetching } = useQuery(
    ["celery", "status"],
    () => loadWorkers(),
    {
      refetchOnWindowFocus: false,
      refetchInterval: 30000,
    }
  );

  if (isLoading) return <></>;

  if (error) return <></>;

  return (
    <ErrorBoundary>
      <p className="text-center">
        {" "}
        <Label
          style={{ margin: "5px" }}
          bsStyle={isFetching ? "info" : "default"}
        >
          Auto Refresh: {isFetching ? "Refreshing" : "Waiting (30s)"}
        </Label>
      </p>
      <div className="flex-container">
        {data.map((key) => {
          return (
            <Panel style={{ width: "200px", margin: "5px" }}>
              <Panel.Heading>
                <h4 className="text-center">{key.name}</h4>
              </Panel.Heading>
              <Panel.Body>
                <p>Uptime <span className="pull-right">{Math.floor(key.uptime/60/60)} Hours</span></p>
                <p>Tasks <span className="pull-right">{key.total.toLocaleString()}</span></p>
              </Panel.Body>
            </Panel>
          );
        })}
      </div>
    </ErrorBoundary>
  );
};
