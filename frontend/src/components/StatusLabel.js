import React from "react";
import { Label } from "react-bootstrap";
const StatusLabel = ({ isFetching, error, time }) => {
  return (
    <p className="text-center">
      <Label bsStyle={isFetching ? "info" : error ? "danger" : "default"}>
        Auto Refresh:{" "}
        {isFetching
          ? "Refreshing"
          : error
          ? `Waiting (${time}s Error in API)`
          : `Waiting (${time}s)`}
      </Label>
    </p>
  );
};

export default StatusLabel;