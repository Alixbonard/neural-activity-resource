import React from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import { getKGData } from "../datastore";
import Navigation from "../components/Navigation";
import DatasetList from "../components/DatasetList";
import ProgressIndicator from "../components/ProgressIndicator";
import {extracellularDatasetListQuery} from "./queryLibrary";

export const query = extracellularDatasetListQuery

export function getLoader(auth) {
  const loader = async () => {
    let stage = "RELEASED";
    if (auth.isCurator) {
      stage = "IN_PROGRESS";
    }
    const extracellularDatasetPromise = getKGData("extracellular recordings summary", query, auth, {}, stage);
    console.log(extracellularDatasetPromise);
    return defer({ datasets: extracellularDatasetPromise });
  };
  return loader;
}

function ExtracellularIndex() {
  const data = useLoaderData();

  return (
    <div id="datasets">
      <Navigation location={["Extracellular Recordings"]} />

      <React.Suspense fallback={<ProgressIndicator />}>
        <Await resolve={data.datasets} errorElement={<p>Error loading datasets.</p>}>
          {(datasets) => <DatasetList datasets={datasets} />}
        </Await>
      </React.Suspense>
    </div>
  );
}

export default ExtracellularIndex;