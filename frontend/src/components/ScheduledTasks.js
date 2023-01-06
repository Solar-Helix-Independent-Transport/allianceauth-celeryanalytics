import React from "react";
import { Panel, Label } from "react-bootstrap";
import { useQuery } from "react-query";
import { loadETAs } from "../apis/Dashboard";
import ErrorBoundary from "./ErrorBoundary";
import { PanelLoader } from "./PanelLoader";
import { ErrorLoader } from "./ErrorLoader";
export const ScheduledTasks = () => {
  const { isLoading, error, data, isFetching } = useQuery(
    ["celery","eta"],
    () => loadETAs(),
    {
      refetchOnWindowFocus: false,
      refetchInterval: 10000,
    }
  );

  if (isLoading) return <PanelLoader />;

  if (error) return <ErrorLoader />;

  return (
    <ErrorBoundary>
      <p className="text-center">
        {" "}
        <Label bsStyle={isFetching ? "info" : "default"}>
          Auto Refresh: {isFetching ? "Refreshing" : "Waiting (10s)"}
        </Label>
      </p>
      <div className="flex-container">
        {Object.keys(data).map((key) => {
          return (
            <>
              <Panel style={{ width: "400px", margin: "5px" }}>
                <Panel.Heading>
                  <h4 className="text-center">{key}</h4>
                </Panel.Heading>
                <Panel.Body>
                  {Object.keys(data[key]).map((prio) => {
                    return (
                      <>
                        <h4 className="text-center">Priority {prio}</h4>
                        {Object.keys(data[key][prio]).map((task) => {
                          return (
                            <p>
                              {task} <div className="pull-right">{data[key][prio][task]}</div>
                            </p>
                          );
                        })}
                        <hr />
                      </>
                    );
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
