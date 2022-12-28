import React from "react";
import { Panel, Label } from "react-bootstrap";
import { useQuery } from "react-query";
import { loadDash } from "../apis/Dashboard";
import ErrorBoundary from "./ErrorBoundary";
import { PanelLoader } from "./PanelLoader";
import { ErrorLoader } from "./ErrorLoader";
export const Dashboard = () => {
  const { isLoading, error, data, isFetching } = useQuery(
    ["celery"],
    () => loadDash(),
    {
      refetchOnWindowFocus: false,
      refetchInterval: 10000,
    }
  );

  if (isLoading) return <PanelLoader />;

  if (error) return <ErrorLoader />;

  return (
    <ErrorBoundary>
      <h1 className="text-center">
        Active Queues
        <br />
      </h1>
      <p className="text-center">
        {" "}
        <Label  bsStyle={isFetching ? "info": "default"}>
          Auto Refresh: {isFetching ? "Refreshing" : "Waiting (10s)"}
        </Label>
      </p>
      <div className="flex-container">
        {Object.keys(data).map((key) => {
          let q = key.split("\u0006\u0016");
          console.log(key, data[key], q);
          return (
            <Panel style={{ width: "500px", margin: "5px" }}>
              <Panel.Heading>
                <h4 className="text-center">
                  {q[0]} ( Priority {typeof q[1] === "undefined" ? "0" : q[1]} ){" "}
                </h4>
              </Panel.Heading>
              <Panel.Body>
                {data[key].map((_key) => {
                  console.log(_key, data[key][_key]);
                  return (
                    <p>
                      {_key['name']}: {_key['total']}
                    </p>
                  );
                })}
              </Panel.Body>
            </Panel>
          );
        })}
      </div>
    </ErrorBoundary>
  );
};
