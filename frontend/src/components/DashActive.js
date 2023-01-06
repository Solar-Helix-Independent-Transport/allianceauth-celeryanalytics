import React from "react";
import { Panel, Label } from "react-bootstrap";
import { useQuery } from "react-query";
import { loadActive } from "../apis/Dashboard";
import ErrorBoundary from "./ErrorBoundary";
export const ActiveTasks = () => {
  const { isLoading, error, data, isFetching } = useQuery(
    ["celery","active"],
    () => loadActive(),
    {
      refetchOnWindowFocus: false,
      refetchInterval: 5000,
    }
  );

  if (isLoading) return <></>;

  if (error) return <></>;

  return (
    <ErrorBoundary>
      <p className="text-center">
        {" "}
        <Label bsStyle={isFetching ? "info" : "default"}>
          Auto Refresh: {isFetching ? "Refreshing" : "Waiting (5s)"}
        </Label>
      </p>
      <div className="flex-container">
        {data.map((key) => {
          return (
            <>
              <Panel style={{ width: "100%", margin: "5px" }}>
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
