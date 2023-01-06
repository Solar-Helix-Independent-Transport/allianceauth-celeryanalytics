import React from "react";
import { Label } from "react-bootstrap";
import { useQuery } from "react-query";
import { loadWorkers } from "../apis/Dashboard";
import ErrorBoundary from "./ErrorBoundary";
export const WorkerStatus = () => {
  const { isLoading, error, data, isFetching } = useQuery(
    ["celery","status"],
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
        <Label  style={{margin:"5px"}} bsStyle={isFetching ? "info" : "default"}>
          Auto Refresh: {isFetching ? "Refreshing" : "Waiting (30s)"}
        </Label>
      </p>
      <h3 className="text-center">
        {data.map((key) => {
          return (
            <Label style={{margin:"5px"}}>
              {key.name} (Uptime: {key.uptime}) (Tasks: {key.total})
            </Label>
          );
        })}
      </h3>
    </ErrorBoundary>
  );
};
