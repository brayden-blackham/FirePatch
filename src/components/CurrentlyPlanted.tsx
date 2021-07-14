import { PlantRow } from "../App";
import { Plant } from "./types";
import React from "react";
import { BasicTable } from "./BasicTable";

export function CurrentlyPlanted(props: { plants: Plant[] }) {
  const { plants } = props;
  return (
    <>
      <h2> Currently Planted </h2>
      <BasicTable />
      <div>
        {plants && plants.map((plt) => <PlantRow key={plt.id} plant={plt} />)}
      </div>
    </>
  );
}
