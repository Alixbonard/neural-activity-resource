/*
The **** component displays metadata about
**** activities.

Copyright 2024 Andrew P. Davison, CNRS

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


// TODO
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Connection from "./Connection";
import KeyValueTable from "./KeyValueTable";
import ControlledTerm from "./ControlledTerm";
import styles from "../styles";
import { formatQuant, formatSolution } from "../utility";


function formatQuantList(value) {
  if (value) {
    return value.value.map((item) => formatQuant(item)).join(", ")
  } else {
    return ""
  }
}


function CranialWindowPreparationCard(props) {
  const activity = props.activity;

  if (activity) {
    const data = {
      Type: <ControlledTerm term={activity.variation} />,
      Description: activity.description,
      "description": activity.device[0].device.description,
      "contructionType": <ControlledTerm term={activity.device[0].device.constructionType} />,
    };

    return (
      <>
        <Connection />
        <Box sx={styles.activity} component={Paper} variant="outlined">
          <h2>Cranial Window Preparation</h2>
          <p>{activity.label}</p>
          <KeyValueTable boldKeys data={data} />
        </Box>
      </>
    );
  } else {
    return "";
  }
}

export default CranialWindowPreparationCard;
